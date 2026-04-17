import { useEffect } from "react";
import { useAppState, useGameState } from "../stores";
import { DEFAULT_EXP_BY_CLASS_MAP } from "../stores/constants";
import { v4 } from "uuid";

const expForLevel = (level: number, baseExp: number) => {
  if (level === 1) return baseExp;

  // Используем квадратичную функцию с замедлением на высоких уровнях
  // Множитель: level * (level - 1) / 1.8 вместо /2
  const multiplier = (level * (level - 1)) / 3;

  // Добавляем небольшой линейный рост для сглаживания
  const linearBonus = level * baseExp * 0.1;

  return Math.floor(baseExp * multiplier + linearBonus);
};

export const useWatchCharacterLevels = () => {
  const { pushLeveledUpList } = useAppState();
  const {
    player: { party },
    levelUpCharacter,
  } = useGameState();

  const [partyMember1, partyMember2, partyMember3] = party || [];
  const experienceMember1 = partyMember1?.experience;
  const experienceMember2 = partyMember2?.experience;
  const experienceMember3 = partyMember3?.experience;

  useEffect(() => {
    const charactersToUpdate = [...party];

    charactersToUpdate.forEach((character) => {
      const characterDefaultExpAmount =
        DEFAULT_EXP_BY_CLASS_MAP[character.characterClass];
      const expForNextLevel = expForLevel(
        character.level,
        characterDefaultExpAmount,
      );

      if (character.experience >= expForNextLevel && expForNextLevel !== 0) {
        levelUpCharacter(character.name, expForNextLevel);
        pushLeveledUpList({
          name: character.name,
          level: character.level + 1,
          id: v4(),
        });
      }
    });
  }, [experienceMember1, experienceMember2, experienceMember3]);
};
