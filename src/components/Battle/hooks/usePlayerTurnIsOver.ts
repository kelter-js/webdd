import { useEffect, useState } from "react";
import { useGameState } from "../../../stores";
import { TURN_STATES } from "../../../entities";

export const usePlayerTurnIsOver = (showDices: boolean) => {
  const [shouldPlayAnimation, setPlayAnimation] = useState(false);

  const {
    player: { battle },
    setBattleTurn,
  } = useGameState();

  const party = battle?.player?.party;

  useEffect(() => {
    if (
      !showDices &&
      party &&
      party.every((partyMember) => !partyMember.hasTurn)
    ) {
      setPlayAnimation(true);

      const timerId = setTimeout(() => {
        setBattleTurn(TURN_STATES.ENEMY_TURN);
        setPlayAnimation(false);
      }, 900);

      return () => clearTimeout(timerId);
    }
  }, [party, showDices]);

  return shouldPlayAnimation;
};
