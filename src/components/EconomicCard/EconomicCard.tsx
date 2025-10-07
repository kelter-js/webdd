import { FC } from "react";

import { useAppState, useGameState } from "../../stores";
import { getEconomicBranchDataByType } from "./utils";
import { EconomicCardProps } from "./types";
import * as S from "./EconomicCard.styled";

export const EconomicCard: FC<EconomicCardProps> = ({ type }) => {
  const { setEconomicBranch } = useGameState();
  const { toggleEconomicModal } = useAppState();

  const { src, reward, title, description } = getEconomicBranchDataByType(type);

  const handleSelectEconomicBranch = () => {
    setEconomicBranch(type);
    toggleEconomicModal();
  };

  return (
    <S.QuestCardContainer onClick={handleSelectEconomicBranch}>
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
          width: "90%",
          color: "black",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
          p: "8px",
          fontSize: "18px",
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
