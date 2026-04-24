import { useMemo } from "react";

import {
  DEFAULT_PAGE_DISPLAY_AMOUNT,
  ENEMY_DESCRIPTIONS,
  ENEMY_DESCRIPTIONS_LOCKED,
  ENEMY_IMAGES,
} from "../constants";
import { getEnemiesByTier, isEnemyUnlocked } from "../utils";
import { useGameState } from "../../../stores";

export const useGetEnemiesData = (pageHeader: number, page: number) => {
  const { player } = useGameState();

  const creaturesToRender = useMemo(() => {
    const list = getEnemiesByTier(pageHeader);

    return list
      .slice(
        page * DEFAULT_PAGE_DISPLAY_AMOUNT,
        page * DEFAULT_PAGE_DISPLAY_AMOUNT + DEFAULT_PAGE_DISPLAY_AMOUNT,
      )
      .map((enemy) => {
        const { locked, unlocked } = ENEMY_IMAGES[enemy];
        const lockedDescription = ENEMY_DESCRIPTIONS_LOCKED[enemy];
        const description = ENEMY_DESCRIPTIONS[enemy];
        const isUnlocked = isEnemyUnlocked(player, enemy);

        return {
          description: isUnlocked ? description : lockedDescription,
          src: isUnlocked ? unlocked : locked,
        };
      });
  }, [pageHeader, page, player]);

  return creaturesToRender;
};
