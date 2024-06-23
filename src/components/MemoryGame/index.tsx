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
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);

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
      console.log("in use effect matched card:", Array.from(matchedCards.values()))

      setCards(prevCards => prevCards.map(card =>
        matchedCards.includes(card.id) ? { ...card, isMatched: true } : card
       ));

    }, [matchedCards])

    useEffect(() => {
      console.log("in use effect flipped card:", Array.from(flippedCards.values()))
      setCards(prevCards => prevCards.map(card =>
        flippedCards.includes(card.id) ? { ...card, isFlipped: true } : {...card, isFlipped: false }
       ));


  } , [flippedCards]);

    const handleCardClick = (id: number) => {
      if (!flippedCards.includes(id) && !matchedCards.includes(id)) { 
        if (flippedCards.length === 1 && evaluateEquation(cards[flippedCards[0]].equation) === evaluateEquation(cards[id].equation)) {
              setMatchedCards([...matchedCards,flippedCards[0],id]);
              setFlippedCards([]);
        } else {
          if (flippedCards.length === 2) {
            setFlippedCards([id]);
          } else {
            // console.log('flipped < 2, flipped is: ', flippedCards,', adding id:', id)
            setFlippedCards(prev =>[...prev, id])
            setTimeout(() => {  
                console.log('flippeing back using slice 1 on ', flippedCards )
                setFlippedCards(flippedCards.slice(1));
            }, 5000);
          }
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

