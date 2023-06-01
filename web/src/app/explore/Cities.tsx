import {Box, Flex, HStack, Text, TextProps} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {Cities} from "@/model/Cities";
import CityCard from "@/app/explore/City";


export default function CityCards({cities, onSelected}: { cities: Cities, onSelected: (selected: number) => void }) {
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
        bg: "#3e3e3e",
        opacity: 0.2,
        _hover: {
            opacity: 0.8,
            bg: "black",
        },
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        onSelected(currentSlide)
    }, [currentSlide, onSelected])

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
            flexDirection='column'
            mb={10}
        >
            <Flex w="full"
                  overflow="hidden"
                  pos="relative">
                <Flex w="full" {...carouselStyle}>
                    {cities.cities.map((city, index) => (
                        <Box key={`slide-${city.name.city}`}
                             boxSize="full"
                             flex="none"
                        >
                            <Text
                                color="white"
                                fontSize="xl"
                                fontWeight='bold'
                                p="8px 30px"
                                pos="absolute"
                                top="0">
                                {index + 1} / {cities.cities.length}
                            </Text>
                            <CityCard city={city} key={city.name.city}/>
                        </Box>
                    ))}
                </Flex>
                <Text {...arrowStyles} left="0" onClick={prevSlide} hidden={currentSlide == 0}>
                    &#10094;
                </Text>
                <Text {...arrowStyles} right="0" onClick={nextSlide} hidden={currentSlide == cities.cities.length - 1}>
                    &#10095;
                </Text>
            </Flex>
            <HStack
                justify="center"
                my={4}
                w="full">
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
    );
}

