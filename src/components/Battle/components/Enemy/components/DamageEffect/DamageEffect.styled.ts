import { styled } from "@mui/system";
import { motion } from "framer-motion";

export const DamageNumber = styled(motion.div)`
  position: absolute;
  font-size: 32px;
  font-weight: 900;
  pointer-events: none;
  z-index: 999999999;
  font-family: "Arial Black", sans-serif;

  /* Borderlands стиль - желтый/оранжевый с черной обводкой */
  color: #ffd700;
  -webkit-text-stroke: 2px #000000;
  text-stroke: 2px #000000;
  text-shadow:
    0 0 10px #ff4500,
    0 0 20px #ff0000;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.7));
`;

export const CriticalText = styled(motion.div)`
  font-size: 20px;
  font-weight: 900;
  pointer-events: none;
  font-family: "Arial Black", sans-serif;

  /* Яркий оранжево-красный градиент */
  color: #ff0000;
  -webkit-text-stroke: 1.5px #000000;
  text-stroke: 1.5px #000000;
  text-shadow:
    0 0 8px #ff4500,
    0 0 16px #ff0000;

  /* Дополнительные эффекты */
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
