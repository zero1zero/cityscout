import {Box, chakra, Flex, HStack, Image, Link, Text, TextProps} from "@chakra-ui/react";
import React, {useState} from "react";
import {Cities} from "@/model/Cities";
import {City} from "@/model/City";


const CityCards = ({cities}: { cities: Cities }) => {
    const arrowStyles: TextProps = {
        cursor: "pointer",
        pos: "absolute",
        top: "50%",
        w: "auto",
        mt: "-22px",
        p: "16px",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        transition: "0.6s ease",
        borderRadius: "0 3px 3px 0",
        userSelect: "none",
        _hover: {
            opacity: 0.8,
            bg: "black",
        },
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? cities.cities.length - 1 : s - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((s) => (s === cities.cities.length - 1 ? 0 : s + 1));
    };

    const setSlide = (slide: number) => {
        setCurrentSlide(slide);
    };

    const carouselStyle = {
        transition: "all .5s",
        ml: `-${currentSlide * 100}%`,
    };
    return (
        <Flex
            w="full"
            bg="#edf3f8"
            _dark={{
                bg: "#3e3e3e",
            }}
            alignItems="center"
            justifyContent="center"
        >
            <Flex w="full" overflow="hidden" pos="relative">
                <Flex h="500px" w="full" {...carouselStyle}>
                    {cities.cities.map((city) => (
                        <Box key={`slide-${city.city}`} boxSize="full" flex="none">
                            <Text
                                color="white"
                                fontSize="xs"
                                p="8px 12px"
                                pos="absolute"
                                top="0"
                            >
                                {/*{sid + 1} / {slidesCount}*/}
                                10
                            </Text>
                            <CityCard city={city} key={city.city}/>
                        </Box>
                    ))}
                </Flex>
                <Text {...arrowStyles} left="0" onClick={prevSlide}>
                    &#10094;
                </Text>
                <Text {...arrowStyles} right="0" onClick={nextSlide}>
                    &#10095;
                </Text>
                <HStack justify="center" pos="absolute" bottom="8px" w="full">
                    {Array.from({
                        length: cities.cities.length,
                    }).map((_, slide) => (
                        <Box
                            key={`dots-${slide}`}
                            cursor="pointer"
                            boxSize={["7px", null, "15px"]}
                            m="0 2px"
                            bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
                            rounded="50%"
                            display="inline-block"
                            transition="background-color 0.6s ease"
                            _hover={{
                                bg: "blackAlpha.800",
                            }}
                            onClick={() => setSlide(slide)}
                        ></Box>
                    ))}
                </HStack>
            </Flex>
        </Flex>
    );
}

const CityCard = ({city}: { city: City }) => {
    return (
        <Flex
            bg="#edf3f8"
            _dark={{
                bg: "#3e3e3e",
            }}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                mx="auto"
                rounded="lg"
                shadow="md"
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
                maxW="2xl"
            >
                <Image
                    roundedTop="lg"
                    w="full"
                    h={64}
                    fit="cover"
                    src={city.img}
                    alt="Article"
                />

                <Box p={4}>
                    <Box>
                        <Link
                            display="block"
                            color="gray.800"
                            _dark={{
                                color: "white",
                            }}
                            fontWeight="bold"
                            fontSize="2xl"
                            _hover={{
                                color: "gray.600",
                                textDecor: "underline",
                            }}
                        >
                            {city.city}
                        </Link>
                        <chakra.p
                            mt={2}
                            fontSize="sm"
                            color="gray.600"
                            _dark={{
                                color: "gray.400",
                            }}
                        >
                            {city.reason}
                        </chakra.p>
                    </Box>

                    <Box mt={4}>
                        <Flex alignItems="center">
                            <chakra.span
                                mx={1}
                                fontSize="sm"
                                color="gray.600"
                                _dark={{
                                    color: "gray.300",
                                }}
                            >
                                21 SEP 2015
                            </chakra.span>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Flex>
    )
}

export default function CitiesLayout({cities}: { cities: Cities }) {
    return (
        <CityCards cities={cities}/>
    )
}
