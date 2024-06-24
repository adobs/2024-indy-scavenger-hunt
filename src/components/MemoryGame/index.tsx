// src/components/MemoryGame.tsx
import React, { useState, useEffect } from 'react';
import { MemoryCard } from '../MemoryCard';
import { equations, evaluateEquation } from '../utils';
import './MemoryGame.css';
import { HStack, SimpleGrid } from '@chakra-ui/react';

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
    const [cards, setCards] = useState<CardState[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);
    const timeouts: NodeJS.Timeout[] = Array.from({ length: equations.length }, () => setTimeout(() => {}, 0));

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
    }, [matchedCards])

    useEffect(() => {
      setCards(prevCards => prevCards.map(card =>
        flippedCards.includes(card.id) ? { ...card, isFlipped: true } : {...card, isFlipped: false }
       ));
  } , [flippedCards]);

    const handleCardClick = (id: number) => {
      console.log("id: ", id);
      if (!flippedCards.includes(id) && !matchedCards.includes(id)) { 
        if (flippedCards.length === 1 && evaluateEquation(cards[flippedCards[0]].equation) === evaluateEquation(cards[id].equation)) {
              setMatchedCards([...matchedCards,flippedCards[0],id]);
              setFlippedCards([]);
        } else {
          if (flippedCards.length === 2) {
            setFlippedCards([id]);
            console.log("2 cards flipped, clearing ", id, " and ", flippedCards[0]);

              clearTimeout(timeouts[flippedCards[1]]);
              clearTimeout(timeouts[flippedCards[0]]);

      
          } else {
            console.log("1 or 0 cards flipped, clearing ", id);

            clearTimeout(timeouts[id]);
            if (flippedCards.length === 1) {
              console.log("setting timeout because of flipped", flippedCards, "and ", id);
              timeouts[id] = setTimeout(() => {
                setFlippedCards([]);
              }, 5000);
            }
            setFlippedCards(prev =>[...prev, id])
          }  
  
      }
      }
    };

    return (
        // <div className="memory-game">
        <HStack width="100%" height="100%" justifyContent="center">
        <SimpleGrid columns={4} spacingX="10px" spacingY={4} maxW="440px">
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
            </HStack>
    );
};

