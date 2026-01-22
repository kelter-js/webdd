// ТИПИЗАЦИЯ НУЖНА
import {
  BattleEffects,
  Character,
  Creature,
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
  enemyTier: 1 | 2 | 3,
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
  };

  // character.perksList.forEach((perk) => {
  //   const [statName, statValue] = getPerkData(perk);
  //   if (statName && statValue) {
  //     statistics[statName] += statValue;
  //   }

  // });

  if (gear) {
    gear.forEach((item) => {
      if (item.type === GEAR_SLOTS.ARMOR) {
        statistics.defense = item.value;
      }

      if (item.type === GEAR_SLOTS.WEAPON) {
        if (item.minValue) {
          statistics.minAttack += item.minValue;
        }

        statistics.maxAttack += item.value;
      }

      // в оружии/шее/броне могут быть доп статы - вычисляем через утиль функцию, ее пока нет
      // const { statName, statValue } = getStatsFromItem(equipment);
      //           statistics[statName] += statValue;
    });
  }

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
  firstTurn: TURN_STATES,
  party: Character[],
  isSpecial?: boolean,
) => {
  if (isSpecial) {
    // всего их будет 3
    // const specialCreature = getSpecialCreatureByTier(tier);
    // CREATURES_DEFAULT_STATS - мапа, где ключ - имя, а значение объект с дефолтными значениями для существ
    // const creaturesStats = {...CREATURES_DEFAULT_STATS[specialCreature.name]};
    // если isSpecial нужно сгенерировать рандомный положительный эффект на противнике
    // const effectsList = getEffectForSpecialEncounter(tier);
    const enhancementsCount = Math.max(1, Math.min(3, Math.floor(tier)));

    const possibleEnhancements: string[] = [
      "health",
      "defense",
      "minAttack",
      "maxAttack",
      "evasionChance",
    ];
    const possibleEffects: EffectKey[] = [
      "chanceToRevive",
      "chanceToHeal",
      "doubleDamageChance",
      "makeSleepy",
    ];

    const effectsList: BattleEffects[] = [];

    for (let i = 0; i < enhancementsCount; i++) {
      const currentEnhancement = Math.random() < 0.5 ? "stat" : "effect";

      if (currentEnhancement === "stat") {
        const statIndex = getRandom(0, possibleEnhancements.length);

        const statToEnhance = possibleEnhancements[statIndex];
        possibleEnhancements.splice(statIndex, 1);

        //   switch (statToEnhance) {
        //   case "health": {
        //     creaturesStats.health *= 2;
        //     creaturesStats.maxHealth *= 2;
        //     break;
        //   }
        //   case "defense": {
        //     creaturesStats.defense += 5;
        //     break;
        //   }
        //   case "minAttack": {
        //     creaturesStats.minAttack += 5;
        //     break;
        //   }
        //   case "maxAttack": {
        //     creaturesStats.maxAttack += 5;
        //     break;
        //   }
        //   case "evasionChance": {
        //     creaturesStats.evasionChance += 15;
        //     break;
        //   }
        //   default: {
        //   }
        // }
      } else {
        const effectIndex = getRandom(0, possibleEffects.length);

        const effectToSet = possibleEffects[effectIndex];
        possibleEffects.splice(effectIndex, 1);
        effectsList.push({ type: { [effectToSet]: 15 }, duration: 3 });
      }

      // creaturesStats.isEnhanced = true;
    }

    // return {
    //   enemy: { ...creaturesStats, effects: effectsList },
    //   player: { party: [...party], effects: [] },
    //   turn: firstTurn,
    //   messages: [],
    //  isDiceRolled:false
    // };
  }

  // CREATURES - матрица, где в зависимости от тира возвращается другой массив дефолтных существ подходящих по тиру, только их имена
  // const creaturesListByTier = CREATURES[tier - 1];
  // const randomCreature =
  //   creaturesListByTier[getRandom(0, creaturesListByTier.length)];
  // CREATURES_DEFAULT_STATS - мапа, где ключ - имя, а значение объект с дефолтными значениями для существ
  // const creaturesStats = CREATURES_DEFAULT_STATS[randomCreature.name];

  // return {
  //   enemy: { ...creaturesStats, effects: [] },
  //   player: { party: [...party], effects: [] },
  //   turn: firstTurn,
  //   messages: [],
  //  isDiceRolled:false
  // };

  // mock
  return {};
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
