'use client';

import React from "react";
import Image from 'next/image'
import NextLink from 'next/link'
import {
    Box,
    Button,
    chakra,
    CloseButton,
    Flex,
    HStack,
    IconButton,
    Link,
    Spacer,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import {AiOutlineMenu,} from "react-icons/ai";


export default function Header() {
    const bg = "white";
    const cl = "grey.800";
    const mobileNav = useDisclosure();

    const MobileNavContent = (
        <VStack
            pos="absolute"
            top={0}
            left={0}
            right={0}
            display={mobileNav.isOpen ? "flex" : "none"}
            flexDirection="column"
            p={2}
            pb={4}
            m={2}
            bg={bg}
            spacing={3}
            rounded="sm"
            shadow="sm"
        >
            <CloseButton
                aria-label="Close menu"
                justifySelf="self-start"
                onClick={mobileNav.onClose}
            />
            <Link as={NextLink} href='/explore'>
                <Button
                    w="full">
                    Explore
                </Button>
            </Link>
        </VStack>
    );
    return (
        <chakra.header
            bg={bg}
            pos="absolute"
            top={0}
            width='full'
            px={{
                base: 2,
                sm: 4,
            }}
            py={4}
        >
            <Flex alignItems="center" justifyContent="space-between" mx="auto">
                <Link display="inline-flex" marginEnd={6} alignItems="center" as={NextLink} href="/">
                    <Image
                        src="/logo.svg"
                        alt="CITYSCOUT"
                        width={150}
                        height={100}
                        priority
                    />
                </Link>
                <Box
                    display={{
                        base: "none",
                        md: "inline-flex",
                    }}
                >
                    <HStack spacing={1}>
                        <Link as={NextLink} href='/explore'>
                            <Button
                                bg={bg}
                                color="grey.500"
                                display="inline-flex"
                                alignItems="center"
                                fontSize="md"
                                _hover={{
                                    color: cl,
                                }}
                                _focus={{
                                    boxShadow: "none",
                                }}
                            >
                                Explore
                            </Button>
                        </Link>
                        <Link as={NextLink} href='/explore'>
                            <Button
                                bg={bg}
                                color="grey.500"
                                display="inline-flex"
                                alignItems="center"
                                fontSize="md"
                                _hover={{
                                    color: cl,
                                }}
                                _focus={{
                                    boxShadow: "none",
                                }}
                            >
                                Search
                            </Button>
                        </Link>
                    </HStack>
                </Box>
                <Spacer/>
                <Box display="flex" alignItems="center">
                    <HStack spacing={1}>
                        <Button
                            color="current"
                            variant="ghost"
                            size="sm">
                            Sign in
                        </Button>
                        <Button
                            color="current"
                            variant="solid"
                            size="sm">
                            Sign up
                        </Button>
                    </HStack>
                    <IconButton
                        display={{
                            base: "flex",
                            md: "none",
                        }}
                        aria-label="Open menu"
                        fontSize="20px"
                        color="grey.800"
                        variant="ghost"
                        icon={<AiOutlineMenu/>}
                        onClick={mobileNav.onOpen}
                    />
                </Box>
            </Flex>

            {MobileNavContent}
        </chakra.header>
    );
};


