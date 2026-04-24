import { useMemo } from "react";

import { useGameState } from "../../../stores";
import { DEFAULT_EXP_BY_CLASS_MAP } from "../../../stores/constants";
import { expForLevel } from "../../../hooks/useWatchCharacterLevels";

export const useCharacterState = () => {
  const {
    player: { party },
    statistics,
  } = useGameState();

  const [player1, player2, player3] = party;

  const {
    charactersWithPointsToSpend,
    deadCharacter,
    aliveCharacters,
    expStatistics,
  } = useMemo(() => {
    return party.reduce<{
      charactersWithPointsToSpend: string[];
      deadCharacter: string[];
      aliveCharacters: { currentHp: number; maxHp: number; name: string }[];
      expStatistics: {
        exp: string;
        name: string;
      }[];
    }>(
      (acc, character) => {
        if (character.points) {
          acc.charactersWithPointsToSpend.push(character.name);
        }

        if (character.currentHealth <= 0) {
          acc.deadCharacter.push(character.name);
        } else {
          const maxHp =
            statistics && statistics[character?.name]
              ? statistics[character?.name]?.maxHealth
              : null;

          if (maxHp) {
            acc.aliveCharacters.push({
              currentHp: character.currentHealth,
              maxHp,
              name: character.name,
            });
          }
        }

        const characterDefaultExpAmount =
          DEFAULT_EXP_BY_CLASS_MAP[character.characterClass];
        const expForNextLevel = expForLevel(
          character.level,
          characterDefaultExpAmount,
        );

        acc.expStatistics.push({
          exp: `${character.experience}/${expForNextLevel}`,
          name: character.name,
        });

        return acc;
      },
      {
        charactersWithPointsToSpend: [],
        deadCharacter: [],
        aliveCharacters: [],
        expStatistics: [],
      },
    );
  }, [
    player1?.points,
    player2?.points,
    player3?.points,
    player1?.experience,
    player2?.experience,
    player3?.experience,
    player1?.currentHealth,
    player2?.currentHealth,
    player3?.currentHealth,
    statistics,
  ]);

  return {
    charactersWithPointsToSpend,
    deadCharacter,
    aliveCharacters,
    expStatistics,
  };
};
