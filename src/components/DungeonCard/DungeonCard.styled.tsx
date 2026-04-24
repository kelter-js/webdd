import { styled, Stack } from "@mui/material";
import { QuestCardText } from "../../common/styled.index";

export const QuestCardContainer = styled("div")`
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  filter: grayscale(100%) brightness(0.9);

  & img {
    border-radius: 25px;
  }

  &:hover {
    transform: scale(1.05);
    filter: grayscale(0%) brightness(1);
  }
`;

export const QuestCardTitle = styled(QuestCardText)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const QuestCardDescription = styled(QuestCardText)`
  position: absolute;
  top: 425px;
  left: 50%;
  transform: translateX(-50%);
`;

export const CardsContainer = styled(Stack)(({ theme: { spacing } }) => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: spacing(5),
  height: "100%",
  paddingTop: spacing(14),
  alignItems: "center",
}));
