import React from "react";
import {
    Button,
    chakra,
    Flex,
    FormControl,
    GridItem,
    HStack,
    Input,
    Tag,
    TagCloseButton,
    TagLabel,
    VStack
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {MdClose} from "react-icons/md";
import {Criterion} from "@/model/Criterion";

export default function Criteria({criterion, onAdd, onRemove}: {
    criterion: Criterion,
    onAdd: (criteria: string) => void,
    onRemove: (criteria: string) => void
}) {

    return (
        <>
            <VStack
                p={4}
                bg="white"
                shadow="base"
                rounded={[null, "md"]}
                alignItems="center"
                spacing={6}
                mb={4}
            >
                <AddCriteria onSubmit={onAdd}/>
                <CriterionTags criterion={criterion} onRemove={onRemove}/>
            </VStack>
        </>
    )
}

const CriterionTags = ({criterion, onRemove}: { criterion: Criterion, onRemove: (criteria: string) => void }) => {

    return (
        <HStack width='100%'>
            {criterion.criterion.map((criteria) => (
                <Tag size={"lg"} variant='outline' colorScheme='blue' key={criteria}>
                    <TagLabel>{criteria}</TagLabel>
                    <TagCloseButton as={MdClose} color={"#ff5555"} onClick={() => onRemove(criteria)}/>
                </Tag>
            ))}
        </HStack>
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
        >
            <Flex gap={2}>
                <FormControl as={GridItem}>
                    <Input
                        type="text"
                        name="criteria"
                        id="criteria"
                        placeholder="What are you looking for in a City?"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        autoComplete='off'
                        data-1p-ignore='true'
                    />
                </FormControl>

                <FormControl as={GridItem}>
                    <Button leftIcon={<AddIcon/>} colorScheme='teal' variant='solid' type='submit'>
                        Add
                    </Button>
                </FormControl>
            </Flex>
        </chakra.form>
    )
}
