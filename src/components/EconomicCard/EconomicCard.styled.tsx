import { styled, Typography } from "@mui/material";

export const QuestCardContainer = styled("div")`
  position: relative;
  transition: transform 0.3s ease;
  cursor: pointer;
  & img {
    border-radius: 25px;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export const QuestCardTitle = styled(Typography)`
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
`;

export const QuestCardDescription = styled(Typography)`
  position: absolute;
  top: 425px;
  left: 50%;
  transform: translateX(-50%);
`;

export const QuestCardReward = styled(Typography)`
  position: absolute;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
`;
