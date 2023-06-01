'use client';

import React, {useCallback, useState} from "react";
import {Box, Center, Flex, VStack} from "@chakra-ui/react";
import Criteria from "@/app/explore/Criteria";
import {Criterion} from "@/model/Criterion";
import Dependencies from "@/core/Dependencies";
import {Cities} from "@/model/Cities";
import Explorer from "@/core/Explorer";
import CityCard from "@/app/explore/City";

export default function Home() {

    const explorer = Dependencies.instance.explorer

    const [criterion, setCriterion] = useState<Criterion>({criterion: []});
    const [cities, setCities] = useState<Cities>()
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState<number>(0)

    const updateRecommendations = useCallback(() => {
        setLoading(true)
        explorer.explore(criterion)
            .then(cities => {
                setCities(cities)
            })
            .finally(() => setLoading(false))
    }, [explorer, criterion])

    const add = (criteria: string) => {
        if (!criteria)
            return

        if (criteria == "LOAD-MORE") {
            return
        }

        setCriterion((previous) => {
            return {
                criterion: [...previous.criterion, criteria]
            }
        })
    }

    const change = (last: string, next: string) => {
        if (last == next) {
            return
        }

        setCriterion((previous) => {
            const index: number = previous.criterion
                .findIndex(value => value == last)

            previous.criterion.splice(index, 1, next)

            return {
                criterion: [...previous.criterion]
            }
        })
    }

    const remove = (criteria: string) => {
        setCriterion((previous) => {
            return {
                criterion: previous.criterion
                    .filter(value => value != criteria)
            }
        })
    }

    const criteria = () => {
        return (
            <Criteria
                loading={loading}
                criterion={criterion}
                moreToGo={Explorer.minimumCriterion - criterion.criterion.length + 1}
                onAdd={add}
                onChange={change}
                onRemove={remove}
                onRecommend={updateRecommendations}
            />
        )
    }

    const onSelected = (city: number) => {
        setSelected(city)
    }

    const citiesBlock = () => {
        if (!cities) {
            return (
                <Center
                    h='100vh'
                    id='bg-simple'
                    w='full'>
                    {criteria()}
                </Center>
            )
        }

        return (
            <>
                <VStack
                    pt={20}
                >
                    {criteria()}
                    <Flex
                        flexDirection='column'
                        alignItems='center'
                        pb={20}
                    >
                        {cities.cities.map((city, index) => (
                            <CityCard key={`${city}-${index}`} city={city}/>
                        ))}
                    </Flex>
                </VStack>
                <Box id='bg-bottom'>
                    <Box id='bg'/>
                </Box>
            </>
        )
    }

    return (citiesBlock())
}
