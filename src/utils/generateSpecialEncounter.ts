import { FLAGS } from "../constants";
import { SPECIAL_ENCOUNTERS } from "../entities/specialEncounters";
import { DEFAULT_SPECIAL_ENCOUNTERS_LIST } from "../constants/special_encounters";
import { getRandom } from "./getRandom";

export const ENCOUNTER_MAP = {
  [SPECIAL_ENCOUNTERS.GHOST]: FLAGS.SPECIAL_ENCOUNTER_GHOST,
  [SPECIAL_ENCOUNTERS.SHOOTING]: FLAGS.SPECIAL_ENCOUNTER_SHOOTING,
  [SPECIAL_ENCOUNTERS.TRADER]: FLAGS.SPECIAL_ENCOUNTER_TRADER,
};

export const generateSpecialEncounter = (flags: FLAGS[]) => {
  const encountersList = DEFAULT_SPECIAL_ENCOUNTERS_LIST.filter(
    (encounter) => !flags.includes(ENCOUNTER_MAP[encounter]),
  );

  if (encountersList.length !== 0) {
    const roll = getRandom(0, encountersList.length - 1);
    return encountersList[roll];
  }

  // такого кейса не должно быть вообще по идее
  return DEFAULT_SPECIAL_ENCOUNTERS_LIST[0];
};
