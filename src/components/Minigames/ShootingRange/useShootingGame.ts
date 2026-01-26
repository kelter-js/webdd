import { useEffect, useState } from "react";
import { generateTargets } from "./utils";
import { useGameState } from "../../../stores";
import { NO_MORE_ATTEMPTS } from "../QTEGame/constants";
import { CoordinatesData, MiniGameProps } from "../types";

const MAX_INDEX = 19;
const GAME_OVER_FAILS = 5;

export const useShootingGame = ({ onFail, onWin }: MiniGameProps) => {
  const [targets, setTargets] = useState<CoordinatesData[]>(generateTargets());
  const [failsAmount, setFailsAmount] = useState(0);
  const [currentIndex, setIndex] = useState(0);
  const [isStarted, setStarted] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<number[]>([]);

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

  useEffect(() => {
    if (isStarted) {
      const timerId = setTimeout(() => {
        setIndex((state) => state + 1);
        setFailsAmount((state) => state + 1);
      }, 800);
      return () => clearTimeout(timerId);
    }
  }, [isStarted, currentIndex]);

  useEffect(() => {
    if (currentIndex >= MAX_INDEX) {
      onWin();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (failsAmount >= GAME_OVER_FAILS) {
      setStarted(false);
      setIndex(0);
      changeAttempts(gameAttempts - 1);
      setAnimatedElements([]);
    }
  }, [failsAmount]);

  const handleRestart = () => {
    setTargets(generateTargets());
    setStarted(true);
    setFailsAmount(0);
  };

  const handleHitTarget = () => {
    setAnimatedElements((state) => [...state, currentIndex]);
    setIndex((state) => state + 1);
  };

  const handleAnimationEnd = (index: number) => {
    setAnimatedElements((state) => state.filter((item) => item !== index));
  };

  return {
    currentIndex,
    isStarted,
    targets,
    handleRestart,
    animatedElements,
    handleHitTarget,
    handleAnimationEnd,
  };
};
