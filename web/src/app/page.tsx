'use client';

import React from "react";
import {Container} from "@chakra-ui/react";
import Hero from "@/app/home/hero";

export default function Home() {
    return (
        <Container
            h='100vh'
            maxW='7xl'>
            <Hero />
        </Container>
    )
}
