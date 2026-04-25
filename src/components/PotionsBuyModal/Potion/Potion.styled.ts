import { Stack, styled } from "@mui/material";

export const PotionContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isDisabled",
})<{ isDisabled: boolean }>(({ isDisabled }) => ({
  position: "absolute",
  width: "85px",
  height: "97px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  opacity: isDisabled ? 0.3 : 1,
}));
