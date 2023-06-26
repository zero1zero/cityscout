import React, {useEffect} from "react";
import {
    Box,
    Button,
    chakra,
    CircularProgress,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    FormControl, HStack,
    IconButton,
    Input,
    Kbd,
    List,
    ListIcon,
    ListItem,
    Spacer,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    VStack
} from "@chakra-ui/react";
import {Criterion} from "@/model/Criterion";
import {FiCloudLightning, FiInfo, FiPlus, FiRefreshCw, FiX} from "react-icons/fi";
import Explorer from "@/core/Explorer";


export default function Criteria({criterion, loading, moreToGo, onAdd, onChange, onRemove, onRecommend, tips}: {
    criterion: Criterion,
    loading: boolean,
    moreToGo: number
    onAdd: (criteria: string) => void,
    onChange: (last: string, next: string) => void,
    onRemove: (criteria: string) => void,
    onRecommend: () => void,
    tips: string[]
}) {

    const recommendMore = () => {
        const available = criterion.criterion.length > Explorer.minimumCriterion

        const xMore = () => {
            if (moreToGo > 0)
                return (<Text>Add <Text as='b'>{moreToGo}</Text> more criteria to get city recommendations!</Text>)
        }

        return (
            <VStack
                pt={5}
                width='100%'>
                {xMore()}
                <Box className='step4' w='100%'>
                <Button
                    leftIcon={loading ? <CircularProgress isIndeterminate size='5'/> : <FiCloudLightning/>}
                    width='100%'
                    isDisabled={loading || !available}
                    rounded="md" shadow="sm"
                    colorScheme='orange'
                    color='white'
                    onClick={onRecommend}>
                    Recommend Cities
                </Button>
                </Box>
            </VStack>
        )
    }

    const tags = () => {
        const onBlur = (event: any) => {
            const newTag = event.target.value;
            const lastTag = event.currentTarget.getAttribute("data-last");
            event.currentTarget.setAttribute("data-last", newTag);
            onChange(lastTag, newTag)
        }

        return (
            <Flex
                flexDirection='row'
                flexWrap='wrap'
                overflow='hidden'
                >

                {criterion.criterion.map((criteria, index) => (
                    <Flex
                        pr={1}
                        key={'wi' + criteria}>
                        <Tag size={"lg"}
                             variant='outline'
                             color='blue.700'
                             pl={1}
                             mb={2}
                             key={'t' + criteria}>
                            <TagCloseButton
                                style={{marginInlineStart: 0, marginInlineEnd: 3}}
                                w={5}
                                as={FiX} color='red' onClick={() => onRemove(criteria)}/>
                            {/*<Button*/}
                            {/*    as={FiEdit} color='blue'*/}
                            {/*    backgroundColor='transparent'*/}
                            {/*    w={5}*/}
                            {/*    p={0}*/}
                            {/*    onClick={() => onRemove(criteria)}/>*/}
                            <Text>{index + 1}.&nbsp;</Text>
                            <TagLabel>
                                <Editable
                                    defaultValue={criteria}>
                                    <EditablePreview/>
                                    <EditableInput
                                        boxShadow='none !important' onBlur={onBlur} data-last={criteria}/>
                                </Editable>
                            </TagLabel>
                        </Tag>
                    </Flex>
                ))}
            </Flex>
        )
    }

    const tipsList = (onSubmit: (criteria: string) => void) => {
        return (
            <List
                spacing={3}
                color='gray.600'
                fontSize='sm'>
                <ListItem hidden={criterion.criterion.length > 0}>
                    <ListIcon as={FiInfo}/>
                    Start adding criteria above to get recommendations.
                </ListItem>
                <ListItem>
                    <ListIcon as={FiInfo}/>
                    Here are some examples to get you thinking:
                    <Box className="step3">
                    <Flex
                        ml={5}
                        flexWrap="wrap">
                        {tips
                            .slice(0, 8)
                            .map((item, index) => (
                                <Box
                                    mb={1}
                                    width="33%"
                                    key={index}>
                                    <HStack>
                                        <IconButton
                                            aria-label='Add critieria'
                                            size='sm'
                                            variant='outline'
                                            onClick={() => onSubmit(item)}
                                            icon={<FiPlus/>}/>
                                        <Text as={'cite'}>
                                            {item}
                                        </Text>
                                    </HStack>
                                </Box>
                            ))}
                        <Box
                            mb={1}
                            width="33%"
                            key={'LOAD-MORE'}>
                            <Button
                                aria-label='Add critieria'
                                size='sm'
                                variant='ghost'
                                onClick={() => onSubmit('LOAD-MORE')}
                                leftIcon={<FiRefreshCw/>}>Load more...</Button>
                        </Box>
                    </Flex>
                    </Box>
                </ListItem>
                <ListItem>
                    <ListIcon as={FiInfo}/>
                    To add multiple at once, separate each with a <Kbd>;</Kbd>
                </ListItem>
                <ListItem>
                    <ListIcon as={FiInfo}/>
                    Click on any existing criteria to edit the value without re-adding
                </ListItem>
            </List>
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
                width='100%'
                mb={3}
            >
                <Flex>
                    <FormControl>
                        <Box className="step1">
                        <Input
                            type="text"
                            name="criteria"
                            id="criteria"
                            autoFocus={true}
                            placeholder="What are you looking for in a City?"
                            focusBorderColor="blue.500"
                            bg='white'
                            shadow="sm"
                            size="md"
                            w="full"
                            rounded="md"
                            autoComplete='off'
                            data-1p-ignore='true'
                        />
                        </Box>
                    </FormControl>

                    <Spacer/>

                    <Box className="step2">
                    <Button leftIcon={<FiPlus/>}
                            rounded="md" shadow="sm"
                            colorScheme='orange'
                            color='white'
                            ml={3}
                            type='submit'>
                        Add
                    </Button>
                    </Box>
                </Flex>
            </chakra.form>
        )
    }

    return (
        <>
            <VStack
                m={4}
                bg='white'
                borderWidth='1px'
                w={{xl: '70%', md: '80%', sm: 'full'}}
                rounded="md"
                shadow="lg"
                alignItems='left'
                p={4}>
                <AddCriteria onSubmit={onAdd}/>
                {tags()}
                {tipsList(onAdd)}
                {recommendMore()}
            </VStack>
        </>
    )
}
