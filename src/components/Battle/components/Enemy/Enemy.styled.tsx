import { styled } from "@mui/system";
import { FragmentProps } from "./types";
import { motion } from "framer-motion";

export const Container = styled(motion.div, {
  shouldForwardProp: (prop: PropertyKey) => !["left"].includes(prop as string),
})<{ left: string }>(({ left }) => ({
  position: "absolute",
  width: "408px",
  height: "555px",
  overflow: "hidden",
  textAlign: "center",
  zIndex: 99999999,
  left: left,
  top: "0%", // вертикальное смещение выше центра
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

export const HealthBar = styled("div")(({ theme }) => ({
  background: "#2a1a1a",
  borderRadius: "4px",
  boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.4)",
  width: "100px",
  height: "25px",
  marginTop: theme.spacing(0.5),

  /* Заполнение (HP) */
  "& > div": {
    background: "linear-gradient(90deg, #e34d4d, #ff6b6b)",
    borderRadius: "4px",
    boxShadow: "0 0 6px rgba(227, 77, 77, 0.4)",
    transition: "width 0.3s ease",
  },
}));
