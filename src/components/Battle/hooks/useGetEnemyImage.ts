import { useGameState } from "../../../stores/GameState";
import encounter from "../../../assets/enemies/123.png";
import { ENEMIES } from "../../../entities/enemies";

export const useGetEnemyImage = () => {
  const {
    player: { battle },
  } = useGameState();

  if (battle) {
    switch (battle.enemy.type) {
      case ENEMIES.SPIDER:
        return encounter;
      default:
        return encounter;
    }
  }

  return encounter;
};
