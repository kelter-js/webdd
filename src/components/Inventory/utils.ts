import { BASE_ITEMS_ID } from "../../constants/items";
import { GEAR_SLOTS } from "../../entities/gear";
import { MIN_AMOUNT_OF_ITEMS_PER_ROW } from "./constants";

//fixme: any заменить на тип предмета из инвентаря, когда будет этот тип
export const fillInventoryGap = (arr: any) => {
  const arrLength = arr.length;
  const remainder = arrLength % MIN_AMOUNT_OF_ITEMS_PER_ROW;

  if (remainder === 0) {
    return arr;
  }

  const difference = MIN_AMOUNT_OF_ITEMS_PER_ROW - remainder;

  //fixme: заменить { type: "placeholder" } на что-то более  вменяемое, для понимания что это пустое место в инвентаре
  return [
    ...arr,
    ...new Array(difference)
      .fill(null)
      .map((item) => ({ type: "placeholder" })),
  ];
};
