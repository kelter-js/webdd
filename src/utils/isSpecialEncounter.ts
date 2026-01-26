import { FLAGS } from "../constants";
import { getRandom } from "./getRandom";

// ТУТ ФИКС ШАНС НА СПЕШИАЛ ЭНКАУНТЕР
const SPECIAL_ENCOUNTER_CHANCE = 10;

export const isSpecialEncounter = (flags: FLAGS[]) => {
  if (
    flags.includes(FLAGS.SPECIAL_ENCOUNTER_GHOST) &&
    flags.includes(FLAGS.SPECIAL_ENCOUNTER_SHOOTING) &&
    flags.includes(FLAGS.SPECIAL_ENCOUNTER_TRADER)
  ) {
    return false;
  }

  const roll = getRandom(0, 100);

  return roll < SPECIAL_ENCOUNTER_CHANCE;
};
