import { CLASSES } from "../../../entities/characterClasses";
import {
  DAMAGER_BASE_MODEL,
  HEALER_BASE_MODEL,
  TANK_BASE_MODEL,
} from "../../constants";
import { StoreSet } from "./types";

const CLASSES_MAP = {
  [CLASSES.DAMAGER]: DAMAGER_BASE_MODEL,
  [CLASSES.HEALER]: HEALER_BASE_MODEL,
  [CLASSES.TANK]: TANK_BASE_MODEL,
};

const getBaseModelBySelectedClass = (selectedClass: CLASSES) =>
  CLASSES_MAP[selectedClass];
const classList = [CLASSES.DAMAGER, CLASSES.HEALER, CLASSES.TANK];

const getOtherClassModelsList = (selectedClass: CLASSES) =>
  classList
    .filter((classes) => classes !== selectedClass)
    .map((characterClass) => CLASSES_MAP[characterClass]);

// FIXME типизация
export const setPlayerName =
  (set: StoreSet) => (name: string, characterClass: CLASSES) => {
    set((state) => {
      const [firstAvailableClassModel, lastAvailableClassModel] =
        getOtherClassModelsList(characterClass);

      // магические числа заменить на константы рассчета
      const party = [
        {
          name,
          experience: 0,
          level: 1,
          ...getBaseModelBySelectedClass(characterClass),
          points: 5,
          perksList: [],
        },
        {
          name: "SomeWhatOfTestingName-HEALER",
          experience: 0,
          level: 1,
          ...firstAvailableClassModel,
          points: 5,
          critChance: 0,
          critStrike: 0,
          perksList: [],
        },
        {
          name: "SomeWhatOfTestingName-TANK",
          experience: 0,
          level: 1,
          ...lastAvailableClassModel,
          points: 5,
          critChance: 0,
          critStrike: 0,
          perksList: [],
        },
      ];

      return { player: { ...state.player, name, party } };
    });
  };
