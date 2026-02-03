import { ENEMIES } from "../entities";
import { CLASSES } from "../entities/characterClasses";
import { DUNGEONS } from "../entities/dungeons";
import { RENDER_LOCATIONS } from "../entities/renderLocations";
import { GameStateData, KillCounter } from "../types/gameState";

export const MIN_ENCOUNTER_CHANCE = 8;
export const MIN_ENCOUNTER_CHANCE_MID_TIER = 6;
export const MIN_ENCOUNTER_CHANCE_HIGHT_TIER = 4;
export const MAX_ENCOUNTER_CHANCE = 85;
export const VISITED_LOCATION_WITH_LIGHT = 10;
export const VISITED_LOCATION_WITHOUT_LIGHT = 25;
export const DEAD_END_ENEMY_CHANCE = 70;
// FIXME BATTLE CONSTANTS
// RAWDAMAGE = WeaponDamage + Character.Accuracy × 0.7
// FINALDAMAGE = RawDamage × ClassDamageMultiplier
export const TANK_CLASS_DAMAGE_MLTPL = 0.9;
export const SNIPER_CLASS_DAMAGE_MLTPL = 1.2;
export const MEDIC_CLASS_DAMAGE_MLTPL = 0.8;

export const HP_PER_ENDURANCE_POINT = 10;
export const MAX_AMOUNT_OF_POTIONS_TO_SELL = 8;
export const MAX_AMOUNT_OF_ITEMS_TO_SELL = 12;

// EVADE DAMAGE FORMULA
// Character.Agility × 0.4

