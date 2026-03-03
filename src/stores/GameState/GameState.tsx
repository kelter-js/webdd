import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  BATTLE_STATES,
  BATTLE_TARGET,
  RENDER_LOCATIONS,
  TURN_STATES,
  ECONOMIC_TYPES,
  DUNGEONS,
} from "../../entities";
import {
  SNIPER_BASE_MODEL,
  DEFAULT_GAME_STATE,
  MEDIC_BASE_MODEL,
  MAX_ENCOUNTER_CHANCE,
  MIN_ENCOUNTER_CHANCE,
  TANK_BASE_MODEL,
  SPECIAL_ENCOUNTER_DEFAULT_CHANCE,
} from "../constants";
import {
  calculateStatistics,
  generateBattle,
  getBattleState,
  getEncounterRoll,
  getFirstTurn,
  getRandomRewardWithoutFight,
  increaseCharacterStat,
} from "../utils";
import {
  Battle,
  Creature,
  Enemy,
  Item,
  Player,
  StoreState,
} from "../../types/gameState";
import { ROOM_TYPES } from "../../entities/room";
import { POTION_TYPES } from "../../entities/consumables";
import { persistConfig } from "./config";
import {
  healTeam,
  initiateState,
  resetGame,
  setEconomicBranch,
  setGameOver,
  turnOffDices,
  updateDialogFlags,
  useAbility,
  setBattle,
  setLocationState,
  setPlayerName,
  setState,
  changeAttempts,
  setQuestData,
  setBattleTurn,
  setReward,
  resetBattle,
  setSliders,
  updateGameTier,
  toggleInventory,
  toggleCharacterPanel,
  buyPotion,
  setDungeon,
  updateBattle,
  increaseAccuracy,
  increaseAgility,
  increaseEndurance,
  setPlayerPosition,
  buyCamera,
  sellJunk,
  addJunk,
  giveResources,
  updateFlags,
  increaseResourcesBagLevel,
  acquirePerk,
  sellItem,
  equipItem,
  handleExitDungeon,
  buyItem,
  generateDungeon,
  levelUpCharacter,
  consumePotion,
  buyTorches,
  updatePlayerState,
  setVolume,
  removeItemFromGear,
  handleExitSpecialEncounter,
  acquireArtifact,
} from "./actions";
import { getRandom } from "../../utils";
import { isSpecialEncounter } from "../../utils/isSpecialEncounter";
import {
  ENCOUNTER_MAP,
  generateSpecialEncounter,
} from "../../utils/generateSpecialEncounter";
import { FLAGS } from "../../constants";
import { RESOURCES } from "../../entities/resources";
import { RewardTypes } from "../../types";
import { JUNK_TYPES } from "../../entities/junk";
import { SPECIAL_ENCOUNTERS } from "../../entities/specialEncounters";

