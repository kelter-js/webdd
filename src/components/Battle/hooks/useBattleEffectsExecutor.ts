import { useEffect, useState } from "react";
import { useGameState } from "../../../stores";
import { TURN_STATES } from "../../../entities";
import { EFFECTS } from "../../../entities/effects";
import { Battle, Effects } from "../../../types/gameState";
import { DamageData } from "../types";

export const useBattleEffectsExecutor = ({
  selectedCharacter,
  selectedEnemy,
  toggleNextEnemy,
  toggleNextPlayer,
  updateDamageModel,
  isReadyToTrigger,
}: {
  selectedCharacter?: string;
  selectedEnemy?: string;
  toggleNextEnemy: (data: Battle) => void;
  toggleNextPlayer: (data: Battle) => void;
  updateDamageModel: (battleModel: Battle, damageModel: DamageData) => void;
  isReadyToTrigger: boolean;
}) => {
  const {
    player: { battle },
    updateBattle,
    statistics,
  } = useGameState();

  useEffect(() => {
    if (battle && isReadyToTrigger) {
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

            if (effectsMap[EFFECTS.HEAL]) {
              currentHp = Math.min(
                enemyCopy.maxHP,
                currentHp + (enemyCopy.maxHP / 100) * 15,
              );
            }

            if (currentHp <= 0) {
              enemyCopy.hasTurn = false;
              needToToggleEnemy = true;
            }

            enemyCopy.hp = Math.round(currentHp);
            const isDead = enemy.hp !== 0 && enemyCopy.hp <= 0;

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

            // если не изменилось ХП - значит урона не было - а просто нужно обновить флаги
            if (currentHp === enemy.hp) {
              if (needToToggleEnemy) {
                toggleNextEnemy(newBattleModel);
              } else {
                updateBattle(newBattleModel);
              }
            } else {
              if (currentHp < enemy.hp) {
                updateDamageModel(newBattleModel, {
                  target: selectedEnemy,
                  damage: enemy.hp - currentHp,
                  isCritical: false,
                  isEvasion: false,
                  isEffect: true,
                  shouldPlayDeathAnimation: isDead,
                });
              } else {
                updateDamageModel(newBattleModel, {
                  target: selectedEnemy,
                  damage: currentHp - enemy.hp,
                  isCritical: false,
                  isEvasion: false,
                  isEffect: true,
                  isHealing: true,
                  shouldPlayDeathAnimation: isDead,
                });
              }
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
            const isDead =
              player.currentHealth !== 0 && playerCopy.currentHealth <= 0;

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

            // если не изменилось ХП - значит урона не было - а просто нужно обновить флаги
            if (currentHp === player.currentHealth) {
              if (needToTogglePlayer) {
                toggleNextPlayer(newBattleModel);
              } else {
                updateBattle(newBattleModel);
              }
            } else {
              updateDamageModel(newBattleModel, {
                target: selectedCharacter,
                damage: Math.round(player.currentHealth - currentHp),
                isCritical: false,
                isEvasion: false,
                isEffect: true,
                shouldPlayDeathAnimation: isDead,
              });
            }
          }
        }
      }
    }
  }, [selectedCharacter, selectedEnemy, statistics, isReadyToTrigger, battle]);
};