// export const ENEMY_POOLS = {
//   LOCATION_TIER_1: {
//     rat: {
//       tier1: { hp: 50, minDmg: 2, maxDmg: 4, xp: 100 },
//       tier2: { hp: 70, minDmg: 3, maxDmg: 6, xp: 115 },
//       tier3: { hp: 90, minDmg: 4, maxDmg: 8, xp: 130 },
//     },
//     bandit: {
//       tier1: { hp: 100, minDmg: 4, maxDmg: 8, xp: 150 },
//       tier2: { hp: 140, minDmg: 6, maxDmg: 10, xp: 170 },
//       tier3: { hp: 180, minDmg: 8, maxDmg: 12, xp: 200 },
//     },
//     orc: {
//       tier1: { hp: 180, minDmg: 7, maxDmg: 13, xp: 210 },
//       tier2: { hp: 252, minDmg: 10, maxDmg: 18, xp: 235 },
//       tier3: { hp: 324, minDmg: 13, maxDmg: 23, xp: 280 },
//     },
//     elite: {
//       tier1: { hp: 300, minDmg: 10, maxDmg: 18, xp: 350 },
//       tier2: { hp: 420, minDmg: 14, maxDmg: 26, xp: 400 },
//       tier3: { hp: 540, minDmg: 18, maxDmg: 34, xp: 450 },
//     },
//     miniboss: {
//       tier1: { hp: 450, minDmg: 13, maxDmg: 23, xp: 900 },
//       tier2: { hp: 630, minDmg: 18, maxDmg: 34, xp: 1035 },
//       tier3: { hp: 810, minDmg: 23, maxDmg: 43, xp: 1170 },
//     },
//     boss: {
//       tier1: { hp: 900, minDmg: 18, maxDmg: 32, xp: 1800 },
//       tier2: { hp: 1260, minDmg: 25, maxDmg: 45, xp: 2070 },
//       tier3: { hp: 1620, minDmg: 32, maxDmg: 58, xp: 2340 },
//     },
//   },
//   LOCATION_TIER_2: {
//     goblin: {
//       tier1: { hp: 70, minDmg: 4, maxDmg: 8, xp: 140 },
//       tier2: { hp: 98, minDmg: 6, maxDmg: 11, xp: 161 },
//       tier3: { hp: 126, minDmg: 8, maxDmg: 14, xp: 182 },
//     },
//     thief: {
//       tier1: { hp: 140, minDmg: 7, maxDmg: 13, xp: 280 },
//       tier2: { hp: 196, minDmg: 10, maxDmg: 18, xp: 322 },
//       tier3: { hp: 252, minDmg: 13, maxDmg: 23, xp: 364 },
//     },
//     troll: {
//       tier1: { hp: 252, minDmg: 10, maxDmg: 18, xp: 504 },
//       tier2: { hp: 353, minDmg: 14, maxDmg: 26, xp: 580 },
//       tier3: { hp: 454, minDmg: 18, maxDmg: 34, xp: 655 },
//     },
//     veteran: {
//       tier1: { hp: 420, minDmg: 14, maxDmg: 26, xp: 840 },
//       tier2: { hp: 588, minDmg: 20, maxDmg: 36, xp: 966 },
//       tier3: { hp: 756, minDmg: 26, maxDmg: 46, xp: 1092 },
//     },
//     subboss: {
//       tier1: { hp: 630, minDmg: 18, maxDmg: 34, xp: 1260 },
//       tier2: { hp: 882, minDmg: 25, maxDmg: 45, xp: 1449 },
//       tier3: { hp: 1134, minDmg: 32, maxDmg: 58, xp: 1638 },
//     },
//     tier2boss: {
//       tier1: { hp: 1260, minDmg: 25, maxDmg: 45, xp: 2520 },
//       tier2: { hp: 1764, minDmg: 35, maxDmg: 63, xp: 2898 },
//       tier3: { hp: 2268, minDmg: 45, maxDmg: 81, xp: 3276 },
//     },
//   },
//   LOCATION_TIER_3: {
//     demon: {
//       tier1: { hp: 100, minDmg: 6, maxDmg: 12, xp: 200 },
//       tier2: { hp: 140, minDmg: 9, maxDmg: 17, xp: 230 },
//       tier3: { hp: 180, minDmg: 12, maxDmg: 22, xp: 260 },
//     },
//     assassin: {
//       tier1: { hp: 200, minDmg: 10, maxDmg: 20, xp: 400 },
//       tier2: { hp: 280, minDmg: 14, maxDmg: 28, xp: 460 },
//       tier3: { hp: 360, minDmg: 18, maxDmg: 36, xp: 520 },
//     },
//     giant: {
//       tier1: { hp: 360, minDmg: 14, maxDmg: 28, xp: 720 },
//       tier2: { hp: 504, minDmg: 20, maxDmg: 40, xp: 828 },
//       tier3: { hp: 648, minDmg: 26, maxDmg: 52, xp: 936 },
//     },
//     champion: {
//       tier1: { hp: 600, minDmg: 20, maxDmg: 40, xp: 1200 },
//       tier2: { hp: 840, minDmg: 28, maxDmg: 56, xp: 1380 },
//       tier3: { hp: 1080, minDmg: 36, maxDmg: 72, xp: 1560 },
//     },
//     megaboss: {
//       tier1: { hp: 900, minDmg: 26, maxDmg: 52, xp: 1800 },
//       tier2: { hp: 1260, minDmg: 36, maxDmg: 72, xp: 2070 },
//       tier3: { hp: 1620, minDmg: 46, maxDmg: 92, xp: 2340 },
//     },
//     finalboss: {
//       tier1: { hp: 1800, minDmg: 35, maxDmg: 70, xp: 3600 },
//       tier2: { hp: 2520, minDmg: 49, maxDmg: 98, xp: 4140 },
//       tier3: { hp: 3240, minDmg: 63, maxDmg: 126, xp: 4680 },
//     },
//   },
// };

// FIRST TIER AREA
// rat:       hp 50,  dmg 3
// bandit:    hp 100, dmg 6
// orc:       hp 180, dmg 10
// elite:     hp 300, dmg 14
// miniboss:  hp 450, dmg 18
// boss1:     hp 900, dmg 25

// SECOND TIER AREA
// rat2:      hp 70,  dmg 5
// bandit2:   hp 140, dmg 8
// orc2:      hp 252, dmg 14
// elite2:    hp 420, dmg 20
// miniboss2: hp 630, dmg 26
// boss2:     hp 1260,dmg 35