// Create the store
export const useGameState = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      player: DEFAULT_GAME_STATE,
      effects: null,
      sell_inventory: null,
      inventory: null,
      statistics: null,
      gear: null,
      abilities: null,
      isDiceRequiredRoll: false,
      isAutoSaveRequired: false,
      playersLvlUpNotifications: [],

      // Methods

      updateDungeon: ({ position }, onFightStart, onReward) =>
        set((state) => {
          const copyState = {
            ...state,
            player: { ...state.player, location: { ...state.player.location } },
          };

          const newDungeon = copyState.player?.location?.dungeon?.map((row) => [
            ...row,
          ]);

          if (newDungeon) {
            const currentCell = newDungeon[position.y][position.x];

            if (
              copyState.player?.location?.roomsVisited !== undefined &&
              !currentCell.visited
            ) {
              copyState.player.location.roomsVisited += 1;
            }

            const isAlreadyVisited = currentCell.visited;
            const isPlayableArea =
              currentCell.type !== ROOM_TYPES.END &&
              currentCell.type !== ROOM_TYPES.START &&
              currentCell.type !== ROOM_TYPES.STORY_BOSS &&
              currentCell.type !== ROOM_TYPES.CLEARED &&
              currentCell.type !== ROOM_TYPES.ENEMY;
            const isDeadEnd = currentCell.isDeadEndRoom;
            currentCell.visited = true;

            // если это не начало и не конец - подземелья
            if (isPlayableArea) {
              // сюда нужно вписать логику уменьшения кол-ва факелов в инвентаре
              if (copyState.player?.torches && !currentCell.isLighted) {
                currentCell.isLighted = true;
              }

              // Логика рассчета того, что это спешиал энкаунтер
              if (
                isSpecialEncounter(
                  copyState.player.flags,
                  copyState.player.specialEncounterChance,
                )
              ) {
                onFightStart(true);
                // сбрасываем шанс на спешиал энкаунтер к дефолтному
                copyState.player.specialEncounterChance =
                  SPECIAL_ENCOUNTER_DEFAULT_CHANCE;

                const specialEncounter = generateSpecialEncounter(
                  copyState.player.flags,
                );

                copyState.player.location.specialEncounter = specialEncounter;

                copyState.player.locationState =
                  RENDER_LOCATIONS.SPECIAL_ENCOUNTER;
              }

              if (!copyState.player.location?.specialEncounter) {
                // Логика рассчета того, что мы попали в бой
                const encounterChance = getRandom(1, 100);

                const currentChance =
                  copyState.player.location?.encounterChance!;

                const roll = getEncounterRoll(
                  currentChance!,
                  copyState.effects,
                  isAlreadyVisited,
                  Boolean(currentCell.isLighted),
                  Boolean(isDeadEnd),
                );

                const hasEncounter = encounterChance < roll;

                if (hasEncounter) {
                  onFightStart();

                  if (isDeadEnd) {
                    currentCell.type === ROOM_TYPES.CLEARED;

                    const firstTurn = getFirstTurn(
                      copyState.player.currentTier,
                      copyState.effects,
                      copyState.player.party,
                      true,
                    );

                    const battle = generateBattle({
                      tier: copyState.player.currentTier,
                      turn: firstTurn,
                      party: copyState.player.party,
                      isSpecial: true,
                      characterGear: copyState.gear,
                    });
                    // state.player.battle = battle;
                    // MOCK - убрать коммент для начала битвы
                    copyState.player.locationState = RENDER_LOCATIONS.BATTLE;
                    copyState.player.battle = {
                      enemy: {
                        effects: [],
                        party: [
                          { health: 150 } as Creature,
                          { health: 150 } as Creature,
                          { health: 150 } as Creature,
                        ],
                      },
                      player: {
                        effects: [],
                        party: copyState.player.party.map((hero) => ({
                          ...hero,
                          currentHealth: 20,
                          hasTurn: firstTurn === TURN_STATES.PLAYER_TURN,
                        })),
                      },
                      turn: firstTurn,
                      messages: [],
                      reward: null,
                    };

                    // генерируем особого моба т.к. dead end
                  } else {
                    const firstTurn = getFirstTurn(
                      copyState.player.currentTier,
                      copyState.effects,
                      copyState.player.party,
                    );
                    // нужно передавать реальый тир вместо 1
                    const battle = generateBattle({
                      tier: copyState.player.currentTier,
                      turn: firstTurn,
                      party: copyState.player.party,
                      characterGear: copyState.gear,
                    });
                    // state.player.battle = battle;
                    // MOCK - убрать коммент для начала битвы
                    copyState.player.locationState = RENDER_LOCATIONS.BATTLE;
                    copyState.player.battle = {
                      enemy: {
                        effects: [],
                        party: [
                          { health: 150 } as Creature,
                          { health: 150 } as Creature,
                          { health: 150 } as Creature,
                        ],
                      },
                      player: {
                        effects: [],
                        party: copyState.player.party.map((hero) => ({
                          ...hero,
                          currentHealth: 20,
                          hasTurn: firstTurn === TURN_STATES.PLAYER_TURN,
                        })),
                      },
                      turn: firstTurn,
                      messages: [],
                      reward: null,
                    };
                    //сбрасываем шанс на встречу с энкаунтером
                  }
                  // тут нужжен код генерации битвы/противника и т.д.

                  if (copyState.player.location) {
                    copyState.player.location.encounterChance =
                      MIN_ENCOUNTER_CHANCE;
                  }
                  copyState.isDiceRequiredRoll = true;
                } else {
                  if (copyState.player.location && !isDeadEnd) {
                    copyState.player.location.encounterChance = Math.min(
                      currentChance + MIN_ENCOUNTER_CHANCE,
                      MAX_ENCOUNTER_CHANCE,
                    );
                  }

                  if (isDeadEnd) {
                    currentCell.type === ROOM_TYPES.CLEARED;
                    const reward = getRandomRewardWithoutFight(
                      copyState.player.currentTier,
                    );

                    onReward(reward.message);

                    if (reward.result) {
                      switch (reward.type) {
                        case RewardTypes.GOLD: {
                          if (typeof reward.result === "number") {
                            copyState.player.gold += reward.result;
                          }

                          break;
                        }

                        case RewardTypes.JUNK: {
                          const junkToAdd = reward.result as JUNK_TYPES;

                          const junkItem = copyState.player.junk.find(
                            (item) => item[0] === junkToAdd,
                          );

                          if (junkItem) {
                            copyState.player.junk = copyState.player.junk.map(
                              (item) =>
                                item[0] === junkToAdd
                                  ? [item[0], String(Number(item[1]) + 1)]
                                  : item,
                            );
                          } else {
                            copyState.player.junk.push([junkToAdd, String(1)]);
                          }

                          break;
                        }

                        case RewardTypes.POTION: {
                          const rewardPotion = reward.result as {
                            type: POTION_TYPES;
                          };

                          const hasSamePotions =
                            copyState.player.consumables.find((potion) => {
                              const [potionType] = potion;
                              return potionType === rewardPotion.type;
                            });

                          if (hasSamePotions) {
                            copyState.player.consumables =
                              copyState.player.consumables.map((potion) => {
                                const [potionType, amount] = potion;

                                if (potionType === rewardPotion.type) {
                                  console.log(Number(amount) + 1);
                                  return [potionType, `${Number(amount) + 1}`];
                                }

                                return potion;
                              });
                          } else {
                            copyState.player.consumables.push([
                              rewardPotion.type,
                              "1",
                            ]);
                          }

                          break;
                        }

                        case RewardTypes.ITEM: {
                          const rewardItem = reward.result as Item;

                          if (!copyState.inventory) {
                            copyState.inventory = [];
                          }

                          copyState.inventory.push(rewardItem);
                          copyState.player.inventory_memoized.push([
                            rewardItem.baseId,
                            rewardItem.gearId,
                          ]);

                          break;
                        }
                      }
                    }
                  }
                }
              }
            }

            if (currentCell.type === ROOM_TYPES.STORY_BOSS) {
              const firstTurn = getFirstTurn(
                copyState.player.currentTier,
                copyState.effects,
                copyState.player.party,
              );

              if (
                copyState.player.currentTier === 1 &&
                !copyState.player.flags.includes(FLAGS.FIRST_STORY_BOSS_VICTORY)
              ) {
                const battle = generateBattle({
                  tier: copyState.player.currentTier,
                  turn: firstTurn,
                  party: copyState.player.party,
                  characterGear: copyState.gear,
                  isBoss: true,
                });
                // меняем локацию, генерим модель боя, устанавливаем константой противника босса первого тира
              }

              if (
                copyState.player.currentTier === 2 &&
                !copyState.player.flags.includes(
                  FLAGS.SECOND_STORY_BOSS_VICTORY,
                )
              ) {
                const battle = generateBattle({
                  tier: copyState.player.currentTier,
                  turn: firstTurn,
                  party: copyState.player.party,
                  characterGear: copyState.gear,
                  isBoss: true,
                });
                // меняем локацию, генерим модель боя, устанавливаем константой противника босса первого тира
              }

              if (
                copyState.player.currentTier === 3 &&
                !copyState.player.flags.includes(FLAGS.THIRD_STORY_BOSS_VICTORY)
              ) {
                const battle = generateBattle({
                  tier: copyState.player.currentTier,
                  turn: firstTurn,
                  party: copyState.player.party,
                  characterGear: copyState.gear,
                  isBoss: true,
                });
                // меняем локацию, генерим модель боя, устанавливаем константой противника босса первого тира
              }
            }

            if (currentCell.type === ROOM_TYPES.ENEMY) {
              const firstTurn = getFirstTurn(
                copyState.player.currentTier,
                copyState.effects,
                copyState.player.party,
              );

              const battle = generateBattle({
                tier: copyState.player.currentTier,
                turn: firstTurn,
                party: copyState.player.party,
                characterGear: copyState.gear,
                isQuest: true,
              });
              // генерируем квестого противника - одного
            }

            copyState.player.location.dungeon = newDungeon;

            return copyState;
          }

          return state;
        }),

      updateDialogFlags: updateDialogFlags(set),
      setPlayerPosition: setPlayerPosition(set),
      increaseEndurance: increaseEndurance(set),
      consumePotion: consumePotion(set),
      acquireArtifact: acquireArtifact(set),
      setVolume: setVolume(set),
      generateDungeon: generateDungeon(set),
      increaseAccuracy: increaseAccuracy(set),
      updatePlayerState: updatePlayerState(set),
      removeItemFromGear: removeItemFromGear(set),
      updateFlags: updateFlags(set),
      increaseAgility: increaseAgility(set),
      handleExitSpecialEncounter: handleExitSpecialEncounter(set),
      updateBattle: updateBattle(set),
      setDungeon: setDungeon(set),
      changeAttempts: changeAttempts(set),
      setQuestData: setQuestData(set),
      equipItem: equipItem(set),
      setState: setState(set),
      setPlayerName: setPlayerName(set),
      setLocationState: setLocationState(set),
      setBattle: setBattle(set),
      setEconomicBranch: setEconomicBranch(set),
      healTeam: healTeam(set),
      turnOffDices: turnOffDices(set),
      setGameOver: setGameOver(set),
      levelUpCharacter: levelUpCharacter(set),
      useAbility: useAbility(set),
      initiateState: initiateState(set),
      resetGame: resetGame(set),
      buyTorches: buyTorches(set),
      setBattleTurn: setBattleTurn(set),
      setReward: setReward(set),
      resetBattle: resetBattle(set),
      setSliders: setSliders(set),
      updateGameTier: updateGameTier(set),
      buyPotion: buyPotion(set),
      toggleInventory: toggleInventory(set),
      buyCamera: buyCamera(set),
      toggleCharacterPanel: toggleCharacterPanel(set),
      increaseResourcesBagLevel: increaseResourcesBagLevel(set),
      acquirePerk: acquirePerk(set),
      sellJunk: sellJunk(set),
      addJunk: addJunk(set),
      sellItem: sellItem(set),
      giveResources: giveResources(set),
      handleExitDungeon: handleExitDungeon(set),
      buyItem: buyItem(set),

      // ф-ии чисто для тестов
      killEnemy: () =>
        set((state) => ({
          ...state,
          player: {
            ...state.player,
            battle: {
              ...(state.player.battle || ({} as Battle)),

              enemy: {
                ...(state.player.battle?.enemy || ({} as Enemy)),
                party: (state.player.battle?.enemy?.party || []).map(
                  (enemy) => ({ ...enemy, health: 0 }),
                ),
              },
            },
          },
        })),

      // ф-ии чисто для тестов
      removePotions: () =>
        set((state) => ({
          ...state,
          player: {
            ...state.player,
            consumables: [],
          },
        })),

      // ф-ии чисто для тестов
      cheatGold: () =>
        set((state) => ({
          ...state,
          player: {
            ...state.player,

            gold: state.player.gold + 50000,
            collected: [[RESOURCES.ORE, "30"]],
          },
        })),

      // ф-ии чисто для тестов
      endTurn: () =>
        set((state) => ({
          ...state,
          player: {
            ...state.player,
            battle: {
              ...(state.player?.battle || ({} as Battle)),
              player: {
                ...(state.player?.battle?.player || ({} as Player)),
                party: [...(state.player?.battle?.player.party || [])].map(
                  (item) => ({ ...item, currentHealth: 0 }),
                ),
              },
            },
          },
        })),
    }),
    persistConfig,
  ),
);
