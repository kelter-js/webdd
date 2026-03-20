import { useEffect, useState } from "react";

import { useGameState } from "../../../stores";
import { TURN_STATES } from "../../../entities";

export const usePlayerTurnIsOver = (showDices: boolean) => {
  const [nextTurn, setNextTurn] = useState<TURN_STATES | null>(null);

  const {
    player: { battle },
    setBattleTurn,
  } = useGameState();

  const currentTurn = battle?.turn;
  const playerParty = battle?.player?.party;
  const enemyParty = battle?.enemy?.party;

  useEffect(() => {
    if (!battle || showDices) return;

    // если уже идёт анимация смены хода — не запускаем повторно
    if (nextTurn !== null) return;

    let upcomingTurn: TURN_STATES | null = null;

    if (currentTurn === TURN_STATES.PLAYER_TURN) {
      const playerHasTurns =
        playerParty?.some((m) => m.hasTurn && m.currentHealth > 0) ?? false;
      console.log("playerHasTurns", playerHasTurns);

      if (!playerHasTurns) {
        upcomingTurn = TURN_STATES.ENEMY_TURN;
      }
    }

    if (currentTurn === TURN_STATES.ENEMY_TURN) {
      const enemyHasTurns =
        enemyParty?.some((m) => m.hasTurn && m.hp > 0) ?? false;

      if (!enemyHasTurns) {
        upcomingTurn = TURN_STATES.PLAYER_TURN;
      }
    }

    console.log("upcomingTurn", upcomingTurn);

    if (!upcomingTurn) return;

    const fakeTimerId1 = setTimeout(() => {
      console.log("so does timeout fire?");
      setBattleTurn(upcomingTurn);
      setNextTurn(null);
    }, 900);

    setNextTurn(upcomingTurn);

    // return () => clearTimeout(fakeTimerId1);
  }, [
    battle,
    currentTurn,
    playerParty,
    enemyParty,
    showDices,
    nextTurn,
    setBattleTurn,
  ]);

  return nextTurn;
};
