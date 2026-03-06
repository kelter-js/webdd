import { FC } from "react";

import { useAppState, useGameState } from "../../stores";
import { getDungeonDataByType } from "./utils";
import { QuestCardProps } from "./types";
import * as S from "./DungeonCard.styled";
import { DUNGEONS } from "../../entities";

// REFACTORING CHECKED ✅

export const DungeonCard: FC<QuestCardProps> = ({
  type,
  selectedDifficulty,
}) => {
  const {
    generateDungeon,
    player: { currentTier },
  } = useGameState();
  const { toggleDungeonModal, toggleAutoSave } = useAppState();

  const { src, title, description } = getDungeonDataByType(type);

  const handleStartQuest = () => {
    toggleAutoSave();
    generateDungeon({
      dungeonType: type,
      dungeonLevel: type === DUNGEONS.STORY ? selectedDifficulty : currentTier,
    });
    toggleDungeonModal();
  };

  return (
    <S.QuestCardContainer onClick={handleStartQuest}>
      <img src={src} width="350px" height="620px" />

      <S.QuestCardTitle>{title}</S.QuestCardTitle>

      <S.QuestCardDescription>{description}</S.QuestCardDescription>
    </S.QuestCardContainer>
  );
};
