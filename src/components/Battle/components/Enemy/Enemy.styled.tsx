import { styled } from "@mui/system";
import { FragmentProps } from "./types";

export const Container = styled("div")({
  position: "absolute",
  width: "408px",
  height: "612px",
  overflow: "hidden",
  textAlign: "center",
  zIndex: 99999999,
  left: "50%",
  top: "10%", // вертикальное смещение выше центра
  transform: "translateX(-50%)",
});

// Стилизованный фрагмент
export const Fragment = styled("div", {
  shouldForwardProp: (prop: PropertyKey) =>
    !["dx", "dy", "animated", "imgSrc"].includes(prop as string),
})<FragmentProps>(({ dx, dy, animated, imgSrc }) => ({
  position: "absolute",
  width: `${408 / 12}px`,
  height: `${612 / 12}px`,
  backgroundImage: `url(${imgSrc})`,
  backgroundSize: "408px 612px",
  transformOrigin: "center",
  "--dx": dx,
  "--dy": dy,
  animation: animated ? "disperse 1.5s forwards" : "none",
  willChange: "transform, opacity",
  zIndex: 99999999,

  "@keyframes disperse": {
    to: {
      transform: `translate(var(--dx), var(--dy)) rotate(360deg) scale(0)`,
      opacity: 0,
    },
  },
}));
