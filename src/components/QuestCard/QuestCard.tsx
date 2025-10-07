import { FC } from "react";

import { useAppState, useGameState } from "../../stores";
import { QuestCardProps } from "./types";
import { getQuestDataByType } from "./utils";
import { QUEST_STATUSES } from "../../entities";
import * as S from "./QuestCard.styled";

export const QuestCard: FC<QuestCardProps> = ({ type }) => {
  const { player, setQuestData } = useGameState();
  const { toggleQuestModal } = useAppState();

  const { src, reward, title, description } = getQuestDataByType(type);
  // в зависимости от reward выводить иконки

  const handleStartQuest = () => {
    setQuestData({
      exp: 1000,
      money: 1000,
      type,
      status: QUEST_STATUSES.INITIATED,
    });
    toggleQuestModal();
  };

  return (
    <S.QuestCardContainer onClick={handleStartQuest}>
      <img src={src} width="350px" height="620px" />
      <S.QuestCardTitle
        sx={{
          width: "100%",
          color: "black",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
          p: "8px",
          fontSize: "20px",
          fontFamily: "inherit",
          textAlign: "center",
        }}
      >
        {title}
      </S.QuestCardTitle>

      <S.QuestCardDescription
        sx={{
          width: "100%",
          color: "black",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
          p: "8px",
          fontSize: "20px",
          fontFamily: "inherit",
          textAlign: "center",
        }}
      >
        {description}
      </S.QuestCardDescription>

      <S.QuestCardReward
        sx={{
          width: "100%",
          color: "black",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
          padding: (theme) => theme.spacing(2),
          fontSize: "20px",
          fontFamily: "inherit",
          textAlign: "center",
        }}
      >
        {reward.join(", ")}
      </S.QuestCardReward>
    </S.QuestCardContainer>
  );
};
