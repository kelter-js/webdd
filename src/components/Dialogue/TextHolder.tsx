import { FC, useEffect, useRef, useState } from "react";
import { SmoothText } from "./Dialogue.styled";
import { TextHolderProps } from "./types";
import typewriteEffect from "../../assets/audio/typewriter.mp3";
import { usePlayer } from "../../contexts/Player";
import { DIALOGUE_AMBIENT_PLAYER_REF } from "./constants";

const TEXT_DURATION_PER_SYMBOL = 50;

export const TextHolder: FC<TextHolderProps> = ({ text }) => {
  const [visibleText, setVisibleText] = useState("");
  const animationRef = useRef<number>(0);
  const startTime = useRef<number | null>(null);
  const duration = text.length * TEXT_DURATION_PER_SYMBOL;
  const { handleSetSrc, getPlayerRef } = usePlayer();

  const playerRef = getPlayerRef(DIALOGUE_AMBIENT_PLAYER_REF);

  useEffect(() => {
    handleSetSrc(DIALOGUE_AMBIENT_PLAYER_REF, typewriteEffect);
  }, []);

  useEffect(() => {
    if (visibleText !== text) {
      playerRef?.play();
    } else {
      playerRef?.pause();
    }
  }, [visibleText, text]);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const charsToShow = Math.floor(progress * text.length);

      setVisibleText(text.slice(0, charsToShow));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      startTime.current = null;
    };
  }, [text, duration]);

  return <SmoothText variant="h6">{visibleText}</SmoothText>;
};
