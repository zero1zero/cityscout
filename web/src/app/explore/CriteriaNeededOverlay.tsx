import {AbsoluteCenter, Box, Center, chakra, CircularProgress, Flex, Heading, Text} from "@chakra-ui/react";
import React from "react";

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
            w="full"
            shadow="base"
            rounded={[null, "md"]}
        >
            <Box
                w={{
                    base: "full",
                }}
                px={4}
                py={10}
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
                    mb={6}
                >
                    <Heading as='h3' size='xl'>
                        <Text as='i'>{moreToGo}</Text> more to go!
                    </Heading>
                    <chakra.p
                        mb={4}
                        fontSize="md"
                        color="brand.500"
                        letterSpacing="wider"
                    >
                        You{"'"}re only <Text as='i'>{moreToGo}</Text> more criteria away from your city
                        recommendations.
                        <br/>
                        Add them above in the box that says: <Text color={'grey.400'} fontWeight='normal' as='cite'>What
                        are you looking for in a city?</Text>
                    </chakra.p>
                </chakra.span>
            </Box>
        </Flex>
    )
}

export const CriteriaNeededOverlay = (props: React.PropsWithChildren<Props>) => {

    const loadingOrCTA = () => {
        if (props.loading) {
            return (
                <Center>
                    <CircularProgress isIndeterminate/>
                </Center>
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
                <Box filter='auto' blur='0px' //not sure why you need this blur 0 but it works
                     width='100%'
                >
                    <Box filter='auto' blur='4px'>
                        {props.children}
                    </Box>
                    <AbsoluteCenter axis='both'>
                        {loadingOrCTA()}
                    </AbsoluteCenter>
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