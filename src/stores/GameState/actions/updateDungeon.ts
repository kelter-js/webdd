import {
  generateSpecialEncounter,
  getRandom,
  isSpecialEncounter,
} from "../../../utils";
import {
  MAX_ENCOUNTER_CHANCE,
  MIN_ENCOUNTER_CHANCE,
  SPECIAL_ENCOUNTER_DEFAULT_CHANCE,
} from "../../constants";
import {
  generateBattle,
  getEncounterRoll,
  getFirstTurn,
  getRandomRewardWithoutFight,
} from "../../utils";
import { BattleGenerationProps, RewardTypes } from "../../../types";
import { DungeonCoordinates, Item } from "../../../types/gameState";
import { POTION_TYPES } from "../../../entities/consumables";
import { RENDER_LOCATIONS } from "../../../entities";
import { JUNK_TYPES } from "../../../entities/junk";
import { ROOM_TYPES } from "../../../entities/room";
import { StoreSet } from "./types";

export const updateDungeon =
  (set: StoreSet) =>
  (
    { position }: { position: DungeonCoordinates },
    onFightStart: (isSpecialEncounter?: boolean) => void,
    onReward: (reward: string) => void,
  ) => {
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

        const startBattle = (
          params?: Pick<
            BattleGenerationProps,
            "isBoss" | "isQuest" | "isSpecial"
          >,
        ) => {
          const { isSpecial } = params || {};

          const firstTurn = getFirstTurn(
            copyState.player.location.dungeonLevel ||
              copyState.player.currentTier,
            copyState.player.party,
            isSpecial,
          );

          copyState.player.battle = generateBattle({
            tier:
              copyState.player.location.dungeonLevel ||
              copyState.player.currentTier,
            turn: firstTurn,
            party: copyState.player.party,
            characterGear: copyState.gear,
            ...params,
          });

          copyState.player.locationState = RENDER_LOCATIONS.BATTLE;
          copyState.isDiceRequiredRoll = true;

          if (copyState.player.location) {
            copyState.player.location.encounterChance = MIN_ENCOUNTER_CHANCE;
          }
        };

        if (isPlayableArea) {
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

            copyState.player.locationState = RENDER_LOCATIONS.SPECIAL_ENCOUNTER;
          } else {
            {
              // Логика рассчета того, что мы попали в бой
              const encounterChance = getRandom(1, 100);

              const currentChance = copyState.player.location?.encounterChance!;

              const roll = getEncounterRoll(
                currentChance!,
                isAlreadyVisited,
                Boolean(currentCell.isLighted),
                Boolean(isDeadEnd),
              );

              const hasEncounter = encounterChance < roll;

              if (hasEncounter) {
                onFightStart();

                if (isDeadEnd) {
                  currentCell.type = ROOM_TYPES.CLEARED;
                  startBattle({ isSpecial: true });
                } else {
                  startBattle();
                }
              } else {
                if (copyState.player.location && !isDeadEnd) {
                  copyState.player.location.encounterChance = Math.min(
                    currentChance + MIN_ENCOUNTER_CHANCE,
                    MAX_ENCOUNTER_CHANCE,
                  );
                }

                if (isDeadEnd) {
                  currentCell.type = ROOM_TYPES.CLEARED;
                  const reward = getRandomRewardWithoutFight(
                    copyState.player.location?.dungeonLevel ||
                      copyState.player.currentTier,
                  );

                  onReward(reward.message);

                  if (reward.result) {
                    switch (reward.type) {
                      case RewardTypes.GOLD: {
                        copyState.player.gold += reward.result as number;

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
        }

        if (copyState.player?.torches && !currentCell.isLighted) {
          currentCell.isLighted = true;
          copyState.player.torches -= 1;
        }

        if (currentCell.type === ROOM_TYPES.STORY_BOSS) {
          onFightStart();
          startBattle({ isBoss: true });

          currentCell.type = ROOM_TYPES.END;
        }

        if (currentCell.type === ROOM_TYPES.ENEMY) {
          onFightStart();
          startBattle({ isQuest: true });
        }

        copyState.player.location.dungeon = newDungeon;

        return copyState;
      }

      return state;
    });
  };
