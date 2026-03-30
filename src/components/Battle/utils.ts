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

import staticBgTier2_1 from "../../assets/static/dungeon_hallway/battle_tier_2/image (1).jpg";
import staticBgTier2_2 from "../../assets/static/dungeon_hallway/battle_tier_2/image (2).jpg";
import staticBgTier2_3 from "../../assets/static/dungeon_hallway/battle_tier_2/image (3).jpg";
import staticBgTier2_4 from "../../assets/static/dungeon_hallway/battle_tier_2/image (4).jpg";
import staticBgTier2_5 from "../../assets/static/dungeon_hallway/battle_tier_2/image (5).jpg";
import staticBgTier2_6 from "../../assets/static/dungeon_hallway/battle_tier_2/image (6).jpg";
import staticBgTier2_7 from "../../assets/static/dungeon_hallway/battle_tier_2/image (7).jpg";
import staticBgTier2_8 from "../../assets/static/dungeon_hallway/battle_tier_2/image (8).jpg";
import staticBgTier2_9 from "../../assets/static/dungeon_hallway/battle_tier_2/image (9).jpg";
import staticBgTier2_10 from "../../assets/static/dungeon_hallway/battle_tier_2/image (10).jpg";

import staticBgTier3_1 from "../../assets/static/dungeon_hallway/battle_tier_3/image (1).jpg";
import staticBgTier3_2 from "../../assets/static/dungeon_hallway/battle_tier_3/image (2).jpg";
import staticBgTier3_3 from "../../assets/static/dungeon_hallway/battle_tier_3/image (3).jpg";
import staticBgTier3_4 from "../../assets/static/dungeon_hallway/battle_tier_3/image (4).jpg";
import staticBgTier3_5 from "../../assets/static/dungeon_hallway/battle_tier_3/image (5).jpg";
import staticBgTier3_6 from "../../assets/static/dungeon_hallway/battle_tier_3/image (6).jpg";
import staticBgTier3_7 from "../../assets/static/dungeon_hallway/battle_tier_3/image (7).jpg";
import staticBgTier3_8 from "../../assets/static/dungeon_hallway/battle_tier_3/image (8).jpg";
import staticBgTier3_9 from "../../assets/static/dungeon_hallway/battle_tier_3/image (9).jpg";
import staticBgTier3_10 from "../../assets/static/dungeon_hallway/battle_tier_3/image (10).jpg";
import { Battle, Creature, Statistics } from "../../types/gameState";
import { DamageData } from "./types";
import { AI_CATEGORIES } from "../../entities/ai";
import { ENEMIES } from "../../entities";
import { CREATURE_NAME_MAP, getEnemyPhrase } from "../../constants/creatures";
import { CHARACTER_MESSAGES } from "../../constants/characters";
import {
  TEMPLATE_DAMAGE,
  TEMPLATE_NAME,
  TEMPLATE_TARGET,
} from "../../constants";
import { calculateFinalEvasion, getFinalDamage } from "../../stores/constants";
import { EFFECTS } from "../../entities/effects";

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

const secondTierStaticBackgrounds = [
  staticBgTier2_1,
  staticBgTier2_2,
  staticBgTier2_3,
  staticBgTier2_4,
  staticBgTier2_5,
  staticBgTier2_6,
  staticBgTier2_7,
  staticBgTier2_8,
  staticBgTier2_9,
  staticBgTier2_10,
];

const thirdTierStaticBackgrounds = [
  staticBgTier3_1,
  staticBgTier3_2,
  staticBgTier3_3,
  staticBgTier3_4,
  staticBgTier3_5,
  staticBgTier3_6,
  staticBgTier3_7,
  staticBgTier3_8,
  staticBgTier3_9,
  staticBgTier3_10,
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
      const randomImageIndex = getRandom(
        0,
        secondTierStaticBackgrounds.length - 1,
      );
      return secondTierStaticBackgrounds[randomImageIndex];
    }

    case 3: {
      const randomImageIndex = getRandom(
        0,
        thirdTierStaticBackgrounds.length - 1,
      );
      return thirdTierStaticBackgrounds[randomImageIndex];
    }

    default: {
      return staticBgTier1;
    }
  }
};

const removeTurnFromTarget = (target: string, enemyParty: Creature[]) => {
  console.log("target is", target);
  console.log("enemyParty is", enemyParty);
  return enemyParty.map((enemy) =>
    enemy.id === target ? { ...enemy, hasTurn: false } : enemy,
  );
};

