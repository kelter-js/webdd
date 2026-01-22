import { motion } from "framer-motion";
import { useMemo, FC } from "react";

import staticTarget from "../../../../../assets/static/target.png";
import { TargetProps } from "./types";

export const Target: FC<TargetProps> = ({
  isScattering,
  onScatterComplete,
}) => {
  // случайное направление разлёта (фиксируется на инстанс)
  const scatterOffset = useMemo(() => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 40;

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
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
          : {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }
      }
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      onAnimationComplete={() => {
        if (isScattering) {
          onScatterComplete?.();
        }
      }}
      style={{
        willChange: "transform, opacity, filter",
      }}
    >
      <img src={staticTarget} />
    </motion.div>
  );
};
