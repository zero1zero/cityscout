import React from "react";
import {
    Button,
    chakra,
    Flex,
    FormControl,
    Grid,
    GridItem,
    HStack,
    Icon,
    Input,
    Kbd,
    Spacer,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    VStack,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import {MdClose} from "react-icons/md";
import {Criterion} from "@/model/Criterion";
import Tutorial from "@/app/explore/Tutorial";
import {FiCloudLightning, FiInfo, FiPlus} from "react-icons/fi";
import Explorer from "@/core/Explorer";

export default function Criteria({criterion, onAdd, onRemove, firstReco, onRecommend}: {
    criterion: Criterion,
    onAdd: (criteria: string) => void,
    onRemove: (criteria: string) => void,
    firstReco: boolean,
    onRecommend: () => void
}) {
    return (
        <>
            <Grid
                templateColumns='repeat(2, 1fr)'
                alignItems='center'
                gap={3}
                mx={4}
                mb={8}
            >
                <GridItem
                    h='100%'
                    mr={4}>
                    <AddCriteria onSubmit={onAdd}/>
                    <CriterionTags
                        criterion={criterion}
                        onRemove={onRemove}
                        firstReco={firstReco}
                        onRecommend={onRecommend} />
                </GridItem>
                <GridItem>
                    <Tutorial/>
                </GridItem>
            </Grid>
        </>
    )
}

const CriterionTags = ({criterion, onRemove, firstReco, onRecommend}: {
    criterion: Criterion,
    onRemove: (criteria: string) => void,
    firstReco: boolean,
    onRecommend: () => void
}) => {

    const recommendMore = () => {

        if (criterion.criterion.length > Explorer.minimumCriterion && !firstReco) {
            return (
                <Button rightIcon={<FiCloudLightning/>}
                        width='100%'
                        rounded="md" shadow="md"
                        colorScheme='brand'
                        onClick={onRecommend}>
                    Recommend Cities
                </Button>
            )
        }
    }

    const tags = () => {
        return (
            <VStack width='100%' alignItems='flex-start'>
                <Wrap>
                    {criterion.criterion.map((criteria) => (
                        <WrapItem key={'wi' + criteria}>
                            <Tag size={"lg"}
                                 variant='outline'
                                 color='brand.600'
                                 key={'t' + criteria}>
                                <TagLabel>{criteria}</TagLabel>
                                <TagCloseButton as={MdClose} color={"#ff5555"} onClick={() => onRemove(criteria)}/>
                            </Tag>
                        </WrapItem>
                    ))}
                </Wrap>
                <Spacer />
                {recommendMore()}
            </VStack>
        )
    }

    const tagsOrEmpty = () => {
        if (criterion.criterion.length == 0) {
            return (
                <VStack
                    color='grey.300'
                    alignItems='left'
                    width='100%'
                    fontSize='sm'>
                    <HStack>
                        <Icon as={FiInfo}/>
                        <Text>Start adding criteria above to get recommendations.</Text>
                    </HStack>
                    <HStack>
                        <Icon as={FiInfo}/>
                        <Text>
                            Some
                            examples: {'"access to hiking and camping", "good nightlife", "job opportunities in tech"'}
                        </Text>
                    </HStack>
                    <HStack>
                        <Icon as={FiInfo}/>
                        <Text>
                            To add multiple at once, separate each with a <Kbd>;</Kbd>
                        </Text>
                    </HStack>
                </VStack>
            )
        }

        return tags()
    }

    return (
        <Flex
            bg='white'
            rounded="md"
            shadow="md"
            minH='80%'
            my={4}
            p={4}
        >
            {tagsOrEmpty()}
        </Flex>
    )
}

const AddCriteria = ({onSubmit}: { onSubmit: (criteria: string) => void }) => {

    const submit = (event: any) => {
        event.preventDefault();
        onSubmit(event.target.criteria.value)

        event.target.criteria.value = ''
    }
    return (
        <chakra.form
            method="POST"
            autoComplete='off'
            onSubmit={submit}
        >
            <Flex>
                <FormControl>
                    <Input
                        type="text"
                        name="criteria"
                        id="criteria"
                        placeholder="What are you looking for in a City?"
                        focusBorderColor="brand.400"
                        bg='white'
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        autoComplete='off'
                        data-1p-ignore='true'
                    />
                </FormControl>

                <Spacer/>


                <Button rightIcon={<FiPlus/>}
                        rounded="md" shadow="md"
                        colorScheme='brand'
                        ml={3}
                        type='submit'>
                    Add
                </Button>
            </Flex>
        </chakra.form>
    )
}
