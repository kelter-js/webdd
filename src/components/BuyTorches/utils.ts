import { TORCH_PRICE } from "../../constants";

export const isTorchesAffordable = (
  amountOfTorches: number,
  playerGold: number,
) => {
  const finalPrice = amountOfTorches * TORCH_PRICE;

  return {
    isAffordable: playerGold >= finalPrice && amountOfTorches > 0,
    finalPrice,
  };
};
