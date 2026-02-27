import { Typography, styled } from "@mui/material";

// Твой существующий стиль
export const StartGameText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "disabled",
})<{ disabled: boolean }>(({ theme: { spacing }, disabled }) => ({
  pointerEvents: disabled ? "none" : "all",
  opacity: disabled ? 0.3 : 1,
  width: "100%",
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",
  borderTop: "1px solid #5a3020",
  fontFamily: "inherit",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.2s ease",
  textAlign: "center",
  fontSize: 25,
  zIndex: 1,

  "&:active": {
    transform: "scale(0.98)",
  },
}));
