import { Creature } from "../types/gameState";

export const getNextTargetIndex = (
  selectedEnemy: number,
  party?: Creature[],
) => {
  if (!party) return 0;

  if (!party || party.length === 0) {
    return selectedEnemy;
  }

  const length = party.length;

  for (let i = 1; i <= length; i++) {
    const nextIndex = (selectedEnemy + i) % length;

    if (party[nextIndex].hp > 0) {
      return nextIndex;
    }
  }

  return selectedEnemy;
};

export const getPrevTargetIndex = (
  selectedEnemy: number,
  party?: Creature[],
) => {
  if (!party || party.length === 0) {
    return selectedEnemy;
  }

  const length = party.length;

  for (let i = 1; i <= length; i++) {
    const nextIndex = (selectedEnemy - i + length) % length;

    if (party[nextIndex].hp > 0) {
      return nextIndex;
    }
  }

  return selectedEnemy;
};
