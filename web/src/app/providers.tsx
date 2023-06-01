// app/providers.tsx
'use client'

import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider, extendTheme, ThemeConfig} from '@chakra-ui/react'

const theme: ThemeConfig = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false,
    fonts: {
        heading: 'InterVariable, sans-serif',
        body: 'InterVariable, sans-serif',
    },
    colors: {
        grey:
            {
                50: '#fbf0f2',
                100: '#dcd8d9',
                200: '#bfbfbf',
                300: '#a6a6a6',
                400: '#8c8c8c',
                500: '#737373',
                600: '#595959',
                700: '#404040',
                800: '#282626',
                900: '#150a0d',
            },
        core: {
            red: '#BF6374',
            purple: '#6B5BA6',
            blue: '#8DA1A6',
            yellow: '#F2A25C',
            orange: '#F2845C'
        },
        brand:
            {
                50: '#e3f8fb',
                100: '#cae2e5',
                200: '#adccd1',
                300: '#8fb8bd',
                400: '#71a4a9',
                500: '#578b8f',
                600: '#426c70',
                700: '#2d4d50',
                800: '#162f31',
                900: '#001215',
            }
    }
})

export function Providers({children}: {
    children: React.ReactNode
}) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                {children}
            </ChakraProvider>
        </CacheProvider>
    )
}