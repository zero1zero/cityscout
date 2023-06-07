import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Icon,
    Stat,
    StatLabel,
    StatNumber,
    Text
} from "@chakra-ui/react";
import {
    WiCloud,
    WiCloudy,
    WiDayCloudy,
    WiDayCloudyHigh,
    WiDayHaze,
    WiDaySunny,
    WiDaySunnyOvercast,
    WiFog,
    WiHot,
    WiNightClear,
    WiRain,
    WiRainMix,
    WiRainWind,
    WiShowers,
    WiSmoke,
    WiSnow,
    WiSnowflakeCold,
    WiSnowWind,
    WiSprinkle,
    WiThunderstorm,
    WiWindy
} from "react-icons/wi";
import React, {useEffect, useState} from "react";
import {City} from "@/model/City";
import {AxiosResponse} from "axios";
import {IconType} from "react-icons/lib";

interface ForecastData {
    operationalMode: string;
    srsName: string;
    creationDate: Date;
    creationDateLocal: string;
    productionCenter: string;
    credit: string;
    moreInformation: string;
    location: Location;
    time: Time;
    data: Data;
    currentobservation: Currentobservation;
}

interface Currentobservation {
    id: string;
    name: string;
    elev: string;
    latitude: string;
    longitude: string;
    Date: string;
    Temp: string;
    Dewp: string;
    Relh: string;
    Winds: string;
    Windd: string;
    Gust: string;
    Weather: string;
    Weatherimage: string;
    Visibility: string;
    Altimeter: string;
    SLP: string;
    timezone: string;
    state: string;
    WindChill: string;
}

interface Data {
    temperature: string[];
    pop: Array<null | string>;
    weather: string[];
    iconLink: string[];
    hazard: string[];
    hazardUrl: string[];
    text: string[];
}

interface Location {
    region: string;
    latitude: string;
    longitude: string;
    elevation: string;
    wfo: string;
    timezone: string;
    areaDescription: string;
    radar: string;
    zone: string;
    county: string;
    firezone: string;
    metar: string;
}

interface Time {
    layoutKey: string;
    startPeriodName: string[];
    startValidTime: Date[];
    tempLabel: TempLabel[];
}

interface ForecastDatum {
    day: string;
    low: string;
    high: string;
    text: string;
    weather: string;
}

export type TempLabel = "Low" | "High";

const axios = require('axios').default;

