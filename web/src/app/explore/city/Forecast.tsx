import {Card, CardBody, CardHeader, Flex, Heading, Icon, Text} from "@chakra-ui/react";
import {WiDayCloudyWindy} from "react-icons/wi";
import React, {useEffect, useState} from "react";
import {City} from "@/model/City";
import {AxiosResponse} from "axios";

export interface ForecastData {
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

export interface Currentobservation {
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

export interface Data {
    temperature: string[];
    pop: Array<null | string>;
    weather: string[];
    iconLink: string[];
    hazard: string[];
    hazardUrl: string[];
    text: string[];
}

export interface Location {
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

export interface Time {
    layoutKey: string;
    startPeriodName: string[];
    startValidTime: Date[];
    tempLabel: TempLabel[];
}

export type TempLabel = "Low" | "High";

const axios = require('axios').default;

export default function Forecast({city}: { city: City }) {

    const [weather, setWeather] = useState<ForecastData>()

    useEffect(() => {
        if (weather) {
            return
        }

        axios({
            url: "https://forecast.weather.gov/MapClick.php?lat=32.7&lon=-97.3&FcstType=json&callback=jsonCallback",
            method: 'get',
        }).then((response: AxiosResponse) => {
            let jsonp = response.data as string
            jsonp = jsonp.substring(0, jsonp.length - 2)
            jsonp = jsonp.substring(13, jsonp.length)

            setWeather(JSON.parse(jsonp) as ForecastData)
        })

    }, [weather])

    if (!weather) {
        return <></>
    }

    return (
        <>
            <Heading as='h4' size='md' mb={4}>
                Current Forcast
            </Heading>
            <Flex w='100%'>
                {weather.time.startPeriodName
                    .filter((name) => !name.endsWith(" Night"))
                    .slice(0, 4)
                    .map((day, index) => (
                        <Card
                            key={city.name.slug + 'forecast' + index}
                            backgroundColor='#edf3f8'
                            mr={3}
                            w='30%'>
                            <CardHeader p={3}>
                                <Heading size='sm'>{day}</Heading>
                            </CardHeader>
                            <CardBody
                                backgroundColor='white'
                                p={4}
                                alignItems='center'>
                                <Icon as={WiDayCloudyWindy} boxSize={20}/>
                                <Heading size='md'>
                                    {weather.data.temperature[index]}°
                                </Heading>
                                <Text size='xs'>
                                    {weather.data.text[index]}
                                </Text>
                            </CardBody>
                        </Card>
                    ))
                }
            </Flex>
        </>
    )
}
