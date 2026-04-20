import { rebuildDerivedState } from "../../../utils";
import { StoreSet } from "./types";

export const removeItemFromGear =
  (set: StoreSet) => (characterName: string, itemId: string) => {
    set((state) => {
      const stateCopy = {
        ...state,
        player: {
          ...state.player,
          inventory_memoized: [...state.player.inventory_memoized],
          gear_memoized: { ...state.player.gear_memoized },
        },
      };

      if (stateCopy.player.gear_memoized[characterName]) {
        const item = stateCopy.player.gear_memoized[characterName].find(
          ([_, id]) => id === itemId,
        );

        if (item) {
          stateCopy.player.gear_memoized[characterName] =
            stateCopy.player.gear_memoized[characterName].filter(
              ([_, id]) => id !== itemId,
            );

          if (stateCopy.gear && stateCopy.gear[characterName]) {
            stateCopy.gear = { ...stateCopy.gear };

            stateCopy.gear[characterName] = stateCopy.gear[
              characterName
            ].filter((item) => item.gearId !== itemId);
          }

          stateCopy.player.inventory_memoized.push(item);

          // FIXME: добавить перерассчет статов в statistics т.к. сняли предмет
        }
      }

      return rebuildDerivedState(stateCopy, characterName);
    });
  };
