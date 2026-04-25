import { Typography, styled } from "@mui/material";

export const TurnName = styled(Typography)(() => ({
  color: "#FF6B6B",
  fontFamily: "inherit",
  textShadow: `
                      0 0 10px #8B0000,
                      2px 2px 4px rgba(0, 0, 0, 0.8),
                      -1px -1px 0 rgba(139, 0, 0, 0.5)
                    `,
  letterSpacing: "4px",
  fontWeight: "bold",
  textTransform: "uppercase",
  position: "relative",
  zIndex: 2,
}));
