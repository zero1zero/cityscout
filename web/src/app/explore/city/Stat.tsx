import {HStack, Stat, StatHelpText, StatLabel, StatNumber, Text} from "@chakra-ui/react";
import React from "react";
import {FiArrowDown, FiArrowRight, FiArrowUp} from "react-icons/fi";
import {SourceTip} from "@/app/explore/City";

export default function CityStat({name, value, change, pre, post, w}:
                                     {
                                         name: string,
                                         value: number,
                                         change?: number,
                                         pre?: string,
                                         post?: string,
                                         w?: string
                                     }) {

    const helpline = (change?: number) => {
        if (change == undefined) {
            return <StatHelpText>&nbsp;</StatHelpText>
        }

        const arrow = () => {
            if (change > 0) {
                return <FiArrowUp color='green'/>
            }

            if (change == 0) {
                return <FiArrowRight color='grey'/>
            }

            if (change < 0) {
                return <FiArrowDown color='red'/>
            }
        }

        return (
            <StatHelpText>
                <HStack>
                    {arrow()}
                    <Text
                        style={{marginInlineStart: 0}}>{new Intl.NumberFormat('en-us', {maximumFractionDigits: 1}).format(change)}%</Text>
                </HStack>
            </StatHelpText>
        )
    }

    const width = w == undefined ? '33%' : w

    return (
        <Stat
            minW={width}>
            <StatLabel>
                <HStack>
                    <Text>{name}</Text>
                    <SourceTip/>
                </HStack>
            </StatLabel>
            <StatNumber>
                {pre}{new Intl.NumberFormat('en-us', {maximumFractionDigits: 1}).format(value)}{post}
            </StatNumber>
            {helpline(change)}
        </Stat>
    )

}
