import { useEffect, useState } from "react";
import { useGameState } from "../../../stores";
import { BattleCharacterModel, Creature } from "../../../types/gameState";
import { TURN_STATES } from "../../../entities";

// по окончанию floating damage или shooting анимации вызывается ВСЕГДА handleSelectNextPlayer или handleSelectNextEnemy и в аргументы передаем АКТУАЛЬНОЕ состояние
// смена ХОДА ТОЛЬКО ЧЕРЕЗ ЭТУ ФУНКЦИЮ

export const usePlayerControl = () => {
  const {
    player: { battle, party: mockParty },
    setGameOver,
    updateBattle,
  } = useGameState();

  const [selectedPlayer, setSelectedPlayer] = useState<
    BattleCharacterModel | undefined
  >();

  const { turn } = battle || {};

  const [currentEnemy, setSelectedEnemy] = useState<Creature | undefined>();
  // !!! убираем возможность игроку выбирать персонажа для хода самостоятельно !!!
  // вместо этого нужно сделать так - если ход игрока - выбираем персонажа - и делаем ход
  // далее после его хода переключаем на другого члена группа
  // по факту, при переключении на персонажа - нужно на нем отработать имеющийся эффект - яд или что-то иное, если оно есть
  // тоже самое с противником - при его ходе, проверяем есть ли эффекты и применяем сначала их
  // если currentDuration - 1 === 0 - то сразу убираем эффекты дебаффа, после нанесения урона

  useEffect(() => {
    if (turn === TURN_STATES.ENEMY_TURN) {
      const readyToBattleEnemy = (battle?.enemy?.party || []).filter(
        (enemy) => enemy.hp > 0 && enemy.hasTurn,
      );

      if (readyToBattleEnemy.length === 0) {
        setSelectedEnemy(undefined);
      } else {
        setSelectedEnemy(readyToBattleEnemy[0]);
      }
    }
  }, [battle?.enemy.party]);

  const handleSelectNextPlayer = (newBattleState: BattleCharacterModel[]) => {
    if (!battle) {
      setSelectedPlayer(undefined);
      return;
    }

    // расширить, возможно на игроке висит эффект оглушения или какой-то другой, который мешает делать ход
    // возможно другие проверки кроме здоровья
    const readyToBattlePartyMembers = newBattleState.filter(
      (character) => character.currentHealth > 0 && character.hasTurn,
    );

    const updatedEffects = { ...battle.player.effects };

    // Сбрасываем флаг только если персонаж существовал и у него есть запись в эффектах
    if (selectedPlayer && updatedEffects[selectedPlayer.name]) {
      updatedEffects[selectedPlayer.name] = {
        ...updatedEffects[selectedPlayer.name],
        hasTriggered: false,
      };
    }

    updateBattle({
      ...battle,
      player: {
        ...battle.player,
        party: newBattleState,
        effects: updatedEffects,
      },
    });

    console.log("readyToBattlePartyMembers", readyToBattlePartyMembers);
    if (readyToBattlePartyMembers.length === 0) {
      setSelectedPlayer(undefined);
    } else {
      setSelectedPlayer(readyToBattlePartyMembers[0]);
    }
  };

  const handleSelectNextEnemy = (newBattleState: Creature[]) => {
    if (!battle) {
      setSelectedEnemy(undefined);
      return;
    }

    // расширить, возможно на игроке висит эффект оглушения или какой-то другой, который мешает делать ход
    // возможно другие проверки кроме здоровья
    const readyToBattleEnemy = newBattleState.filter(
      (character) => character.hp > 0 && character.hasTurn,
    );

    const updatedEffects = { ...battle.enemy.effects };

    // Сбрасываем флаг только если персонаж существовал и у него есть запись в эффектах
    if (currentEnemy && updatedEffects[currentEnemy.id!]) {
      updatedEffects[currentEnemy.id!] = {
        ...updatedEffects[currentEnemy.id!],
        hasTriggered: false,
      };
    }

    updateBattle({
      ...battle,
      enemy: {
        ...battle.enemy,
        party: newBattleState,
        effects: updatedEffects,
      },
    });

    if (readyToBattleEnemy.length === 0) {
      setSelectedEnemy(undefined);
    } else {
      setSelectedEnemy(readyToBattleEnemy[0]);
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

  return {
    selectedPlayer,
    setSelectedPlayer,
    handleSelectNextPlayer,
    currentEnemy,
    handleSelectNextEnemy,
  };
};
