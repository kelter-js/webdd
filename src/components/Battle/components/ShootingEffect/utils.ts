import { Point } from "./types";

export const getCenter = (el: HTMLElement): Point => {
  const rect = el.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY,
  };
};
