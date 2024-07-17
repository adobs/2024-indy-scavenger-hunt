import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  Divider,
  VStack
} from '@chakra-ui/react'

export const Instructions = () => {
    return (
      <>
    
        <Modal isOpen={true} onClose={() => {}}>
          <ModalOverlay />
          <ModalContent backgroundColor="rgba(6, 12, 12, 0)" color="white" maxW="none">
            <ModalBody>
              <VStack spacing={4} alignContent="center">
                <Text fontSize="3xl"><b>Awesomeness! Way to go, Indy😎!</b></Text>
                <Text fontSize="xl">Your reward: a gift card to the Minecraft store</Text>
                <Divider />
                <Text fontSize="xl">But the scavenger hunt isn't over yet - there's more to find!</Text>
                <Text fontSize="xl"><b>Hint:</b> Have you read the book <b><i>INSERT BOOK</i></b>?</Text>
              </VStack>
            </ModalBody>
            </ModalContent>
        </Modal>
      </>
    )
}