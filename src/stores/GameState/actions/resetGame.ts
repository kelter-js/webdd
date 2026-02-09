import { DUNGEONS, ENEMIES, RENDER_LOCATIONS } from "../../../entities";
import { JUNK_TYPES } from "../../../entities/junk";
import { KillCounter } from "../../../types/gameState";
import {
  DEFAULT_GAME_STATE,
  MIN_ENCOUNTER_CHANCE,
  SPECIAL_ENCOUNTER_DEFAULT_CHANCE,
} from "../../constants";
import { StoreSet } from "./types";

export const resetGame = (set: StoreSet) => () =>
  // FIXME: возможно тут нужно рекалькулировать статы
  set(() => {
    console.log("DEFAULT_GAME_STATE", DEFAULT_GAME_STATE);
    return {
      player: {
        party: [],
        location: {
          dungeon: [],
          position: { x: 0, y: 0 },
          type: DUNGEONS.STORY,
          encounterChance: MIN_ENCOUNTER_CHANCE,
        },
        name: "",
        locationState: RENDER_LOCATIONS.SETTLEMENT,
        prevLocationState: null,
        battle: null,
        inventory_memoized: [],
        quest: null,
        gear_memoized: {},
        consumables: [],
        gold: 450,
        isGameOver: false,
        currentTier: 1,
        torches: 0,
        dialogFlags: [],
        economic: null,

        potionsToBuy: null,
        itemsToBuy: null,
        sliderId: null,
        playStatistics: {
          dungeonCounter: 0,
          kills: Object.fromEntries(
            Object.keys(ENEMIES).map((item) => [item, 0]),
          ) as KillCounter,
        },
        hasCamera: false,
        junk: [
          [JUNK_TYPES.AXE, "3"],
          [JUNK_TYPES.CRYSTAL_ORB, "2"],
        ],
        resources: [],
        resourcesBagLevel: 1,
        collected: [],
        flags: [],
        specialEncounterChance: SPECIAL_ENCOUNTER_DEFAULT_CHANCE,
      },
      effects: null,
      sell_inventory: null,
      inventory: null,
      statistics: null,
      gear: null,
      abilities: null,
      isDiceRequiredRoll: false,
      isAutoSaveRequired: false,
      playersLvlUpNotifications: [],
    };
  });
