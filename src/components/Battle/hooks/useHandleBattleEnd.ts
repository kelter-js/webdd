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
import { getRandom, getFlagStoryBossByTier } from "../../../utils";
import { STORY_BOSSES_LIST } from "../../../constants/creatures";

//   items?: Item[];

export const useHandleBattleEnd = () => {
  const {
    player: { battle, currentTier, location },
    setReward,
  } = useGameState();

  const enemyHealth = battle?.enemy?.party?.reduce(
    (acc, enemy) => acc + enemy.hp,
    0,
  );

  useEffect(() => {
    if (battle && enemyHealth !== undefined && enemyHealth <= 0) {
      const enemy = battle.enemy.party;

      const reward = {} as Reward;

      if (enemy.length === 1 && STORY_BOSSES_LIST.includes(enemy[0].type)) {
        reward.flags = getFlagStoryBossByTier(
          location?.dungeonLevel || currentTier,
        );
      }

      const items: Item[] = [];

      const { gold, exp } = battle.enemy.party.reduce(
        (acc, creature) => {
          // mock ?? 20 - убрать
          acc.exp += creature.exp ?? 20;
          acc.gold += getGoldByTier(
            location?.dungeonLevel || currentTier,
            creature?.isEnhanced,
          );
          const itemRoll = getRandom(1, 100);

          if (itemRoll > 20) {
            items.push(
              generateRandomItem(
                location?.dungeonLevel || currentTier,
                creature.isEnhanced,
              ),
            );
          }

          return acc;
        },
        { gold: 0, exp: 0, counter: {} },
      );

      reward.experience = exp;
      reward.money = gold;

      const potionRoll = getRandom(0, 100);

      if (potionRoll > 50) {
        reward.potions = getRandomPotionByTier(
          location?.dungeonLevel || currentTier,
        );
      }

      const junkRoll = getRandom(0, 100);

      if (junkRoll < 80) {
        reward.junk = getRandomJunkByTier(
          location?.dungeonLevel || currentTier,
        );
      }

      reward.resources = getRandomResources();

      if (items.length > 0) {
        reward.items = items;
      }

      setReward(reward);
    }
  }, [enemyHealth]);
};