// THIRD(LAST) TIER AREA
// rat3:      hp 90,  dmg 6
// bandit3:   hp 180, dmg 10
// orc3:      hp 324, dmg 18
// elite3:    hp 540, dmg 26
// miniboss3: hp 810, dmg 36
// boss3:     hp 1620,dmg 50

// Формулы апгрейда оружия
// minDamage_MKII = minDamage_MKI * 1.25;
// maxDamage_MKII = maxDamage_MKI * 1.25;

// minDamage_MKIII = minDamage_MKI * 1.55;
// maxDamage_MKIII = maxDamage_MKI * 1.55;
// у третьего тира нужно добавить +5% крита

// ТАБЛИЦА ОРУЖИЯ 1 ТИР
// | Класс       | Оружие                  | Версия | minDmg | maxDmg | Особенность                |
// | ----------- | ----------------------- | ------ | ------ | ------ | -------------------------- |
// | **Танк**    | Riot-12 (дробовик)      | MK I   | 6      | 10     | стабильный ближний бой     |
// |             |                         | MK II  | 8      | 13     | +5 % точности              |
// |             |                         | MK III | 9      | 15     | +10 % точности, +5 % крита |
// | **Танк**    | MG-07 (пулемёт)         | MK I   | 5      | 9      | высокая скорострельность   |
// |             |                         | MK II  | 6      | 11     | +5 % точности              |
// |             |                         | MK III | 8      | 14     | +10 % точности             |
// | **Дамагер** | AR-15X (штурмовая)      | MK I   | 7      | 12     | универсальная              |
// |             |                         | MK II  | 9      | 15     | +5 % точности              |
// |             |                         | MK III | 11     | 19     | +10 % точности             |
// | **Дамагер** | Longshot V1 (снайперка) | MK I   | 9      | 18     | большой разброс            |
// |             |                         | MK II  | 11     | 23     | +5 % точности              |
// |             |                         | MK III | 14     | 28     | +10 % точности, +5 % крита |
// | **Хилер**   | MedSec-9 (пистолет)     | MK I   | 4      | 8      | быстрая атака              |
// |             |                         | MK II  | 5      | 10     | +5 % точности              |
// |             |                         | MK III | 6      | 12     | +10 % точности, +5 % крита |
// | **Хилер**   | Vector-M (ПП)           | MK I   | 5      | 9      | стабильная стрельба        |
// |             |                         | MK II  | 6      | 11     | +5 % крита                 |
// |             |                         | MK III | 8      | 14     | +10 % крита                |

// ТАБЛИЦА ОРУЖИЯ 2 ТИР
// | Класс       | Оружие        | Версия | minDmg | maxDmg | Особенность                |
// | ----------- | ------------- | ------ | ------ | ------ | -------------------------- |
// | **Танк**    | Havoc-16      | MK I   | 10     | 16     | шанс отброса               |
// |             |               | MK II  | 13     | 20     | +5 % точности              |
// |             |               | MK III | 15     | 25     | +10 % точности, +5 % крита |
// | **Танк**    | Stinger-X     | MK I   | 9      | 15     | хорошая точность           |
// |             |               | MK II  | 11     | 19     | +5 % точности              |
// |             |               | MK III | 14     | 23     | +10 % точности             |
// | **Дамагер** | Vindicator AR | MK I   | 11     | 18     | стабильный урон            |
// |             |               | MK II  | 14     | 23     | +5 % точности              |
// |             |               | MK III | 17     | 28     | +10 % точности             |
// | **Дамагер** | Spectre-2     | MK I   | 14     | 28     | высокий крит               |
// |             |               | MK II  | 18     | 35     | +5 % точности              |
// |             |               | MK III | 22     | 43     | +10 % точности, +5 % крита |
// | **Хилер**   | Faith-9A      | MK I   | 7      | 13     | шанс крита 10 %            |
// |             |               | MK II  | 9      | 16     | +5 % точности              |
// |             |               | MK III | 11     | 20     | +10 % точности, +5 % крита |
// | **Хилер**   | Pulse-Vector  | MK I   | 8      | 14     | стабильный урон            |
// |             |               | MK II  | 10     | 17     | +5 % точности              |
// |             |               | MK III | 12     | 21     | +10 % точности             |

