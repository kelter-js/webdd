// ТИПИЗАЦИЯ НУЖНА
import {
  Battle,
  BattleEffects,
  Character,
  Creature,
  EFFECT_TYPES,
  GameStateData,
  GearData,
  Item,
  StoreState,
} from "../types/gameState";
import {
  DEAD_END_ENEMY_CHANCE,
  MIN_ENCOUNTER_CHANCE,
  MIN_ENCOUNTER_CHANCE_HIGHT_TIER,
  MIN_ENCOUNTER_CHANCE_MID_TIER,
  VISITED_LOCATION_WITH_LIGHT,
  VISITED_LOCATION_WITHOUT_LIGHT,
} from "./constants";
import { BATTLE_STATES, TURN_STATES } from "../entities/battle";
import { getRandom } from "../utils";
import { GEAR_SLOTS } from "../entities/gear";
import { POTION_TYPES } from "../entities/consumables";
import { MEDIC_PERKS, SNIPER_PERKS, TANK_PERKS } from "../constants/perks";
import {
  generateRandomItem,
  getGoldByTier,
  getRandomJunkByTier,
} from "../components/Battle/utils";
import { CreatureBaseModel, QuestReward, RewardTypes } from "../types";
import { generatePotion } from "../utils/generatePotionsToBuy";
import {
  EnemyInitialData,
  EnemyPrototypeData,
  FIRST_TIER_BOSS,
  FIRST_TIER_CREATURES_LIST,
  FIRST_TIER_MINIBOSS_LIST,
  FIRST_TIER_QUEST_MINIBOSS,
  SECOND_TIER_BOSS,
  SECOND_TIER_CREATURES_LIST,
  SECOND_TIER_MINIBOSS_LIST,
  SECOND_TIER_QUEST_MINIBOSS,
  THIRD_TIER_BOSS,
  THIRD_TIER_CREATURES_LIST,
  THIRD_TIER_MINIBOSS_LIST,
  THIRD_TIER_QUEST_MINIBOSS,
} from "../constants/creatures";
import { DUNGEONS, QUEST_STATUSES } from "../entities";
import { v4 } from "uuid";
// import FIRST_TIER_CREATURES_DATA from "../../common/creatures";
// FIRST_TIER_CREATURES_DATA - это массив из констант содержащих в себе - изначальные характеристики противника, его уникальный ID
// _DATA - дописал потому что это именно ДАННЫЕ, отдельно будет в том же файле FIRST_TIER_CREATURES_SOUNDS, FIRST_TIER_CREATURES_IMAGES и FIRST_TIER_CREATURES_AI_PACK
// FIRST_TIER_CREATURES_NAMES

export const getEncounterRoll = (
  chance: number,
  alreadyVisited: boolean,
  hasLight: boolean,
  isDeadEnd: boolean,
) => {
  if (isDeadEnd) {
    return DEAD_END_ENEMY_CHANCE;
  }

  let encounterChance = chance;

  if (alreadyVisited) {
    encounterChance += hasLight
      ? VISITED_LOCATION_WITH_LIGHT
      : VISITED_LOCATION_WITHOUT_LIGHT;
  }

  return encounterChance;
};

export const getMultiplierBattleChanceByTier = (tier: number) => {
  // заменить на enum и switch
  if (tier === 1) {
    return MIN_ENCOUNTER_CHANCE;
  }

  if (tier === 2) {
    return MIN_ENCOUNTER_CHANCE_MID_TIER;
  }

  if (tier === 3) {
    return MIN_ENCOUNTER_CHANCE_HIGHT_TIER;
  }

  return MIN_ENCOUNTER_CHANCE;
};

export const reviver = (_: string, value: any) => {
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
  ) {
    return new Date(value);
  }

  return value;
};

const WITHOUT_FIGHT_ITEM_CHANCE = 20;
const WITHOUT_FIGHT_POTION_CHANCE = 40;
const WITHOUT_FIGHT_GOLD_CHANCE = 60;
const WITHOUT_FIGHT_JUNK_CHANCE = 80;
const SPECIAL_ITEM_CHANCE_WITHOUT_FIGHT = 50;

