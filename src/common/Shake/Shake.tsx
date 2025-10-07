import { useEffect, FC } from "react";
import { motion, useAnimation } from "framer-motion";

import {
  SHAKING_X_COORDINATES,
  SHAKING_Y_COORDINATES,
  DEFAULT_SHAKE_DURATION,
} from "./constants";
import { useAppState } from "../../stores/AppState";
import { ONE_SECOND_IN_MS } from "../../constants";
import { ScreenShakeProps } from "./types";
import { ShakeContainer } from "./Skare.styled";

// REFACTORING CHECKED ✅

export const Shake: FC<ScreenShakeProps> = ({
  children,
  duration = DEFAULT_SHAKE_DURATION,
}) => {
  const controls = useAnimation();

  const { isShaking, toggleShaking } = useAppState();

  useEffect(() => {
    if (isShaking) {
      controls.start({
        x: SHAKING_X_COORDINATES,
        y: SHAKING_Y_COORDINATES,
        transition: {
          duration: duration / ONE_SECOND_IN_MS,
          ease: "easeInOut",
        },
      });

      // Через duration сбрасываем shake
      const timeout = setTimeout(() => {
        toggleShaking();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [isShaking, controls, duration, toggleShaking]);

  return (
    <ShakeContainer>
      <motion.div
        style={{
          position: "relative",
          display: "inline-block",
        }}
        animate={controls}
      >
        {children}
      </motion.div>
    </ShakeContainer>
  );
};