// ТАБЛИЦА ОРУЖИЯ 3 ТИР
// | Класс       | Оружие       | Версия | minDmg | maxDmg | Особенность                |
// | ----------- | ------------ | ------ | ------ | ------ | -------------------------- |
// | **Танк**    | Bulldog-20   | MK I   | 15     | 25     | шанс стан                  |
// |             |              | MK II  | 19     | 31     | +5 % точности              |
// |             |              | MK III | 23     | 39     | +10 % точности, +5 % крита |
// | **Танк**    | Titan MGX    | MK I   | 14     | 22     | стабильный, точный         |
// |             |              | MK II  | 17     | 27     | +5 % точности              |
// |             |              | MK III | 22     | 34     | +10 % точности             |
// | **Дамагер** | AR-99 Reaper | MK I   | 16     | 26     | универсальный              |
// |             |              | MK II  | 20     | 33     | +5 % точности              |
// |             |              | MK III | 25     | 40     | +10 % точности             |
// | **Дамагер** | Oblivion-7   | MK I   | 22     | 40     | огромный крит              |
// |             |              | MK II  | 27     | 50     | +5 % точности              |
// |             |              | MK III | 34     | 62     | +10 % точности, +5 % крита |
// | **Хилер**   | Seraph-11    | MK I   | 10     | 18     | умеренный урон             |
// |             |              | MK II  | 13     | 23     | +5 % точности              |
// |             |              | MK III | 16     | 28     | +10 % точности, +5 % крита |
// | **Хилер**   | Eclipse-V    | MK I   | 12     | 20     | AoE 30 %, шанс крита 20 %  |
// |             |              | MK II  | 15     | 25     | +5 % точности              |
// |             |              | MK III | 19     | 31     | +10 % точности, +5 % крита |

export const TANK_BASE_MODEL = {
  endurance: 10,
  currentHealth: 100,
  accuracy: 3,
  agility: 2,
  critChance: 1.5,
  critStrike: 1.1,
  characterClass: CLASSES.TANK,
};
export const SNIPER_BASE_MODEL = {
  endurance: 5,
  currentHealth: 50,
  accuracy: 7,
  agility: 5,
  // FIXME: CRITICAL CHANCE FORMULA Character.CritChance + Character.Agility × 0.5 + Weapon.CritChance
  critChance: 5,
  critStrike: 1.5,
  characterClass: CLASSES.SNIPER,
};
export const MEDIC_BASE_MODEL = {
  endurance: 6,
  currentHealth: 60,
  accuracy: 5,
  agility: 4,
  critChance: 1.5,
  critStrike: 1.2,
  characterClass: CLASSES.MEDIC,
};

export const SPECIAL_ENCOUNTER_DEFAULT_CHANCE = 5;

export const DEFAULT_GAME_STATE: GameStateData = {
  party: [],
  location: {
    dungeon: [],
    position: { x: 0, y: 0 },
    type: DUNGEONS.STORY,
    encounterChance: MIN_ENCOUNTER_CHANCE,
  },
  name: "",
  locationState: RENDER_LOCATIONS.SETTLEMENT,
  prevLocationState: null,
  battle: null,
  inventory_memoized: [],
  quest: null,
  gear_memoized: {},
  consumables: [],
  gold: 450,
  isGameOver: false,
  currentTier: 1,
  torches: 0,
  dialogFlags: [],
  economic: null,

  potionsToBuy: null,
  itemsToBuy: null,
  sliderId: null,
  playStatistics: {
    dungeonCounter: 0,
    kills: Object.fromEntries(
      Object.keys(ENEMIES).map((item) => [item, 0]),
    ) as KillCounter,
  },
  hasCamera: false,
  junk: [],
  resources: [],
  resourcesBagLevel: 1,
  collected: [],
  flags: [],
  specialEncounterChance: SPECIAL_ENCOUNTER_DEFAULT_CHANCE,
};

export const DEFAULT_GAME_SAVE = {
  gameState: DEFAULT_GAME_STATE,
  date: new Date(),
};

export const DEFAULT_GAME_SAVES = [DEFAULT_GAME_SAVE];
