import { FC } from "react";

import { useAppState, useGameState } from "../../stores";
import { getEconomicBranchDataByType } from "./utils";
import { EconomicCardProps } from "./types";
import * as S from "./EconomicCard.styled";

export const EconomicCard: FC<EconomicCardProps> = ({ type }) => {
  const {
    setEconomicBranch,
    player: { economic },
  } = useGameState();
  const { toggleEconomicModal } = useAppState();

  const { src, reward, title, description } = getEconomicBranchDataByType(type);

  const handleSelectEconomicBranch = () => {
    setEconomicBranch(type);
    toggleEconomicModal();
  };

  return (
    <S.QuestCardContainer
      onClick={handleSelectEconomicBranch}
      isSelected={type === economic}
    >
      <img src={src} width="350px" height="620px" />

      <S.QuestCardTitle>{title}</S.QuestCardTitle>

      <S.QuestCardDescription>{description}</S.QuestCardDescription>

      <S.QuestCardReward>{reward.join(", ")}</S.QuestCardReward>
    </S.QuestCardContainer>
  );
};
