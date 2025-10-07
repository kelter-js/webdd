import { FC, useEffect, useState } from "react";
import { Fade } from "@mui/material";

import { ScreenFadeProps } from "./types";
import { FadeContainer } from "./ScreenFade.styled";

// REFACTORING CHECKED ✅

export const ScreenFade: FC<ScreenFadeProps> = ({
  isVisible,
  onFadeComplete,
  duration = 1000,
  color = "rgb(0, 0, 0)",
  timeout,
}) => {
  const [internalVisible, setInternalVisible] = useState(isVisible);

  useEffect(() => {
    setInternalVisible(isVisible);

    if (isVisible) {
      const timer = setTimeout(() => {
        onFadeComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onFadeComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onFadeComplete]);

  return (
    <Fade in={internalVisible} timeout={timeout ?? duration}>
      <FadeContainer color={color} isVisible={isVisible} />
    </Fade>
  );
};