export default function Forecast({city}: { city: City }) {

    const [forecastDatums, setForecastDatums] = useState<ForecastDatum[]>()

    useEffect(() => {
        if (forecastDatums) {
            return
        }

        axios({
            url: `https://forecast.weather.gov/MapClick.php?lat=${city.lat}&lon=${city.lon}&FcstType=json`,
            method: 'get',
        }).then((response: AxiosResponse) => {
            const forecasts = response.data as ForecastData
            const forecastsList: ForecastDatum[] = forecasts.time.startPeriodName
                .map((item, index) => {
                    return {
                        day: item,
                        weather: forecasts.data.weather[index],
                        low: forecasts.data.temperature[index],
                        high: forecasts.data.temperature[index],
                        text: forecasts.data.text[index].split(".").slice(0, 2).join(".") + "."
                    }
                })
                .filter((value: ForecastDatum) => !value.day.endsWith(" Night"))
            setForecastDatums(forecastsList)
        })
    }, [forecastDatums, city.lat, city.lon])

    if (!forecastDatums) {
        return <></>
    }

    //"Mostly Clear"
    // 1	"Sunny then Slight Chance T-storms"
    // 2	"Slight Chance T-storms"
    // 3	"Slight Chance T-storms"
    // 4	"Partly Cloudy"
    // 5	"Sunny"
    // 6	"Partly Cloudy then Slight Chance T-storms"
    // 7	"Mostly Sunny then Slight Chance T-storms"
    // 8	"Slight Chance T-storms"
    // 9	"Sunny"
    // 10	"Slight Chance T-storms"
    // 11	"Sunny"
    // 12	"Mostly Clear"
    // 13	"Sunny"
    const icon = (forecast: ForecastDatum) => {

        const weather = forecast.weather

        const iconLookup: { [name: string]: IconType } = {
            "Sunny": WiDaySunny,
            "Mostly Sunny": WiDaySunnyOvercast,
            "Partly Sunny": WiDayCloudyHigh,
            "Fair": WiDayCloudyHigh,
            "Cloudy": WiCloudy,
            "Mostly Cloudy": WiCloudy,
            "Partly Cloudy": WiDayCloudy,
            "Overcast": WiCloud,
            "Clear": WiNightClear,
            "Fog": WiFog,
            "Patchy Fog": WiFog,
            "Dense Fog": WiFog,
            "Haze": WiDayHaze,
            "Smoke": WiSmoke,
            "Showers": WiShowers,
            "Chance Showers": WiShowers,
            "Slight Chance Showers": WiShowers,
            "Heavy Showers": WiShowers,
            "Light Showers": WiShowers,
            "Rain": WiRain,
            "Heavy Rain": WiRain,
            "Light Rain": WiRain,
            "Slight Chance Rain": WiRain,
            "Chance Rain": WiRain,
            "Thunderstorms": WiThunderstorm,
            "Chance Thunderstorms": WiThunderstorm,
            "Slight Chance Thunderstorms": WiThunderstorm,
            "Slight Chance T-storms": WiThunderstorm,
            "Chance T-storms": WiThunderstorm,
            "Rain-Wind": WiRainWind,
            "Sprinkle": WiSprinkle,
            "Drizzle": WiSprinkle,
            "Light Drizzle": WiSprinkle,
            "Heavy Drizzle": WiSprinkle,
            "Wintry Mix": WiRainMix,
            "Sleet": WiRainMix,
            "Ice Pellets": WiRainMix,
            "Freezing Rain": WiRainMix,
            "Freezing Drizzle": WiRainMix,
            "Rain Mix": WiRainMix,
            "Snow": WiSnow,
            "Heavy Snow": WiSnow,
            "Light Snow": WiSnow,
            "Flurries": WiSnow,
            "Slight Chance Snow": WiSnow,
            "Chance Snow": WiSnow,
            "Heavy Snow Showers": WiSnow,
            "Blowing Snow": WiSnowWind,
            "Windy": WiWindy,
            "Breezy": WiWindy,
            "Blustery": WiWindy,
            "Calm": WiWindy,
            "Light Winds": WiWindy,
            "Gusty": WiWindy,
            "Squall": WiWindy,
            "Wind Chill": WiWindy,
            "Wind Chill Advisory": WiWindy,
            "Wind Chill Warning": WiWindy,
            "Frost": WiSnowflakeCold,
            "Cold": WiSnowflakeCold,
            "Frost Advisory": WiSnowflakeCold,
            "Freeze Warning": WiSnowflakeCold,
            "Hot": WiHot
        }

        const WeatherIconComponent = iconLookup[weather];

        return WeatherIconComponent ? <Icon as={WeatherIconComponent} boxSize={20} w={'100%'}/> :
            <Icon as={WiDayCloudy} boxSize={20} borderColor='red' borderWidth={1}/>;
    }

    return (
        <>
            <Heading as='h4' size='md' mb={4}>
                Current Forecast
            </Heading>
            <Flex w='100%'>
                {forecastDatums
                    .slice(0, 4)
                    .map((forecast) => (
                        <Card
                            key={city.name.slug + 'forecast' + forecast.day}
                            backgroundColor='#edf3f8'
                            mr={3}
                            w='30%'>
                            <CardHeader p={3}>
                                <Heading size='sm'>{forecast.day}</Heading>
                            </CardHeader>
                            <CardBody
                                backgroundColor='white'
                                p={4}
                                alignItems='center'>
                                {icon(forecast)}
                                <HStack>
                                    <Stat>
                                        <StatLabel>Low</StatLabel>
                                        <StatNumber>{forecast.low}</StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>High</StatLabel>
                                        <StatNumber>{forecast.high}</StatNumber>
                                    </Stat>
                                </HStack>
                                <Text size='xs'>
                                    {forecast.text}
                                </Text>
                            </CardBody>
                        </Card>
                    ))
                }
            </Flex>
        </>
    )
}
