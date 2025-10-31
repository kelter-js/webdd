import { CLASSES } from "../../../entities/characterClasses";
import { Character } from "../../../types/gameState";
import { getRandom } from "../../../utils";

const CHANCE_TO_TARGET_TANK = 60;
const CHANCE_TO_TARGET_LOWEST_HP = 20;

export const chooseRandomTargetDefault = (party: Character[]) => {
  const battleRoll = getRandom(1, 100);
  // FIXME тут может быть добавлена доп логика если у персонажа определенные предметы надеты, увеличивающие его шанс стать таргетом
  if (battleRoll <= CHANCE_TO_TARGET_TANK) {
    return party.find(
      (character) => character.characterClass === CLASSES.TANK
    )!;
  }

  if (battleRoll <= CHANCE_TO_TARGET_LOWEST_HP) {
    return [...party].sort((a, b) => a.currentHealth - b.currentHealth)[0];
  }

  const randomPerson = getRandom(0, party.length - 1);

  return party[randomPerson];
};
