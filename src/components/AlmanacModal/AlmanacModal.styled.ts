import { styled, Box } from "@mui/material";

export const ControlsContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 50,
  right: 0,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));
