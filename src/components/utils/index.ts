export const equations = [
  "15 + 22", // 37
  "40 - 3", // 37 
  "5 * 3", // 15
  "20 - 5", // 15
  "6 + 12", // 18
  "9 + 9", // 18
  "10 * 6", // 60
  "95 - 35", // 60
  "2 * 8", // 16
  "9 + 7", // 16
  "32 * 0", // 0
  "44 - 44", // 0
  "56 + 11", // 67
  "47 + 20", // 67
  "43 + 56", // 99
  "38 + 61", // 99
];

export const evaluateEquation = (equation: string): number => {
  return eval(equation);
};
