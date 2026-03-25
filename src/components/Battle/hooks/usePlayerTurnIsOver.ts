import { useEffect, useState } from "react";

import { useAppState, useGameState } from "../../../stores";
import { TURN_STATES } from "../../../entities";

export const usePlayerTurnIsOver = (
  showDices: boolean,
  isFirstRender: boolean,
  resetFirstRender: VoidFunction,
) => {
  const [nextTurn, setNextTurn] = useState<TURN_STATES | null>(null);

  const {
    player: { battle },
    setBattleTurn,
  } = useGameState();
  const { isAudioEnabled } = useAppState();

  const currentTurn = battle?.turn;
  const playerParty = battle?.player?.party;
  const enemyParty = battle?.enemy?.party;
  const messages = battle?.messages;

  useEffect(() => {
    console.log("inside turner:", showDices);
    console.log("messages", messages);
    if (!battle || showDices || !isAudioEnabled) return;

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

    if (!upcomingTurn) {
      if (isFirstRender && currentTurn) {
        setNextTurn(currentTurn);

        setTimeout(() => {
          resetFirstRender();
          setNextTurn(null);
        }, 900);
      }

      return;
    }

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
    messages,
    isFirstRender,
    isAudioEnabled,
  ]);

  return nextTurn;
};