export const getRandomRewardWithoutFight = (currentTier: number) => {
  const roll = getRandom(1, 100);

  if (roll < WITHOUT_FIGHT_ITEM_CHANCE) {
    const isSpecial = getRandom(1, 100);

    const result = generateRandomItem(
      currentTier,
      isSpecial > SPECIAL_ITEM_CHANCE_WITHOUT_FIGHT,
    );

    return {
      result,
      type: RewardTypes.ITEM,
      message: `Вы получили: ${result.name}`,
    };
  }

  if (roll < WITHOUT_FIGHT_POTION_CHANCE) {
    const result = generatePotion(currentTier, 100);

    return {
      result,
      type: RewardTypes.POTION,
      message: `Вы получили: ${result?.amount || 1} ${result?.type}`,
    };
  }

  if (roll > WITHOUT_FIGHT_GOLD_CHANCE) {
    const result = getGoldByTier(currentTier, true);

    return {
      result,
      type: RewardTypes.GOLD,
      message: `Вы получили: ${result} золота`,
    };
  }

  if (roll > WITHOUT_FIGHT_JUNK_CHANCE) {
    const result = getRandomJunkByTier(currentTier);

    return {
      result,
      type: RewardTypes.JUNK,
      message: `Вы получили: ${result}`,
    };
  }

  return {
    result: null,
    type: RewardTypes.JUNK,
    message: `Неудача: пустая сокровищница`,
  };
};

export const getExpByQuest = (currentTier: number) => {
  if (currentTier === 1) {
    return 800;
  }

  if (currentTier === 2) {
    return 1500;
  }

  return 8000;
};

export const getGoldByQuest = (currentTier: number) => {
  if (currentTier === 1) {
    return 1000;
  }

  if (currentTier === 2) {
    return 3000;
  }

  return 4000;
};

const CHANCE_TO_SPAWN_ITEM_AS_REWARD = 50;

export const getRandomRewardByQuest = (
  currentTier: number,
  quest: DUNGEONS,
  status: QUEST_STATUSES,
) => {
  const isQuestFailed = status === QUEST_STATUSES.FAILED;

  const exp = getExpByQuest(currentTier);
  const gold = getGoldByQuest(currentTier);

  const reward: QuestReward = {
    exp: isQuestFailed ? exp / 2 : exp,
    gold: isQuestFailed ? gold / 2 : gold,
    status,
    type: quest,
  };

  if (isQuestFailed) {
    return reward;
  }

  const isEnhancedItem = quest === DUNGEONS.FIND;

  const roll = getRandom(1, 100);

  const item =
    isEnhancedItem || roll < CHANCE_TO_SPAWN_ITEM_AS_REWARD
      ? generateRandomItem(currentTier, isEnhancedItem)
      : null;

  if (item && quest !== DUNGEONS.CATCH_GOBLIN) {
    reward.item = item;
  }

  return reward;
};

const DEFAULT_ENEMY_START_FIRST_CHANCE = 50;
const LOWER_ENEMY_START_FIRST_CHANCE = 30;

export const getFirstTurn = (
  enemyTier: number,
  players: Character[],
  isSpecial?: boolean,
): TURN_STATES => {
  // поправь формулу!
  const partyMaxHealth = players.reduce(
    (acc, item) => acc + item.endurance * 6,
    0,
  );

  const partyCurrentHealth = players.reduce(
    (acc, item) => acc + item.currentHealth,
    0,
  );

  // если у игрока оч мало хп - даем ему первый ход
  const isPlayerLowHp = partyCurrentHealth < partyMaxHealth / 3;

  let enemyChance = isPlayerLowHp
    ? LOWER_ENEMY_START_FIRST_CHANCE
    : DEFAULT_ENEMY_START_FIRST_CHANCE;

  switch (enemyTier) {
    case 1:
      enemyChance += 0;
      break;
    case 2:
      enemyChance += 15;
      break;
    case 3:
      enemyChance += 30;
      break;
    default:
      enemyChance = DEFAULT_ENEMY_START_FIRST_CHANCE;
  }

  if (isSpecial) {
    enemyChance += 10;
  }

  const roll = getRandom(0, 100);

  console.log("roll", roll);
  console.log("enemyChance", enemyChance);
  return roll < enemyChance ? TURN_STATES.ENEMY_TURN : TURN_STATES.PLAYER_TURN;
};

