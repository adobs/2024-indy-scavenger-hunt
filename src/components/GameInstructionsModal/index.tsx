import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Text } from '@chakra-ui/react';

export const GameInstructionsModal = ({ isOpen, onClose}: { isOpen: boolean, onClose: () => void} ) => {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Indy's Arithmetic Memory (I AM) Awesome Game</ModalHeader>
          <ModalBody>
            <Text mb="4">
              These cards have math equations on the back.  See if you can figure out their solutions.  Flip up two cards with the same answer to get a match.  Find all the matches and get a super cool prize.
            </Text>
            <Text>
              I know how good you are at math, so I don't need to wish you good luck.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Let's Play!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
