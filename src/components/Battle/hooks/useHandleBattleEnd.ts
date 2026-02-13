import { useEffect } from "react";
import { useGameState } from "../../../stores";
import { Item, Reward } from "../../../types/gameState";
import {
  generateRandomItem,
  getGoldByTier,
  getRandomJunkByTier,
  getRandomPotionByTier,
  getRandomResources,
} from "../utils";
import { getRandom } from "../../../utils";
import { RESOURCES } from "../../../entities/resources";
import { STORY_BOSSES_LIST } from "../../../constants/creatures";
import { FLAGS } from "../../../constants";
import { getFlagStoryBossByTier } from "../../../utils/getFlagStoryBossByTier";

//   items?: Item[];

export const useHandleBattleEnd = () => {
  const {
    player: { battle, currentTier, hasCamera },
    setReward,
    updateFlags,
  } = useGameState();

  const enemyHealth = battle?.enemy?.party?.reduce(
    (acc, enemy) => acc + enemy.health,
    0,
  );

  useEffect(() => {
    if (battle && enemyHealth !== undefined && enemyHealth <= 0) {
      const enemy = battle.enemy.party;

      if (enemy.length === 1 && STORY_BOSSES_LIST.includes(enemy[0].type)) {
        updateFlags(getFlagStoryBossByTier(currentTier));
      }

      const reward = {} as Reward;

      const items: Item[] = [];

      const { gold, exp } = battle.enemy.party.reduce(
        (acc, creature) => {
          // mock ?? 20 - убрать
          acc.exp += creature.exp ?? 20;
          acc.gold += getGoldByTier(currentTier, creature?.isEnhanced);
          const itemRoll = getRandom(1, 100);

          if (itemRoll > 20) {
            items.push(generateRandomItem(currentTier, creature.isEnhanced));
          }

          if (hasCamera) {
            // вызываем ф-ию из стора для обновления счетчика
          }

          return acc;
        },
        { gold: 0, exp: 0, counter: {} },
      );

      if (hasCamera) {
        // вызываем ф-ию из стора для обновления счетчика
      }

      reward.experience = exp;
      reward.money = gold;

      const potionRoll = getRandom(0, 100);

      if (potionRoll > 50) {
        reward.potions = getRandomPotionByTier(currentTier);
      }

      const junkRoll = getRandom(0, 100);

      if (junkRoll < 80) {
        reward.junk = getRandomJunkByTier(currentTier);
      }

      reward.resources = getRandomResources();

      if (items.length > 0) {
        reward.items = items;
      }

      setReward(reward);
    }
  }, [enemyHealth]);
};
