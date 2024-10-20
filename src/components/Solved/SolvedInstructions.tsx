import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Button,
  Divider,
  VStack,
  Link
} from '@chakra-ui/react'

export const SolvedInstructions = () => {
    return (
      <>
    
        <Modal isOpen={true} onClose={() => {}}>
          <ModalOverlay />
          <ModalContent backgroundColor="rgba(6, 12, 12, 0)" color="white" maxW="none">
            <ModalBody>
              <VStack spacing={8}>
              <VStack spacing={6} alignContent="center">
                <Text fontSize="3xl"><b>Awesomeness! Way to go, Indy😎!</b></Text>
                <Text fontSize="2xl">Your reward: a $25 gift card to the Minecraft store</Text>
                <Link href="https://checkout.shopify.com/gift_cards/26648412351/718e3a48f5e2f3cde7f55dc4ed3d5f8e" target="_blank" _hover={{ textDecoration: 'none' }}>
                <Button>Click for gift card</Button>
                </Link>
                <Text fontSize="md">(Don't worry, Mom has this info in her email)</Text>
                </VStack>
                <Divider />
                <VStack>
                  <Text fontSize="2xl">But wait!  Could there be even MORE?</Text>
                  <Text fontSize="2xl">YES! Additional fun and prizes galore!</Text>
                <Text fontSize="2xl">Scavenger hunt continues once you look</Text>
                <Text fontSize="2xl">In <b><i>The Sesame Street Library</i></b> book</Text>
              </VStack>
              </VStack>
            </ModalBody>
            </ModalContent>
        </Modal>
      </>
    )
}