'use client';

import {chakra, Container, Link, Stack, Text} from '@chakra-ui/react';
import React from 'react';

export default function Footer() {
    return (
        <chakra.footer
            color={'gray.800'}>
            <Container
                as={Stack}
                maxW={'7xl'}
                color='white'
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Stack direction={'row'} spacing={6}>
                    <Link href={'#'}>Home</Link>
                    <Link href={'#'}>About</Link>
                    <Link href={'#'}>Contact</Link>
                </Stack>
                <Text as='sup'>© 2023 Digital Indy LLC.</Text>
            </Container>
        </chakra.footer>
    );
}
