export const equations = [
  "11 + 11", // 22
  "6 + 12", // 18
  "11 * 1", // 11
  "2 * 7", // 14
  "32 * 0", // 0
  "19 + 3", // 22
  "10 + 25", // 35
  "5 * 2", // 10
  "20 - 10", // 10
  "7 + 2", // 9
  "5 + 6", // 11
  "8 + 6", // 14
  "20 + 15", // 35
  "28 - 28", // 0
  "9 + 9", // 18
  "3 * 3", // 9
];

export const evaluateEquation = (equation: string): number => {
  return eval(equation);
};
