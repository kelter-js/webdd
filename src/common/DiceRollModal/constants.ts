import { MotionStyle } from "framer-motion";
import { DicesData } from "./types";

export const DEFAULT_DICES_STATE: DicesData = [null, null];
export const DICES_SIDES = 6;
export const DICES_ROLL_DURATION = 500;
export const DICES_AMOUNT = [0, 1];

export const DICE_SHADOWS_INITIAL = { opacity: 0 };
export const DICE_SHADOWS_ANIMATE = { opacity: 0.9 };
export const DICE_SHADOWS_EXIT = { opacity: 0 };
export const DICE_SHADOWS_STYLES: MotionStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background:
    "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(20,0,0,0.95) 100%)",
};
export const DICE_ROLL_CONTAINER_STYLES: MotionStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "40px",
  zIndex: 9999999999,
};

export const DICE_STYLES: MotionStyle = {
  width: "80px",
  height: "80px",
  backgroundColor: "#1a1a1a",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  color: "#c0c0c0",
  boxShadow: "0 0 10px rgba(139, 0, 0, 0.7)",
  border: "2px solid #500000",
};

export const DICE_ROLL_ANIMATE = {
  rotateX: [0, 720, 1440],
  rotateY: [0, 360, 720],
  y: [-300, 30, 0],
};

export const DICE_ROLL_STATIC_ANIMATE = {
  rotateX: 0,
  rotateY: 0,
  y: 0,
};

export const DICE_TRANSITION = {
  duration: 1,
  ease: [0.2, 0.8, 0.4, 1],
};
