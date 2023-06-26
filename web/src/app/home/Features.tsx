import {ReactElement} from 'react';
import {Box, Flex, Icon, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import {FcAssistant, FcDonate, FcInTransit} from 'react-icons/fc';

interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'white'}
                margin='0 auto'
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600}
                  color='white'>{title}</Text>
            <Text color={'white'}>{text}</Text>
        </Stack>
    );
};

export default function Features() {
    return (
        <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Feature
                    icon={<Icon as={FcAssistant} w={10} h={10} />}
                    title={'Lifetime Support'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <Feature
                    icon={<Icon as={FcDonate} w={10} h={10} />}
                    title={'Unlimited Donations'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <Feature
                    icon={<Icon as={FcInTransit} w={10} h={10} />}
                    title={'Instant Delivery'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
            </SimpleGrid>
        </Box>
    );
}
