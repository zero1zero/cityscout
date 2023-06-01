'use client';

import {Center, chakra, Flex, Icon, Image, Link} from '@chakra-ui/react';
import React from 'react';
import {FiMail} from "react-icons/fi";

export default function Footer() {
    return (
        <Flex
            w="full"
            position='absolute'
            bottom='0'
            as="footer"
            flexDir={{
                base: "column",
                sm: "row",
            }}
            align="center"
            justify="space-between"
            px="6"
            py="4"
            bg="white"
        >
            <Image
                src="/icon.svg"
                alt="CITYSCOUT"
                width={27}
                height={27}
            />

            <chakra.p
                py={{
                    base: "2",
                    sm: "0",
                }}
                fontSize={'sm'}
                color="grey.500"
            >
                Digital Indy LLC.
            </chakra.p>

            <Flex mx="-2">
                <Link
                    href="mailto:zack@digitalindy.co"
                    color="grey.600"
                    _hover={{
                        color: "grey.500",
                    }}
                    aria-label="Email"
                >
                    <Center>
                        <Icon as={FiMail}/>
                    </Center>
                </Link>

            </Flex>
        </Flex>
    );
}