export const calculateStatistics = (
  character: Character,
  gear?: Item[] | null,
) => {
  const statistics = {
    defense: 0,
    minAttack: Math.round(character.accuracy * 0.7),
    maxAttack: Math.round(character.accuracy * 0.7),
    evasionChance: Math.round(character.agility * 0.4),
    maxHealth: Math.round(character.endurance * 10),
    critChance: Math.round(character.agility * 0.5),
    critStrike: 0,
    vampire: 0,
    bulletsPerTurn: 1,
  };

  if (gear) {
    gear.forEach((item) => {
      if (item.type === GEAR_SLOTS.ARMOR) {
        statistics.defense += item.value;
      }

      if (item.type === GEAR_SLOTS.HELMET) {
        statistics.defense += item.value;
      }

      if (item.type === GEAR_SLOTS.WEAPON) {
        if (item.minValue) {
          statistics.minAttack += item.minValue;
        }

        statistics.maxAttack += item.value;
        statistics.bulletsPerTurn = item.bulletsPerTurn || 1;

        if (item?.criticalStrike) {
          statistics.critStrike = item?.criticalStrike;
        }

        if (item?.critChance) {
          statistics.critChance += item.critChance;
        }
      }

      if (item.type === GEAR_SLOTS.ARTIFACT && item.effectType) {
        switch (item.effectType) {
          case EFFECT_TYPES.HEALTH: {
            statistics.maxHealth += Math.round(
              (statistics.maxHealth / 100) * item.value,
            );

            break;
          }

          case EFFECT_TYPES.DEFENSE: {
            statistics.defense += Math.round(
              (statistics.defense / 100) * item.value,
            );

            break;
          }

          case EFFECT_TYPES.ATTACK: {
            statistics.minAttack += Math.round(
              (statistics.minAttack / 100) * item.value,
            );
            statistics.maxAttack += Math.round(
              (statistics.maxAttack / 100) * item.value,
            );

            break;
          }

          case EFFECT_TYPES.VAMPIRE: {
            statistics.vampire = item.value;

            break;
          }

          case EFFECT_TYPES.ALL: {
            statistics.maxHealth += Math.round(
              (statistics.maxHealth / 100) * item.value,
            );

            statistics.defense += Math.round(
              (statistics.defense / 100) * item.value,
            );

            statistics.minAttack += Math.round(
              (statistics.minAttack / 100) * item.value,
            );
            statistics.maxAttack += Math.round(
              (statistics.maxAttack / 100) * item.value,
            );

            break;
          }
        }
      }
    });
  }

  character.perksList.forEach(({ id }) => {
    switch (id) {
      case SNIPER_PERKS.CRITICAL_CHANCE: {
        statistics.critChance += 10;
        break;
      }

      case SNIPER_PERKS.CRITICAL_STRIKE: {
        statistics.critStrike += 5;
        break;
      }

      case SNIPER_PERKS.CRITICAL_CHANCE_V2: {
        statistics.critChance += 15;
        break;
      }

      case SNIPER_PERKS.CRITICAL_STRIKE_V2: {
        statistics.critStrike += 10;
        break;
      }

      case TANK_PERKS.HEALTH: {
        statistics.maxHealth += Math.round((statistics.maxHealth / 100) * 10);
        break;
      }

      case TANK_PERKS.DODGE: {
        statistics.evasionChance += Math.round(
          (statistics.evasionChance / 100) * 10,
        );
        break;
      }

      case TANK_PERKS.HEALTH_V2: {
        statistics.maxHealth += Math.round((statistics.maxHealth / 100) * 15);
        break;
      }

      case TANK_PERKS.DODGE_V2: {
        statistics.evasionChance += Math.round(
          (statistics.evasionChance / 100) * 15,
        );
        break;
      }

      case MEDIC_PERKS.INCREASE_DAMAGE: {
        statistics.minAttack += Math.round((statistics.minAttack / 100) * 10);
        statistics.maxAttack += Math.round((statistics.maxAttack / 100) * 10);

        break;
      }

      case MEDIC_PERKS.INCREASE_HEALTH: {
        statistics.maxHealth += Math.round((statistics.maxHealth / 100) * 20);

        break;
      }

      case MEDIC_PERKS.INCREASE_HEALTH_V2: {
        statistics.maxHealth += Math.round((statistics.maxHealth / 100) * 30);

        break;
      }

      case MEDIC_PERKS.INCREASE_DAMAGE_V2: {
        statistics.minAttack += Math.round((statistics.minAttack / 100) * 15);
        statistics.maxAttack += Math.round((statistics.maxAttack / 100) * 15);

        break;
      }
    }
  });

  return statistics;
};

