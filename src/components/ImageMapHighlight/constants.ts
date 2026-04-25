import { CSSProperties } from "react";

export const originalWidth = 1920;
export const originalHeight = 954;
export const HOVERED_AREA_POLYGON_STYLES: CSSProperties = {
  animation: "gentlePulse 3s ease-in-out infinite alternate",
  mixBlendMode: "hard-light",
  filter: "url(#subtle-ripple)",
};
export const HOVERED_AREA_PULSE_ANIMATION_CONFIG: CSSProperties = {
  animation: `
            gentleStroke 2s ease-in-out infinite alternate,
            dashOffset 4s linear infinite
          `,
  paintOrder: "stroke",
  filter: "url(#soft-glow)",
};
