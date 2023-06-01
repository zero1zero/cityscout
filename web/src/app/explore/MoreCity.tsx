import {City} from "@/model/City";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import React from "react";
import {Button, Text} from "@chakra-ui/react";

export default function MoreCity({city, isOpen, onClose}: { city: City, isOpen: boolean, onClose: () => void }) {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='3xl'
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{city.name.city}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {/*<Text fontSize='xl'>Why did we pick this city for you?</Text>*/}
                    <Text>
                        San Francisco, a vibrant city on the coast of northern California, is undeniably one of the most
                        picturesque and culturally diverse cities in the United States. Known for its iconic landmarks,
                        such as the Golden Gate Bridge, Alcatraz Island, and the historic cable cars, the city offers an
                        impressive array of sights and activities for locals and visitors alike. Its famed skyline,
                        consisting of soaring skyscrapers and charming Victorian homes, is a testament to the citys
                        harmonious coexistence of modernity and tradition. Furthermore, San Franciscos pleasant
                        Mediterranean climate, with its mild temperatures and frequent fog, makes it an ideal
                        destination for those who enjoy a temperate weather all year round.
                        <br/>
                        <br/>
                        Another aspect that sets San Francisco apart is its incredible cultural scene. The city is a
                        melting pot of different cultures and backgrounds, which translates into a rich array of
                        world-class museums, art galleries, and performing arts venues. From the renowned San Francisco
                        Museum of Modern Art to the historic Orpheum Theatre, there is no shortage of cultural
                        experiences to be enjoyed. Additionally, its status as a tech hub means that San Francisco is
                        always pulsating with innovation and creativity, which has a direct impact on the citys overall
                        energy and resources.
                        <br/>
                        <br/>
                        <div data-gyg-widget="auto" data-gyg-partner-id="WMCP9FD"></div>
                    </Text>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
