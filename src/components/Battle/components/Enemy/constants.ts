export const bossRows = 12;
export const bossCols = 12;
export const rows = 6;
export const cols = 6;

export const imageWidth = 408;
export const imageHeight = 612;
export const fragWidth = imageWidth / cols;
export const fragHeight = imageHeight / rows;

export const bossImageWidth = 650;
export const bossImageHeight = 754;
export const bossFragWidth = bossImageWidth / cols;
export const bossFragHeight = bossImageHeight / rows;

export const DEFAULT_ANIMATION_STATE = { x: "-50%", scale: 1, y: 0, rotate: 0 };

export const ANIMATION_VARIANTS = {
  idle: DEFAULT_ANIMATION_STATE,

  attack: {
    scale: [1, 0.95, 1.3, 1],
    y: [0, -20, 100, 0],
    x: "-50%",
  },

  hit: {
    x: ["-50%", "-55%", "-45%", "-52%", "-48%", "-50%"],
    rotate: [0, -2, 2, -2, 2, 0],
    filter: ["brightness(1)", "brightness(1.8)", "brightness(1)"],
  },
};

export const ATTACKING_TRANSITION_CONFIG = {
  duration: 0.6,
  times: [0, 0.2, 0.4, 1],
  ease: "easeInOut",
};
export const UNDER_ATTACK_TRANSITION_CONFIG = {
  duration: 0.4,
  ease: "linear",
};
