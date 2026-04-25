import { v4 } from "uuid";

import { SPECIAL_ENCOUNTERS } from "../../../entities/specialEncounters";
import { BASE_ITEMS_ID } from "../../../constants/items";
import { RENDER_LOCATIONS } from "../../../entities";
import { dememoizeItem } from "../../../utils";
import { FLAGS } from "../../../constants";
import { StoreSet } from "./types";

const getSpecialEncounterFlagByType = (
  type: SPECIAL_ENCOUNTERS,
  itemAcquiredId?: BASE_ITEMS_ID,
) => {
  if (type === SPECIAL_ENCOUNTERS.GHOST) {
    return FLAGS.SPECIAL_ENCOUNTER_GHOST;
  }

  if (type === SPECIAL_ENCOUNTERS.SHOOTING) {
    return FLAGS.SPECIAL_ENCOUNTER_SHOOTING;
  }

  if (type === SPECIAL_ENCOUNTERS.TRADER && itemAcquiredId) {
    return FLAGS.SPECIAL_ENCOUNTER_TRADER;
  }

  return null;
};

export const handleExitSpecialEncounter =
  (set: StoreSet) =>
  (
    specialEncounter: SPECIAL_ENCOUNTERS,
    itemAcquiredId?: BASE_ITEMS_ID,
    goldRequired?: number,
  ) => {
    set((state) => {
      const copyState = { ...state, player: { ...state.player } };

      const specialEncounterFlag = getSpecialEncounterFlagByType(
        specialEncounter,
        itemAcquiredId,
      );

      if (specialEncounterFlag) {
        copyState.player.flags.push(specialEncounterFlag);
      }

      if (specialEncounter === SPECIAL_ENCOUNTERS.TRADER && itemAcquiredId) {
        copyState.player.flags.push(FLAGS.SPECIAL_ENCOUNTER_TRADER_ITEM_BOUGHT);
      }

      if (
        specialEncounter !== SPECIAL_ENCOUNTERS.TRADER &&
        copyState.player.location
      ) {
        copyState.player.location.attempts = 5;
        copyState.player.location.node = undefined;
        copyState.player.location.success = 0;
      }

      if (goldRequired) {
        copyState.player.gold -= goldRequired;
      }

      if (itemAcquiredId) {
        copyState.player.inventory_memoized.push([itemAcquiredId, v4()]);
        copyState.inventory =
          copyState.player.inventory_memoized.map(dememoizeItem);
      }

      copyState.player.location!.specialEncounter = undefined;

      copyState.player.locationState = RENDER_LOCATIONS.DUNGEON;

      return copyState;
    });
  };
