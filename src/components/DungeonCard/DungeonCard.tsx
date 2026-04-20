import { FC } from "react";

import { useAppState, useGameState } from "../../stores";
import { getDungeonDataByType } from "./utils";
import { QuestCardProps } from "./types";
import { DUNGEONS } from "../../entities";
import * as S from "./DungeonCard.styled";

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

      <S.QuestCardDescription
        fontSize={type === DUNGEONS.STORY ? "20px" : "14px !important"}
      >
        {description}
      </S.QuestCardDescription>
    </S.QuestCardContainer>
  );
};
