import { useEffect } from "react";

import { useGameState } from "../stores";

export const useGameOver = () => {
  const {
    player: { battle, name },
    setGameOver,
  } = useGameState();

  const party = (battle && battle.player && battle.player.party) || [];
  const [partyMember1, partyMember2, partyMember3] = party;

  useEffect(() => {
    // name - служит флагом того, что игра проинициализировалась
    if (name && battle) {
      const isAllMembersDead = party.every(
        (member) => member.currentHealth <= 0,
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
