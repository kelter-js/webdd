import { styled } from "@mui/material";

import { QuestCardText } from "../../common/styled.index";

export const QuestCardContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ isSelected }) => ({
  position: "relative",
  transition: "all 0.3s ease",
  cursor: "pointer",
  filter: isSelected
    ? "grayscale(0%) brightness(1)"
    : "grayscale(100%) brightness(0.9)",

  "& img": {
    borderRadius: "25px",
  },

  "&:hover": {
    transform: "scale(1.05)",
    filter: "grayscale(0%) brightness(1)",
  },
}));

export const QuestCardTitle = styled(QuestCardText)`
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
`;

export const QuestCardDescription = styled(QuestCardText)`
  position: absolute;
  top: 425px;
  left: 50%;
  transform: translateX(-50%);
`;

export const QuestCardReward = styled(QuestCardText)(
  ({ theme: { spacing } }) => ({
    position: "absolute",
    bottom: "1px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: spacing(2),
  }),
);
