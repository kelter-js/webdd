import { dememoizeItem } from "../../../utils/dememoizeItem";
import { memoizeItem } from "../../../utils";
import { StoreSet } from "./types";

export const resetQuest = (set: StoreSet) => () => {
  set((state) => {
    if (!state.player.quest) return state;

    const questData = state.player.quest;
    const { item, exp, gold: questGold } = questData;

    const { gold, party, inventory_memoized } = state.player;

    const newPlayerState = {
      ...state.player,
      quest: null,
      gold: gold + questGold,
      party: party.map((player) => ({
        ...player,
        experience: player.experience + exp,
      })),
      inventory_memoized: item
        ? [...inventory_memoized, memoizeItem(item)]
        : inventory_memoized,
    };

    if (newPlayerState.location) {
      newPlayerState.location = {
        ...newPlayerState.location,
        isQuestCompleted: false,
      };
    }

    return {
      ...state,
      player: newPlayerState,
      inventory: item
        ? newPlayerState.inventory_memoized.map(dememoizeItem)
        : state.inventory,
    };
  });
};
