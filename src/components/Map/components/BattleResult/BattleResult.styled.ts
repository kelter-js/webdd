import { styled, Stack, Typography, Button } from "@mui/material";

export const RewardEntityContainer = styled(Stack)(
  ({ theme: { spacing } }) => ({
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    gap: spacing(1),
  }),
);

export const RewardExpText = styled(Typography)(() => ({
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  fontFamily: "inherit",
  fontSize: 30,
}));

export const ResourceSelectionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{
  isSelected: boolean;
}>(({ isSelected }) => ({
  minWidth: 40,
  border: isSelected ? "1px solid #e0c0a0" : "none",
  cursor: "pointer",
}));
