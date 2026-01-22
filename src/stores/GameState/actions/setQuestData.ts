import { Quest } from "../../../types/gameState";
import { StoreSet } from "./types";
// FIXME типизация
export const setQuestData = (set: StoreSet) => (data: Quest | null) => {
  set((state) => {
    // Закрытие квеста, обнуляем его состояние
    if (data === null) {
      return {
        player: {
          ...state.player,
          quest: null,
        },
      };
    }
    // обновление квеста на основе уже существующих данных - добавляем новые поля
    const newQuestData = { ...(state.player.quest || {}), ...data };

    return {
      player: {
        ...state.player,
        quest: newQuestData,
      },
    };
  });
};
