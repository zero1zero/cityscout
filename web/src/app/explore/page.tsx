'use client';

import React, {useEffect, useState} from "react";
import {Grid} from "@chakra-ui/react";
import Criteria from "@/app/explore/Criteria";
import {Criterion} from "@/model/Criterion";
import CitiesCards from "@/app/explore/Cities";
import Dependencies from "@/core/Dependencies";
import {Cities} from "@/model/Cities";
import {Map} from "@/app/explore/Map";
import {CriteriaNeededOverlay} from "@/app/explore/CriteriaNeededOverlay";

const dummyCities = {
    cities: [
        {
            city: "Garbage, OR",
            reason: "Portland is known for its abundance of cafes and bars, as well as its liberal culture and access to nature with nearby parks and hiking trails. The city also offers a variety of job opportunities, particularly in the tech industry. Additionally, Portland is home to the Portland Trail Blazers basketball team.",
            img: "https://media.cntraveler.com/photos/5c002d131b3466234d813837/1:1/w_1600%2Cc_limit/GettyImages-909700234.jpg"
        },
        {
            city: "Seattle, WA",
            reason: "Seattle is a city with a thriving coffee culture and a plethora of bars and breweries. It is also known for its progressive politics and access to nature with nearby mountains and waterways. The city offers a diverse range of job opportunities, particularly in the tech industry. Additionally, Seattle is home to the Seattle Mariners baseball team.",
            img: "https://images.pexels.com/photos/3964406/pexels-photo-3964406.jpeg"
        },
        {
            city: "San Francisco",
            reason: "San Francisco is a city with a vibrant cafe and bar scene, as well as a reputation for being one of the most liberal cities in the US. It is surrounded by natural beauty, including the Golden Gate Park and nearby beaches. The city offers a variety of job opportunities, particularly in the tech industry. Additionally, San Francisco is home to the San Francisco Giants baseball team.",
            img: "https://images.pexels.com/photos/3584437/pexels-photo-3584437.jpeg"
        }
    ]
}

export default function Home() {

    const explorer = Dependencies.instance.explorer

    const [criterion, setCriterion] = useState<Criterion>({criterion: []});
    const [cities, setCities] = useState<Cities>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log("effect called")
        setLoading(true)
        explorer.explore(criterion)
            .then(cities => {
                if (cities.cities.length > 0) {
                    setCities(cities)
                }
            })
            .finally(() => setLoading(false))
    }, [criterion, explorer])

    const add = (criteria: string) => {
        if (!criteria)
            return

        setCriterion((previous) => {
            return {
                criterion: [...previous.criterion, criteria]
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

    return (
        <>
            <Criteria criterion={criterion} onAdd={add} onRemove={remove}/>
            <CriteriaNeededOverlay
                hasCities={cities != undefined}
                loading={loading}
                moreToGo={Math.abs(criterion.criterion.length - 4)}>
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    <CitiesCards cities={cities ? cities : dummyCities}/>
                    <Map cities={cities ? cities : dummyCities}/>
                </Grid>
            </CriteriaNeededOverlay>
        </>
    )
}
