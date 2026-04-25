export const getImprovementPrice = (currentBagLevel: number) => {
  if (currentBagLevel === 1) {
    return 5000;
  }

  if (currentBagLevel === 2) {
    return 10000;
  }

  return 15000;
};
