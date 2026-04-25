import { useEffect } from "react";
import { useGameState } from "../../../stores";

export const useBattleStateInitiation = () => {
  const {
    player: { battle },
    statistics,
    initiateState,
  } = useGameState();

  useEffect(() => {
    const [player1, player2, player3] = battle?.player.party || [];

    if (
      player1 &&
      player2 &&
      player3 &&
      (!statistics ||
        !statistics[player1.name] ||
        !statistics[player2.name] ||
        !statistics[player3.name])
    ) {
      initiateState();
    }
  }, [statistics, battle, initiateState]);
};
