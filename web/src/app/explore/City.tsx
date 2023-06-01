import {City} from "@/model/City";
import {
    AspectRatio,
    Box,
    Flex,
    Heading,
    Icon,
    Image,
    Link,
    List,
    ListIcon,
    ListItem,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack
} from "@chakra-ui/react";
import {FiExternalLink, FiGlobe, FiUsers} from "react-icons/fi";
import React from "react";
import {Map} from "@/app/explore/Map";
import {BarDatum, ResponsiveBar} from "@nivo/bar";
import {ResponsivePie} from "@nivo/pie";
import {ResponsiveTreeMap} from "@nivo/treemap";
import Forecast from "@/app/explore/city/Forecast";
import {ResponsiveLine} from "@nivo/line";

export default function CityCard({city}: { city: City }) {

    const YearCite = () => {
        return (
            <></>
            // <Text as='sup'>
            //     <Link href='#'>
            //         <FiInfo />
            //     </Link>
            // </Text>
        )
    }

    const populationData: BarDatum[] = [
        {
            // id: `${city.name.slug}-pop-un-18}`,
            female: city.population!!.female_under_18,
            male: -city.population!!.male_under_18,
            population: "Under 18"
        },
        {
            // id: `${city.name.slug}-pop-18-24}`,
            female: city.population!!.female_18_to_24,
            male: -city.population!!.male_18_to_24,
            population: "18 to 24"
        },
        {
            // id: `${city.name.slug}-pop-25-30}`,
            female: city.population!!.female_25_to_30,
            male: -city.population!!.male_25_to_30,
            population: "25 to 30"
        },
        {
            // id: `${city.name.slug}-pop-30-40}`,
            female: city.population!!.female_30_to_40,
            male: -city.population!!.male_30_to_40,
            population: "30 to 40"
        },
        {
            // id: `${city.name.slug}-pop-40-50}`,
            female: city.population!!.female_40_to_50,
            male: -city.population!!.male_40_to_50,
            population: "40 to 50"
        },
        {
            // id: `${city.name.slug}-pop-50-60}`,
            female: city.population!!.female_50_to_60,
            male: -city.population!!.male_50_to_60,
            population: "50 to 60"
        },
        {
            // id: `${city.name.slug}-pop-over-60}`,
            female: city.population!!.female_over_60,
            male: -city.population!!.male_over_60,
            population: "Over 60"
        },
    ]

    const commuteData = [
        {
            "id": "Drove Alone",
            "label": "Drove Alone",
            "value": 536,
            "color": "hsl(215, 70%, 50%)"
        },
        {
            "id": "Carpool",
            "label": "Carpool",
            "value": 525,
            "color": "hsl(112, 70%, 50%)"
        },
        {
            "id": "Public Transport",
            "label": "Public Transportation",
            "value": 181,
            "color": "hsl(229, 70%, 50%)"
        },
        {
            "id": "Walked",
            "label": "Walked",
            "value": 520,
            "color": "hsl(251, 70%, 50%)"
        },
        {
            "id": "WFH",
            "label": "Worked from Home",
            "value": 156,
            "color": "hsl(205, 70%, 50%)"
        },
        {
            "id": "Other",
            "label": "Other",
            "value": 156,
            "color": "hsl(205, 70%, 50%)"
        }
    ]
    const occupationData = {
        "name": "nivo",
        "color": "hsl(327, 70%, 50%)",
        "children": [
            {
                "name": "viz",
                "color": "hsl(241, 70%, 50%)",
                "children": [
                    {
                        "name": "stack",
                        "color": "hsl(154, 70%, 50%)",
                        "children": [
                            {
                                "name": "cchart",
                                "color": "hsl(6, 70%, 50%)",
                                "loc": 25525
                            },
                            {
                                "name": "xAxis",
                                "color": "hsl(344, 70%, 50%)",
                                "loc": 111528
                            },
                            {
                                "name": "yAxis",
                                "color": "hsl(357, 70%, 50%)",
                                "loc": 155017
                            },
                            {
                                "name": "layers",
                                "color": "hsl(226, 70%, 50%)",
                                "loc": 134984
                            }
                        ]
                    },
                    {
                        "name": "ppie",
                        "color": "hsl(351, 70%, 50%)",
                        "children": [
                            {
                                "name": "chart",
                                "color": "hsl(195, 70%, 50%)",
                                "children": [
                                    {
                                        "name": "pie",
                                        "color": "hsl(6, 70%, 50%)",
                                        "children": [
                                            {
                                                "name": "outline",
                                                "color": "hsl(170, 70%, 50%)",
                                                "loc": 24991
                                            },
                                            {
                                                "name": "slices",
                                                "color": "hsl(203, 70%, 50%)",
                                                "loc": 51215
                                            },
                                            {
                                                "name": "bbox",
                                                "color": "hsl(225, 70%, 50%)",
                                                "loc": 24004
                                            }
                                        ]
                                    },
                                    {
                                        "name": "donut",
                                        "color": "hsl(209, 70%, 50%)",
                                        "loc": 181742
                                    },
                                    {
                                        "name": "gauge",
                                        "color": "hsl(230, 70%, 50%)",
                                        "loc": 97602
                                    }
                                ]
                            },
                            {
                                "name": "legends",
                                "color": "hsl(124, 70%, 50%)",
                                "loc": 188227
                            }
                        ]
                    }
                ]
            },
            {
                "name": "colors",
                "color": "hsl(113, 70%, 50%)",
                "children": [
                    {
                        "name": "rgb",
                        "color": "hsl(74, 70%, 50%)",
                        "loc": 40697
                    },
                    {
                        "name": "hsl",
                        "color": "hsl(160, 70%, 50%)",
                        "loc": 56290
                    }
                ]
            },
            {
                "name": "utils",
                "color": "hsl(93, 70%, 50%)",
                "children": [
                    {
                        "name": "randomize",
                        "color": "hsl(145, 70%, 50%)",
                        "loc": 81000
                    },
                    {
                        "name": "resetClock",
                        "color": "hsl(250, 70%, 50%)",
                        "loc": 149299
                    },
                    {
                        "name": "noop",
                        "color": "hsl(245, 70%, 50%)",
                        "loc": 182735
                    },
                    {
                        "name": "tick",
                        "color": "hsl(76, 70%, 50%)",
                        "loc": 110790
                    },
                    {
                        "name": "forceGC",
                        "color": "hsl(224, 70%, 50%)",
                        "loc": 106935
                    },
                    {
                        "name": "stackTrace",
                        "color": "hsl(298, 70%, 50%)",
                        "loc": 48793
                    },
                    {
                        "name": "dbg",
                        "color": "hsl(330, 70%, 50%)",
                        "loc": 188252
                    }
                ]
            },
            {
                "name": "generators",
                "color": "hsl(224, 70%, 50%)",
                "children": [
                    {
                        "name": "address",
                        "color": "hsl(97, 70%, 50%)",
                        "loc": 8883
                    },
                    {
                        "name": "city",
                        "color": "hsl(91, 70%, 50%)",
                        "loc": 177366
                    },
                    {
                        "name": "animal",
                        "color": "hsl(219, 70%, 50%)",
                        "loc": 88787
                    },
                    {
                        "name": "movie",
                        "color": "hsl(269, 70%, 50%)",
                        "loc": 122750
                    },
                    {
                        "name": "user",
                        "color": "hsl(92, 70%, 50%)",
                        "loc": 100022
                    }
                ]
            },
            {
                "name": "set",
                "color": "hsl(118, 70%, 50%)",
                "children": [
                    {
                        "name": "clone",
                        "color": "hsl(357, 70%, 50%)",
                        "loc": 157909
                    },
                    {
                        "name": "intersect",
                        "color": "hsl(193, 70%, 50%)",
                        "loc": 161888
                    },
                    {
                        "name": "merge",
                        "color": "hsl(109, 70%, 50%)",
                        "loc": 9993
                    },
                    {
                        "name": "reverse",
                        "color": "hsl(317, 70%, 50%)",
                        "loc": 11796
                    },
                    {
                        "name": "toArray",
                        "color": "hsl(69, 70%, 50%)",
                        "loc": 34335
                    },
                    {
                        "name": "toObject",
                        "color": "hsl(220, 70%, 50%)",
                        "loc": 106550
                    },
                    {
                        "name": "fromCSV",
                        "color": "hsl(63, 70%, 50%)",
                        "loc": 14029
                    },
                    {
                        "name": "slice",
                        "color": "hsl(228, 70%, 50%)",
                        "loc": 155033
                    },
                    {
                        "name": "append",
                        "color": "hsl(319, 70%, 50%)",
                        "loc": 43679
                    },
                    {
                        "name": "prepend",
                        "color": "hsl(298, 70%, 50%)",
                        "loc": 24075
                    },
                    {
                        "name": "shuffle",
                        "color": "hsl(261, 70%, 50%)",
                        "loc": 141795
                    },
                    {
                        "name": "pick",
                        "color": "hsl(24, 70%, 50%)",
                        "loc": 154414
                    },
                    {
                        "name": "plouc",
                        "color": "hsl(55, 70%, 50%)",
                        "loc": 5562
                    }
                ]
            },
            {
                "name": "text",
                "color": "hsl(358, 70%, 50%)",
                "children": [
                    {
                        "name": "trim",
                        "color": "hsl(115, 70%, 50%)",
                        "loc": 88358
                    },
                    {
                        "name": "slugify",
                        "color": "hsl(288, 70%, 50%)",
                        "loc": 56947
                    },
                    {
                        "name": "snakeCase",
                        "color": "hsl(29, 70%, 50%)",
                        "loc": 70030
                    },
                    {
                        "name": "camelCase",
                        "color": "hsl(240, 70%, 50%)",
                        "loc": 32449
                    },
                    {
                        "name": "repeat",
                        "color": "hsl(116, 70%, 50%)",
                        "loc": 59668
                    },
                    {
                        "name": "padLeft",
                        "color": "hsl(329, 70%, 50%)",
                        "loc": 198234
                    },
                    {
                        "name": "padRight",
                        "color": "hsl(23, 70%, 50%)",
                        "loc": 594
                    },
                    {
                        "name": "sanitize",
                        "color": "hsl(238, 70%, 50%)",
                        "loc": 74541
                    },
                    {
                        "name": "ploucify",
                        "color": "hsl(37, 70%, 50%)",
                        "loc": 65561
                    }
                ]
            },
            {
                "name": "misc",
                "color": "hsl(266, 70%, 50%)",
                "children": [
                    {
                        "name": "greetings",
                        "color": "hsl(123, 70%, 50%)",
                        "children": [
                            {
                                "name": "hey",
                                "color": "hsl(334, 70%, 50%)",
                                "loc": 159595
                            },
                            {
                                "name": "HOWDY",
                                "color": "hsl(107, 70%, 50%)",
                                "loc": 97025
                            },
                            {
                                "name": "aloha",
                                "color": "hsl(301, 70%, 50%)",
                                "loc": 97012
                            },
                            {
                                "name": "AHOY",
                                "color": "hsl(14, 70%, 50%)",
                                "loc": 47118
                            }
                        ]
                    },
                    {
                        "name": "other",
                        "color": "hsl(159, 70%, 50%)",
                        "loc": 161445
                    },
                    {
                        "name": "path",
                        "color": "hsl(302, 70%, 50%)",
                        "children": [
                            {
                                "name": "pathA",
                                "color": "hsl(300, 70%, 50%)",
                                "loc": 82616
                            },
                            {
                                "name": "pathB",
                                "color": "hsl(203, 70%, 50%)",
                                "children": [
                                    {
                                        "name": "pathB1",
                                        "color": "hsl(64, 70%, 50%)",
                                        "loc": 121815
                                    },
                                    {
                                        "name": "pathB2",
                                        "color": "hsl(50, 70%, 50%)",
                                        "loc": 193695
                                    },
                                    {
                                        "name": "pathB3",
                                        "color": "hsl(276, 70%, 50%)",
                                        "loc": 34152
                                    },
                                    {
                                        "name": "pathB4",
                                        "color": "hsl(16, 70%, 50%)",
                                        "loc": 148361
                                    }
                                ]
                            },
                            {
                                "name": "pathC",
                                "color": "hsl(242, 70%, 50%)",
                                "children": [
                                    {
                                        "name": "pathC1",
                                        "color": "hsl(122, 70%, 50%)",
                                        "loc": 54068
                                    },
                                    {
                                        "name": "pathC2",
                                        "color": "hsl(347, 70%, 50%)",
                                        "loc": 86635
                                    },
                                    {
                                        "name": "pathC3",
                                        "color": "hsl(144, 70%, 50%)",
                                        "loc": 130598
                                    },
                                    {
                                        "name": "pathC4",
                                        "color": "hsl(238, 70%, 50%)",
                                        "loc": 136709
                                    },
                                    {
                                        "name": "pathC5",
                                        "color": "hsl(57, 70%, 50%)",
                                        "loc": 172962
                                    },
                                    {
                                        "name": "pathC6",
                                        "color": "hsl(277, 70%, 50%)",
                                        "loc": 20015
                                    },
                                    {
                                        "name": "pathC7",
                                        "color": "hsl(329, 70%, 50%)",
                                        "loc": 137132
                                    },
                                    {
                                        "name": "pathC8",
                                        "color": "hsl(227, 70%, 50%)",
                                        "loc": 48780
                                    },
                                    {
                                        "name": "pathC9",
                                        "color": "hsl(331, 70%, 50%)",
                                        "loc": 6671
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    const divergingCommonProps = {
        data: populationData,
        indexBy: 'population',
        enableGridX: false,
        enableGridY: true,
        padding: 0.3,
        axisLeft: {
            tickSize: 20,
            tickPadding: 5,
        },
        markers: [
            {
                axis: 'x',
                value: 0,
                lineStyle: {strokeOpacity: 0},
                textStyle: {fill: '#F2913D'},
                legend: 'Male',
                legendPosition: 'top-right',
                legendOffsetY: -20
            } as const,
            {
                axis: 'x',
                value: 0,
                // lineStyle: { stroke: '#D9695F', strokeWidth: 1 },
                textStyle: {fill: '#8C4A81'},
                legend: 'Female',
                legendPosition: 'top-left',
                legendOffsetY: -20
            } as const,
        ],
    }


    const DivergingStacked = () => {
        return (
            <ResponsiveBar
                {...divergingCommonProps}
                margin={{top: 30, right: 0, bottom: 0, left: 72}}
                layout="horizontal"
                keys={['male', 'female']}
                // colors={['#8C4A81', '#F2913D', '#D9695F', '#e25c3b']}
                valueFormat={v => new Intl.NumberFormat('en-us').format(Math.abs(v))}
            />
        )
    }

    const CommutePie = () => {
        return (
            <ResponsivePie
                data={commuteData}
                margin={{top: 0, right: 100, bottom: 0, left: 100}}
                innerRadius={0.3}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{from: 'color'}}
                arcLabelsSkipAngle={10}
            />
        )
    }

    const OccupationHeatmap = () => {
        return (
            <ResponsiveTreeMap
                data={occupationData}
                identity="name"
                value="loc"
                valueFormat=".02s"
                margin={{top: 10, right: 10, bottom: 10, left: 10}}
                labelSkipSize={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.2
                        ]
                    ]
                }}
                parentLabelPosition="left"
                parentLabelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.1
                        ]
                    ]
                }}
            />
        )
    }

    const weatherData = [
        {
            "id": "average",
            "color": "hsl(1, 70%, 50%)",
            "data": [
                {
                    "x": "plane",
                    "y": 26
                },
                {
                    "x": "helicopter",
                    "y": 235
                },
                {
                    "x": "boat",
                    "y": 119
                },
                {
                    "x": "train",
                    "y": 160
                },
                {
                    "x": "subway",
                    "y": 147
                },
                {
                    "x": "bus",
                    "y": 116
                },
                {
                    "x": "car",
                    "y": 198
                },
                {
                    "x": "moto",
                    "y": 216
                },
                {
                    "x": "bicycle",
                    "y": 134
                },
                {
                    "x": "horse",
                    "y": 271
                },
                {
                    "x": "skateboard",
                    "y": 28
                },
                {
                    "x": "others",
                    "y": 26
                }
            ]
        },
        {
            "id": "low",
            "color": "hsl(271, 70%, 50%)",
            "data": [
                {
                    "x": "plane",
                    "y": 27
                },
                {
                    "x": "helicopter",
                    "y": 265
                },
                {
                    "x": "boat",
                    "y": 54
                },
                {
                    "x": "train",
                    "y": 279
                },
                {
                    "x": "subway",
                    "y": 119
                },
                {
                    "x": "bus",
                    "y": 114
                },
                {
                    "x": "car",
                    "y": 237
                },
                {
                    "x": "moto",
                    "y": 247
                },
                {
                    "x": "bicycle",
                    "y": 27
                },
                {
                    "x": "horse",
                    "y": 276
                },
                {
                    "x": "skateboard",
                    "y": 89
                },
                {
                    "x": "others",
                    "y": 237
                }
            ]
        },
        {
            "id": "high",
            "color": "hsl(43, 70%, 50%)",
            "data": [
                {
                    "x": "plane",
                    "y": 40
                },
                {
                    "x": "helicopter",
                    "y": 16
                },
                {
                    "x": "boat",
                    "y": 288
                },
                {
                    "x": "train",
                    "y": 155
                },
                {
                    "x": "subway",
                    "y": 90
                },
                {
                    "x": "bus",
                    "y": 33
                },
                {
                    "x": "car",
                    "y": 83
                },
                {
                    "x": "moto",
                    "y": 83
                },
                {
                    "x": "bicycle",
                    "y": 90
                },
                {
                    "x": "horse",
                    "y": 165
                },
                {
                    "x": "skateboard",
                    "y": 194
                },
                {
                    "x": "others",
                    "y": 108
                }
            ]
        },
    ]

    const WeatherTrend = () => (
        <ResponsiveLine
            data={weatherData}
            margin={{top: 20, right: 110, bottom: 50, left: 60}}
            xScale={{type: 'point'}}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{theme: 'background'}}
            pointBorderWidth={2}
            pointBorderColor={{from: 'serieColor'}}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )

    const QuickFacts = () => {
        return (
            <>
                <Flex
                    flexWrap='wrap'
                    justifyContent='space-between'
                    alignItems='center'
                    mb={4}>
                    <Stat
                        minW='33%'>
                        <StatLabel>Population</StatLabel>
                        <StatNumber>{new Intl.NumberFormat('en-us').format(city.population!!.total)}</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase'/>
                            23.36%
                        </StatHelpText>
                    </Stat>
                    <Stat
                        minW='33%'>
                        <StatLabel>Median Home Price</StatLabel>
                        <StatNumber>$250,000</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase'/>
                            23.36%
                        </StatHelpText>
                    </Stat>
                    <Stat
                        minW='33%'
                    >
                        <Flex flexWrap='nowrap' flexDirection='column'>
                            <StatLabel>Median Rent Price</StatLabel>
                            <StatNumber>$1,500/mo</StatNumber>
                            <StatHelpText>
                                <StatArrow type='increase'/>
                                23.36%
                            </StatHelpText>
                        </Flex>
                    </Stat>
                    <Stat
                        minW='33%'>
                        <StatLabel>Unemployment Rate</StatLabel>
                        <StatNumber>12%</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase'/>
                            23.36%
                        </StatHelpText>
                    </Stat>
                    <Stat
                        minW='33%'>
                        <StatLabel>Days of Sun</StatLabel>
                        {/*<Icon as={FiSun} ml={2}/>*/}
                        <StatNumber>220</StatNumber>
                    </Stat>
                    <Stat
                        minW='33%'>
                        <StatLabel>Median Temperature</StatLabel>
                        {/*<Icon as={FiSun} ml={2}/>*/}
                        <StatNumber>50°</StatNumber>
                    </Stat>
                </Flex>
                <Box
                    flexWrap='nowrap'>
                    <Map
                        cities={{cities: [city]}}
                        selected={0}/>
                </Box>
            </>
        )
    }

    const People = () => {
        return (
            <>
                <Flex
                    flexWrap='wrap'
                    justifyContent='space-between'
                    alignItems='center'
                    mb={4}>
                    <Stat
                        minW='33%'>
                        <StatLabel>Median Age</StatLabel>
                        <StatNumber>{new Intl.NumberFormat('en-us').format(42)}</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase'/>
                            23.36%
                        </StatHelpText>
                    </Stat>
                    <Stat
                        minW='33%'>
                        <StatLabel>Median Income</StatLabel>
                        <StatNumber>${new Intl.NumberFormat('en-us').format(78000)}</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase'/>
                            23.36%
                        </StatHelpText>
                    </Stat>
                    <Stat
                        minW='33%'>
                        <StatLabel>Poverty Rate</StatLabel>
                        <StatNumber>18%</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase'/>
                            23.36%
                        </StatHelpText>
                    </Stat>
                </Flex>
                <Flex w='100%'
                      wrap='wrap'>
                    <VStack minW='50%' h={400}>
                        <Heading as='h4' size='md' textAlign='center'>
                            Population Age Distribution
                        </Heading>
                        <DivergingStacked/>
                    </VStack>
                    <VStack minW='50%' h={400}>
                        <Heading as='h4' size='md' textAlign='center'>
                            Type of Commute
                        </Heading>
                        <CommutePie/>
                    </VStack>
                </Flex>
                <Flex w='100%'
                      wrap='wrap'
                      h={400}>
                    <Heading as='h4' size='md' textAlign='center'>
                        Occupations
                    </Heading>
                    <OccupationHeatmap/>
                </Flex>
            </>
        )
    }

    const Weather = () => {
        return (
            <>
                <Flex
                    flexWrap='wrap'
                    justifyContent='space-between'
                    alignItems='center'
                    mb={4}>
                    <Stat
                        minW='25%'>
                        <StatLabel>Rain<YearCite/></StatLabel>
                        <StatNumber>18in</StatNumber>
                    </Stat>
                    <Stat
                        minW='25%'>
                        <StatLabel>High<YearCite/></StatLabel>
                        <StatNumber>20°</StatNumber>
                    </Stat>
                    <Stat
                        minW='25%'>
                        <StatLabel>Low<YearCite/></StatLabel>
                        <StatNumber>80°</StatNumber>
                    </Stat>
                    <Stat
                        minW='25%'>
                        <StatLabel>Snow <YearCite/></StatLabel>
                        <StatNumber>10in</StatNumber>
                    </Stat>
                </Flex>

                <Box
                    mb={10}
                    h={400}>
                    <Heading as='h4' size='md'>
                        Temperature Trends
                    </Heading>
                    <WeatherTrend/>
                </Box>

                <Forecast city={city}/>
            </>
        )
    }

    const Links = () => {
        return (
            <>
                <List
                    mt={4}
                    spacing={2}>
                    <ListItem>
                        <Link isExternal
                              href={'https://en.wikipedia.org/w/index.php?search=' + encodeURIComponent(city.name.city) + '&title=Special%3ASearch&ns0=1'}>
                            <ListIcon as={FiExternalLink} color='brand.500'/>
                            Wikipedia
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link isExternal
                              href={'https://datausa.io/profile/geo/' + city.name.city.replace(/, /, '-').toLowerCase()}>
                            <ListIcon as={FiExternalLink} color='brand.500'/>
                            City Data
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link isExternal
                              href={'https://datausa.io/profile/geo/' + city.name.city.replace(/, /, '-').toLowerCase()}>
                            <ListIcon as={FiExternalLink} color='brand.500'/>
                            Census Profile
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link isExternal
                              href={'https://datausa.io/profile/geo/' + city.name.city.replace(/, /, '-').toLowerCase()}>
                            <ListIcon as={FiExternalLink} color='brand.500'/>
                            Current Weather
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link isExternal
                              href={'https://datausa.io/profile/geo/' + city.name.city.replace(/, /, '-').toLowerCase()}>
                            <ListIcon as={FiExternalLink} color='brand.500'/>
                            VRBO Rentals
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link isExternal
                              href={'https://datausa.io/profile/geo/' + city.name.city.replace(/, /, '-').toLowerCase()}>
                            <ListIcon as={FiExternalLink} color='brand.500'/>
                            Redfin Homes &amp; Rentals
                        </Link>
                    </ListItem>
                </List>
            </>
        )
    }

    return (
        <Flex
            bg="white"
            maxW='3xl'
            rounded="lg"
            shadow="lg"
            mb={4}
            flexDirection='column'
        >
            <AspectRatio ratio={16 / 8}>
                <Image
                    roundedTop="lg"
                    h='100%'
                    w='100%'
                    fit="cover"
                    align='center'
                    src={city.img}
                    alt={city.name.city}
                />
            </AspectRatio>

            <Flex
                p={4}
                flexDirection='column'>

                <Text
                    display="block"
                    color="grey.800"
                    fontSize="2xl"
                    as='h3'
                >
                    {city.name.city}, {city.name.state}
                </Text>
                <Text
                    mt={2}
                    fontSize="sm"
                    color="grey.600"
                >
                    {city.reason}
                </Text>

                <Tabs
                    mt={4}
                    w='100%'
                    variant='soft-rounded'
                    colorScheme='orange'>
                    <TabList>
                        <Tab><Icon as={FiGlobe} mr={2}/> Quick Facts</Tab>
                        <Tab><Icon as={FiUsers} mr={2}/> People</Tab>
                        <Tab><Icon as={FiGlobe} mr={2}/> Weather</Tab>
                        {/*<Tab><Icon as={FiUsers} mr={2}/> Housing</Tab>*/}
                        <Tab><Icon as={FiUsers} mr={2}/> Fun</Tab>
                        <Tab><Icon as={FiExternalLink} mr={2}/> Links</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <QuickFacts/>
                        </TabPanel>
                        <TabPanel>
                            <People/>
                        </TabPanel>
                        <TabPanel>
                            <Weather/>
                        </TabPanel>
                        <TabPanel>
                            <Text>Here are some curated events available in this city:</Text>
                            <div data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
                                 data-gyg-locale-code="en-US" data-gyg-widget="activities" data-gyg-number-of-items="6"
                                 data-gyg-partner-id="WMCP9FD"
                                 data-gyg-q={encodeURIComponent(city.name.city + ", " + city.name.abbr)}></div>

                        </TabPanel>
                        <TabPanel>
                            <Links/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                {/*<Button*/}
                {/*    colorScheme='brand'*/}
                {/*    onClick={onOpen}*/}
                {/*    mt={4}>*/}
                {/*    More*/}
                {/*</Button>*/}
                {/*<MoreCity city={city} isOpen={isOpen} onClose={onClose}/>*/}
            </Flex>
        </Flex>
    )
}
