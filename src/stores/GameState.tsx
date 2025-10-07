import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

import {
  BATTLE_STATES,
  BATTLE_TARGET,
  RENDER_LOCATIONS,
  TURN_STATES,
  ECONOMIC_TYPES,
} from "../entities";
import {
  DEFAULT_GAME_STATE,
  MAX_ENCOUNTER_CHANCE,
  MIN_ENCOUNTER_CHANCE,
} from "./constants";
import {
  calculateStatistics,
  generateBattle,
  getBattleState,
  getEncounterRoll,
  getFirstTurn,
  reviver,
} from "./utils";
import { PersistedState, StorageValue, StoreState } from "../types/gameState";
import { ROOM_TYPES } from "../entities/room";

// Define persistence configuration
const persistConfig: PersistOptions<StoreState, PersistedState> = {
  name: "game-state",

  partialize: (state) => ({
    player: state.player,
  }),

  storage: {
    getItem: (name: string) => {
      const str = localStorage.getItem(name);
      if (!str) return null;

      return JSON.parse(str, reviver) as StorageValue;
    },

    setItem: (name: string, value: unknown) => {
      const storageValue = value as StorageValue;
      const serialized: StorageValue = {
        state: storageValue.state,
      };
      localStorage.setItem(name, JSON.stringify(serialized));
    },

    removeItem: (name: string) => localStorage.removeItem(name),
  },
};

// Create the store
export const useGameState = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      player: DEFAULT_GAME_STATE,
      effects: null,
      statistics: null,
      gear: null,
      abilities: null,
      isDiceRequiredRoll: false,
      isAutoSaveRequired: false,
      playersLvlUpNotifications: [],

      // Methods
      resetGame: () =>
        set(() => ({
          player: { ...DEFAULT_GAME_STATE },
          effects: null,
          statistics: null,
          gear: null,
          abilities: null,
          isDiceRequiredRoll: false,
          isAutoSaveRequired: false,
          playersLvlUpNotifications: [],
        })),

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
              currentHealth: 6 * 12,
              endurance: 12,
              accuracy: 5,
              agility: 7,
              points: 5,
              critChance: 0,
              critStrike: 0,
              perksList: [],
            },
            {
              name: "SomeWhatOfTestingName-HEALER",
              experience: 0,
              level: 1,
              currentHealth: 6 * 10,
              endurance: 10,
              accuracy: 7,
              agility: 7,
              points: 5,
              critChance: 0,
              critStrike: 0,
              perksList: [],
            },
            {
              name: "SomeWhatOfTestingName-DAMAGER",
              experience: 0,
              level: 1,
              currentHealth: 6 * 8,
              endurance: 8,
              accuracy: 9,
              agility: 9,
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

      useAbility: (characterName, abilityId) =>
        set((state) => {
          // нужна утиль функция возвращающая модель абилки
          // const abilityData = getAbilityDataById(abilityId);
          const character = state.player.party.find(
            (player) => player.name === characterName
          );
          // в зависимости от AbilityData - вешаем дебафф на противника, хилимся, наносим урон противнику и т.д.
          return state;
        }),

      initiateState: () =>
        set((state) => {
          const stateCopy = { ...state };
          stateCopy.statistics = {};
          stateCopy.abilities = {};
          stateCopy.gear = {};
          stateCopy.effects = {};

          // инициализируем хар-ки
          state.player.party.forEach((player) => {
            stateCopy.statistics![player.name] = calculateStatistics(player);

            player.perksList.forEach((perk) => {
              if (perk.isAbility) {
                // нужна утиль функция возвращающая модель Ability, она имеет тип, внутри стейта будет функция useAbility,
                //  ей передается тип и она в зависимости от него делает что-то
                // stateCopy.abilities![player.name] = createAbility(perk);
              }
            });
          });

          // if (stateCopy.player.gear_memoized && !state.gear) {
          //   // здесь вызываем функцию, которая сначала парсит строку на объект с данными
          //   const parsedGear = parseGear(stateCopy.player.gear_memoized);
          //   if (parsedGear) {
          //     // затем мы должны вызывать мап функцию, которая из строки сформирует нужные объекты с уже заполненными данными, иконкой, эффектами, статами
          //     parsedGear.forEach((gear) => {
          //       // ф-ия возвращает поле characterName и массив вещей, с уже заполненными полями
          //       const { characterName, ...rest } = generateGear(gear);

          // const currentCharacterStats = stateCopy.statistics[characterName];
          //       rest.forEach((equipment) => {
          //     if ( equipment.type === "ARTIFACT") {
          //        const {effectName, effectValue} = getEffectFromGear(equipment);
          //        state.effects[effectName] = effectValue;
          //     }

          //         if (equipment.type === "WEAPON") {
          //           // из экипировки вычисляем урон и прибавляем к значениям, которые высчитали из хар-ик
          //           currentCharacterStats.minAttack += equipment.minAttack;
          //           currentCharacterStats.maxAttack += equipment.maxAttack;
          //         }
          //         if (equipment.type === "ARMOR") {
          //           // из экипировки вычисляем броню и устанавливаем
          //           currentCharacterStats.defense = equipment.armor;
          //         }
          // const { statName, statValue } = getStatsFromItem(equipment);
          //           currentCharacterStats[statName] += statValue;
          //       });
          //       stateCopy.gear![characterName] = rest;
          //     });
          //   }
          // }

          console.log("so we fire too?");
          return {
            ...state,
            statistics: { ...(stateCopy.statistics || {}) },
            gear: { ...(stateCopy.gear || {}) },
            abilities: { ...(stateCopy.abilities || {}) },
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
      turnOffDices: () =>
        set((state) => ({ ...state, isDiceRequiredRoll: false })),

      setGameOver: () =>
        set((state) => ({
          ...state,
          player: { ...state.player, isGameOver: true },
        })),

      updateGameTier: () =>
        set((state) => ({
          ...state,
          player: {
            ...state.player,
            currentTier: state.player.currentTier + 1,
          },
        })),

      updateDialogFlags: (flags) =>
        set((state) => ({
          ...state,
          player: {
            ...state.player,
            dialogFlags: [...state.player.dialogFlags, ...flags],
          },
        })),

      setEconomicBranch: (economicBranch) =>
        set((state) => ({
          ...state,
          player: { ...state.player, economic: economicBranch },
        })),
    }),
    persistConfig
  )
);
