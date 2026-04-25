import { useRef, useEffect } from "react";

import { MAX_INTERVAL_PORTAL, MIN_DELAY } from "../QTEGame/constants";
import { ONE_SECOND_IN_MS } from "../../../constants";
import { useGameState } from "../../../stores";
import { MiniGameProps } from "../types";

export const useClosePortalGame = ({ onFail, onWin }: MiniGameProps) => {
  const {
    changeAttempts,
    player: { location },
  } = useGameState();
  const gameAttempts = location?.attempts ?? 0;

  const playerZoneRef = useRef<HTMLDivElement | null>(null);
  const targetZoneRef = useRef<HTMLDivElement | null>(null);
  const startBtnRef = useRef<HTMLButtonElement | null>(null);

  const timerRef = useRef<HTMLDivElement | null>(null);
  const totalTimeRef = useRef<HTMLDivElement | null>(null);
  const gameTimeRef = useRef<HTMLDivElement | null>(null);
  const hintElement = useRef<HTMLSpanElement | null>(null);

  const playerX = useRef<number>(50);
  const playerSpeedX = useRef<number>(0);
  const holdTime = useRef<number>(0);
  const isSpacePressed = useRef<boolean>(false);

  const targetX = useRef<number>(200);
  const targetSpeedX = useRef<number>(0);
  const amountsOfChangingDirection = useRef<number>(0);

  const totalSuccessTime = useRef<number>(0);
  const gameTime = useRef<number>(0);
  const startInterval = useRef<number>(0);
  const gameActive = useRef<boolean>(false);
  const gameInterval = useRef<number | null>(null);
  const targetMoveInterval = useRef<number | null>(null);

  const gameStartTime = useRef<number>(0);
  const successStartTime = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameActive.current && e.code === "Space") {
        isSpacePressed.current = true;
        holdTime.current += 0.1;
        playerSpeedX.current = 10 + holdTime.current * 16;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (gameActive.current && e.code === "Space") {
        isSpacePressed.current = false;
        holdTime.current = 0;
        playerSpeedX.current = 0;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    const autoFailInterval = setInterval(() => {
      if (
        (gameActive.current &&
          (playerX.current <= 0 || playerX.current >= 440)) ||
        startInterval.current >= MAX_INTERVAL_PORTAL
      ) {
        endGame(false);
      }
    }, MIN_DELAY);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      clearInterval(autoFailInterval);
    };
  }, [gameAttempts]);

  const moveTarget = () => {
    if (amountsOfChangingDirection.current > 0) {
      amountsOfChangingDirection.current--;
    }

    if (Math.random() < 0.5 && amountsOfChangingDirection.current === 0) {
      amountsOfChangingDirection.current = 10;
      targetSpeedX.current = (Math.random() - 0.5) * 25;
    }

    targetX.current += targetSpeedX.current;

    targetX.current = Math.max(20, Math.min(420, targetX.current));

    if (targetZoneRef.current) {
      const hasNegativeMovementCoordinates =
        Math.abs(targetSpeedX.current) !== targetSpeedX.current;

      targetZoneRef.current.style.transform = hasNegativeMovementCoordinates
        ? "scale(-1, 1)"
        : "scale(1, 1)";

      targetZoneRef.current.style.left = `${targetX.current}px`;
    }
  };

  const gameLoop = () => {
    if (!gameActive.current) return;

    const now = performance.now();
    const elapsed = (now - gameStartTime.current) / ONE_SECOND_IN_MS;

    playerX.current += playerSpeedX.current;

    if (!isSpacePressed.current) {
      playerX.current = Math.max(50, playerX.current - 10);
    }

    playerX.current = Math.max(0, Math.min(440, playerX.current));

    if (playerZoneRef.current) {
      playerZoneRef.current.style.left = `${playerX.current}px`;
    }

    // Check in-zone
    const inZone =
      playerX.current + 80 > targetX.current &&
      playerX.current < targetX.current + 80;

    if (playerZoneRef.current) {
      playerZoneRef.current.style.transform = inZone
        ? "rotate(90deg)"
        : "rotate(0deg)";
    }

    if (inZone) {
      if (successStartTime.current === null) {
        successStartTime.current = now;
      }

      const currentSuccess = (now - successStartTime.current) / 1000;
      totalSuccessTime.current = currentSuccess;

      if (timerRef.current) {
        timerRef.current.textContent = ` В зоне: ${currentSuccess.toFixed(1)}s`;
      }

      if (currentSuccess >= 5.0) {
        endGame(true);
      }
    } else {
      successStartTime.current = null;
      totalSuccessTime.current = 0;
      if (timerRef.current) {
        timerRef.current.textContent = " Вне зоны";
      }
    }

    if (totalTimeRef.current) {
      totalTimeRef.current.textContent = `${totalSuccessTime.current.toFixed(
        1,
      )}/5.0s`;
    }

    if (gameTimeRef.current) {
      gameTimeRef.current.textContent = `${elapsed.toFixed(1)}/24.0s`;
    }

    if (elapsed >= MAX_INTERVAL_PORTAL) {
      endGame(false);
    }
  };

  useEffect(() => {
    if (gameAttempts === 0) {
      onFail();
    }
  }, [gameAttempts]);

  const startGame = () => {
    gameStartTime.current = performance.now();
    successStartTime.current = null;

    if (targetZoneRef.current) {
      targetZoneRef.current.style.display = "block";
    }

    if (hintElement.current) {
      hintElement.current.style.display = "none";
    }

    if (playerZoneRef.current) {
      playerZoneRef.current.style.display = "block";
    }

    gameActive.current = true;
    playerX.current = 50;
    playerSpeedX.current = 0;
    holdTime.current = 0;
    gameTime.current = 0;
    totalSuccessTime.current = 0;
    startInterval.current = 0;
    targetX.current = 200;
    amountsOfChangingDirection.current = 0;
    targetSpeedX.current = (Math.random() - 0.5) * 20;

    if (startBtnRef.current) {
      startBtnRef.current.style.display = "none";
    }

    if (timerRef.current) {
      timerRef.current.textContent = "▶ Удерживайте ПРОБЕЛ";
    }
    if (totalTimeRef.current) {
      totalTimeRef.current.textContent = "0.0/5.0s";
    }

    gameInterval.current = setInterval(gameLoop, 16);
    targetMoveInterval.current = setInterval(moveTarget, 50);
  };

  const endGame = (success: boolean) => {
    gameActive.current = false;

    if (targetZoneRef.current) {
      targetZoneRef.current.style.display = "none";
    }

    if (hintElement.current) {
      hintElement.current.style.display = "block";
    }

    if (playerZoneRef.current) {
      playerZoneRef.current.style.display = "none";
    }

    if (gameInterval.current) clearInterval(gameInterval.current);
    if (targetMoveInterval.current) clearInterval(targetMoveInterval.current);

    if (success) {
      onWin();
    }

    changeAttempts(gameAttempts - 1);

    if (startBtnRef.current && gameAttempts > 0 && !success) {
      startBtnRef.current.style.display = "block";
      startBtnRef.current.textContent = "Повторить";
    }
  };

  return {
    startGame,
    playerZoneRef,
    targetZoneRef,
    startBtnRef,
    hintElement,
    totalTimeRef,
    gameTimeRef,
    gameAttempts,
  };
};
