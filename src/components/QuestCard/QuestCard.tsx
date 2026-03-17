import { FC } from "react";

import { useAppState, useGameState } from "../../stores";
import { QUEST_STATUSES } from "../../entities";
import { getQuestDataByType } from "./utils";
import { QuestCardProps } from "./types";
import * as S from "./QuestCard.styled";

// REFACTORING CHECKED ✅

export const QuestCard: FC<QuestCardProps> = ({ type }) => {
  const { setQuestData } = useGameState();
  const { toggleQuestModal } = useAppState();

  const { src, reward, title, description } = getQuestDataByType(type);
  // в зависимости от reward выводить иконки

  // FIXME: нужно разделение по типу квеста - конкретные награды
  const handleStartQuest = () => {
    setQuestData({
      exp: 1000,
      gold: 1000,
      type,
      status: QUEST_STATUSES.INITIATED,
    });

    toggleQuestModal();
  };

  return (
    <S.QuestCardContainer onClick={handleStartQuest}>
      <img src={src} width="350px" height="620px" />

      <S.QuestCardTitle>{title}</S.QuestCardTitle>

      <S.QuestCardDescription variant="body2">
        {description}
      </S.QuestCardDescription>

      <S.QuestCardReward>{reward.join(", ")}</S.QuestCardReward>
    </S.QuestCardContainer>
  );
};
