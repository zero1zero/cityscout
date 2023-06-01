'use client';

import './common/globals.css'
import * as React from 'react';
import {Providers} from "@/app/providers";
import Header from "@/app/common/header";
import Footer from "@/app/common/footer";

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <title>CityScout</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/favico/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favico/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favico/favicon-16x16.png"/>
            <link rel="manifest" href="/favico/site.webmanifest"/>

            <script async defer src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
                    data-gyg-partner-id="WMCP9FD"></script>
        </head>
        <body>
        <Providers>
            <Header/>
            {children}

            <Footer/>
        </Providers>
        </body>
        </html>
    )
}
