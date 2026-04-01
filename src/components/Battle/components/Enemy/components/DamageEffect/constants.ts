export const getDamageInitialAnimationConfig = (
  x: number = 0,
  y: number = 0,
) => ({
  opacity: 0,
  x: 0,
  y: 0,
  scale: 0.5,
});

export const getDamageAnimationConfig = (x: number = 0, y: number = 0) => ({
  opacity: [0, 1, 0.8, 0],
  y: -35, // Относительное смещение вверх
  x: (Math.random() - 0.5) * 25, // Относительное горизонтальное смещение
  scale: [0.5, 1.1, 0.9],
  transition: {
    duration: 1,
    times: [0, 0.2, 0.7, 1],
    ease: "easeOut",
  },
});

export const getCriticalInitialAnimationConfig = (
  x: number = 0,
  y: number = 0,
) => ({
  opacity: 0,
  x: 0,
  y: 0,
  scale: 0.8,
});

export const getCriticalAnimationConfig = (x: number = 0, y: number = 0) => ({
  opacity: [0, 1, 1, 0],
  y: -45, // Относительное смещение вверх
  x: (Math.random() - 0.5) * 15,
  scale: [0.8, 1.4, 1.2],
  transition: {
    duration: 1.1,
    times: [0, 0.2, 0.6, 1],
    ease: "easeOut",
  },
});
