import json
import os
from datetime import datetime
from io import BytesIO

import csv_to_sqlite
import pandas as pd
import requests_cache

# B01001 - population
# B25031 - median rent by bedrooms
# B25085 - price asked home value
# B20002_001E - median earnings

#

data_folder = './data'

session = requests_cache.CachedSession('data_cache')


def pull_acs(combined: pd.DataFrame) -> pd.DataFrame:
    datasets = {
        "group(B01001)": "population",
        "B25064_001E": "median-rent",
        "B01002_001E": 'median-age',
        "B25097_001E": "median-home-value",
        "B23025_003E,B23025_005E": 'unemployed',
        'B29003_001E,B29003_002E': 'poverty-level',
        "C24050_001E,C24050_002E,C24050_003E,C24050_004E,C24050_005E,C24050_006E,C24050_007E,C24050_008E,C24050_009E,"
        "C24050_008E,C24050_010E,C24050_011E,C24050_012E,C24050_013E,C24050_014E,C24050_015E": "occupation",
        "B08006_001E,B08006_003E,B08006_004E,B08006_008E,B08006_014E,B08006_015E,B08006_017E,B08006_016E": 'commute',
        'B18140_001E': 'income'
    }

    variables = json.load(open(f"{data_folder}/variables.json"))
    var_headers = variables[0]
    var_rows = variables[1:]
    var_df = pd.DataFrame(var_rows, columns=var_headers)
    var_df.set_index("name", inplace=True)

    for year in (2019, 2021):
        for did, dataset in datasets.items():
            params = {
                'get': f"NAME,{did}",
                'for': 'place:*',
                'key': 'a39f361d812075afdef0624ca0aac32b462f5f59'
            }

            url = f"https://api.census.gov/data/{year}/acs/acs5"

            print(f"Processing ACS dataset {url} : {params}")

            r = session.get(url, params=params)

            jsn = r.json()
            column_headers = jsn[0]

            data_rows = jsn[1:]
            df = pd.DataFrame(data_rows, columns=column_headers)

            for col in df.columns:
                try:
                    var_df_row = var_df.loc[col]
                except KeyError:
                    continue

                new_name = var_df_row['label'] \
                    .replace("Estimate!!", '') \
                    .replace(' --!!', '-') \
                    .replace(':!!', '-') \
                    .rstrip(':') \
                    .replace('Total:!!', 'total-') \
                    .replace(' ', '-') \
                    .replace(',', '') \
                    .lower()

                df.rename(columns={col: f"{dataset}-{new_name}"}, inplace=True)

                base_col = col[:-1]

                for annotate in f"{base_col}EA", f"{base_col}M", f"{base_col}MA":
                    if annotate in df:
                        df.drop(columns=annotate, inplace=True, errors='ignore')

            df.drop(columns=['place', 'state', 'GEO_ID'], inplace=True, errors='ignore')

            # drop any duplicate columns (probably NAME)
            df = df.loc[:, ~df.columns.duplicated(keep='first')]

            df = df.rename(columns={c: f"{year}-{c}" for c in df.columns if
                                    c not in ["NAME", "state", "place", "city", "state_name", "abbr", "slug"]})

            combined = combined.merge(df, how='inner', left_on="NAME", right_on="NAME")

    return combined


def create_cities() -> pd.DataFrame:
    r = session.get("https://api.census.gov/data/2021/acs/acs5?get=NAME&for=place:*")
    js = r.json()
    headers = js[0]
    data_rows = js[1:]
    df = pd.DataFrame(data_rows, columns=headers)

    df = df[~df['NAME'].str.contains(' CDP,')]
    df = df[~df['NAME'].str.contains(' CDP \(')]
    df = df[~df['NAME'].str.contains(' borough \(')]

    df['city'] = df.apply(lambda row: row['NAME']
                          .split(", ")[0]
                          .replace(" city", "")
                          .replace(" town", "")
                          .replace(" CDP", "")
                          .replace(" municipality", "")
                          .replace(" and borough", "")
                          .replace(" borough", "")
                          .replace(" village", "")
                          .replace(" unified government", "")
                          .replace(" consolidated government", "")
                          .replace(" metropolitan government", ""), axis=1)
    df['state_name'] = df.apply(lambda row: row['NAME'].split(", ")[1], axis=1)

    abbr = pd.read_csv(f"{data_folder}/abbr.csv")
    df = df.merge(abbr, on="state_name")

    df['slug'] = df.apply(lambda row: f"{row['city'].replace(' ', '-')}-{row['abbr']}".lower(), axis=1)

    # make sure place is int
    df['place'] = df['place'].astype(int)

    return df


