import { useEffect } from "react";
import { useGameState } from "../../../stores";
import { Reward } from "../../../types/gameState";

export const useHandleBattleEnd = () => {
  const {
    player: { battle },
    setReward,
  } = useGameState();

  const enemyHealth = battle?.enemy?.party?.reduce(
    (acc, enemy) => acc + enemy.health,
    0
  );

  useEffect(() => {
    if (battle && enemyHealth !== undefined && enemyHealth <= 0) {
      // const { isEnhanced, tier } = battle.enemy;
      // setReward(getRandomReward(tier, isEnhanced));
      // mock
      setReward({} as Reward);
    }
  }, [enemyHealth]);
};
