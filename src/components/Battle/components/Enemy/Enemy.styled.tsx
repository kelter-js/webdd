import { motion } from "framer-motion";
import { styled } from "@mui/system";

import { FragmentProps } from "./types";

export const Container = styled(motion.div, {
  shouldForwardProp: (prop: PropertyKey) =>
    !["left", "isBoss"].includes(prop as string),
})<{ left: string; isBoss: boolean }>(({ left, isBoss }) => ({
  position: "absolute",
  width: isBoss ? "650px" : "408px",
  height: isBoss ? "704px" : "555px",
  overflow: "visible",
  textAlign: "center",
  zIndex: 99999999,
  left: left,
  top: isBoss ? "-2%" : "0%",
}));

export const TargetContainer = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999999;
`;

// Стилизованный фрагмент
export const Fragment = styled("div", {
  shouldForwardProp: (prop: PropertyKey) =>
    !["dx", "dy", "animated", "imgSrc", "isBoss"].includes(prop as string),
})<FragmentProps>(({ dx, dy, animated, imgSrc, isBoss }) => ({
  position: "absolute",
  width: `${(isBoss ? 650 : 408) / 12}px`,
  height: `${(isBoss ? 800 : 612) / 12}px`,
  backgroundImage: `url(${imgSrc})`,
  backgroundSize: `${isBoss ? "650px" : "408px"} ${isBoss ? "800" : "612px"}`,
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

export const HealthBar = styled("div")(({ theme }) => ({
  background: "#2a1a1a",
  borderRadius: "4px",
  boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.4)",
  width: "100px",
  height: "25px",
  marginTop: theme.spacing(0.5),

  "& > div": {
    background: "linear-gradient(90deg, #e34d4d, #ff6b6b)",
    borderRadius: "4px",
    boxShadow: "0 0 6px rgba(227, 77, 77, 0.4)",
    transition: "width 0.3s ease",
  },
}));
