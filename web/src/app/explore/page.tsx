'use client';

import React, {useCallback, useEffect, useState} from "react";
import {Box, Flex, VStack} from "@chakra-ui/react";
import Criteria from "@/app/explore/Criteria";
import {Criterion} from "@/model/Criterion";
import Dependencies from "@/core/Dependencies";
import {Cities} from "@/model/Cities";
import Explorer from "@/core/Explorer";
import CityCard from "@/app/explore/City";
import Header from "@/app/common/header";
import Footer from "@/app/common/footer";
import tipset from './tips.json'
import {TourProvider, useTour} from "@reactour/tour";

export default function Home() {

    const explorer = Dependencies.instance.explorer

    const [criterion, setCriterion] = useState<Criterion>({criterion: []});
    const [cities, setCities] = useState<Cities>()
    const [loading, setLoading] = useState(false)

    const [tips, setTips] = useState(tipset)

    const { isOpen, currentStep, setIsOpen, setCurrentStep,setSteps } = useTour()

    useEffect(() => {

        setSteps!!([
            {
            selector: '.step1',
            content: 'First things first, let\'s make a short list of what you want in a place to live or travel.',
        },
            {
                selector: '.step2',
                content: 'Click add after entering each term, or just press "enter"',
            },
            {
                selector: '.step3',
                content: 'Having trouble thinking of what you like? Here are some example criteria to get you started. Press the Load More button to refresh the list.',
            },
            {
                selector: '.step4',
                content: 'After you have a few criteria, click "Recommend Cities" to get a few places that best match what you\'re looking for',
            },
        ])
        setIsOpen(true)
    }, [setIsOpen, setSteps])

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
            const shuffled = Object.assign([], tips)
                .filter(tip => !criterion.criterion.includes(tip))

            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            setTips(shuffled)
            return
        }

        //TODO maybe alert user they're trying to add twice
        if (criterion.criterion.includes(criteria)) {
            return
        }

        //remove the one added from the list
        const newTips = Object.assign([], tips)
            .filter(tip => tip != criteria)
        setTips(newTips)

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
                tips={tips}
            />
        )
    }

    const citiesBlock = () => {
        const critPlusCities = () => {

            if (!cities) {
                return criteria()
            }

            return (
                <>
                    {criteria()}
                    <Flex
                        flexDirection='column'
                        alignItems='center'
                        w={{xl: '70%', md: '80%', sm: 'full'}}
                        pb={20}
                    >
                        {cities.cities.map((city, index) => (
                            <CityCard key={`${city}-${index}`} city={city}/>
                        ))}
                    </Flex>
                </>
            )
        }

        const critheight = cities ? '100%' : '100vh'

        return (
            <Box
                h={critheight}>
                <Flex
                    flexDirection='column'
                    justifyContent='space-between'
                    margin='0 auto'
                    maxW='7xl'
                    h='100%'>
                    <Header/>
                        <VStack>
                            {critPlusCities()}
                        </VStack>
                    <Footer/>
                </Flex>
            </Box>
        )
    }

    return (citiesBlock())
}
