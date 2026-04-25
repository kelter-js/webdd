import { MotionStyle } from "framer-motion";

export const TRANSFORM_STYLES = [
  "linear-gradient(90deg, transparent 0%, transparent 100%)",
  "linear-gradient(90deg, #5a3020 0%, #c08040 100%)",
];

export const MAIN_CONTAINER_TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 260,
  damping: 18,
};
export const MAIN_CONTAINER_STYLES: MotionStyle = {
  position: "absolute",
  top: 40,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,
};

export const MAIN_CONTAINER_INITIAL_CONFIG = {
  y: -120,
  opacity: 0,
  rotate: -8,
};
export const MAIN_CONTAINER_ANIMATE_CONFIG = { y: 0, opacity: 1, rotate: 0 };
