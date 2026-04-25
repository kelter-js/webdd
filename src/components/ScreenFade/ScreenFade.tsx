import { FC, useEffect, useState } from "react";
import { Fade } from "@mui/material";

import { ONE_SECOND_IN_MS } from "../../constants";
import { ScreenFadeProps } from "./types";
import { FadeContainer } from "./ScreenFade.styled";

const timeout_config = { enter: 100, exit: 500 };

export const ScreenFade: FC<ScreenFadeProps> = ({
  isVisible,
  onFadeComplete,
  duration = ONE_SECOND_IN_MS,
  color = "rgb(0, 0, 0)",
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
    <Fade in={internalVisible} timeout={timeout_config ?? duration}>
      <FadeContainer color={color} isVisible={isVisible} />
    </Fade>
  );
};
