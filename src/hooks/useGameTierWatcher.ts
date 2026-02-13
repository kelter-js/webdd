import { useEffect } from "react";
import { useAppState, useGameState } from "../stores";
import {
  FIRST_TIER_DUNGEONS_AMOUNT,
  SECOND_TIER_DUNGEONS_AMOUNT,
  THIRD_TIER_DUNGEONS_AMOUNT,
} from "../constants";

export const useGameTierWatcher = () => {
  const { setFading } = useAppState();

  const {
    player: {
      playStatistics: { dungeonCounter },
      currentTier,
    },
    updateGameTier,
    // setSliders,
  } = useGameState();

  useEffect(() => {
    if (currentTier === 1 && dungeonCounter > FIRST_TIER_DUNGEONS_AMOUNT) {
      setFading(true);
      // MOCK тут нужно установить более конкретный айди стартующих сюжетный слайдов при переходе из 1 тира во 2
      // setSliders();
      updateGameTier();
      return;
    }

    if (currentTier === 2 && dungeonCounter > SECOND_TIER_DUNGEONS_AMOUNT) {
      setFading(true);
      // MOCK тут нужно установить более конкретный айди стартующих сюжетный слайдов при переходе из 2 тира в 3
      // setSliders();
      updateGameTier();
      return;
    }

    if (currentTier === 3 && dungeonCounter > THIRD_TIER_DUNGEONS_AMOUNT) {
      setFading(true);
      // MOCK тут нужно установить более конкретный айди стартующих сюжетный слайд конца игры
      // setSliders();

      return;
    }
  }, [dungeonCounter, currentTier]);
};
