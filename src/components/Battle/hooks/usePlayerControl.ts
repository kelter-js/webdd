import { useEffect, useState } from "react";
import { useGameState } from "../../../stores";
import { Character } from "../../../types/gameState";

export const usePlayerControl = () => {
  const {
    player: { battle, party: mockParty },
    setGameOver,
  } = useGameState();

  const [selectedPlayer, setSelectedPlayer] = useState<Character | undefined>();
  // !!! убираем возможность игроку выбирать персонажа для хода самостоятельно !!!
  // вместо этого нужно сделать так - если ход игрока - выбираем персонажа - и делаем ход
  // далее после его хода переключаем на другого члена группа
  // по факту, при переключении на персонажа - нужно на нем отработать имеющийся эффект - яд или что-то иное, если оно есть
  // тоже самое с противником - при его ходе, проверяем есть ли эффекты и применяем сначала их
  // модель эффекты - duration: 1, baseDamage: 16, stack: 1
  // baseDamage * stack - сколько стаков эффекта, столько и дмг наносим - duration - сколько раундов-  если эффект можно наложить - накладываем и отнимает раунд от duration
  // если currentDuration - 1 === 0 - то сразу убираем эффекты дебаффа, после нанесения урона

  const handleSelectNextPlayer = (newBattleState?: Character[]) => {
    if (!newBattleState) {
      setSelectedPlayer(undefined);
      return;
    }

    // расширить, возможно на игроке висит эффект оглушения или какой-то другой, который мешает делать ход
    // возможно другие проверки кроме здоровья
    const readyToBattlePartyMembers = newBattleState.filter(
      (character) => character.currentHealth > 0 && character.hasTurn,
    );

    console.log("readyToBattlePartyMembers", readyToBattlePartyMembers);
    if (readyToBattlePartyMembers.length === 0) {
      setSelectedPlayer(undefined);
    } else {
      setSelectedPlayer(readyToBattlePartyMembers[0]);
    }
  };

  useEffect(() => {
    // mock

    if (battle?.player) {
      const readyToBattlePartyMembers = (battle?.player?.party || []).filter(
        (character) => character.currentHealth > 0 && character.hasTurn,
      );

      // ТАКАЯ проверка должна быть, тут МОК
      // .filter((character) => character.currentHealth > 0 && character.hasTurn);

      console.log("readyToBattlePartyMembers", readyToBattlePartyMembers);
      if (readyToBattlePartyMembers.length === 0) {
        setSelectedPlayer(undefined);
      } else {
        setSelectedPlayer(readyToBattlePartyMembers[0]);
      }
    }
  }, [battle?.player?.party]);

  return { selectedPlayer, setSelectedPlayer, handleSelectNextPlayer };
};
