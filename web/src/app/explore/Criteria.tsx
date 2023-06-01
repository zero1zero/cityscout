import React from "react";
import {
    Box,
    Button,
    chakra,
    CircularProgress,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    FormControl,
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
    VStack,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import {MdClose} from "react-icons/md";
import {Criterion} from "@/model/Criterion";
import {FiCloudLightning, FiInfo, FiPlus, FiRefreshCw} from "react-icons/fi";
import Explorer from "@/core/Explorer";

export default function Criteria({criterion, loading, moreToGo, onAdd, onChange, onRemove, onRecommend}: {
    criterion: Criterion,
    loading: boolean,
    moreToGo: number
    onAdd: (criteria: string) => void,
    onChange: (last: string, next: string) => void,
    onRemove: (criteria: string) => void,
    onRecommend: () => void
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
                <Button
                    rightIcon={loading ? <CircularProgress isIndeterminate size='5'/> : <FiCloudLightning/>}
                    width='100%'
                    isDisabled={loading || !available}
                    rounded="md" shadow="sm"
                    colorScheme='brand'
                    onClick={onRecommend}>
                    Recommend Cities
                </Button>
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
            <Wrap>
                {criterion.criterion.map((criteria) => (
                    <WrapItem key={'wi' + criteria}>
                        <Tag size={"lg"}
                             variant='outline'
                             color='brand.600'
                             key={'t' + criteria}>
                            <TagLabel>
                                <Editable
                                    defaultValue={criteria}>
                                    <EditablePreview/>
                                    <EditableInput boxShadow='none !important' onBlur={onBlur} data-last={criteria}/>
                                </Editable>
                            </TagLabel>
                            <TagCloseButton as={MdClose} color={"#ff5555"} onClick={() => onRemove(criteria)}/>
                        </Tag>
                    </WrapItem>
                ))}
            </Wrap>
        )
    }

    const tips = (onSubmit: (criteria: string) => void) => {
        const items = [
            "Easy access to hiking",
            "Fun nightlife",
            "Has at least one brewery",
            "Job opportunities in tech",
            "Similar weather to San Diego",
            "1 hour from a major city",
            "Lower taxes than Portland",
            "Job opportunities in tech"
        ];
        return (
            <List
                spacing={3}
                color='grey.400'
                fontSize='sm'>
                <ListItem hidden={criterion.criterion.length > 0}>
                    <ListIcon as={FiInfo}/>
                    Start adding criteria above to get recommendations.
                </ListItem>
                <ListItem>
                    <ListIcon as={FiInfo}/>
                    Here are some examples to get you thinking:
                    <Flex
                        ml={5}
                        flexWrap="wrap">
                        {items.map((item, index) => (
                            <Box
                                mb={1}
                                width="33%"
                                key={index}>
                                <Text as={'cite'}>
                                    <IconButton
                                        aria-label='Add critieria'
                                        size='sm'
                                        onClick={() => onSubmit(item)}
                                        icon={<FiPlus/>}/> {item}
                                </Text>
                            </Box>
                        ))}
                        <Box
                            mb={1}
                            width="33%"
                            key={'LOAD-MORE'}>
                            <Text as={'b'}>
                                <IconButton
                                    aria-label='Add critieria'
                                    size='sm'
                                    onClick={() => onSubmit('LOAD-MORE')}
                                    icon={<FiRefreshCw/>}/> Load more...
                            </Text>
                        </Box>
                    </Flex>
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

    return (
        <>
            <VStack
                w={{xl: '50%', md: '80%', sm: 'full'}}
                m={4}
                bg='white'
                rounded="md"
                shadow="sm"
                alignItems='left'
                p={4}>
                <AddCriteria onSubmit={onAdd}/>
                {tags()}
                {tips(onAdd)}
                {recommendMore()}
            </VStack>
        </>
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
                    <Input
                        type="text"
                        name="criteria"
                        id="criteria"
                        autoFocus={true}
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
                        rounded="md" shadow="sm"
                        colorScheme='brand'
                        ml={3}
                        type='submit'>
                    Add
                </Button>
            </Flex>
        </chakra.form>
    )
}
