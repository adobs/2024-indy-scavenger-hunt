import { Divider, HStack, Text, VStack } from "@chakra-ui/react";

interface EquationProps {
  equation: string;
  }

export const Equation: React.FC<EquationProps> = ({ equation }) => {
  const operandMatch = equation.match(/[+\-*]/)
  if (!operandMatch) {
    return (<></>)
  }
  const operand = operandMatch[0]
  const numbers = equation.split(` ${operand}`)

  return (
    <VStack alignItems="flex-end">
      <Text>{numbers[0]}</Text>
      <HStack>
        <Text>{operand === '*' ? 'x ' : operand}</Text>
        <Text>{numbers[1]}</Text>
      </HStack>
      <Divider color="black"/>
    </VStack>

  )
}