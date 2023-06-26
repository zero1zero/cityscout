// app/providers.tsx
'use client'

import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import React from "react";
import {TourProvider} from "@reactour/tour";

//https://huemint.com/brand-3/#palette=67a1b9-fe9064-61a992-12251f
const colors = {
    black: '#12251f',
    white: '#f4f6ff',
    gray: '#dcdcda',
    orange: "#fe9064",
    teal: '#bee5d5',
    red: '#e37063',
    yellow: '#ebac37',
    blue: "#67a1b9",
    pink: "#e0aca8",
    aqua: '#40bada',
    green: '#61a992'
};

export const theme = {
    initialColorMode: 'light',
    useSystemColorMode: false,
    fonts: {
        heading: 'InterVariable, sans-serif',
        body: 'InterVariable, sans-serif',
    },
    components: {
        Button: {}
    },
    // https://huemint.com
    //https://smart-swatch.netlify.app
    colors: {

        black: colors.black,
        white: colors.white,
        gray:

            {
                50: '#f3f3ed',
                100: '#dadad8',
                200: '#c1c1c0',
                300: '#a8a8a7',
                400: '#8f8f8e',
                500: '#767675',
                600: '#5c5c5a',
                700: '#424240',
                800: '#272725',
                900: '#0d0d05',
            },
        orange:
            {
                50: '#ffebdf',
                100: '#ffc8b0',
                200: '#ffa47f',
                300: '#fe804e',
                400: '#fd5d1c',
                500: '#e34303',
                600: '#b13301',
                700: '#802400',
                800: '#4e1400',
                900: '#1f0400',
            },
        teal:
            {
                50: '#e8faf2',
                100: '#c8e9dc',
                200: '#a7dac5',
                300: '#85cbae',
                400: '#63bc97',
                500: '#4ba37e',
                600: '#397f61',
                700: '#285b46',
                800: '#163729',
                900: '#00130d',
            },
        red:
            {
                50: '#ffe8e4',
                100: '#f7c3bc',
                200: '#ed9b92',
                300: '#e47468',
                400: '#db4e3d',
                500: '#c23424',
                600: '#97281b',
                700: '#6d1b12',
                800: '#430f09',
                900: '#1d0200',
            },
        yellow:
            {
                50: '#fff4dd',
                100: '#fae2b3',
                200: '#f4cf88',
                300: '#efbc5b',
                400: '#eaa82e',
                500: '#d18f15',
                600: '#a26f0d',
                700: '#754f08',
                800: '#473000',
                900: '#1b0f00',
            },
        blue:
            {
                50: '#e2f6ff',
                100: '#c5e0eb',
                200: '#a5cad9',
                300: '#83b3c8',
                400: '#629eb7',
                500: '#48849d',
                600: '#36677b',
                700: '#234a59',
                800: '#0f2d37',
                900: '#001217',
            },
        pink:
            {
                50: '#ffeae8',
                100: '#eec8c6',
                200: '#dea5a1',
                300: '#cf827c',
                400: '#c15f57',
                500: '#a7453d',
                600: '#833630',
                700: '#5e2621',
                800: '#391613',
                900: '#1a0503',
            },
        aqua:
            {
                50: '#ddfaff',
                100: '#b7e9f7',
                200: '#8fd9ec',
                300: '#66c9e3',
                400: '#3fbada',
                500: '#25a0c0',
                600: '#167c97',
                700: '#07596d',
                800: '#003643',
                900: '#00141a',
            },
        green:
            {
                50: '#e2f9f4',
                100: '#c7e6dc',
                200: '#a9d3c6',
                300: '#89c0af',
                400: '#6aae98',
                500: '#51957f',
                600: '#3d7463',
                700: '#2a5447',
                800: '#153329',
                900: '#00140b',
            },
        primaryFontColor: {
            lightMode: colors.gray["700"],
        },
        secondaryFontColor: {
            lightMode: colors.gray["600"],
        }
    }
}



export function Providers({children}: {
    children: React.ReactNode
}) {
    return (
        <CacheProvider>
            <ChakraProvider theme={extendTheme(theme)}>
                <TourProvider steps={[]}
                              scrollSmooth
                              padding={{
                                  mask: 3
                              }}
                              onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
                    if (steps) {
                        if (currentStep === steps.length - 1) {
                            setIsOpen(false)
                        }
                        setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
                    }
                }}
                              styles={{
                                  popover: (base) => ({
                                      ...base,
                                      '--reactour-accent': colors.aqua,
                                      borderRadius: 4,
                                  }),
                                  maskArea: (base) => ({ ...base, rx: 4 }),
                                  // maskWrapper: (base) => ({ ...base, color: '#ef5a3d' }),
                                  badge: (base) => ({ ...base, left: 'auto', right: '-0.8125em' }),
                                  // controls: (base) => ({ ...base, marginTop: 100 }),
                                  close: (base) => ({ ...base, right: 'auto', left: 8, top: 8 }),
                              }}
                >
                {children}
                </TourProvider>
            </ChakraProvider>
        </CacheProvider>
    )
}