export const getBattleState = (enemy: Creature, party: Character[]) => {
  if (enemy.hp <= 0) {
    return BATTLE_STATES.PLAYER_WIN;
  }

  if (!party.some((player) => player.currentHealth > 0)) {
    return BATTLE_STATES.ENEMY_WIN;
  }

  return BATTLE_STATES.STILL_FIGHTING;
};

export interface BattleGenerationProps {
  tier: number;
  turn: TURN_STATES;
  party: Character[];
  isSpecial?: boolean;
  characterGear: GearData | null;
  isBoss?: boolean;
  isQuest?: boolean;
}

const getDeadEndEnemyByTier = (currentTier: number) => {
  if (currentTier === 1) {
    return FIRST_TIER_MINIBOSS_LIST;
  }

  if (currentTier === 2) {
    return SECOND_TIER_MINIBOSS_LIST;
  }

  return THIRD_TIER_MINIBOSS_LIST;
};

const getRandomEnemyFromList = (list: CreatureBaseModel[]) =>
  list[getRandom(0, list.length - 1)];

const getEnemyByLocationTier = (currentTier: number) => {
  if (currentTier === 1) {
    return FIRST_TIER_CREATURES_LIST;
  }

  if (currentTier === 2) {
    return SECOND_TIER_CREATURES_LIST;
  }

  return THIRD_TIER_CREATURES_LIST;
};

const initiateEffectState = (party: any[]) =>
  Object.fromEntries(
    party.map((entity) => [
      entity?.id || entity?.name || "",
      { list: [], hasTriggered: false },
    ]),
  );

const generateBattleEnemyModel = ({
  model,
  entity,
  hasTurn,
}: {
  model: Battle;
  entity: EnemyPrototypeData | EnemyPrototypeData[];
  hasTurn: boolean;
}) => {
  const isEntityArray = Array.isArray(entity);

  if (isEntityArray) {
    model.enemy.party.push(
      ...entity.map((item) => ({
        ...item.baseModel,
        aiPackage: item.aiPackage,
        id: v4(),
        hasTurn,
      })),
    );
  } else {
    model.enemy.party.push({
      ...entity.baseModel,
      aiPackage: entity.aiPackage,
      id: v4(),
      hasTurn,
    });
  }

  if (isEntityArray ? entity.length : entity) {
    model.enemy.effects = initiateEffectState(model.enemy.party);
  }

  return model;
};

