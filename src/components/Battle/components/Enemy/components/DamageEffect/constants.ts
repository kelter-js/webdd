export const DAMAGE_INITIAL_ANIMATION_CONFIG = {
  opacity: 0,
  x: 0,
  y: 0,
  scale: 0.5,
};

export const getDamageAnimationConfig = () => ({
  opacity: [0, 1, 0.8, 0],
  y: -35,
  x: (Math.random() - 0.5) * 25,
  scale: [0.5, 1.1, 0.9],
  transition: {
    duration: 1,
    times: [0, 0.2, 0.7, 1],
    ease: "easeOut",
  },
});

export const CRITICAL_INITIAL_ANIMATION_CONFIG = {
  opacity: 0,
  x: 0,
  y: 0,
  scale: 0.8,
};

export const getCriticalAnimationConfig = () => ({
  opacity: [0, 1, 1, 0],
  y: -45,
  x: (Math.random() - 0.5) * 15,
  scale: [0.8, 1.4, 1.2],
  transition: {
    duration: 1.1,
    times: [0, 0.2, 0.6, 1],
    ease: "easeOut",
  },
});
