import { MotionStyle, Transition } from "framer-motion";
import { POSITIONS } from "./entities";

export const positions = {
  [POSITIONS.TOP_LEFT]: { top: -10, left: -10, transform: "rotate(0deg)" },
  [POSITIONS.TOP_RIGHT]: { top: -10, right: -10, transform: "rotate(90deg)" },
  [POSITIONS.BOTTOM_LEFT]: {
    bottom: -10,
    left: -10,
    transform: "rotate(270deg)",
  },
  [POSITIONS.BOTTOM_RIGHT]: {
    bottom: -10,
    right: -10,
    transform: "rotate(180deg)",
  },
};

export const BLOOD_DROP_DEFAULT_COUNT = 6;
export const SHARDS_DEFAULT_COUNT = 8;
export const SHARDS_DEFAULT_COLOR = "#FF0000";

// BLOOD DROPS animation configs
export const BLOOD_DROPS_INITIAL_CONFIG = { scale: 0, opacity: 0 };
export const BLOOD_DROPS_STYLE_CONFIG: MotionStyle = {
  position: "absolute",
  width: 3 + Math.random() * 4,
  height: 3 + Math.random() * 4,
  backgroundColor: "#8B0000",
  borderRadius: "50%",
  top: "60%",
  left: `${40 + Math.random() * 20}%`,
  filter: "blur(0.5px)",
};
export const BLOOD_DROPS_TRANSITION_CONFIG = {
  duration: 2 + Math.random(),
  repeat: Infinity,
  repeatDelay: Math.random() * 2,
  ease: "easeOut",
};
export const BLOOD_DROPS_EXIT_CONFIG = {
  scale: 0,
  opacity: 0,
};
export const BLOOD_DROPS_ANIMATE_CONFIG = {
  scale: [0, 1, 0.8, 0],
  opacity: [0, 1, 0.8, 0],
  y: [0, -20, -40, -60],
};

// ORNAMENT animation configs
export const ORNAMENT_INITIAL_CONFIG = { scale: 0, opacity: 0 };
export const ORNAMENT_ANIMATION_CONFIG = { scale: 1, opacity: 1 };
export const ORNAMENT_EXIT_CONFIG = { scale: 0, opacity: 0 };
export const ORNAMENT_TRANSITION_CONFIG = { delay: 0.2, duration: 0.4 };

// SHARDS animation configs
export const SHARDS_INITIAL_CONFIG = {
  x: 0,
  y: 0,
  opacity: 1,
  rotate: 0,
};
export const SHARDS_EXIT_CONFIG = {
  opacity: 0,
  scale: 0,
};
export const SHARDS_TRANSITION_CONFIG: Transition = {
  duration: 1.5 + Math.random() * 0.5,
  repeat: Infinity,
  repeatType: "loop",
  ease: "easeOut",
  times: [0, 0.5, 1],
};
export const getShardsAnimationConfig = (angle: number, distance: number) => ({
  x: [
    0,
    Math.cos((angle * Math.PI) / 180) * distance * 0.3,
    Math.cos((angle * Math.PI) / 180) * distance,
  ],
  y: [
    0,
    Math.sin((angle * Math.PI) / 180) * distance * 0.3,
    Math.sin((angle * Math.PI) / 180) * distance,
  ],
  opacity: [1, 0.8, 0],
  rotate: [0, 180, 360],
  scale: [1, 1.2, 0.5],
});
export const SHARDS_STYLE_CONFIG: MotionStyle = {
  position: "absolute",
  width: 1,
  height: 15 + Math.random() * 10,
  top: "50%",
  left: "50%",
  transformOrigin: "center center",
};

//TURN_INDICATOR animation configs
export const TURN_INDICATOR_STYLE_CONFIG: MotionStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 9999999999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
};

export const TURN_INDICATOR_MAIN_CONTAINER_INITIAL_CONFIG = {
  scale: 0,
  opacity: 0,
  rotateY: -90,
  filter: "blur(20px)",
};
export const TURN_INDICATOR_MAIN_CONTAINER_ANIMATE_CONFIG = {
  scale: 1,
  opacity: 1,
  rotateY: 0,
  filter: "blur(0px)",
};
export const TURN_INDICATOR_MAIN_CONTAINER_EXIT_CONFIG = {
  scale: 0,
  opacity: 0,
  rotateY: 90,
  filter: "blur(20px)",
};
export const TURN_INDICATOR_MAIN_CONTAINER_TRANSITION_CONFIG = {
  duration: 0.6,
  type: "spring",
  stiffness: 120,
  damping: 12,
};
export const TURN_INDICATOR_MAIN_PANEL_ANIMATE_CONFIG = {
  boxShadow: [
    "0 0 0px rgba(139, 0, 0, 0.5)",
    "0 0 30px rgba(255, 0, 0, 0.8)",
    "0 0 15px rgba(139, 0, 0, 0.5)",
  ],
};
export const TURN_INDICATOR_MAIN_PANEL_TRANSITION_CONFIG: Transition = {
  duration: 2,
  repeat: Infinity,
  repeatType: "reverse",
};
export const TURN_INDICATOR_MAIN_PANEL_STYLE_CONFIG: MotionStyle = {
  padding: "2rem 3rem",
  border: "3px solid #8B0000",
  borderRadius: "4px",
  backgroundColor: "rgba(20, 0, 0, 0.9)",
  position: "relative",
  overflow: "hidden",
};
export const TURN_INDICATOR_PATTERNS_STYLE_CONFIG: MotionStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
                    radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 50%)
                  `,
};
export const TURN_INDICATOR_PULSE_TRANSITION_CONFIG: Transition = {
  duration: 2,
  repeat: Infinity,
  repeatType: "loop",
};
export const TURN_INDICATOR_PULSE_STYLE_CONFIG: MotionStyle = {
  position: "absolute",
  top: -2,
  left: -2,
  right: -2,
  bottom: -2,
  border: "2px solid #FF0000",
  borderRadius: "6px",
  filter: "blur(1px)",
};
