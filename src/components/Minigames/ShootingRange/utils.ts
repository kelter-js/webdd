import { CoordinatesData } from "../types";

export const generateTargets = ({
  count = 20,
  targetSize = 80,
} = {}): CoordinatesData[] => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const maxX = viewportWidth - targetSize;
  const maxY = viewportHeight - targetSize;

  const targets = [];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    targets.push({
      x: Math.round(x),
      y: Math.round(y),
    });
  }

  return targets;
};
