// src/components/Card.tsx
import { Timer } from '../MemoryGame/Timer';
import './Card.css';
import { Equation } from './Equation';
import { Card, Stack, Text } from '@chakra-ui/react';

interface CardProps {
    equation: string;
    isFlipped: boolean;
    isMatched: boolean;
    onClick: () => void;
}

export const MemoryCard: React.FC<CardProps> = ({ equation, isFlipped, isMatched, onClick }) => {
    // const timer = new Timer(5000);
    const evaluatedResult = isMatched ? eval(equation).toString() : '';
    return (
        <Card className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
            <Stack className="card-inner">
                <Stack className={`card-front ${isMatched ? 'matched' : ''}`}>
                    <Equation equation={equation}/>
                    <Text className="evaluated">{evaluatedResult}</Text>
                </Stack>
                <div className="card-back">
                    🂠
                </div>
            </Stack>
        </Card>
    );
};

