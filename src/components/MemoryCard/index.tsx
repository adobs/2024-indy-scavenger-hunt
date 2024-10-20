import React from 'react';
import './Card.css';
import { Equation } from './Equation';
import { Card, Stack, Text, Image } from '@chakra-ui/react';

interface CardProps {
    equation: string;
    isFlipped: boolean;
    isMatched: boolean;
    onClick: () => void;
}

export const MemoryCard: React.FC<CardProps> = ({ equation, isFlipped, isMatched, onClick }) => {
    /*eslint no-eval: "off"*/
    const evaluatedResult = isMatched ? eval(equation).toString() : '';
    return (
        <Card className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
            <Stack className="card-inner">
                <Stack className={`card-front ${isMatched ? 'matched' : ''}`}>
                    <Equation equation={equation}/>
                    <Text className="evaluated">{evaluatedResult}</Text>
                </Stack>
                <Stack className="card-back" >
                    <Image src="indy-pic.jpg" objectFit={"cover"} h="100%" />
                    </Stack>
                    
            </Stack>
        </Card>
    );
};

