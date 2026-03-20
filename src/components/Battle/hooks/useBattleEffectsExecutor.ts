import { useEffect } from "react";
import { useGameState } from "../../../stores";
import { TURN_STATES } from "../../../entities";
import { EFFECTS } from "../../../entities/effects";
import {
  BattleCharacterModel,
  Creature,
  Effects,
} from "../../../types/gameState";

export const useBattleEffectsExecutor = ({
  selectedCharacter,
  selectedEnemy,
  toggleNextEnemy,
  toggleNextPlayer,
}: {
  selectedCharacter?: string;
  selectedEnemy?: string;
  toggleNextEnemy: (data: Creature[]) => void;
  toggleNextPlayer: (data: BattleCharacterModel[]) => void;
}) => {
  const {
    player: { battle },
    updateBattle,
    statistics,
  } = useGameState();

  useEffect(() => {
    if (battle) {
      if (battle?.turn === TURN_STATES.ENEMY_TURN && selectedEnemy) {
        const {
          enemy: { effects },
        } = battle;

        if (
          selectedEnemy &&
          effects[selectedEnemy] &&
          !effects[selectedEnemy].hasTriggered
        ) {
          const effectsMap = Object.fromEntries(
            effects[selectedEnemy].list.map((effect) => [
              effect.type,
              effect.duration,
            ]),
          );

          const enemy = battle.enemy.party.find(
            (enemy) => enemy.id === selectedEnemy,
          );

          if (enemy) {
            const enemyCopy = { ...enemy };
            let needToToggleEnemy = false;

            if (effectsMap[EFFECTS.STUN]) {
              enemyCopy.hasTurn = false;
              needToToggleEnemy = true;
            }

            let currentHp = enemyCopy.hp;

            if (effectsMap[EFFECTS.BLEED]) {
              currentHp = Math.max(0, currentHp - (enemyCopy.maxHP / 100) * 15);
            }

            if (effectsMap[EFFECTS.FIRE]) {
              currentHp = Math.max(0, currentHp - (enemyCopy.maxHP / 100) * 10);
            }

            if (effectsMap[EFFECTS.HEAL] && !effectsMap[EFFECTS.HEAL_IMMUNE]) {
              currentHp = Math.min(
                enemyCopy.maxHP,
                currentHp + (enemyCopy.maxHP / 100) * 10,
              );
            }

            if (currentHp <= 0) {
              enemyCopy.hasTurn = false;
              needToToggleEnemy = true;
            }

            enemyCopy.hp = Math.round(currentHp);

            const newBattleModel = {
              ...battle,
              enemy: {
                ...battle.enemy,
                effects: {
                  ...effects,
                  [selectedEnemy]: {
                    hasTriggered: true,
                    list: Object.entries(effectsMap).reduce<Effects[]>(
                      (acc, [effectName, effectDuration]) => {
                        if (effectDuration > 1) {
                          acc.push({
                            type: effectName as EFFECTS,
                            duration: effectDuration - 1,
                          });
                        }

                        return acc;
                      },
                      [],
                    ),
                  },
                },
                party: battle.enemy.party.map((enemy) =>
                  enemy.id === selectedEnemy ? enemyCopy : enemy,
                ),
              },
            };

            updateBattle(newBattleModel);

            if (needToToggleEnemy) {
              toggleNextEnemy(newBattleModel.enemy.party);
            }
          }
        }
      } else if (
        battle?.turn === TURN_STATES.PLAYER_TURN &&
        selectedCharacter
      ) {
        const {
          player: { effects },
        } = battle;

        if (
          selectedCharacter &&
          effects[selectedCharacter] &&
          !effects[selectedCharacter].hasTriggered
        ) {
          const effectsMap = Object.fromEntries(
            effects[selectedCharacter].list.map((effect) => [
              effect.type,
              effect.duration,
            ]),
          );

          const player = battle.player.party.find(
            (playerData) => playerData.name === selectedCharacter,
          );

          if (player) {
            const playerCopy = { ...player };
            let needToTogglePlayer = false;

            if (effectsMap[EFFECTS.STUN]) {
              playerCopy.hasTurn = false;
              needToTogglePlayer = true;
            }

            let currentHp = playerCopy.currentHealth;

            if (
              effectsMap[EFFECTS.BLEED] &&
              statistics &&
              statistics[selectedCharacter]
            ) {
              currentHp = Math.max(
                0,
                currentHp -
                  (statistics[selectedCharacter].maxHealth / 100) * 15,
              );
            }

            if (
              effectsMap[EFFECTS.FIRE] &&
              statistics &&
              statistics[selectedCharacter]
            ) {
              currentHp = Math.max(
                0,
                currentHp -
                  (statistics[selectedCharacter].maxHealth / 100) * 10,
              );
            }

            if (
              effectsMap[EFFECTS.HEAL] &&
              !effectsMap[EFFECTS.HEAL_IMMUNE] &&
              statistics &&
              statistics[selectedCharacter]
            ) {
              currentHp = Math.min(
                statistics[selectedCharacter].maxHealth,
                currentHp +
                  (statistics[selectedCharacter].maxHealth / 100) * 10,
              );
            }

            if (currentHp <= 0) {
              playerCopy.hasTurn = false;
              needToTogglePlayer = true;
            }

            playerCopy.currentHealth = Math.round(currentHp);

            const newBattleModel = {
              ...battle,
              player: {
                ...battle.player,
                effects: {
                  ...effects,
                  [selectedCharacter]: {
                    hasTriggered: true,
                    list: Object.entries(effectsMap).reduce<Effects[]>(
                      (acc, [effectName, effectDuration]) => {
                        if (effectDuration > 1) {
                          acc.push({
                            type: effectName as EFFECTS,
                            duration: effectDuration - 1,
                          });
                        }

                        return acc;
                      },
                      [],
                    ),
                  },
                },
                party: battle.player.party.map((player) =>
                  player.name === selectedCharacter ? playerCopy : player,
                ),
              },
            };

            updateBattle(newBattleModel);

            if (needToTogglePlayer) {
              toggleNextPlayer(newBattleModel.player.party);
            }
          }
        }
      }
    }
  }, [selectedCharacter, selectedEnemy, statistics]);
};
