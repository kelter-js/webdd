import { Transition } from "framer-motion";

export const BLACK_HOLE_ANIMATION_CONFIG = {
  clipPath: "circle(150% at 50% 50%)",
  transition: {
    duration: 3,
    ease: "easeOut",
  },
};
export const BLACK_HOLE_INITIAL_CONFIG = {
  clipPath: "circle(0% at 50% 50%)",
};

export const STATIC_INTERFERENCE_ANIMATION_CONFIG = {
  opacity: 0.5,
  transition: {
    delay: 1,
    duration: 1,
  },
};

export const STATIC_INTERFERENCE_INITIAL_CONFIG = { opacity: 0 };

export const INTERFERENCE_LINE_INITIAL_CONFIG = { y: "-100%" };

export const FLASH_ANIMATION_CONFIG = {
  opacity: [0, 0.8, 0],
  scaleY: [1, 1.5, 1],
};

export const HORIZONTAL_WAVE_ANIMATION_CONFIG = {
  transform: [
    "translateY(0px) scaleY(1)",
    "translateY(-3px) scaleY(1.02)",
    "translateY(2px) scaleY(0.98)",
    "translateY(0px) scaleY(1)",
  ],
};
export const HORIZONTAL_WAVE_TRANSITION_CONFIG: Transition = {
  duration: 0.2,
  repeat: Infinity,
  repeatType: "reverse",
};

export const THIN_LINES_ANIMATION_CONFIG = {
  opacity: 0.6,
  transition: { delay: 1.3 },
};

const TWINKLING_TRANSITION_CONFIG: Transition = {
  delay: 1.5,
  duration: 0.8,
  repeat: Infinity,
  repeatType: "loop",
};

export const TWINKLING_OVERLAY_ANIMATION_CONFIG = {
  opacity: [0, 0.15, 0, 0.08, 0, 0.12, 0, 0.05, 0],
  transition: TWINKLING_TRANSITION_CONFIG,
};

export const GAME_END_ANIMATION_CONFIG = {
  opacity: 1,
  scale: 1,
  y: 0,
  transition: {
    delay: 2.5,
    duration: 1,
    ease: "easeOut",
  },
};

export const GAME_END_INITIAL_CONFIG = { opacity: 0, scale: 0.8, y: 20 };

export const GAME_END_DUPLICATE_ANIMATION_CONFIG = {
  opacity: [1, 0.2, 1, 0.6, 1, 0.3, 1],
  filter: ["blur(0px)", "blur(2px)", "blur(0px)", "blur(1px)"],
  x: [0, -2, 2, -1, 1, 0],
  y: [0, 1, -1, 0],
};

export const GAME_END_DUPLICATE_TRANSITION_CONFIG: Transition = {
  delay: 3,
  duration: 0.3,
  repeat: Infinity,
  repeatType: "reverse",
};

export const RANDOM_LINES_ANIMATION_CONFIG = {
  y: "200%",
  opacity: [0, 0.4, 0.2, 0],
};

export const RANDOM_LINES_INITIAL_CONFIG = {
  y: "-100%",
  opacity: 0,
};
