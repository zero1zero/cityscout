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
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Tooltip,
    VStack
} from "@chakra-ui/react";
import {FiExternalLink, FiGlobe, FiInfo, FiUsers} from "react-icons/fi";
import React from "react";
import {Map} from "@/app/explore/Map";
import {BarDatum, ResponsiveBar} from "@nivo/bar";
import {ResponsivePie} from "@nivo/pie";
import {animated, SpringValue, to} from '@react-spring/web'
import {theme} from '../providers'
import {DefaultTreeMapDatum, htmlNodeTransform, NodeProps, ResponsiveTreeMapHtml} from "@nivo/treemap";
import Forecast from "@/app/explore/city/Forecast";
import {ResponsiveLine} from "@nivo/line";
import CityStat from "@/app/explore/city/Stat";
import {useTheme} from "@nivo/core";

export const SourceTip = () => {
    return (
        <Tooltip label="These values were derived from 2019-2021 US Census data. Visit the About page for more info"
                 placement='right-start'>
            <Text as='sup'>
                <FiInfo/>
            </Text>
        </Tooltip>

    )
}

export default function CityCard({city}: { city: City }) {


    const populationData: BarDatum[] = [
        {
            // id: `${city.name.slug}-pop-un-18}`,
            Female: city.population.ages.female_under_18 / city.population.ages.female,
            Male: -city.population.ages.male_under_18 / city.population.ages.male,
            population: "Under 18"
        },
        {
            // id: `${city.name.slug}-pop-18-24}`,
            Female: city.population.ages.female_18_to_24 / city.population.ages.female,
            Male: -city.population.ages.male_18_to_24 / city.population.ages.male,
            population: "18 to 24"
        },
        {
            // id: `${city.name.slug}-pop-25-30}`,
            Female: city.population.ages.female_25_to_29 / city.population.ages.female,
            Male: -city.population.ages.male_25_to_29 / city.population.ages.male,
            population: "25 to 30"
        },
        {
            // id: `${city.name.slug}-pop-30-40}`,
            Female: city.population.ages.female_30_to_39 / city.population.ages.female,
            Male: -city.population.ages.male_30_to_39 / city.population.ages.male,
            population: "30 to 40"
        },
        {
            // id: `${city.name.slug}-pop-40-50}`,
            Female: city.population.ages.female_40_to_49 / city.population.ages.female,
            Male: -city.population.ages.male_40_to_49 / city.population.ages.male,
            population: "40 to 50"
        },
        {
            // id: `${city.name.slug}-pop-50-60}`,
            Female: city.population.ages.female_50_to_59 / city.population.ages.female,
            Male: -city.population.ages.male_50_to_59 / city.population.ages.male,
            population: "50 to 60"
        },
        {
            // id: `${city.name.slug}-pop-over-60}`,
            Female: city.population.ages.female_60_and_over / city.population.ages.female,
            Male: -city.population.ages.male_60_and_over / city.population.ages.male,
            population: "Over 60"
        },
    ]

    const AgeDistributionBar = () => {
        return (
            <ResponsiveBar
                data={populationData}
                colors={[
                    theme.colors.green["300"],
                    theme.colors.orange["200"]
                ]}
                indexBy='population'
                keys={['Male', 'Female']}
                enableGridX={false}
                enableGridY={true}
                padding={0.3}
                label={(d) => `${new Intl.NumberFormat('en-us', {maximumFractionDigits: 1}).format(Math.abs(d.value!! * 100))}%`}
                axisLeft={{
                    tickSize: 20,
                    tickPadding: 5,
                }}
                markers={[
                    {
                        axis: 'x',
                        value: 0,
                        lineStyle: {strokeOpacity: 0},
                        textStyle: {
                            fill: theme.colors.orange["500"],
                        },
                        legend: 'Male',
                        legendPosition: 'top-right',
                        // @ts-ignore
                        legendOffsetY: -20
                    },
                    {
                        axis: 'x',
                        value: 0,
                        lineStyle:{
                            stroke: theme.colors.red["500"],
                            strokeWidth:1 },
                        textStyle: {
                            fill: theme.colors.green["500"]
                        },
                        legend: 'Female',
                        legendPosition: 'top-left',
                        // @ts-ignore
                        legendOffsetY: -20
                    }
                ]}
                margin={{top: 30, right: 0, bottom: 0, left: 72}}
                layout="horizontal"
                tooltip={(node) => {
                    return (
                        <Text bg='white' p={2} borderWidth={2} rounded="lg" shadow="lg">
                            {new Intl.NumberFormat('en-us', {maximumFractionDigits: 1})
                                .format(Math.abs(node.value * 100))}% - {node.label}
                        </Text>
                    )
                }}
                valueFormat={v => new Intl.NumberFormat('en-us').format(Math.abs(v))}
            />
        )
    }

    const CommutePie = () => {
        const commuteData = city.population.commute
            .map((commute) => {
                return {
                    "id": commute.name,
                    "label": commute.name,
                    "value": commute.count / city.population.commute_all
                    // "color": "hsl(215, 70%, 50%)"
                }
            });
        return (
            <ResponsivePie
                data={commuteData}
                colors={[theme.colors.blue["200"],
                    theme.colors.orange["200"],
                    theme.colors.yellow["200"],
                    theme.colors.green["200"],
                    theme.colors.pink["200"],
                    theme.colors.teal["200"],
                    theme.colors.red["200"],
                    theme.colors.aqua["200"],
                ]}
                margin={{top: 10, right: 10, bottom: 10, left: 10}}
                arcLabel={(item) => `${item.id}`}
                tooltip={(node) => {
                    return (
                        <Text bg='white' p={2} borderWidth={1} rounded="lg" shadow="lg">
                            {new Intl.NumberFormat('en-us', {maximumFractionDigits: 1})
                                .format(node.datum.value * 100)}% - {node.datum.label}
                        </Text>
                    )
                }}
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
                enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={20}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{from: 'color'}}
                arcLabelsSkipAngle={25}
            />
        )
    }

    const occupationData = {
        "id": "whatever",
        "name": "nivo",
        "children": city.population.occupations.map((occupation) => {
            return {
                "id": occupation.name,
                "name": occupation.name,
                "count": occupation.count / city.population.occupation_all
            }
        })
    }

    /**
     * Pulled mostly from https://github.com/plouc/nivo/blob/master/packages/treemap/src/TreeMapHtmlNode.tsx
     */
    function CustomNode({
                            node,
                            enableLabel,
                            labelSkipSize,
                            borderWidth,
                            animatedProps
                        }: NodeProps<DefaultTreeMapDatum>) {
        const theme = useTheme()

        if (node.isParent) {
            return <></>
        }

        const htmlLabelTransform = (
            x: SpringValue<number>,
            y: SpringValue<number>,
            rotation: SpringValue<number>
        ) => to([x, y, rotation], (x, y, rotation) => `translate(${x}px,${y}px) rotate(${rotation}deg)`)

        const showLabel =
            enableLabel &&
            node.isLeaf &&
            (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize)

        return (
            <animated.div
                data-testid={`node.${node.id}`}
                id={node.path.replace(/[^\w]/gi, '-')}
                style={{
                    boxSizing: 'border-box',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: htmlNodeTransform(animatedProps.x, animatedProps.y),
                    width: animatedProps.width,
                    height: animatedProps.height,
                    borderWidth,
                    borderStyle: 'solid',
                    borderColor: node.borderColor,
                    overflow: 'hidden',
                }}
            >
                <animated.div
                    style={{
                        boxSizing: 'border-box',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: node.opacity,
                        width: animatedProps.width,
                        height: animatedProps.height,
                        background: animatedProps.color,
                    }}
                    onMouseEnter={node.onMouseEnter}
                    onMouseMove={node.onMouseMove}
                    onMouseLeave={node.onMouseLeave}
                    onClick={node.onClick}
                />
                {showLabel && (
                    <animated.span
                        data-testid={`label.${node.id}`}
                        style={{
                            ...theme.labels.text,
                            position: 'absolute',
                            display: 'flex',
                            // top: -5,
                            // left: -5,
                            padding: '6px',
                            textOverflow: 'ellipsis',
                            left: '-50%',
                            right: '50%',
                            top: '-50%',
                            bottom: '50%',
                            // width: 10,
                            // height: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // whiteSpace: 'nowrap',
                            color: node.labelTextColor,
                            transformOrigin: 'center center',
                            transform: htmlLabelTransform(
                                animatedProps.labelX,
                                animatedProps.labelY,
                                animatedProps.labelRotation
                            ),
                            opacity: animatedProps.labelOpacity,
                            pointerEvents: 'none',
                        }}
                    >
                        <Text fontSize={'xs'}>{node.label}</Text>
                    </animated.span>
                )}
            </animated.div>
        )
    }

    const OccupationHeatmap = () => {
        return (
            <ResponsiveTreeMapHtml
                data={occupationData}
                colors={[theme.colors.blue["200"],
                    theme.colors.orange["200"],
                    theme.colors.yellow["200"],
                    theme.colors.green["200"],
                    theme.colors.pink["200"],
                    theme.colors.teal["200"],
                    theme.colors.red["200"],
                    theme.colors.aqua["200"],
                ]}
                identity="name"
                value="count"
                nodeComponent={CustomNode}
                margin={{top: 10, right: 10, bottom: 10, left: 10}}
                label={(node) => node.id}
                tooltip={(node) => {
                    return (
                        <Text bg='white' p={2} borderWidth={1} rounded="lg" shadow="lg">
                            {new Intl.NumberFormat('en-us', {maximumFractionDigits: 1})
                                .format(node.node.value * 100)}% - {node.node.id}
                        </Text>
                    )
                }}
                enableParentLabel={false}
                labelSkipSize={50}
            />
        )
    }

    const weatherData = [
        {
            "id": "Average",
            "data": city.weather.monthly_means.month.map((month, index) => {
                return {
                    "x": month,
                    "y": city.weather.monthly_means.temperature_2m_mean[index]
                }
            })
        },
        {
            "id": "High",
            "data": city.weather.monthly_means.month.map((month, index) => {
                return {
                    "x": month,
                    "y": city.weather.monthly_means.temperature_2m_max[index]
                }
            })
        },
        {
            "id": "Low",
            "data": city.weather.monthly_means.month.map((month, index) => {
                return {
                    "x": month,
                    "y": city.weather.monthly_means.temperature_2m_min[index]
                }
            })
        }
    ];

    const WeatherTrend = () => (
        <ResponsiveLine
            data={weatherData}
            colors={[
                theme.colors.orange["200"],
                theme.colors.red["200"],
                theme.colors.blue["200"]
            ]}
            margin={{top: 20, right: 110, bottom: 50, left: 60}}
            xScale={{type: 'point'}}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
            }}
            tooltip={(node) => {
                return (
                    <Text bg='white' p={2} borderWidth={1} rounded="lg" shadow="lg">
                        {node.point.data.x as string} - {node.point.serieId} - {new Intl.NumberFormat('en-us', {maximumFractionDigits: 1}).format(node.point.data.y as number)}°
                    </Text>
                )
            }}
            curve="monotoneX"
            axisBottom={{
                tickPadding: 20,
                format: (value) => value.slice(0, 3)
            }}
            axisLeft={{
                format: (value) => `${value}°`
            }}
            pointSize={10}
            pointColor={{theme: 'background'}}
            pointBorderWidth={2}
            // pointLabelYOffset={-12}
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
                    <CityStat name={"Population"} value={city.population.all} change={city.population.all_change}/>
                    <CityStat name={"Median Home Price"} value={city.population.median_home_price}
                              change={city.population.median_home_price_change} pre='$'/>
                    <CityStat name={"Median Rent Price"} value={city.population.median_rent_price}
                              change={city.population.median_rent_price_change} pre='$'/>
                    <CityStat name={"Unemployment Rate"} value={city.population.unemployment_rate * 100}
                              change={city.population.unemployment_rate_change} post='%'/>
                    <CityStat name={"Days of Sun"} value={city.weather.days_of_sun}/>
                    <CityStat name={"Average Temperature"} value={city.weather.temp_mean} post={"°"}/>
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
                    <CityStat name="Median Age" value={city.population.median_age}
                              change={city.population.median_age_change}/>
                    <CityStat name="Median Income" value={city.population.median_income}
                              change={city.population.median_income_change} pre='$'/>
                    <CityStat name="Poverty Rate" value={city.population.poverty_rate * 100}
                              change={city.population.poverty_rate_change} post='%'/>
                </Flex>
                <Flex w='100%'
                      wrap='wrap'>
                    <VStack minW='50%' h={400}>
                        <Heading as='h4' size='md'>
                            How Old is Everyone?
                        </Heading>
                        <AgeDistributionBar/>
                    </VStack>
                    <VStack minW='50%' h={400} px={4}>
                        <Heading as='h4' size='md'>
                            How Do People Commute?
                        </Heading>
                        <CommutePie/>
                    </VStack>
                </Flex>
                <Flex w='100%'
                      wrap='wrap'
                      mt={5}
                      h={400}>
                    <Heading as='h4' size='md'>
                        What Does Everyone Do?
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
                    <CityStat name="High" w='25%' value={city.weather.temp_high} post='°'/>
                    <CityStat name="Low" w='25%' value={city.weather.temp_low} post='°'/>
                    <CityStat name="Rain" w='25%' value={city.weather.rain_inches} post='"'/>
                    <CityStat name="Snow" w='25%' value={city.weather.snow_inches} post='"'/>
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
                            <ListIcon as={FiExternalLink} color='blue'/>
                            Wikipedia
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link isExternal
                              href={'https://datausa.io/profile/geo/' + city.name.city.replace(/, /, '-').toLowerCase()}>
                            <ListIcon as={FiExternalLink} color='blue'/>
                            City Data
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link isExternal
                              href={'https://datausa.io/profile/geo/' + city.name.city.replace(/, /, '-').toLowerCase()}>
                            <ListIcon as={FiExternalLink} color='blue'/>
                            Census Profile
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link isExternal
                              href={'https://datausa.io/profile/geo/' + city.name.city.replace(/, /, '-').toLowerCase()}>
                            <ListIcon as={FiExternalLink} color='blue'/>
                            Current Weather
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link isExternal
                              href={'https://datausa.io/profile/geo/' + city.name.city.replace(/, /, '-').toLowerCase()}>
                            <ListIcon as={FiExternalLink} color='blue'/>
                            VRBO Rentals
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link isExternal
                              href={'https://datausa.io/profile/geo/' + city.name.city.replace(/, /, '-').toLowerCase()}>
                            <ListIcon as={FiExternalLink} color='blue'/>
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
                    color="gray.800"
                    fontSize="2xl"
                    as='h3'
                >
                    {city.name.city}, {city.name.state}
                </Text>
                <Text
                    mt={2}
                    fontSize="sm"
                    color="gray.600"
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
