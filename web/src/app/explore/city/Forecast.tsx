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
    WiDayCloudy,
    WiDayFog,
    WiDaySunny,
    WiDust,
    WiFog,
    WiHot,
    WiNightClear,
    WiRain,
    WiShowers,
    WiSleet,
    WiSmoke,
    WiSnow,
    WiSnowflakeCold,
    WiStormShowers,
    WiThunderstorm,
    WiWindy
} from "react-icons/wi";
import React, {useEffect, useState} from "react";
import {City} from "@/model/City";
import {AxiosResponse} from "axios";

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
    icon: string;
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
                        icon: forecasts.data.iconLink[index],
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

    const icon = (forecast: ForecastDatum) => {

        const iconMap: Record<string, any> = {
            bkn: WiDayCloudy,
            nbkn: WiNightClear,
            few: WiDaySunny,
            nfew: WiNightClear,
            sct: WiDayCloudy,
            nsct: WiNightClear,
            ovc: WiDayCloudy,
            novc: WiNightClear,
            wind: WiWindy,
            nwind: WiWindy,
            hot: WiHot,
            cold: WiSnowflakeCold,
            rain: WiRain,
            nra: WiRain,
            tsra: WiThunderstorm,
            ntsra: WiThunderstorm,
            shra: WiShowers,
            shwrs: WiShowers,
            hi_nshwrs: WiShowers,
            scttsra: WiStormShowers,
            nscttsra: WiStormShowers,
            hi_ntsra: WiStormShowers,
            raip: WiSleet,
            nraip: WiSleet,
            fzra: WiSleet,
            hi_tsra: WiThunderstorm,
            rasn: WiSleet,
            nrasn: WiSleet,
            sn: WiSnow,
            nsn: WiSnow,
            smoke: WiSmoke,
            hazy: WiDayFog,
            mist: WiFog,
            fog: WiFog,
            nfg: WiFog,
            du: WiDust,
            dust: WiDust,
            mix: WiSleet,
            nmix: WiSleet,
            skc: WiDaySunny,
            nskc: WiNightClear
        };

        function extractFilename(url: string): string | null {
            const regex = /(?:i=|j=|newimages\/medium\/)(\w+\d*(?:\.\w+)?)/g;
            const match = regex.exec(url);
            if (match) {
                return match[1];
            }
            return null
        }

        const file = extractFilename(forecast.icon);

        if (file == null) {
            return <Icon as={WiDayCloudy} boxSize={20} w={'100%'} borderColor='red' borderWidth={1}/>;
        }

        const iconKey = file.split('.')[0].replace(/\d+$/, '');
        const WeatherIcon = iconMap[iconKey]

        return <Icon as={WeatherIcon} boxSize={20} w={'100%'}/>;


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
