import { useEffect, useRef, useState } from "react";

import { NO_MORE_ATTEMPTS } from "./constants";
import { useGameState } from "../../../stores";
import { generateSequence } from "./utils";
import { MiniGameProps } from "../types";

// REFACTORING CHECKED ✅

export const useQTEGame = ({ onFail, onWin }: MiniGameProps) => {
  const {
    changeAttempts,
    player: { location },
  } = useGameState();

  const gameAttempts = location?.attempts ?? NO_MORE_ATTEMPTS;

  useEffect(() => {
    if (gameAttempts === NO_MORE_ATTEMPTS) {
      onFail();
    }
  }, [gameAttempts]);

  const startBtnRef = useRef<HTMLButtonElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<HTMLDivElement | null>(null);
  const totalTimeRef = useRef<HTMLDivElement | null>(null);
  const startInterval = useRef<number>(0);
  const gameActive = useRef<boolean>(false);
  const gameInterval = useRef<number | null>(null);

  const [sequence, setSequence] = useState<string[]>(generateSequence);
  const [currentIndex, setIndex] = useState(0);
  const [gameActiveFlag, setGameActiveFlag] = useState(false);

  useEffect(() => {
    if (currentIndex >= sequence.length - 1) {
      onWin();
    }
  }, [currentIndex, sequence, onWin]);

  const MAX_INTERVAL = 3.0;

  const startGame = () => {
    setSequence(generateSequence());
    setIndex(0);
    gameActive.current = true;
    setGameActiveFlag(true);
    startInterval.current = 0;

    if (startBtnRef.current) {
      startBtnRef.current.style.display = "none";
    }

    if (resultRef.current) {
      resultRef.current.style.display = "none";
      resultRef.current.innerHTML = "";
    }

    if (timerRef.current) {
      timerRef.current.textContent = "▶ Удерживайте ПРОБЕЛ";
    }

    if (totalTimeRef.current) {
      totalTimeRef.current.textContent = "0.0/3.0s";
    }

    gameInterval.current = setInterval(gameLoop, 16);
  };

  const gameLoop = () => {
    if (!gameActive.current) return;

    startInterval.current += 0.1;

    if (totalTimeRef.current) {
      totalTimeRef.current.textContent = `${startInterval.current.toFixed(
        1
      )}/3.0s`;
    }
  };

  const endGame = (success: boolean) => {
    gameActive.current = false;
    setGameActiveFlag(false);
    startInterval.current = 0;

    if (gameInterval.current) clearInterval(gameInterval.current);

    if (resultRef.current) {
      resultRef.current.style.display = "block";
      resultRef.current.innerHTML = success
        ? "🎉 ПОБЕДА! Вы выдержали испытание 8 секунд"
        : "💀 ПРОВАЛ. Попробуйте ещё раз!";
      resultRef.current.style.color = success ? "#0f0" : "#d33";
    }

    if (success) {
      onWin();
    }

    changeAttempts(gameAttempts - 1);

    if (startBtnRef.current && gameAttempts > 0 && !success) {
      startBtnRef.current.style.display = "block";
      startBtnRef.current.textContent = "Повторить";
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameActive.current) {
        if (
          e.code === `Key${sequence[currentIndex]}` ||
          e.code === `Digit${sequence[currentIndex]}`
        ) {
          setIndex((state) => state + 1);
          startInterval.current = 0;
        } else {
          endGame(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const autoFailInterval = setInterval(() => {
      if (startInterval.current >= MAX_INTERVAL) {
        endGame(false);
      }
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      clearInterval(autoFailInterval);
    };
  }, [gameAttempts, currentIndex, sequence]);

  return {
    gameActiveFlag,
    sequence,
    currentIndex,
    startGame,
    startBtnRef,
    totalTimeRef,
    gameAttempts,
    resultRef,
  };
};
