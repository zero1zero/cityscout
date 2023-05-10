import {AbsoluteCenter, Box, chakra, CircularProgress, Flex, Icon, Stack} from "@chakra-ui/react";
import React from "react";
import {FiCloudLightning} from "react-icons/fi";

interface Props {
    moreToGo: number,
    hasCities: boolean,
    loading: boolean
}

const CallToAction = ({moreToGo}: { moreToGo: number }) => {
    return (
        <Flex
            justify="center"
            bg="white"
            _dark={{
                bg: "gray.800",
            }}
            w="full"
            shadow="base"
            rounded={[null, "md"]}
        >
            <Box
                w={{
                    base: "full",
                    md: "75%",
                    lg: "50%",
                }}
                px={4}
                py={20}
                textAlign={{
                    base: "left",
                    md: "center",
                }}
            >
                <chakra.span
                    fontSize={{
                        base: "3xl",
                        sm: "4xl",
                    }}
                    fontWeight="extrabold"
                    letterSpacing="tight"
                    lineHeight="shorter"
                    color="gray.900"
                    _dark={{
                        color: "gray.100",
                    }}
                    mb={6}
                >
                    <chakra.span display="block">
                        {moreToGo} more to go!
                    </chakra.span>
                    <chakra.p
                        mb={4}
                        fontSize="lg"
                        color="brand.600"
                        _dark={{
                            color: "gray.400",
                        }}
                        letterSpacing="wider"
                    >
                        Get your city recommendations with {moreToGo} more things you want in a city. Add them in the
                        input box above.
                    </chakra.p>
                </chakra.span>
                <Stack
                    justifyContent={{
                        base: "left",
                        md: "center",
                    }}
                    direction={{
                        base: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    mt={2}
                >
                    <Box display="inline-flex" rounded="md" shadow="md">
                        <chakra.a
                            mt={2}
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            px={5}
                            py={3}
                            border="solid transparent"
                            fontWeight="bold"
                            w="full"
                            rounded="md"
                            bg="brand.600"
                            _dark={{
                                bg: "brand.500",
                            }}
                            _hover={{
                                bg: "brand.700",
                                _dark: {
                                    bg: "brand.600",
                                },
                            }}
                        >
                            Get Recommendations
                            <Icon as={FiCloudLightning} ml={2}/>
                        </chakra.a>
                    </Box>
                </Stack>
            </Box>
        </Flex>
    )
}

export const CriteriaNeededOverlay = (props: React.PropsWithChildren<Props>) => {

    const loadingOrCTA = () => {
        if (props.loading) {
            return (
                <Flex
                    justify="center"
                    w="full"
                >
                    <CircularProgress isIndeterminate/>
                </Flex>
            )
        } else {
            return <CallToAction moreToGo={props.moreToGo}/>
        }
    }

    const blur = () => {

        if (props.hasCities && !props.loading) {
            return props.children
        }

        return (
            <>
                <AbsoluteCenter axis='both' zIndex={999} mt={10} w='50%'>
                    {loadingOrCTA()}
                </AbsoluteCenter>
                <Box filter='auto' blur='4px'>
                    {props.children}
                </Box>
            </>
        )
    }

    return (
        <>
            {blur()}
        </>
    )
}