import { useEffect, useState } from "react";

import {
  Battle,
  BattleCharacterModel,
  Creature,
} from "../../../types/gameState";
import { TURN_STATES } from "../../../entities";
import { useGameState } from "../../../stores";

export const usePlayerControl = () => {
  const {
    player: { battle },

    updateBattle,
  } = useGameState();

  const [selectedPlayer, setSelectedPlayer] = useState<
    BattleCharacterModel | undefined
  >();

  const { turn } = battle || {};

  const [currentEnemy, setSelectedEnemy] = useState<Creature | undefined>();

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
  }, [battle?.enemy.party, battle?.turn]);

  const handleSelectNextPlayer = (newBattleState: Battle) => {
    const updatedEffects = { ...newBattleState.player.effects };

    if (selectedPlayer && updatedEffects[selectedPlayer.name]) {
      updatedEffects[selectedPlayer.name] = {
        ...updatedEffects[selectedPlayer.name],
        hasTriggered: false,
      };
    }

    updateBattle({
      ...newBattleState,
      player: {
        ...newBattleState.player,
        effects: updatedEffects,
      },
    });

    const readyToBattlePartyMembers = newBattleState.player.party.filter(
      (character) => character.currentHealth > 0 && character.hasTurn,
    );

    const setNewPlayer = () => {
      setSelectedPlayer(
        readyToBattlePartyMembers.length === 0
          ? undefined
          : readyToBattlePartyMembers[0],
      );
    };

    if (selectedPlayer) {
      const existingPlayerInNewModel = newBattleState.player.party.find(
        (player) => player.name === selectedPlayer.name,
      );

      if (
        !existingPlayerInNewModel?.hasTurn ||
        existingPlayerInNewModel.currentHealth <= 0
      ) {
        setNewPlayer();
      }
    } else {
      setNewPlayer();
    }
  };

  const handleSelectNextEnemy = (newBattleModel: Battle) => {
    const updatedEffects = { ...newBattleModel.enemy.effects };

    if (currentEnemy && updatedEffects[currentEnemy.id!]) {
      updatedEffects[currentEnemy.id!] = {
        ...updatedEffects[currentEnemy.id!],
        hasTriggered: false,
      };
    }

    updateBattle({
      ...newBattleModel,
      enemy: {
        ...newBattleModel.enemy,
        effects: updatedEffects,
      },
    });

    const readyToBattleEnemy = newBattleModel.enemy.party.filter(
      (enemy) => enemy.hp > 0 && enemy.hasTurn,
    );

    const setNewEnemy = () => {
      setSelectedEnemy(
        readyToBattleEnemy.length === 0 ? undefined : readyToBattleEnemy[0],
      );
    };

    if (currentEnemy) {
      const existingEnemyInNewModel = newBattleModel.enemy.party.find(
        (enemy) => enemy.id === currentEnemy.id,
      );

      if (
        !existingEnemyInNewModel?.hasTurn ||
        existingEnemyInNewModel.hp <= 0
      ) {
        setNewEnemy();
      }
    } else {
      setNewEnemy();
    }
  };

  useEffect(() => {
    if (turn === TURN_STATES.PLAYER_TURN && battle?.player) {
      const readyToBattlePartyMembers = (battle?.player?.party || []).filter(
        (character) => character.currentHealth > 0 && character.hasTurn,
      );

      if (readyToBattlePartyMembers.length === 0) {
        setSelectedPlayer(undefined);
      } else {
        setSelectedPlayer(readyToBattlePartyMembers[0]);
      }
    }
  }, [battle?.player?.party, battle?.turn]);

  return {
    selectedPlayer,
    handleSelectNextPlayer,
    currentEnemy,
    handleSelectNextEnemy,
  };
};
