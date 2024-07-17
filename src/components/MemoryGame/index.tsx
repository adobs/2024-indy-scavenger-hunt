// src/components/MemoryGame.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, SimpleGrid } from '@chakra-ui/react';

import { MemoryCard } from '../MemoryCard';
import { equations, evaluateEquation } from '../utils';
import './MemoryGame.css';

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
  const timeoutsRef = React.useRef<Map<number, NodeJS.Timeout>>(new Map());
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
    if (!flippedCards.includes(id) && !matchedCards.includes(id)) {
      if (flippedCards.length === 1 && evaluateEquation(cards[flippedCards[0]].equation) === evaluateEquation(cards[id].equation)) {
        setMatchedCards([...matchedCards, flippedCards[0], id]);
        setFlippedCards([]);
        clearTimeout(timeoutsRef.current.get(flippedCards[0]));
        timeoutsRef.current.delete(flippedCards[0]);
      } else {
        if (flippedCards.length === 2) {
          flippedCards.forEach(cardId => {
            clearTimeout(timeoutsRef.current.get(cardId));
            timeoutsRef.current.delete(cardId);
          });
          setFlippedCards([id]);
        } else {
          const newFlippedCards = [...flippedCards, id];
          setFlippedCards(newFlippedCards);
          if (newFlippedCards.length === 2) {
            const timeoutId = setTimeout(() => {
              setFlippedCards([]);
            }, 5000);
            newFlippedCards.forEach(cardId => {
              timeoutsRef.current.set(cardId, timeoutId);
            });
          }
        }
      }
    }
  };

  return (
    <Center width="100%" height="100vh" backgroundColor="white">
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
    </Center>
  );
};