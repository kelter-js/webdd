import { useEffect, useState } from "react";
import { useGameState } from "../../../stores";
import { Character } from "../../../types/gameState";

export const usePlayerControl = () => {
  const {
    player: { battle, party: mockParty },
    setGameOver,
  } = useGameState();

  const [selectedPlayer, setSelectedPlayer] = useState<Character | undefined>();

  useEffect(() => {
    // mock

    if (battle?.player || mockParty) {
      console.log("so we here?");
      // расширить, возможно на игроке висит эффект оглушения или какой-то другой, который мешает делать ход
      // возможно другие проверки кроме здоровья
      const readyToBattlePartyMembers = (
        battle?.player?.party || mockParty
      ).filter((character) => character.currentHealth > 0);

      // ТАКАЯ проверка должна быть, тут МОК
      // .filter((character) => character.currentHealth > 0 && character.hasTurn);

      // такого сценария по идее не должно быть - управление этим в другом месте
      if (readyToBattlePartyMembers.length === 0) {
        setGameOver();
      }

      console.log("readyToBattlePartyMembers", readyToBattlePartyMembers);
      console.log("test", battle?.player?.party || mockParty);

      setSelectedPlayer(readyToBattlePartyMembers[0]);
    }
  }, []);

  return { selectedPlayer, setSelectedPlayer };
};
