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
  addJunk,
  giveResources,
  updateFlags,
  increaseResourcesBagLevel,
  acquirePerk,
  sellItem,
  swapItem,
  handleExitDungeon,
  buyItem,
  generateDungeon,
  levelUpCharacter,
} from "./actions";
import { getRandom } from "../../utils";
import { isSpecialEncounter } from "../../utils/isSpecialEncounter";
import {
  ENCOUNTER_MAP,
  generateSpecialEncounter,
} from "../../utils/generateSpecialEncounter";
import { FLAGS } from "../../constants";

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

      updateDungeon: ({ position }, onFightStart) =>
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
              currentCell.type !== ROOM_TYPES.STORY_BOSS;
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
                // сбрасываем шанс на спешиал энкаунтер к дефолтному
                copyState.player.specialEncounterChance =
                  SPECIAL_ENCOUNTER_DEFAULT_CHANCE;

                const specialEncounter = generateSpecialEncounter(
                  copyState.player.flags,
                );

                copyState.player.location.specialEncounter = specialEncounter;
                copyState.player.flags.push(ENCOUNTER_MAP[specialEncounter]);
              }

              if (!copyState.player.location?.specialEncounter) {
                // Логика рассчета того, что мы попали в бой
                const encounterChance = Math.random() * 100;

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

                  console.log("do we reach that place?");

                  if (isDeadEnd) {
                    const firstTurn = getFirstTurn(
                      copyState.player.currentTier,
                      copyState.effects,
                      copyState.player.party,
                      true,
                    );

                    const battle = generateBattle(
                      copyState.player.currentTier,
                      firstTurn,
                      copyState.player.party,
                      true,
                    );
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
                    const battle = generateBattle(
                      copyState.player.currentTier,
                      firstTurn,
                      copyState.player.party,
                    );
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
                    // если не прокнул противник и мы в тупике - значит нужно сгенерировать событие получения награды!
                  }
                }
              }
            }

            if (currentCell.type === ROOM_TYPES.STORY_BOSS) {
              if (
                copyState.player.currentTier === 1 &&
                !copyState.player.flags.includes(FLAGS.FIRST_STORY_BOSS_VICTORY)
              ) {
                // меняем локацию, генерим модель боя, устанавливаем константой противника босса первого тира
              }

              if (
                copyState.player.currentTier === 2 &&
                !copyState.player.flags.includes(
                  FLAGS.SECOND_STORY_BOSS_VICTORY,
                )
              ) {
                // меняем локацию, генерим модель боя, устанавливаем константой противника босса первого тира
              }

              if (
                copyState.player.currentTier === 3 &&
                !copyState.player.flags.includes(FLAGS.THIRD_STORY_BOSS_VICTORY)
              ) {
                // меняем локацию, генерим модель боя, устанавливаем константой противника босса первого тира
              }
            }

            copyState.player.location.dungeon = newDungeon;

            return copyState;
          }

          return state;
        }),

      updateDialogFlags: updateDialogFlags(set),
      setPlayerPosition: setPlayerPosition(set),
      increaseEndurance: increaseEndurance(set),
      generateDungeon: generateDungeon(set),
      increaseAccuracy: increaseAccuracy(set),
      updateFlags: updateFlags(set),
      increaseAgility: increaseAgility(set),
      updateBattle: updateBattle(set),
      setDungeon: setDungeon(set),
      changeAttempts: changeAttempts(set),
      setQuestData: setQuestData(set),
      swapItem: swapItem(set),
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
            party: state.player.party.map((member) => ({
              ...member,
              experience: 3000,
            })),
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
