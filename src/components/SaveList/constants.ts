export const MAX_AMOUNT_OF_SAVES = 3;
export const AVAILABLE_SAVE_SLOTS = new Array(MAX_AMOUNT_OF_SAVES).fill(null);
export const EMPTY_SAVE_DESCRIPTION = "Пустое сохранение";
export enum SAVE_LOAD_STATUSES {
  LOAD = "Сохранение загружено",
  SAVE = "Игра сохранена",
}
