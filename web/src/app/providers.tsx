// app/providers.tsx
'use client'

import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider, extendTheme, ThemeConfig} from '@chakra-ui/react'

const theme: ThemeConfig = extendTheme({
    fonts: {
        heading: 'var(--font-inter)',
        body: 'var(--font-inter)',
    },
    initialColorMode: 'light',
    useSystemColorMode: false,
})

export function Providers({children}: {
    children: React.ReactNode
}) {
    return (
        <CacheProvider>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </CacheProvider>
    )
}