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
} from "../utils";
import { StoreState } from "../../types/gameState";
import { ROOM_TYPES } from "../../entities/room";
import { CONSUMABLES } from "../../entities/consumables";
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

      setQuestData: (data) =>
        set((state) => {
          // Закрытие квеста, обнуляем его состояние
          if (data === null) {
            return {
              player: {
                ...state.player,
                quest: null,
              },
            };
          }
          // обновление квеста на основе уже существующих данных - добавляем новые поля
          const newQuestData = { ...(state.player.quest || {}), ...data };

          return {
            player: {
              ...state.player,
              quest: newQuestData,
            },
          };
        }),
      changeAttempts: (attempts) =>
        set((state) => {
          const location = state.player.location;

          if (location) {
            return {
              player: {
                ...state.player,
                location: { ...state.player.location, attempts },
              },
            };
          }

          return state;
        }),
      setDungeon: (props) =>
        set((state) => {
          const location = state.player.location;
          const { dungeon, type, attempts, position } = props ?? {};

          if (location) {
            // устанавливаем изначальное значение шанса на встречу с противником
            if (
              state.player?.location &&
              !state.player.location?.encounterChance
            ) {
              state.player.location.encounterChance = MIN_ENCOUNTER_CHANCE;
            }

            return {
              player: {
                ...state.player,
                location: {
                  ...state.player.location,
                  dungeon,
                  type,
                  attempts,
                  position,
                  roomsVisited: 0,
                },
              },
            };
          }

          return state;
        }),

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
                Boolean(isDeadEnd)
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
                    true
                  );
                  const battle = generateBattle(
                    1,
                    firstTurn,
                    state.player.party,
                    true
                  );
                  // state.player.battle = battle;
                  // MOCK - убрать коммент для начала битвы
                  // state.player.locationState = RENDER_LOCATIONS.BATTLE;

                  // генерируем особого моба т.к. dead end
                } else {
                  const firstTurn = getFirstTurn(
                    1,
                    state.effects,
                    state.player.party
                  );
                  // нужно передавать реальый тир вместо 1
                  const battle = generateBattle(
                    1,
                    firstTurn,
                    state.player.party
                  );
                  // state.player.battle = battle;
                  // MOCK - убрать коммент для начала битвы
                  // state.player.locationState = RENDER_LOCATIONS.BATTLE;
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
                    MAX_ENCOUNTER_CHANCE
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

      setPlayerPosition: (position) =>
        set((state) => {
          const location = state.player.location;

          if (location) {
            return {
              player: {
                ...state.player,
                location: {
                  ...state.player.location,
                  position,
                },
              },
            };
          }

          return state;
        }),

      setState: (gameState) =>
        set(() => ({
          player: {
            ...gameState,
            location: gameState.location
              ? {
                  ...gameState.location,
                  dungeon: gameState.location.dungeon
                    ? gameState.location.dungeon!.map((item) => {
                        return item.map((subItem) => ({ ...subItem }));
                      })
                    : undefined,
                }
              : null,
          },
        })),

      setPlayerName: (name) =>
        set((state) => {
          // магические числа заменить на константы рассчета
          const party = [
            {
              name,
              experience: 0,
              level: 1,
              ...DAMAGER_BASE_MODEL,
              points: 5,
              perksList: [],
            },
            {
              name: "SomeWhatOfTestingName-HEALER",
              experience: 0,
              level: 1,
              ...HEALER_BASE_MODEL,
              points: 5,
              critChance: 0,
              critStrike: 0,
              perksList: [],
            },
            {
              name: "SomeWhatOfTestingName-TANK",
              experience: 0,
              level: 1,
              ...TANK_BASE_MODEL,
              points: 5,
              critChance: 0,
              critStrike: 0,
              perksList: [],
            },
          ];

          return { player: { ...state.player, name, party } };
        }),

      setLocationState: (newLocation) =>
        set((state) => ({
          player: { ...state.player, locationState: newLocation },
        })),

      //типизировать обязательно
      setBattle: (battleState) =>
        set((state) => ({ player: { ...state.player, battle: battleState } })),

      updateBattle: (battleState) =>
        set((state) => {
          const newBattleState = { ...state.player.battle! };

          if (battleState.target === BATTLE_TARGET.ENEMY) {
            if (newBattleState?.enemy.health) {
              newBattleState.enemy.health -= battleState.value;

              if (battleState.effect) {
                newBattleState.enemy.effects.push(battleState.effect);
              }
            }
          } else {
            const damageReceiver = newBattleState?.player.party.find(
              (player) => player.name === battleState.name
            );

            if (damageReceiver) {
              damageReceiver.currentHealth -= battleState.value;

              if (battleState.effect) {
                newBattleState?.player.effects.push(battleState.effect);
              }
            }
          }

          newBattleState?.messages.push(battleState.message);
          if (newBattleState?.turn) {
            newBattleState.turn =
              newBattleState?.turn === TURN_STATES.PLAYER_TURN
                ? TURN_STATES.ENEMY_TURN
                : TURN_STATES.PLAYER_TURN;
          }

          const battle = getBattleState(
            newBattleState?.enemy!,
            state.player.party!
          );

          if (battle === BATTLE_STATES.ENEMY_WIN) {
            // показываем модалку что пользователь проиграл
            // нужно добавить isGameOver
            return {
              player: {
                ...state.player,
                battle: null,
              },
            };
          }

          if (battle === BATTLE_STATES.PLAYER_WIN) {
            // показываем модалку что пользователь победил
            const updatedParty = state.player.party.map((player) => {
              const battlePlayer = state.player.battle?.player.party.find(
                (battlePlayer) => battlePlayer.name === player.name
              );

              if (battlePlayer) {
                return {
                  ...player,
                  currentHealth: battlePlayer.currentHealth,
                };
              }

              return player;
            });

            return {
              player: {
                ...state.player,
                party: updatedParty,
                battle: null,
                locationState: RENDER_LOCATIONS.DUNGEON,
              },
            };
          }

          return {
            player: { ...state.player, battle: { ...newBattleState } },
          };
        }),

      toggleCharacterPanel: () =>
        set((state) => {
          //здесь учитываем текущее местоположение - из инвентаря в окно пресонажа и наоборот
          const getPrevLocation = () => {
            if (state.player.locationState === RENDER_LOCATIONS.INVENTORY) {
              return state.player.prevLocationState;
            }

            return state.player.prevLocationState
              ? null
              : state.player.locationState;
          };
          //здесь учитываем текущее местоположение - из инвентаря в окно пресонажа и наоборот
          const getNextLocation = () => {
            if (state.player.locationState === RENDER_LOCATIONS.INVENTORY) {
              return RENDER_LOCATIONS.LEVELING;
            }

            return state.player.prevLocationState
              ? state.player.prevLocationState
              : RENDER_LOCATIONS.LEVELING;
          };

          return {
            player: {
              ...state.player,
              prevLocationState: getPrevLocation(),
              locationState: getNextLocation(),
            },
          };
        }),

      toggleInventory: () =>
        set((state) => {
          //здесь учитываем текущее местоположение - из инвентаря в окно пресонажа и наоборот
          const getPrevLocation = () => {
            if (state.player.locationState === RENDER_LOCATIONS.LEVELING) {
              return state.player.prevLocationState;
            }

            return state.player.prevLocationState
              ? null
              : state.player.locationState;
          };
          //здесь учитываем текущее местоположение - из инвентаря в окно пресонажа и наоборот
          const getNextLocation = () => {
            if (state.player.locationState === RENDER_LOCATIONS.LEVELING) {
              return RENDER_LOCATIONS.INVENTORY;
            }

            return state.player.prevLocationState
              ? state.player.prevLocationState
              : RENDER_LOCATIONS.INVENTORY;
          };

          return {
            player: {
              ...state.player,
              prevLocationState: getPrevLocation(),
              locationState: getNextLocation(),
            },
          };
        }),

      increaseAccuracy: (characterName) =>
        set((state) => {
          const currentCharacter = state.player.party.find(
            (character) => character.name === characterName
          );

          if (currentCharacter) {
            const characterCopy = { ...currentCharacter };
            // увеличиваем характеристику
            characterCopy.accuracy += 1;
            // уменьшаем кол-во имеющихся очков
            characterCopy.points -= 1;

            const characterGear = state.gear
              ? state.gear[characterCopy.name]
              : null;

            return {
              player: {
                ...state.player,
                party: state.player.party.map((player) =>
                  player.name === characterName ? characterCopy : player
                ),
              },
              statistics: {
                ...state.statistics,
                [characterCopy.name]: calculateStatistics(
                  characterCopy,
                  characterGear
                ),
              },
            };
          }

          return state;
        }),

      increaseAgility: (characterName) =>
        set((state) => {
          const currentCharacter = state.player.party.find(
            (character) => character.name === characterName
          );

          if (currentCharacter) {
            const characterCopy = { ...currentCharacter };
            // увеличиваем характеристику
            characterCopy.agility += 1;
            // уменьшаем кол-во имеющихся очков
            characterCopy.points -= 1;

            const characterGear = state.gear
              ? state.gear[characterCopy.name]
              : null;

            return {
              player: {
                ...state.player,
                party: state.player.party.map((player) =>
                  player.name === characterName ? characterCopy : player
                ),
              },
              statistics: {
                ...state.statistics,
                [characterCopy.name]: calculateStatistics(
                  characterCopy,
                  characterGear
                ),
              },
            };
          }

          return state;
        }),

      increaseEndurance: (characterName) =>
        set((state) => {
          const currentCharacter = state.player.party.find(
            (character) => character.name === characterName
          );

          if (currentCharacter) {
            const characterCopy = { ...currentCharacter };
            // увеличиваем характеристику
            characterCopy.endurance += 1;
            // уменьшаем кол-во имеющихся очков
            characterCopy.points -= 1;

            const characterGear = state.gear
              ? state.gear[characterCopy.name]
              : null;

            return {
              player: {
                ...state.player,
                party: state.player.party.map((player) =>
                  player.name === characterName ? characterCopy : player
                ),
              },
              statistics: {
                ...state.statistics,
                [characterCopy.name]: calculateStatistics(
                  characterCopy,
                  characterGear
                ),
              },
            };
          }

          return state;
        }),

      updateGameTier: () =>
        set((state) => ({
          ...state,
          player: {
            ...state.player,
            currentTier: state.player.currentTier + 1,
          },
        })),

      updateDialogFlags: updateDialogFlags(set),
      setEconomicBranch: setEconomicBranch(set),
      healTeam: healTeam(set),
      turnOffDices: turnOffDices(set),
      setGameOver: setGameOver(set),
      useAbility: useAbility(set),
      initiateState: initiateState(set),
      resetGame: resetGame(set),

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
            stateCopy.player.dungeonsCounter += 1;
          }

          if (stateCopy.player.economic === ECONOMIC_TYPES.ALCHEMISTRY) {
            // FIXME: по мере дополнения систем инвентаря - допилить
            newConsumables = [...stateCopy.player.consumables];
            // FIXME определиться с фиксированным вознаграждением и названиями эликсиров, заменить стринги на енамы
            // проверяем, есть ли у игрока вообще уже такие зелья
            const elixirIndex = newConsumables.findIndex(
              (item) => item[0] === CONSUMABLES.SMALL_HEALTH_POTION
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
              newConsumables.push([CONSUMABLES.SMALL_HEALTH_POTION, "2"]);
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
    }),
    persistConfig
  )
);
