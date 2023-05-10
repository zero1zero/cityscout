'use client';

import './common/globals.css'
import {Inter} from 'next/font/google'
import * as React from 'react';
import {Box} from '@chakra-ui/react'
import {Providers} from "@/app/providers";
import Header from "@/app/common/header";
import Footer from "@/app/common/footer";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <title>cityscout</title>
            <style jsx global>
                {`
                  :root {
                    --font-inter: ${inter.style.fontFamily};
                  }
                `}
            </style>
        </head>
        <body>
        <Providers>
            <Header/>
            <Box p='2' bg="#edf3f8">
                {children}
            </Box>
            <Footer/>
        </Providers>
        </body>
        </html>
    )
}
