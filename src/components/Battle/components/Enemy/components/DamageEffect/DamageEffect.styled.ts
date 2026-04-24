import { styled } from "@mui/system";
import { motion } from "framer-motion";

type DamageNumberProps = {
  isHealing?: boolean;
};

export const DamageNumber = styled(motion.div, {
  shouldForwardProp: (prop: string) => !["isHealing"].includes(prop),
})<DamageNumberProps>(({ isHealing = false }) => ({
  position: "absolute",
  fontSize: "32px",
  fontWeight: 900,
  pointerEvents: "none",
  zIndex: 999999999,
  fontFamily: '"Arial Black", sans-serif',

  color: isHealing ? "#00ff88" : "#ffd700",

  WebkitTextStroke: "2px #000000",
  textStroke: "2px #000000",

  textShadow: isHealing
    ? `
      0 0 10px #00ff88,
      0 0 20px #00cc66
    `
    : `
      0 0 10px #ff4500,
      0 0 20px #ff0000
    `,

  filter: isHealing
    ? "drop-shadow(0 2px 4px rgba(0, 80, 0, 0.7))"
    : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.7))",
}));

export const CriticalText = styled(motion.div)`
  font-size: 20px;
  font-weight: 900;
  pointer-events: none;
  font-family: "Arial Black", sans-serif;

  color: #ff0000;
  -webkit-text-stroke: 1.5px #000000;
  text-stroke: 1.5px #000000;
  text-shadow:
    0 0 8px #ff4500,
    0 0 16px #ff0000;

  letter-spacing: 1px;
  text-transform: uppercase;
  filter: brightness(1.3) drop-shadow(0 2px 4px #000);
`;

interface NumbersContainerProps {
  hasId?: boolean;
  x?: number;
  y?: number;
}

const shouldForwardProp = (prop: string | keyof NumbersContainerProps) =>
  !["hasId", "x", "y"].includes(prop as string);

export const NumbersContainer = styled("div", {
  shouldForwardProp,
})<NumbersContainerProps>(({ hasId = false, x = 0, y = 0 }) => ({
  position: hasId ? "fixed" : "absolute",
  left: `${x}px`,
  top: `${y}px`,
}));
