import { useMemo, FC } from "react";
import { motion } from "framer-motion";

import { ENIMATE_IDLE, TRANSITION_CONFIG } from "./constants";
import { TargetProps } from "./types";
import staticTarget from "../../../../../assets/static/target.png";

const DISTANCE = 40;

export const Target: FC<TargetProps> = ({
  isScattering,
  onScatterComplete,
}) => {
  const scatterOffset = useMemo(() => {
    const angle = Math.random() * Math.PI * 2;

    return {
      x: Math.cos(angle) * DISTANCE,
      y: Math.sin(angle) * DISTANCE,
    };
  }, []);

  return (
    <motion.div
      initial={false}
      animate={
        isScattering
          ? {
              opacity: 0,
              scale: 0.4,
              x: scatterOffset.x,
              y: scatterOffset.y,
              filter: "blur(6px)",
            }
          : ENIMATE_IDLE
      }
      transition={TRANSITION_CONFIG}
      onAnimationComplete={() => {
        if (isScattering) {
          onScatterComplete?.();
        }
      }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      <img src={staticTarget} />
    </motion.div>
  );
};