export const generateBattle = ({
  tier,
  turn,
  party,
  isSpecial,
  isBoss,
  isQuest,
  characterGear,
}: BattleGenerationProps) => {
  // формируем battle model
  let model: Battle = {
    player: {
      effects: Object.fromEntries(
        party.map((player) => [player.name, { list: [], hasTriggered: false }]),
      ),
      party: party.map((character) => {
        const currentCharacterGear = characterGear
          ? characterGear[character.name]
          : null;
        let currentAmountOfRounds = 0;

        if (currentCharacterGear) {
          const equippedWeapon = currentCharacterGear.find(
            (item) => item.type === GEAR_SLOTS.WEAPON,
          );

          if (equippedWeapon) {
            currentAmountOfRounds = equippedWeapon.magSize || 0;
          }
        }

        return {
          name: character.name,
          hasTurn: turn === TURN_STATES.PLAYER_TURN,
          perksList: character.perksList,
          currentHealth: character.currentHealth,
          characterClass: character.characterClass,
          currentAmountOfRounds,
        };
      }),
    },
    enemy: { effects: {}, party: [] },
    turn,
    messages: [
      `${turn === TURN_STATES.PLAYER_TURN ? "Игрок" : "Противник"} ходит первым`,
    ],
    reward: null,
  };
  const isEnemyHasTurn = turn === TURN_STATES.ENEMY_TURN;

  if (isQuest) {
    if (tier === 1) {
      model = generateBattleEnemyModel({
        model,
        entity: FIRST_TIER_QUEST_MINIBOSS,
        hasTurn: isEnemyHasTurn,
      });
    }

    if (tier === 2) {
      model = generateBattleEnemyModel({
        model,
        entity: SECOND_TIER_QUEST_MINIBOSS,
        hasTurn: isEnemyHasTurn,
      });
    }

    if (tier === 3) {
      model = generateBattleEnemyModel({
        model,
        entity: THIRD_TIER_QUEST_MINIBOSS,
        hasTurn: isEnemyHasTurn,
      });
    }

    return model;
  }

  if (isBoss) {
    if (tier === 1) {
      model = generateBattleEnemyModel({
        model,
        entity: FIRST_TIER_BOSS,
        hasTurn: isEnemyHasTurn,
      });
    }

    if (tier === 2) {
      model = generateBattleEnemyModel({
        model,
        entity: SECOND_TIER_BOSS,
        hasTurn: isEnemyHasTurn,
      });
    }

    if (tier === 3) {
      model = generateBattleEnemyModel({
        model,
        entity: THIRD_TIER_BOSS,
        hasTurn: isEnemyHasTurn,
      });
    }

    return model;
  }

  if (isSpecial) {
    const hasTwoEnemies = getRandom(1, 100);
    const DEFAULT_TWO_SPECIAL_ENEMIES_CHANCE = 50;

    const targetList = getDeadEndEnemyByTier(tier);

    if (hasTwoEnemies > DEFAULT_TWO_SPECIAL_ENEMIES_CHANCE) {
      return generateBattleEnemyModel({
        model,
        entity: [
          getRandomEnemyFromList(targetList),
          getRandomEnemyFromList(targetList),
        ],
        hasTurn: isEnemyHasTurn,
      });
    } else {
      const enemy = getRandomEnemyFromList(targetList);

      return generateBattleEnemyModel({
        model,
        entity: enemy,
        hasTurn: isEnemyHasTurn,
      });
    }
  } else {
    const roll = getRandom(1, 100);

    const CHANCE_OF_TWO_ENEMIES = 50;
    const CHANCE_OF_THREE_ENEMIES = 30;

    const targetList = getEnemyByLocationTier(tier);

    if (roll < CHANCE_OF_THREE_ENEMIES) {
      return generateBattleEnemyModel({
        model,
        entity: [
          getRandomEnemyFromList(targetList),
          getRandomEnemyFromList(targetList),
          getRandomEnemyFromList(targetList),
        ],
        hasTurn: isEnemyHasTurn,
      });
    }

    if (roll < CHANCE_OF_TWO_ENEMIES) {
      return generateBattleEnemyModel({
        model,
        entity: [
          getRandomEnemyFromList(targetList),
          getRandomEnemyFromList(targetList),
        ],
        hasTurn: isEnemyHasTurn,
      });
    }

    const enemy = getRandomEnemyFromList(targetList);

    return generateBattleEnemyModel({
      model,
      entity: enemy,
      hasTurn: isEnemyHasTurn,
    });
  }
};

export const increaseCharacterStat = (
  state: StoreState,
  characterName: string,
  stat: "accuracy" | "agility" | "endurance",
) => {
  const { player, gear } = state;
  const currentCharacter = player.party.find(
    (character) => character.name === characterName,
  );

  if (currentCharacter) {
    const characterCopy = { ...currentCharacter };
    // увеличиваем характеристику
    characterCopy[stat] += 1;
    // уменьшаем кол-во имеющихся очков
    characterCopy.points -= 1;

    const characterGear = gear ? gear[characterCopy.name] : null;

    return {
      ...state,
      player: {
        ...player,
        party: player.party.map((player) =>
          player.name === characterName ? characterCopy : player,
        ),
      },
      statistics: {
        [characterCopy.name]: calculateStatistics(characterCopy, characterGear),
      },
    };
  }

  return state;
};

export const getPotionHealth = (potion: POTION_TYPES) => {
  switch (potion) {
    case POTION_TYPES.EXTRA_LARGE_HEALTH_POTION:
      return 80;
    case POTION_TYPES.LARGE_HEALTH_POTION:
      return 60;
    case POTION_TYPES.MEDIUM_HEALTH_POTION:
      return 40;
    case POTION_TYPES.SMALL_HEALTH_POTION:
      return 30;
    default:
      return 30;
  }
};
