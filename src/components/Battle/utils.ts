// каждый проотивник имеет свой уникальный айди, вместо функций делаем отображение

import {
  FIRST_TIER_JUNK,
  getPotionByTier,
  SECOND_TIER_JUNK,
  THIRD_TIER_JUNK,
} from "../../constants/items";
import {
  ALL_ITEMS_RARE_TIER_1,
  ALL_ITEMS_RARE_TIER_2,
  ALL_ITEMS_RARE_TIER_3,
  ALL_ITEMS_TIER_1,
  ALL_ITEMS_TIER_2,
  ALL_ITEMS_TIER_3,
} from "../../constants/gear";
import { POTION_TYPES } from "../../entities/consumables";
import { ALL_RESOURCES_TYPE, RESOURCES } from "../../entities/resources";
import { getRandom } from "../../utils";
import { generateItem } from "../../utils/generateStoreItems";
import staticBgTier1 from "../../assets/static/dungeon_hallway/battle_tier_1/image (1).jpg";
import staticBgTier2 from "../../assets/static/dungeon_hallway/battle_tier_1/image (2).jpg";
import staticBgTier3 from "../../assets/static/dungeon_hallway/battle_tier_1/image (3).jpg";
import staticBgTier4 from "../../assets/static/dungeon_hallway/battle_tier_1/image (4).jpg";
import staticBgTier5 from "../../assets/static/dungeon_hallway/battle_tier_1/image (5).jpg";
import staticBgTier6 from "../../assets/static/dungeon_hallway/battle_tier_1/image (6).jpg";
import staticBgTier7 from "../../assets/static/dungeon_hallway/battle_tier_1/image (7).jpg";
import staticBgTier8 from "../../assets/static/dungeon_hallway/battle_tier_1/image (8).jpg";
import staticBgTier9 from "../../assets/static/dungeon_hallway/battle_tier_1/image (9).jpg";
import staticBgTier10 from "../../assets/static/dungeon_hallway/battle_tier_1/image (10).jpg";

// ключи - айди существа - значение это путь к изображению с существом
export const CREATURE_ID_TO_IMAGE_MAP = {};

// каждый проотивник имеет свой уникальный айди, вместо функций делаем отображение
// ключи - айди существа - значение это путь к звуку с существом
export const CREATURE_ID_TO_SOUND_MAP = {};

// каждый проотивник имеет свой уникальный айди, вместо функций делаем отображение
// ключи - айди существа - значение это путь к коллбэкам логики существа
// AI_PACK возвращает коллбэк, этот коллбэк получает массив дебафов противника, массив персонажей игрока
// текущие характеристики существа и на основании этого возвращает модель атаки
// ATACK MODEL = {
// target: имя персонажа или ALL
// action: "ATTACK" или "DEBUFF" или "HEAL" - хилит себя, вешает дебафф, атакует
// damage?: number
// }
export const CREATURE_ID_TO_AI_PACK_MAP = {};

// каждый проотивник имеет свой уникальный айди, вместо функций делаем отображение
// ключи - айди существа - значение это путь к имени с существом
export const CREATURE_ID_TO_NAME_MAP = {};

export const getGoldByTier = (currentTier: number, isSpecial?: boolean) => {
  if (currentTier === 1) {
    return getRandom(75, isSpecial ? 200 : 150);
  }

  if (currentTier === 2) {
    return getRandom(150, isSpecial ? 275 : 225);
  }

  return getRandom(225, isSpecial ? 350 : 300);
};

export const getRandomPotionByTier = (currentTier: number) => {
  const currentPotionType = getPotionByTier(currentTier);

  const potionsData = [{ type: currentPotionType, amount: getRandom(1, 3) }];

  if (currentTier === 2) {
    const additionalPotionsRoll = getRandom(0, 100);

    if (additionalPotionsRoll > 75) {
      potionsData.push({
        type: POTION_TYPES.SMALL_HEALTH_POTION,
        amount: getRandom(1, 3),
      });
    }
  }

  if (currentTier === 3) {
    const additionalPotionsRoll = getRandom(0, 100);

    if (additionalPotionsRoll > 75) {
      potionsData.push({
        type: POTION_TYPES.MEDIUM_HEALTH_POTION,
        amount: getRandom(1, 3),
      });
    }

    const additionalPotionsRollLowTier = getRandom(0, 100);

    if (additionalPotionsRollLowTier > 50) {
      potionsData.push({
        type: POTION_TYPES.SMALL_HEALTH_POTION,
        amount: getRandom(1, 3),
      });
    }

    const additionalPotionsRollRareTier = getRandom(0, 100);

    if (additionalPotionsRollRareTier > 70) {
      potionsData.push({
        type: POTION_TYPES.EXTRA_LARGE_HEALTH_POTION,
        amount: getRandom(1, 3),
      });
    }
  }

  return potionsData;
};

export const getRandomJunkByTier = (currentTier: number) => {
  if (currentTier === 1) {
    return FIRST_TIER_JUNK[getRandom(0, FIRST_TIER_JUNK.length - 1)];
  }

  if (currentTier === 1) {
    return SECOND_TIER_JUNK[getRandom(0, SECOND_TIER_JUNK.length - 1)];
  }

  return THIRD_TIER_JUNK[getRandom(0, THIRD_TIER_JUNK.length - 1)];
};

export const getRandomResources = () => {
  const amountOfResourceTypes = getRandom(1, ALL_RESOURCES_TYPE.length);

  const resourcesPool: RESOURCES[] = [];

  ALL_RESOURCES_TYPE.slice(0, amountOfResourceTypes).forEach((resource) => {
    const rollForDoubleResources = getRandom(0, 100);

    if (rollForDoubleResources > 50) {
      // не ошибка, добавляем дважды один и тот же ресурс
      resourcesPool.push(resource);
      resourcesPool.push(resource);
    } else {
      resourcesPool.push(resource);
    }
  });

  return resourcesPool;
};

export const generateRandomItem = (
  currentTier: number,
  isSpecial?: boolean,
) => {
  const enhancedItemChance = isSpecial ? 40 : 20;

  if (currentTier === 1) {
    return generateItem(
      ALL_ITEMS_TIER_1,
      enhancedItemChance,
      ALL_ITEMS_RARE_TIER_1,
    );
  }

  if (currentTier === 2) {
    return generateItem(
      ALL_ITEMS_TIER_2,
      enhancedItemChance,
      ALL_ITEMS_RARE_TIER_2,
    );
  }

  return generateItem(
    ALL_ITEMS_TIER_3,
    enhancedItemChance,
    ALL_ITEMS_RARE_TIER_3,
  );
};

const firstTierStaticBackgrounds = [
  staticBgTier1,
  staticBgTier2,
  staticBgTier3,
  staticBgTier4,
  staticBgTier5,
  staticBgTier6,
  staticBgTier7,
  staticBgTier8,
  staticBgTier9,
  staticBgTier10,
];

export const getBattleBackground = (tier: number) => {
  switch (tier) {
    case 1: {
      const randomImageIndex = getRandom(
        0,
        firstTierStaticBackgrounds.length - 1,
      );
      return firstTierStaticBackgrounds[randomImageIndex];
    }

    case 2: {
      // MOCK
      return staticBgTier1;
    }

    case 3: {
      // MOCK
      return staticBgTier1;
    }

    default: {
      return staticBgTier1;
    }
  }
};
