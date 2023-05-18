'use client';

import './common/globals.css'
import * as React from 'react';
import {Box} from '@chakra-ui/react'
import {Providers} from "@/app/providers";
import Header from "@/app/common/header";
import Footer from "@/app/common/footer";

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <title>cityscout</title>
        </head>
        <body>
        <Providers>
            <Header/>
            <Box
                p='2'
                bg="#edf3f8">
                {children}
            </Box>
            <Footer/>
        </Providers>
        </body>
        </html>
    )
}
