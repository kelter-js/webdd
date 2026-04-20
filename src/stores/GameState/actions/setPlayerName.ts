import { v4 } from "uuid";
import { CLASSES } from "../../../entities/characterClasses";
import { Item } from "../../../types/gameState";
import {
  SNIPER_BASE_MODEL,
  MEDIC_BASE_MODEL,
  TANK_BASE_MODEL,
} from "../../constants";
import { StoreSet } from "./types";
import { BNTI_TIER_1 } from "../../../constants/armor";
import { GALVION_TIER_1 } from "../../../constants/helmets";
import {
  MP155_TIER_1,
  MP5SD_TIER_1,
  SV98_TIER_1,
} from "../../../constants/guns";
import {
  rebuildDerivedState,
  getRandomName,
  memoizeItem,
} from "../../../utils";
import { POTION_TYPES } from "../../../entities/consumables";

const CLASSES_MAP = {
  [CLASSES.SNIPER]: SNIPER_BASE_MODEL,
  [CLASSES.MEDIC]: MEDIC_BASE_MODEL,
  [CLASSES.TANK]: TANK_BASE_MODEL,
};

const getBaseModelBySelectedClass = (selectedClass: CLASSES) =>
  CLASSES_MAP[selectedClass];
const classList = [CLASSES.SNIPER, CLASSES.MEDIC, CLASSES.TANK];

const getOtherClassModelsList = (selectedClass: CLASSES) =>
  classList
    .filter((classes) => classes !== selectedClass)
    .map((characterClass) => CLASSES_MAP[characterClass]);

const TANK_DEFAULT_GEAR: Item[] = [
  { ...BNTI_TIER_1, gearId: v4() },
  { ...GALVION_TIER_1, gearId: v4() },
  { ...MP155_TIER_1, gearId: v4() },
];
const MEDIC_DEFAULT_GEAR: Item[] = [
  { ...BNTI_TIER_1, gearId: v4() },
  { ...GALVION_TIER_1, gearId: v4() },
  { ...MP5SD_TIER_1, gearId: v4() },
];
const SNIPER_DEFAULT_GEAR: Item[] = [
  { ...BNTI_TIER_1, gearId: v4() },
  { ...GALVION_TIER_1, gearId: v4() },
  { ...SV98_TIER_1, gearId: v4() },
];
const GEAR_BY_CLASS_MAP = {
  [CLASSES.SNIPER]: SNIPER_DEFAULT_GEAR,
  [CLASSES.MEDIC]: MEDIC_DEFAULT_GEAR,
  [CLASSES.TANK]: TANK_DEFAULT_GEAR,
};

// FIXME типизация
export const setPlayerName =
  (set: StoreSet) => (name: string, characterClass: CLASSES) => {
    set((state) => {
      const [firstAvailableClassModel, lastAvailableClassModel] =
        getOtherClassModelsList(characterClass);
      const [firstRandomName, secondRandomName] = getRandomName(name);

      // магические числа заменить на константы рассчета
      const party = [
        {
          name,
          experience: 0,
          level: 1,
          ...getBaseModelBySelectedClass(characterClass),
          points: 5,
          perksList: [],
          critStrike: 0,
        },
        {
          name: firstRandomName,
          experience: 0,
          level: 1,
          ...firstAvailableClassModel,
          points: 5,
          critChance: 0,
          critStrike: 0,
          perksList: [],
        },
        {
          name: secondRandomName,
          experience: 0,
          level: 1,
          ...lastAvailableClassModel,
          points: 5,
          critChance: 0,
          critStrike: 0,
          perksList: [],
        },
      ];

      const gear = Object.fromEntries(
        party.map(({ name, characterClass }) => [
          name,
          GEAR_BY_CLASS_MAP[characterClass],
        ]),
      );

      const memoizedGear = Object.fromEntries(
        Object.entries(gear).map(([name, gearInventory]) => [
          name,
          gearInventory.map(memoizeItem),
        ]),
      );

      return rebuildDerivedState({
        ...state,
        player: {
          ...state.player,
          name,
          party,
          gear_memoized: memoizedGear,
          consumables: [[POTION_TYPES.SMALL_HEALTH_POTION, "10"]],
          torches: 15,
          gold: 1000,
        },
        gear,
      });
    });
  };
