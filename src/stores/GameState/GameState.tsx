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
  DAMAGER_BASE_MODEL,
  DEFAULT_GAME_STATE,
  HEALER_BASE_MODEL,
  MAX_ENCOUNTER_CHANCE,
  MIN_ENCOUNTER_CHANCE,
  TANK_BASE_MODEL,
} from "../constants";
import {
  calculateStatistics,
  generateBattle,
  getBattleState,
  getEncounterRoll,
  getFirstTurn,
  increaseCharacterStat,
} from "../utils";
import {
  Battle,
  Creature,
  Enemy,
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
  addResource,
  addJunk,
  giveResources,
  updateFlags,
  increaseResourcesBagLevel,
} from "./actions";

// Create the store
export const useGameState = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      player: DEFAULT_GAME_STATE,
      effects: null,
      inventory: null,
      statistics: null,
      gear: null,
      abilities: null,
      isDiceRequiredRoll: false,
      isAutoSaveRequired: false,
      playersLvlUpNotifications: [],

      // Methods

      updateDungeon: ({ position }, onFightStart) =>
        set((state) => {
          const newDungeon = state.player?.location?.dungeon?.map((row) => [
            ...row,
          ]);

          if (newDungeon) {
            const currentCell = newDungeon[position.y][position.x];

            if (
              state.player?.location?.roomsVisited !== undefined &&
              !currentCell.visited
            ) {
              state.player.location.roomsVisited += 1;
            }

            const isAlreadyVisited = currentCell.visited;
            const isPlayableArea =
              currentCell.type !== ROOM_TYPES.END &&
              currentCell.type !== ROOM_TYPES.START;
            const isDeadEnd = currentCell.isDeadEndRoom;
            currentCell.visited = true;

            if (isPlayableArea) {
              // сюда нужно вписать логику уменьшения кол-ва факелов в инвентаре
              if (state.player?.torches && !currentCell.isLighted) {
                currentCell.isLighted = true;
              }
            }

            // если это не начало и не конец - подземелья
            if (isPlayableArea) {
              const encounterChance = Math.random() * 100;
              const currentChance = state.player.location?.encounterChance!;
              const roll = getEncounterRoll(
                currentChance!,
                state.effects,
                isAlreadyVisited,
                Boolean(currentCell.isLighted),
                Boolean(isDeadEnd),
              );
              const hasEncounter = encounterChance < roll;

              if (hasEncounter) {
                onFightStart();
                console.log("do we reach that place?");
                if (isDeadEnd) {
                  // передавать реальный тир т екущий
                  const firstTurn = getFirstTurn(
                    1,
                    state.effects,
                    state.player.party,
                    true,
                  );
                  const battle = generateBattle(
                    1,
                    firstTurn,
                    state.player.party,
                    true,
                  );
                  // state.player.battle = battle;
                  // MOCK - убрать коммент для начала битвы
                  state.player.locationState = RENDER_LOCATIONS.BATTLE;
                  state.player.battle = {
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
                      party: state.player.party.map((hero) => ({
                        ...hero,
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
                    1,
                    state.effects,
                    state.player.party,
                  );
                  // нужно передавать реальый тир вместо 1
                  const battle = generateBattle(
                    1,
                    firstTurn,
                    state.player.party,
                  );
                  // state.player.battle = battle;
                  // MOCK - убрать коммент для начала битвы
                  state.player.locationState = RENDER_LOCATIONS.BATTLE;
                  state.player.battle = {
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
                      party: state.player.party.map((hero) => ({
                        ...hero,
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

                if (state.player.location) {
                  state.player.location.encounterChance = MIN_ENCOUNTER_CHANCE;
                }
                state.isDiceRequiredRoll = true;
              } else {
                if (state.player.location && !isDeadEnd) {
                  state.player.location.encounterChance = Math.min(
                    currentChance + MIN_ENCOUNTER_CHANCE,
                    MAX_ENCOUNTER_CHANCE,
                  );
                }

                if (isDeadEnd) {
                  // если не прокнул противник и мы в тупике - значит нужно сгенерировать событие получения награды!
                }
              }
            }

            return {
              player: {
                ...state.player,
                location: {
                  ...state.player.location,
                  dungeon: newDungeon,
                },
              },
            };
          }

          return state;
        }),

      updateDialogFlags: updateDialogFlags(set),
      setPlayerPosition: setPlayerPosition(set),
      increaseEndurance: increaseEndurance(set),
      increaseAccuracy: increaseAccuracy(set),
      updateFlags: updateFlags(set),
      increaseAgility: increaseAgility(set),
      updateBattle: updateBattle(set),
      setDungeon: setDungeon(set),
      changeAttempts: changeAttempts(set),
      setQuestData: setQuestData(set),
      setState: setState(set),
      setPlayerName: setPlayerName(set),
      setLocationState: setLocationState(set),
      setBattle: setBattle(set),
      setEconomicBranch: setEconomicBranch(set),
      healTeam: healTeam(set),
      turnOffDices: turnOffDices(set),
      setGameOver: setGameOver(set),
      useAbility: useAbility(set),
      initiateState: initiateState(set),
      resetGame: resetGame(set),
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
      sellJunk: sellJunk(set),
      addJunk: addJunk(set),
      addResource: addResource(set),
      giveResources: giveResources(set),

      handleExitDungeon: () =>
        set((state) => {
          console.log("we invoked", state.player.economic);
          const stateCopy = {
            ...state,
            player: { ...state.player },
          };

          let newConsumables = null;
          let newInventory = null;
          let newMemoizedInventory = null;

          if (stateCopy.player.location) {
            stateCopy.player.location.encounterChance = MIN_ENCOUNTER_CHANCE;
          }

          if (stateCopy.player.location?.type === DUNGEONS.STORY) {
            stateCopy.player.playStatistics.dungeonCounter += 1;
          }

          if (stateCopy.player.economic === ECONOMIC_TYPES.ALCHEMISTRY) {
            // FIXME: по мере дополнения систем инвентаря - допилить
            newConsumables = [...stateCopy.player.consumables];
            // FIXME определиться с фиксированным вознаграждением и названиями эликсиров, заменить стринги на енамы
            // проверяем, есть ли у игрока вообще уже такие зелья
            const elixirIndex = newConsumables.findIndex(
              (item) => item[0] === POTION_TYPES.SMALL_HEALTH_POTION,
            );

            if (elixirIndex !== -1) {
              // если зелья есть - увеличиваем их кол-во
              // второе значение массива - кол-во, обращаемся по индексу [1] -
              // обновляем количество
              const [name, count] = newConsumables[elixirIndex];
              newConsumables[elixirIndex] = [
                name,
                String(Number(count ?? 0) + 2),
              ];
            } else {
              // если нет - устанавливаем их
              newConsumables.push([POTION_TYPES.SMALL_HEALTH_POTION, "2"]);
            }
          }

          if (stateCopy.player.economic === ECONOMIC_TYPES.FISHING) {
            // FIXME определиться с фиксированным вознаграждением в виде голды и привести к балансу
            stateCopy.player.gold += 150;
          }

          if (stateCopy.player.economic === ECONOMIC_TYPES.WEAPONRY) {
            newInventory = stateCopy.inventory ? [...stateCopy.inventory] : [];
            newMemoizedInventory = [...stateCopy.player.inventory_memoized];
            // FIXME: логика генерации оружия или брони - 50% на 50% или броня или оружие, шанс прока второго или 3 тира в зависимости от тира игры
            // const chanceToSpawnWeapon = getRandom();
            // let item;
            // if (chanceToSpawnWeapon < 50) {
            // item = generateWeapon(stateCopy.player.tier);
            // } else {
            // item = generateArmor(stateCopy.player.tier);
            // }
            // newInventory.push(item);

            // FIXME: логика приведения оружия к стринговому виду для хранения в кач-ве мемоизированного значения
            // const memoizedItem = memoize(item);
            const memoizedItem = "";
            newMemoizedInventory.push(memoizedItem);
          }

          stateCopy.player.consumables =
            newConsumables ?? stateCopy.player.consumables;
          stateCopy.inventory = newInventory ?? stateCopy.inventory;
          stateCopy.player.inventory_memoized =
            newMemoizedInventory ?? stateCopy.player.inventory_memoized;

          return stateCopy;
        }),

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
            gold: state.player.gold + 5000,
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
