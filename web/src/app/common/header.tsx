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
    const cl = "gray.200";
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
            backgroundColor='white'
            spacing={3}
            rounded="sm"
            shadow="sm"
        >
            <CloseButton
                aria-label="Close menu"
                justifySelf="self-start"
                onClick={mobileNav.onClose}
            />
            <Link as={NextLink} href='../explore'>
                <Button
                    w="full">
                    Explore
                </Button>
            </Link>
        </VStack>
    );
    return (
        <chakra.header
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
                        <Link as={NextLink} href='../explore'>
                            <Button
                                color="white"
                                display="inline-flex"
                                backgroundColor='transparent'
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
                        <Link as={NextLink} href='../explore'>
                            <Button
                                color="white"
                                backgroundColor='transparent'
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
                            variant="ghost"
                            color='white'
                            _hover={{
                                color: cl,
                            }}
                            size="sm">
                            Sign in
                        </Button>
                        <Button
                            variant="solid"
                            colorScheme='orange'
                            color='white'
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
                        color="gray.800"
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


