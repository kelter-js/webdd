import { FC, useEffect, useRef, useState } from "react";
import {
  animate,
  AnimationPlaybackControls,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { ONE_SECOND_IN_MS } from "../../../constants";
import { usePlayer } from "../../../contexts/Player";
import { HoldProgressButtonProps } from "../types";
import craftSfx from "../../../assets/audio/craft.mp3";
import { CraftButton } from "../CraftModal.styled";
import { TRANSFORM_STYLES } from "./CraftDrop/constants";

const CRAFT_SFX = "craftSfx";

export const HoldProgressButton: FC<HoldProgressButtonProps> = ({
  children,
  onComplete,
  duration = 2000,
  sx = {},
  disabled,
}) => {
  const [isHolding, setIsHolding] = useState(false);

  const progress = useMotionValue(0);
  const holdTimerRef = useRef<AnimationPlaybackControls | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { handleSetSrc, handleRemoveSrc } = usePlayer();

  useTransform(progress, [0, 100], TRANSFORM_STYLES);

  const widthStyle = useTransform(progress, [0, 100], ["0%", "100%"]);

  const handleMouseDown = (): void => {
    if (disabled) return;

    handleSetSrc(CRAFT_SFX, craftSfx);
    setIsHolding(true);
    progress.set(0);

    const controls = animate(progress, 100, {
      duration: duration / ONE_SECOND_IN_MS,
      ease: "linear",
      onComplete: () => {
        setIsHolding(false);
        progress.set(0);
        onComplete?.();
      },
    });

    holdTimerRef.current = controls;
  };

  const handleMouseUp = (): void => {
    if (disabled) return;
    handleRemoveSrc(CRAFT_SFX);
    if (holdTimerRef.current) {
      holdTimerRef.current.stop();
    }
    setIsHolding(false);
    progress.set(0);
  };

  const handleMouseLeave = (): void => {
    if (disabled) return;

    if (isHolding) {
      if (holdTimerRef.current) {
        holdTimerRef.current.stop();
      }

      setIsHolding(false);
      progress.set(0);
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        holdTimerRef.current.stop();
      }
    };
  }, []);

  return (
    <CraftButton
      ref={buttonRef}
      as={motion.div}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      sx={{ position: "relative", cursor: "pointer", ...sx }}
      disabled={disabled}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: widthStyle,
          background: "linear-gradient(90deg, #5a3020 0%, #c08040 100%)",
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      <span style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
        {children}
      </span>
    </CraftButton>
  );
};
