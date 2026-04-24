import { Box, styled } from "@mui/material";

export const ShootingContainer = styled(Box)(() => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 9999,
}));
