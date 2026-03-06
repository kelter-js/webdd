import { dememoizeItem } from "../../../utils/dememoizeItem";
import { memoizeItem } from "../../../utils/memoizeItem";
import { StoreSet } from "./types";

export const resetQuest = (set: StoreSet) => () => {
  set((state) => {
    const copyState = { ...state, player: { ...state.player } };

    if (copyState.player.quest) {
      const questData = copyState.player.quest;
      const { item, exp, gold } = questData;

      copyState.player.quest = null;

      copyState.player.gold += gold;

      copyState.player.party = copyState.player.party.map((player) => ({
        ...player,
        experience: player.experience + exp,
      }));

      if (item) {
        copyState.player.inventory_memoized.push(memoizeItem(item));

        copyState.inventory =
          copyState.player.inventory_memoized.map(dememoizeItem);
      }
    }

    return copyState;
  });
};
