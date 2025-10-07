import { styled } from "@mui/material";
import { motion } from "framer-motion";

export const LevelUpContainer = styled("div")(() => ({
  position: "absolute",
  top: -77,
  left: "50%",
  transform: "translate(-50%, 0)",
  width: 600,
  height: 400,

  "& img": {
    width: 400,
    height: 400,
  },
}));

export const AnimatedTextBase = styled(motion.p)(() => ({
  position: "absolute",
  padding: 0,
  margin: 0,
  textTransform: "uppercase",
  fontFamily: "Cormorant Unicase",
  transform: "translate(-50%, 0)",
  left: "50%",
}));

export const PlayerName = styled(AnimatedTextBase)(() => ({
  top: 245,
  color: "#e6c07b",
  textShadow: "0 0 4px #5c3b1e, 0 0 8px #d4af37",
  fontWeight: "bold",
  fontSize: 35,
  letterSpacing: 2,
}));

export const PlayerLevel = styled(AnimatedTextBase)(() => ({
  display: "block",
  top: 142,
  color: "#ffd700",
  fontSize: 56,
  textShadow: "0 0 4px #ff0000, 0 0 10px #ff6600",
  fontWeight: "900",
  zIndex: 1000000,
}));
