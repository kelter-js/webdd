import { Box, styled } from "@mui/material";
import { FadeContainerProps } from "./types";

export const FadeContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "isVisible",
})<FadeContainerProps>(({ color, isVisible }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: color,
  zIndex: 9999,
  pointerEvents: isVisible ? "auto" : "none",
}));
