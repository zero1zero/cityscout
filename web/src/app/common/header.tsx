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
import {AiFillHome, AiOutlineInbox, AiOutlineMenu,} from "react-icons/ai";
import {BsFillCameraVideoFill} from "react-icons/bs";


export default function Header() {
    const bg = "white";
    const cl = "gray.800";
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
            <Button w="full" variant="ghost" leftIcon={<AiFillHome/>}>
                Dashboard
            </Button>
            <Button
                w="full"
                variant="solid"
                leftIcon={<AiOutlineInbox/>}
            >
                Explore
            </Button>
            <Button w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill/>}>
                About
            </Button>
        </VStack>
    );
    return (
        <React.Fragment>
            <chakra.header
                h="full"
                bg={bg}
                w="full"
                px={{
                    base: 2,
                    sm: 4,
                }}
                py={4}
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <Link display="inline-flex" marginEnd={6} alignItems="center" href="/">
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            className="dark:invert"
                            width={100}
                            height={24}
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
                                    color="gray.500"
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
                            <Button
                                bg={bg}
                                color="gray.500"
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
                                About
                            </Button>
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
                            color="gray.800"
                            variant="ghost"
                            icon={<AiOutlineMenu/>}
                            onClick={mobileNav.onOpen}
                        />
                    </Box>
                </Flex>

                {MobileNavContent}
            </chakra.header>
        </React.Fragment>
    );
};


