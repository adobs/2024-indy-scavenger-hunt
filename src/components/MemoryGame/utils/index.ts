export const equations = [
  "11 + 11", // 22
  "19 + 3", // 22
  "11 * 1", // 11
  "5 + 6", // 11
  "2 * 7", // 14
  "8 + 6", // 14
  "32 * 0", // 0
  "28 - 28", // 0
  "10 + 25", // 35
  "20 + 15", // 35
  "5 * 2", // 10
  "20 - 10", // 10
  "6 + 12", // 18
  "9 + 9", // 18
  "7 + 2", // 9
  "3 * 3", // 9
];

export const evaluateEquation = (equation: string): number => {
  return eval(equation);
};
