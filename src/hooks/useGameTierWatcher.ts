import { useEffect } from "react";

import {
  FIRST_TIER_DUNGEONS_AMOUNT,
  SECOND_TIER_DUNGEONS_AMOUNT,
  THIRD_TIER_DUNGEONS_AMOUNT,
} from "../constants";
import { useAppState, useGameState } from "../stores";

export const useGameTierWatcher = () => {
  const { setFading } = useAppState();

  const {
    player: {
      playStatistics: { dungeonCounter },
      currentTier,
    },
    updateGameTier,
  } = useGameState();

  useEffect(() => {
    if (currentTier === 1 && dungeonCounter > FIRST_TIER_DUNGEONS_AMOUNT) {
      setFading(true);
      updateGameTier();
      return;
    }

    if (currentTier === 2 && dungeonCounter > SECOND_TIER_DUNGEONS_AMOUNT) {
      setFading(true);
      updateGameTier();
      return;
    }

    if (currentTier === 3 && dungeonCounter > THIRD_TIER_DUNGEONS_AMOUNT) {
      setFading(true);

      return;
    }
  }, [dungeonCounter, currentTier]);
};