export const calculateAiDamage = (
  battleModel: Battle,
  statistics: Record<string, Statistics>,
  source: Creature,
): { model: Battle; damageModel: DamageData[] | null } => {
  // просто атакуют
  console.log("source", source);
  if (source.aiPackage === AI_CATEGORIES.DEFAULT) {
    // список живых игроков
    const party = battleModel.player.party.filter(
      (player) => player.currentHealth > 0,
    );

    // если никого нет - сюда не должны вообще попадать - но выходим из функции
    if (party.length === 0) {
      return { model: battleModel, damageModel: null };
    }

    // берем рандомного игрока
    const randomPlayerIndex = getRandom(0, party.length - 1);
    // данные рандомного игрока, создаём копию модели с которой дальше работаем
    const playerData = { ...party[randomPlayerIndex] };
    const playerStatistics = statistics[playerData.name];

    // если по каким-то причинам нет игрока или статистики по нему - выходим
    if (!playerData || !playerStatistics) {
      return { model: battleModel, damageModel: null };
    }
    // высчитываем шанс промахнуться по игроку
    const evasionChance = calculateFinalEvasion(playerStatistics.evasionChance);
    // получаем читаемо имя персонажа
    const enemyName = CREATURE_NAME_MAP[source.type];
    // проверяем, промах ли это
    if (Math.random() < evasionChance) {
      return {
        model: {
          ...battleModel,
          enemy: {
            ...battleModel.enemy,
            party: removeTurnFromTarget(source.id, battleModel.enemy.party),
          },
          messages: [
            ...battleModel.messages,
            {
              message: getEnemyPhrase(
                playerData.name,
                0,
                source.type,
                false,
                true,
              ),
              attackerName: enemyName,
              attackerType: "Enemy",
            },
          ],
        },
        damageModel: [
          {
            target: playerData.name,
            damage: null,
            isCritical: false,
            isEvasion: true,
            shouldPlayDeathAnimation: false,
          },
        ],
      };
    }

    const initialDamage = getRandom(source.minDmg, source.maxDmg);
    const damageAfterArmorReduction = getFinalDamage(
      initialDamage,
      playerStatistics.defense,
    );

    let isPlayerDead = false;

    const newModel = {
      ...battleModel,
      enemy: {
        ...battleModel.enemy,
        party: removeTurnFromTarget(source.id, battleModel.enemy.party),
      },
      player: {
        ...battleModel.player,
        party: battleModel.player.party.map((player) => {
          if (player.name === playerData.name) {
            const currentHealth = player.currentHealth;
            const newPlayerHealth = Math.max(
              0,
              currentHealth - damageAfterArmorReduction,
            );

            if (newPlayerHealth === 0) {
              isPlayerDead = true;
            }

            return {
              ...player,
              currentHealth: newPlayerHealth,
            };
          }

          return player;
        }),
      },
    };

    return {
      model: {
        ...newModel,
        messages: [
          ...battleModel.messages,
          {
            message: getEnemyPhrase(
              playerData.name,
              damageAfterArmorReduction,
              source.type,
              isPlayerDead,
              false,
            ),
            attackerName: enemyName,
            attackerType: "Enemy",
          },
        ],
      },
      damageModel: [
        {
          target: playerData.name,
          damage: damageAfterArmorReduction,
          isCritical: false,
          isEvasion: false,
          shouldPlayDeathAnimation: isPlayerDead,
        },
      ],
    };
  }

  // могут вешать bleed
  if (source.aiPackage === AI_CATEGORIES.TIER_2) {
  }

  // могут вешать bleed/fire/хилить себя
  if (source.aiPackage === AI_CATEGORIES.TIER_3) {
  }

  // может вешать bleed
  if (source.aiPackage === AI_CATEGORIES.MINIBOSS_TIER_1) {
  }

  // может вешать bleed и fire
  if (source.aiPackage === AI_CATEGORIES.MINIBOSS_TIER_2) {
  }

  // может вешать bleed/fire/stun/хилить себя/выбирает в таргет лоухп
  if (source.aiPackage === AI_CATEGORIES.MINIBOSS_TIER_3) {
  }

  // может хилить себя
  if (source.aiPackage === AI_CATEGORIES.BOSS_TIER_1) {
  }

  // хилит себя - вешает стан
  if (source.aiPackage === AI_CATEGORIES.BOSS_TIER_2) {
  }

  // может вешать bleed/fire/stun/хилить себя/выбирает в таргет лоухп
  if (source.aiPackage === AI_CATEGORIES.BOSS_TIER_3) {
  }

  return { model: battleModel, damageModel: [] };
};

export const generatePlayerMessage = (
  name: string,
  target: ENEMIES,
  damage: number,
  isEvasion?: boolean,
) => {
  if (isEvasion) {
    return `${name} промахивается.`;
  }

  const enemyName = CREATURE_NAME_MAP[target];
  const messageIndex = getRandom(0, CHARACTER_MESSAGES.length - 1);
  let message = CHARACTER_MESSAGES[messageIndex];

  console.log("message", message);

  message = message.replace(TEMPLATE_NAME, name);
  message = message.replace(TEMPLATE_TARGET, enemyName);
  message = message.replace(TEMPLATE_DAMAGE, String(damage));

  return message;
};
