// ТИПИЗАЦИЯ НУЖНА
import {
  Battle,
  BattleEffects,
  Character,
  Creature,
  EFFECT_TYPES,
  Effects,
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
import { SNIPER_PERKS } from "../constants/perks";
// import FIRST_TIER_CREATURES_DATA from "../../common/creatures";
// FIRST_TIER_CREATURES_DATA - это массив из констант содержащих в себе - изначальные характеристики противника, его уникальный ID
// _DATA - дописал потому что это именно ДАННЫЕ, отдельно будет в том же файле FIRST_TIER_CREATURES_SOUNDS, FIRST_TIER_CREATURES_IMAGES и FIRST_TIER_CREATURES_AI_PACK
// FIRST_TIER_CREATURES_NAMES

export const getEncounterRoll = (
  chance: number,
  effects: Effects | null,
  alreadyVisited: boolean,
  hasLight: boolean,
  isDeadEnd: boolean,
) => {
  if (isDeadEnd) {
    return DEAD_END_ENEMY_CHANCE;
  }

  let encounterChance = chance;

  if (effects?.increaseChance) {
    encounterChance += effects?.increaseChance;
  }

  if (effects?.decreaseChance) {
    encounterChance -= effects?.decreaseChance;
  }

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

const generateTierCreature = (
  locationTier: number,
  isDeadEnd?: boolean,
  isComingBackWithoutTorchlight?: boolean,
) => {
  switch (locationTier) {
    case 1:
      //  FIRST_TIER_CREATIONS - массив противников первого тира
      // const strongEnemyChance = getRandom(1, 100);
      // if (isComingBackWithoutTorchlight) {
      //  if (strongEnemyChance > 10) buffSomehowCreatureFromTier;
      // }

      // const strongEnemyChance = getRandom(1, 100);
      // if (strongEnemyChance > 75 && isDeadEnd) buffSomehowCreatureFromTier;
      // return FIRST_TIER_CREATIONS[getRandom(0, FIRST_TIER_CREATIONS.length)]

      return {};
    case 2:
      return {};
    case 3:
      return {};
    default:
      return {};
  }
};

export const getCreatureByLocationTier = ({
  isBoss,
  locationTier,
  isDeadEnd,
  // FIXME: нейминг
  isComingBackWithoutTorchlight,
}: {
  locationTier: number;
  isBoss?: boolean;
  isDeadEnd?: boolean;
  isComingBackWithoutTorchlight?: boolean;
}) => {
  if (isBoss) {
    switch (locationTier) {
      case 1:
        // return boss from constant file, shallow copy it { ...FIRST_TIER_BOSS }
        return {};
      case 2:
        // return boss from constant file, shallow copy it { ...SECOND_TIER_BOSS }
        return {};
      case 3:
        // return boss from constant file, shallow copy it { ...THIRD_TIER_BOSS }
        return {};
      default: // return boss from constant file, shallow copy it { ...FIRST_TIER_BOSS }
        return {};
    }
  }

  switch (locationTier) {
    case 1:
      //  generateTierCreature(locationTier, isDeadEnd);
      return {};
    case 2:
      //  generateTierCreature(locationTier, isDeadEnd);
      return {};
    case 3:
      //  generateTierCreature(locationTier, isDeadEnd);
      return {};
      //  generateTierCreature(locationTier, isDeadEnd);
      return {};
  }
};

const DEFAULT_ENEMY_START_FIRST_CHANCE = 50;
const LOWER_ENEMY_START_FIRST_CHANCE = 30;

export const getFirstTurn = (
  enemyTier: number,
  playerEffect: any,
  players: Character[],
  isSpecial?: boolean,
): TURN_STATES => {
  if (playerEffect?.sleep || playerEffect?.skip) {
    return TURN_STATES.ENEMY_TURN;
  }

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
    evasionChance: Math.round(character.agility * 4),
    maxHealth: Math.round(character.endurance * 10),
    critChance: Math.round(character.agility * 0.5),
    critStrike: 0,
    vampire: 0,
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
    }
  });

  return statistics;
};

export const getBattleState = (enemy: Creature, party: Character[]) => {
  if (enemy.health <= 0) {
    return BATTLE_STATES.PLAYER_WIN;
  }

  if (!party.some((player) => player.currentHealth > 0)) {
    return BATTLE_STATES.ENEMY_WIN;
  }

  return BATTLE_STATES.STILL_FIGHTING;
};

type EffectKey = keyof Effects;

export const generateBattle = (
  tier: number,
  turn: TURN_STATES,
  party: Character[],
  isSpecial?: boolean,
) => {
  // формируем battle model
  const model: Battle = {
    player: { effects: [], party },
    // MOCK
    // нужна реальная функция генерации противников в зависимости от тира и ситуации
    // enemy: { effects: [], party: generateEnemy(tier, isSpecial) },
    enemy: { effects: [], party: [] },
    turn,
    messages: [],
    reward: null,
  };

  // enemy: Enemy;
  // player: Player;
  // turn: TURN_STATES;
  // messages: Message[];
  // reward: null | Reward;
  // mock
  return {};
};

const CHANCE_TO_FULL_ENEMY_PARTY = 50;
const CHANCE_TO_HALF_ENEMY_PARTY = 75;

export const generateEnemy = (isSpecial: boolean, tier: number) => {
  if (isSpecial) {
    // здесь только 3 тира врагов спавним
  }

  // здесь спавним от 1 до 3 врагов, тир врагов от 1-2
  const amountOfEnemiesRoll = getRandom(0, 100);

  if (amountOfEnemiesRoll < CHANCE_TO_FULL_ENEMY_PARTY) {
  }

  if (amountOfEnemiesRoll < CHANCE_TO_HALF_ENEMY_PARTY) {
  }

  return [];
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
