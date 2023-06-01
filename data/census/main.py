import json

import csv_to_sqlite
import numpy as np

import pandas as pd
import requests

# B01001 - population
# B25031 - median rent by bedrooms
# B25085 - price asked home value
# B20002_001E - median earnings

data_folder = './data'

def pull_datasets():
    datasets = {
        "B01001": "population",
        "B25031": "median-rent-by-bedrooms",
        "B25085": "price-asked-home-value",
    }

    combined = pd.read_csv(f"{data_folder}/cities.csv")

    variables = json.load(open(f"{data_folder}/variables.json"))
    var_headers = variables[0]
    var_rows = variables[1:]
    var_df = pd.DataFrame(var_rows, columns=var_headers)
    var_df.set_index("name", inplace=True)

    for did, dataset in datasets.items():
        # ,group(B25031),group(B25085),B20002_001E
        params = {
            'get': f'group({did})',
            'for': 'place:*',
            'key': 'a39f361d812075afdef0624ca0aac32b462f5f59'
        }

        url = "https://api.census.gov/data/2021/acs/acs5"

        r = requests.get(url, params=params)

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
                .lower()

            df.rename(columns={col: f"{dataset}-{new_name}"}, inplace=True)

            base_col = col[:-1]

            for annotate in f"{base_col}EA", f"{base_col}M", f"{base_col}MA":
                if annotate in df:
                    df.drop(columns=annotate, inplace=True, errors='ignore')

        df.drop(columns=['place', 'state', 'GEO_ID'], inplace=True, errors='ignore')

        combined = combined.merge(df, how='inner', on="NAME")

    combined.to_csv(f"{data_folder}/all.csv", index=False)


def create_cities():
    r = requests.get("https://api.census.gov/data/2021/acs/acs5?get=NAME&for=place:*")
    js = r.json()
    headers = js[0]
    data_rows = js[1:]
    df = pd.DataFrame(data_rows, columns=headers)

    df['city'] = df.apply(lambda row: row['NAME']
                          .split(", ")[0]
                          .replace(" city", "")
                          .replace(" town", "")
                          .replace(" CDP", "")
                          .replace(" municipality", "")
                          .replace(" metropolitan government", ""), axis=1)
    df['state_name'] = df.apply(lambda row: row['NAME'].split(", ")[1], axis=1)

    abbr = pd.read_csv(f"{data_folder}/abbr.csv")
    df = df.merge(abbr, on="state_name")

    df['slug'] = df.apply(lambda row: f"{row['city'].replace(' ', '-')}-{row['abbr']}".lower(), axis=1)

    df.to_csv(f"{data_folder}/cities.csv", index=False)

def merge_population_estimate():
    # https://www.census.gov/data/datasets/time-series/demo/popest/2020s-total-cities-and-towns.html#v2022

    # incorporated places
    # https://www2.census.gov/programs-surveys/popest/tables/2020-2022/cities/totals/SUB-IP-EST2022-POP.xlsx

    # cities
    # https://www2.census.gov/programs-surveys/popest/tables/2020-2022/cities/totals/SUB-IP-EST2022-ANNRNK.xlsx
    return

def merge_lat_long():
    # https://nominatim.openstreetmap.org/search?city=Joseph&state=Oregon&format=json
    return

def merge_weather_data():
    # https://archive-api.open-meteo.com/v1/archive?latitude=45.52&longitude=-122.68&start_date=2019-05-12&end_date=2023-05-26&hourly=cloudcover&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,temperature_2m_mean,rain_sum,snowfall_sum&timezone=America%2FLos_Angeles&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime
    return

def merge_housing_data():
    # https://redfin-public-data.s3.us-west-2.amazonaws.com/redfin_market_tracker/city_market_tracker.tsv000.gz
    # https://www.redfin.com/news/data-center/
    return

def create_sqlite():
    # all the usual options are supported
    options = csv_to_sqlite.CsvOptions(typing_style="full", encoding="utf-8")
    csv_to_sqlite.write_csv([f"{data_folder}/all.csv"], f"{data_folder}/all.sqlite", options)


if __name__ == "__main__":
    # create_cities()
    # pull_datasets()
    create_sqlite()