def merge_population_estimate(combined: pd.DataFrame):
    # https://www.census.gov/data/datasets/time-series/demo/popest/2020s-total-cities-and-towns.html#v2022
    # https://www2.census.gov/programs-surveys/popest/technical-documentation/file-layouts/2020-2022/SUB-EST2022.pdf
    csv = session.get(
        "https://www2.census.gov/programs-surveys/popest/datasets/2020-2022/cities/totals/sub-est2022.csv")
    estimates = pd.read_csv(BytesIO(csv.content))
    estimates = estimates[estimates['FUNCSTAT'] == 'A']
    estimates = estimates[estimates['SUMLEV'] == 162]
    estimates = estimates[estimates['POPESTIMATE2022'] > 200]
    estimates = estimates[['PLACE', 'NAME', 'STNAME', 'POPESTIMATE2020', 'POPESTIMATE2021', 'POPESTIMATE2022']]
    estimates['NAME'] = estimates['NAME'] + ', ' + estimates['STNAME']
    estimates.drop_duplicates(inplace=True)

    estimates.drop(columns=['PLACE', 'STNAME'], inplace=True)

    return combined.merge(estimates, left_on='NAME', right_on='NAME', how='inner')


def merge_lat_long(combined: pd.DataFrame):
    def hydrate(row):
        url = f"https://nominatim.openstreetmap.org/search?city={row['city']}&state={row['state_name']}&format=json"
        mapdata = session.get(url)
        try:
            mapjson = mapdata.json()[0]
            # time.sleep(.1)
            return pd.Series([mapjson['lat'], mapjson['lon']])
        except IndexError:
            print(f"failed on {row['NAME']} - {url}")
            return pd.Series([0, 0])

    newcols = combined.apply(hydrate, axis=1)
    newcols.columns = ['lat', 'lon']
    newdf = combined.join(newcols)
    return newdf


def merge_weather_data(combined: pd.DataFrame):
    """
        https://open-meteo.com/en/docs/historical-weather-api
    """

    def hydrate(row):
        url = f"https://archive-api.open-meteo.com/v1/archive?latitude={row['lat']}&longitude={row['lon']}&start_date=2019-01-01&end_date=2022-12-31&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,temperature_2m_mean,rain_sum,snowfall_sum&timezone=America%2FLos_Angeles&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime"
        weather_data = session.get(url)
        weather_json = weather_data.json()
        weather = pd.DataFrame.from_dict(weather_json['daily'])

        temp_mean = weather.loc[:, 'temperature_2m_mean'].mean()
        temp_high = weather.loc[:, 'temperature_2m_max'].max()
        temp_low = weather.loc[:, 'temperature_2m_min'].min()
        snowfall = weather.loc[:, 'snowfall_sum'].sum() / 3
        rainfall = weather.loc[:, 'rain_sum'].sum() / 3
        days_of_sun = len(weather[weather['weathercode'] <= 2]) / 3

        weather['month'] = pd.Categorical(pd.to_datetime(weather['time'], unit='s').dt.strftime('%B'),
                                          categories=['January', 'February', 'March', 'April', 'May', 'June',
                                                      'July', 'August', 'September', 'October', 'November',
                                                      'December'], ordered=True)
        weather = weather.sort_values('month')

        monthly_means_df = weather.groupby('month').agg({
            'temperature_2m_mean': 'mean',
            'temperature_2m_max': 'max',
            'temperature_2m_min': 'min',
        }).reset_index()

        return pd.Series([days_of_sun, temp_mean, rainfall, temp_high, temp_low, snowfall, monthly_means_df.to_json()])

    newcols = combined.apply(hydrate, axis=1)
    newcols.columns = ['days-of-sun', 'mean-temp', 'rain-inches', 'high-temp', 'low-temp', 'snow-inches',
                       'monthly-means']
    newdf = combined.join(newcols)
    return newdf


def merge_housing_data():
    # https://redfin-public-data.s3.us-west-2.amazonaws.com/redfin_market_tracker/city_market_tracker.tsv000.gz
    # https://www.redfin.com/news/data-center/
    return


def create_sqlite(df: pd.DataFrame):
    allcsv = f"{data_folder}/all.csv"
    allsqlite = f"{data_folder}/all.sqlite"
    if os.path.exists(allcsv):
        os.remove(allcsv)

    if os.path.exists(allsqlite):
        os.remove(allsqlite)

    df.to_csv(allcsv, index=False)
    options = csv_to_sqlite.CsvOptions(typing_style="full", encoding="utf-8")
    csv_to_sqlite.write_csv([allcsv], allsqlite, options)


if __name__ == "__main__":
    print(datetime.now().strftime("%H:%M:%S"))
    df = create_cities()
    df = pull_acs(df)
    df = merge_population_estimate(df)
    df = merge_lat_long(df)
    df = merge_weather_data(df)

    df.replace({"": -1}, inplace=True)
    df.fillna(-1, inplace=True)

    print(datetime.now().strftime("%H:%M:%S"))

    create_sqlite(df)
