import { useEffect } from "react";

import { useGameState } from "../stores";

// REFACTORING CHECKED ✅

export const useGameOver = () => {
  const {
    player: { party, name },
    setGameOver,
  } = useGameState();

  const [partyMember1, partyMember2, partyMember3] = party;

  useEffect(() => {
    // name - служит флагом того, что игра проинициализировалась
    if (name) {
      const isAllMembersDead = party.every(
        (member) => member.currentHealth <= 0
      );

      if (isAllMembersDead) {
        setGameOver();
      }
    }
  }, [
    name,
    setGameOver,
    partyMember1?.currentHealth,
    partyMember2?.currentHealth,
    partyMember3?.currentHealth,
  ]);
};
