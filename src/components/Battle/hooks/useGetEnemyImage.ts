import { useGameState } from "../../../stores/GameState";
// import encounter from "../../../assets/enemies/123.png";
import encounter from "../../../assets/enemies/test.png";
import { ENEMIES } from "../../../entities/enemies";

export const useGetEnemyImage = () => {
  const {
    player: { battle },
  } = useGameState();

  const enemyImages = battle?.enemy.party.map((enemy) => {
    // return getEnemyImageByType(enemy.type)
  });

  // return enemyImages;

  return encounter;
};
