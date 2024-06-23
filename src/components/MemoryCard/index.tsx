// src/components/Card.tsx
import React, { useEffect } from 'react';
import './Card.css';
import { Equation } from './Equation';

interface CardProps {
    equation: string;
    isFlipped: boolean;
    isMatched: boolean;
    onClick: () => void;
}

export const MemoryCard: React.FC<CardProps> = ({ equation, isFlipped, isMatched, onClick }) => {
    const evaluatedResult = isMatched ? eval(equation).toString() : '';
    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
            <div className="card-inner">
                <div className={`card-front ${isMatched ? 'matched' : ''}`}>
                    <div className="equation"><Equation equation={equation}/></div>
                    <div className="evaluated">{evaluatedResult}</div>
                </div>
                <div className="card-back">
                    🂠
                </div>
            </div>
        </div>
    );
};

