import { calculateStatistics } from "../stores/utils";
import { StoreState } from "../types/gameState";
import { dememoizeItem } from "./dememoizeItem";

export const rebuildDerivedState = (
  state: StoreState,
  characterName?: string,
) => {
  const copyState = {
    ...state,
    inventory: state.player.inventory_memoized.map(dememoizeItem),
  };

  if (characterName) {
    copyState.gear = {
      ...(state.gear ?? {}),
      [characterName]:
        state.player.gear_memoized[characterName].map(dememoizeItem),
    };
  } else {
    copyState.gear = Object.fromEntries(
      Object.entries(copyState.player.gear_memoized).map((item) => {
        const [playerName, gear] = item;
        return [playerName, gear.map(dememoizeItem)];
      }),
    );
  }

  if (!copyState.statistics) {
    copyState.statistics = {};
  }

  copyState.player.party.forEach((character) => {
    const characterGear = copyState.gear ? copyState.gear[character.name] : [];

    copyState.statistics![character.name] = calculateStatistics(
      character,
      characterGear,
    );
  });

  return copyState;
};
