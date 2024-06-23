// src/components/MemoryGame.tsx
import React, { useState, useEffect } from 'react';
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
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
    const [matchedCards, setMatchedCards] = useState<Set<number>>(new Set());

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
      console.log("in use effect flipped card:", Array.from(flippedCards.values()))
      if (flippedCards.size === 2) {
          const [firstId, secondId] = Array.from(flippedCards);
          const firstCard = cards[firstId];
          const secondCard = cards[secondId];
          if (evaluateEquation(firstCard.equation) === evaluateEquation(secondCard.equation)) {
              var t = setTimeout(() => {
                setCards(prevCards => prevCards.map(card => 
                  card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card
                ));
                }, 1000);
                setMatchedCards((prevState) => prevState.add(firstId).add(secondId));
                setFlippedCards(new Set());
              
          } else {
              t = setTimeout(() => {
                  setCards(prevCards => prevCards.map(card => 
                      flippedCards.has(card.id) ? { ...card, isFlipped: false } : card
                  ));
                  setFlippedCards(new Set());
              }, 5000);
          }
      } 
      return () => clearTimeout(t)
  } , [flippedCards]);

    const handleCardClick = (id: number) => {
      console.log("handleCardClick: ", id)
        const clickedCard = cards.find(card => card.id === id);
        if (clickedCard && !clickedCard.isFlipped && !clickedCard.isMatched) {
            if (flippedCards.size === 2) {
                // Flip back the previously flipped cards
                setCards(prevCards => prevCards.map(card =>
                    flippedCards.has(card.id) ? { ...card, isFlipped: false } : card
                ));
                setFlippedCards(new Set([id]));
            } else {
                setCards(prevCards => prevCards.map(card =>
                    card.id === id ? { ...card, isFlipped: true } : card
                ));
                setFlippedCards(new Set(flippedCards).add(id));
            }
        } 
    };

    return (
        <div className="memory-game">
            {cards.map(card => (
                <MemoryCard
                    key={card.id}
                    equation={card.equation}
                    isFlipped={card.isFlipped || card.isMatched}
                    isMatched={card.isMatched}
                    onClick={() => handleCardClick(card.id)}
                />
            ))}
        </div>
    );
};

