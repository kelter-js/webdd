import { styled } from "@mui/material";

export const PlayerZone = styled("div")(() => ({
  display: "none",
  position: "absolute",
  width: "80px",
  height: "80px",
  background: "rgba(200, 200, 200, 0.7)",
  left: "50px",
  top: "110px",
  transition: "all 0.05s",
}));

export const TargetZone = styled("div")(() => ({
  display: "none",
  position: "absolute",
  width: "80px",
  height: "80px",
  background: "rgba(0, 255, 0, 0.2)",
  border: "2px solid #0f0",
  top: "110px",
  left: "200px",
}));

export const StartButton = styled("button")(({ theme: { spacing } }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",

  outline: 0,
  border: 0,
  margin: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  textDecoration: "none",

  fontFamily: "inherit",
  fontWeight: 700,
  fontSize: "1.5rem",
  lineHeight: 1.334,
  letterSpacing: "1px",
  textTransform: "uppercase",

  width: "100%",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",

  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",

  backgroundColor: "var(--variant-textBg, transparent)",
  color: "var(--variant-textColor, #c08040)",
  minWidth: 64,
  borderRadius: "4px",
}));

export const Hint = styled("span")(({ theme: { spacing } }) => ({
  margin: 0,
  position: "absolute",
  bottom: "20px",
  textAlign: "center",
  width: "100%",
  fontFamily: "inherit",
  fontWeight: "bold",
  fontSize: "0.75rem",
  lineHeight: 1.66,
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "#c08040",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",
}));

export const TotalTime = styled("div")(() => ({
  position: "absolute",
  top: "10px",
  left: "10px",
  fontSize: "24px",
  color: "#0f0",
}));

export const GameTime = styled("div")(() => ({
  position: "absolute",
  top: "45px",
  left: "10px",
  fontSize: "18px",
  color: "var(--variant-textColor, #c08040)",
}));

export const Attempts = styled("div")(() => ({
  position: "absolute",
  top: "15px",
  right: "10px",
  fontSize: "18px",
  color: "#0f0",
}));
