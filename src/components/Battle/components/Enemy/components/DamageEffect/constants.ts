export const getDamageInitialAnimationConfig = (
  x: number = 0,
  y: number = 0
) => ({
  opacity: 0,
  x,
  y,
  scale: 0.5,
});

export const getDamageAnimationConfig = (x: number = 0, y: number = 0) => ({
  opacity: [0, 1, 1, 0],
  y: y - 50,
  x: x + (Math.random() - 0.5) * 20,
  scale: [0.5, 1.2, 1],
});

export const getCriticalInitialAnimationConfig = (
  x: number = 0,
  y: number = 0
) => ({
  opacity: 0,
  x,
  y: y - 30,
  scale: 0.8,
});

export const getCriticalAnimationConfig = (x: number = 0, y: number = 0) => ({
  opacity: [0, 1, 1, 0],
  y: y - 80,
  x: x + (Math.random() - 0.5) * 10,
  scale: [0.8, 1.3, 1.1],
});
