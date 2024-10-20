import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Button, HStack, Input, SimpleGrid, Text, useDisclosure, VStack} from '@chakra-ui/react';

import { MemoryCard } from '../MemoryCard';
import { equations, evaluateEquation } from './utils';
import { GameInstructionsModal } from '../GameInstructionsModal';

interface CardState {
  id: number;
  equation: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const MemoryGame: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true});
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [guess, setGuess] = useState<string>("");
  const [validation, setValidation] = useState<{ text: string, color?: string }>({text: ""});

  const navigate = useNavigate();

  useEffect(() => {
    const shuffledEquations = shuffleArray(equations);
    const initialCards = shuffledEquations.map((eq, index) => ({
      id: index,
      equation: eq,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
  }, []);

  useEffect(() => {
    setCards(prevCards => prevCards.map(card =>
      matchedCards.includes(card.id) ? { ...card, isMatched: true } : card
    ));
    if (matchedCards.length === equations.length) {
      setTimeout(() => navigate('/solved'), 2000);
    }
  }, [matchedCards, navigate]);

  useEffect(() => {
    setCards(prevCards => prevCards.map(card =>
      flippedCards.includes(card.id) ? { ...card, isFlipped: true } : { ...card, isFlipped: false }
    ));
  }, [flippedCards]);

  const handleCardClick = (id: number) => {
    setValidation({text: ""})
    setGuess("");
    if (!flippedCards.includes(id) && !matchedCards.includes(id)) {
      if (flippedCards.length === 2) {
        setFlippedCards([id]);  // Reset if more than 2 cards flipped
      } else {
        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);
      }
    }
  };

  const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
    setValidation({text: ""})
  };

  const validateGuess = () => {
    if (flippedCards.length === 1) {
      setValidation({text: "There's only one equation showing.  Find its match!", color: "teal"})
    }
    if (flippedCards.length === 2) {
      const card1 = cards[flippedCards[0]];
      const card2 = cards[flippedCards[1]];
      const evaluatedCard1 = evaluateEquation(card1.equation);
      const evaluatedCard2 = evaluateEquation(card2.equation);
      const evaluatedGuess = parseInt(guess)

      // Check if the guessed value matches the evaluated equation
      if (evaluatedCard1 === evaluatedCard2 && evaluatedGuess === evaluatedCard1) {
        // If correct guess, set the cards as matched
        setMatchedCards([...matchedCards, card1.id, card2.id]);
        setValidation({ text: `Great job, smarty-pants! The equations equal ${evaluatedGuess}`, color: "green"})
      } else if (evaluatedCard1 === evaluatedGuess || evaluatedCard2 === evaluatedGuess) {
        setValidation({
          text: `Close! But only one of those equations equals ${evaluatedGuess}.  You got this!`,
          color: "red"
        })
      } else if (evaluatedCard1 === evaluatedCard2 && evaluatedGuess !== evaluatedCard1) {
        setValidation({
          text: `Almost there!  The equations equal each other, but they solve to a number different than ${evaluatedGuess}`,
          color: "red"
        })
      } else {
        setValidation({text: "Uh-oh!  The equations don't equal each other.  Try again!", color: "red"})
      }
    }
  };

  const guessLabelFormat = {
    color: flippedCards.length === 2 ? "black" : "lightgrey",
    // fontWeight: flippedCards.length === 2 ? "bold" : "normal",
    fontSize: "lg"
  }

  const coloredText = (text: string) => {
    const colors = ['red.600', 'orange.400', 'yellow.400', 'green.500', 'blue.600', 'purple.600'];

    let colorIndex = 0;
    let charCounter = -1;

    return (
      <Text fontSize="3xl" fontWeight={"bold"} mt={"20px"} mb={"20px"}>
        {text.split('').map((char, index) => {
          // Only increase the counter for non-space characters
          if (char !== ' ') {
            charCounter++;
          }

          // Update the color index every 4 non-space characters
          if (charCounter > 0 && charCounter % 4 === 0 && char !== ' ') {
            colorIndex = (colorIndex + 1) % colors.length;
          }

          return (
            <Box
              key={index}
              as="span"
              color={colors[colorIndex]}
            >
              {char}
            </Box>
          );
        })}
      </Text>
    );
  };

  return (
    <>
      <VStack bg={"white"} w={"100%"} h={"100vh"}>
        {coloredText("Happy 8th birthday, Indigo!")}
        <Button onClick={onOpen} backgroundColor="teal" color={"white"} position="fixed" top="20px" right="20px">Show instructions</Button>
      <HStack justifyContent="center" gap={"60px"}>
          <SimpleGrid columns={4} spacingX="10px" spacingY={4}>
            {cards.map(card => (
              <MemoryCard
                key={card.id}
                equation={card.equation}
                isFlipped={card.isFlipped || card.isMatched}
                isMatched={card.isMatched}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </SimpleGrid>
        <VStack justify={"flex-start"} height={"100%"} mt={"200px"}>
            <Text {...guessLabelFormat}>Do you see a match?</Text>
            <HStack>
              <Text textAlign="center" maxWidth="240px" whiteSpace="normal"  {...guessLabelFormat}>If so, enter the number that both equations equal:</Text>
              <Input width="7ch" value={guess} type={"number"} onChange={handleGuess}/>
            </HStack>
            <Button mt={4} disabled={guess === "" || flippedCards.length !== 2} onClick={validateGuess}>Check if I'm right</Button>
            <Text textAlign={"center"} maxWidth="240px" whiteSpace="normal"  color={validation?.color || "black"}>{validation.text}</Text>
        </VStack>
      </HStack>
      </VStack>
      <GameInstructionsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
