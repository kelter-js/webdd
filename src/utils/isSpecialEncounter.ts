import { FLAGS } from "../constants";
import { getRandom } from "./getRandom";

export const isSpecialEncounter = (
  flags: FLAGS[],
  specialEncounterChance: number,
) => {
  if (
    flags.includes(FLAGS.SPECIAL_ENCOUNTER_GHOST) &&
    flags.includes(FLAGS.SPECIAL_ENCOUNTER_SHOOTING) &&
    flags.includes(FLAGS.SPECIAL_ENCOUNTER_TRADER)
  ) {
    return false;
  }

  const roll = getRandom(1, 100);

  return roll < specialEncounterChance;
};
