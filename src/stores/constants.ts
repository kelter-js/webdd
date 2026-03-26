import { ENEMIES } from "../entities";
import { CLASSES } from "../entities/characterClasses";
import { DUNGEONS } from "../entities/dungeons";
import { ALMANAC_ENEMIES_GENERIC_TYPES } from "../entities/enemies";
import { JUNK_TYPES } from "../entities/junk";
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

export const HP_PER_ENDURANCE_POINT = 10;
export const MAX_AMOUNT_OF_POTIONS_TO_SELL = 8;
export const MAX_AMOUNT_OF_ITEMS_TO_SELL = 12;

// EVADE DAMAGE FORMULA
// Character.Agility × 0.4

// Изначально даётся 10 очков - каждый лвл по 3 очка
// формула рассчета урона исходя из брони на персонаже
export function getFinalDamage(rawDamage: number, armor: number) {
  const K = 30; // Балансный коэффициент
  const totalDefense = armor;

  // Рассчитываем множитель (от 1.0 до ~0.35)
  const multiplier = K / (K + totalDefense);

  // Итоговый урон
  const damage = rawDamage * multiplier;

  // Округляем до ближайшего целого, минимум 1
  return Math.max(1, Math.round(damage));
}
// формула рассчета шанса уворота
export function calculateFinalEvasion(totalEvasion: number): number {
  // Коэффициент "мягкого капа".
  const K = 60;

  // Рассчитываем шанс по гиперболической кривой (от 0 до 1)
  // Формула: x / (x + K)
  const chance = totalEvasion / (totalEvasion + K);

  // Жесткий лимит (Hard Cap) в 80%
  const maxChance = 0.8;

  return Math.min(chance, maxChance);
}

export function calculateCritDamage(rawDamage: number, critMultiplier: number) {
  // Просто умножаем урон на множитель
  return Math.round(rawDamage * Math.ceil(critMultiplier / 2));
}

// export const ENEMY_POOLS = {
//   LOCATION_TIER_1: {
//     rat: {
//       tier1: { hp: 15, maxHp: 15, minDmg: 1, maxDmg: 3, xp: 50 },
//       tier2: { hp: 25, maxHp: 25, minDmg: 2, maxDmg: 4, xp: 70 },
//       tier3: { hp: 35, maxHp: 35, minDmg: 3, maxDmg: 5, xp: 100 },
//     },
//     bandit: {
//       tier1: { hp: 40, maxHp: 40, minDmg: 3, maxDmg: 5, xp: 120 },
//       tier2: { hp: 55, maxHp: 55, minDmg: 4, maxDmg: 7, xp: 150 },
//       tier3: { hp: 70, maxHp: 70, minDmg: 5, maxDmg: 9, xp: 180 },
//     },
//     orc: {
//       tier1: { hp: 75, maxHp: 75, minDmg: 5, maxDmg: 8, xp: 200 },
//       tier2: { hp: 100, maxHp: 100, minDmg: 6, maxDmg: 10, xp: 240 },
//       tier3: { hp: 130, maxHp: 130, minDmg: 8, maxDmg: 12, xp: 300 },
//     },
//     elite: {
//       tier1: { hp: 110, maxHp: 110, minDmg: 6, maxDmg: 9, xp: 350 },
//       tier2: { hp: 140, maxHp: 140, minDmg: 8, maxDmg: 12, xp: 420 },
//       tier3: { hp: 180, maxHp: 180, minDmg: 10, maxDmg: 15, xp: 500 },
//     },
//     miniboss: {
//       tier1: { hp: 250, maxHp: 250, minDmg: 12, maxDmg: 18, xp: 800 },
//       tier2: { hp: 350, maxHp: 350, minDmg: 15, maxDmg: 22, xp: 1000 },
//       tier3: { hp: 450, maxHp: 450, minDmg: 18, maxDmg: 28, xp: 1300 },
//     },
//     boss: {
//       tier1: { hp: 750, maxHp: 750, minDmg: 20, maxDmg: 32, xp: 2500 },
//     },
//   },

//   LOCATION_TIER_2: {
//     goblin: {
//       tier1: { hp: 80, maxHp: 80, minDmg: 7, maxDmg: 12, xp: 200 },
//       tier2: { hp: 100, maxHp: 100, minDmg: 9, maxDmg: 15, xp: 250 },
//       tier3: { hp: 130, maxHp: 130, minDmg: 11, maxDmg: 18, xp: 300 },
//     },
//     thief: {
//       tier1: { hp: 150, maxHp: 150, minDmg: 10, maxDmg: 16, xp: 350 },
//       tier2: { hp: 180, maxHp: 180, minDmg: 12, maxDmg: 20, xp: 400 },
//       tier3: { hp: 220, maxHp: 220, minDmg: 15, maxDmg: 25, xp: 480 },
//     },
//     troll: {
//       tier1: { hp: 280, maxHp: 280, minDmg: 13, maxDmg: 22, xp: 600 },
//       tier2: { hp: 350, maxHp: 350, minDmg: 17, maxDmg: 28, xp: 750 },
//       tier3: { hp: 450, maxHp: 450, minDmg: 22, maxDmg: 35, xp: 900 },
//     },
//     veteran: {
//       tier1: { hp: 400, maxHp: 400, minDmg: 18, maxDmg: 28, xp: 900 },
//       tier2: { hp: 500, maxHp: 500, minDmg: 22, maxDmg: 35, xp: 1100 },
//       tier3: { hp: 650, maxHp: 650, minDmg: 28, maxDmg: 42, xp: 1350 },
//     },
//     subboss: {
//       tier1: { hp: 650, maxHp: 650, minDmg: 25, maxDmg: 40, xp: 1500 },
//       tier2: { hp: 850, maxHp: 850, minDmg: 32, maxDmg: 50, xp: 1800 },
//       tier3: { hp: 1100, maxHp: 1100, minDmg: 40, maxDmg: 65, xp: 2200 },
//     },
//     tier2boss: {
//       tier1: { hp: 1800, maxHp: 1800, minDmg: 50, maxDmg: 80, xp: 4000 },
//     },
//   },

//   LOCATION_TIER_3: {
//     demon: {
//       tier1: { hp: 250, maxHp: 250, minDmg: 18, maxDmg: 28, xp: 500 },
//       tier2: { hp: 320, maxHp: 320, minDmg: 22, maxDmg: 35, xp: 650 },
//       tier3: { hp: 400, maxHp: 400, minDmg: 28, maxDmg: 42, xp: 800 },
//     },
//     assassin: {
//       tier1: { hp: 400, maxHp: 400, minDmg: 25, maxDmg: 45, xp: 850 },
//       tier2: { hp: 500, maxHp: 500, minDmg: 35, maxDmg: 55, xp: 1000 },
//       tier3: { hp: 650, maxHp: 650, minDmg: 45, maxDmg: 70, xp: 1200 },
//     },
//     giant: {
//       tier1: { hp: 700, maxHp: 700, minDmg: 30, maxDmg: 50, xp: 1500 },
//       tier2: { hp: 900, maxHp: 900, minDmg: 40, maxDmg: 65, xp: 1800 },
//       tier3: { hp: 1200, maxHp: 1200, minDmg: 55, maxDmg: 85, xp: 2200 },
//     },
//     champion: {
//       tier1: { hp: 1000, maxHp: 1000, minDmg: 45, maxDmg: 75, xp: 2500 },
//       tier2: { hp: 1300, maxHp: 1300, minDmg: 60, maxDmg: 95, xp: 3000 },
//       tier3: { hp: 1700, maxHp: 1700, minDmg: 75, maxDmg: 120, xp: 3600 },
//     },
//     megaboss: {
//       tier1: { hp: 1800, maxHp: 1800, minDmg: 60, maxDmg: 100, xp: 5000 },
//       tier2: { hp: 2400, maxHp: 2400, minDmg: 80, maxDmg: 130, xp: 6500 },
//       tier3: { hp: 3200, maxHp: 3200, minDmg: 110, maxDmg: 180, xp: 8000 },
//     },
//     finalboss: {
//       tier1: { hp: 5000, maxHp: 5000, minDmg: 130, maxDmg: 220, xp: 15000 },
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
  maxHealth: 100,
  accuracy: 4,
  agility: 2,
  critChance: 1,
  characterClass: CLASSES.TANK,
};
export const SNIPER_BASE_MODEL = {
  endurance: 5,
  currentHealth: 50,
  maxHealth: 50,
  accuracy: 7,
  agility: 5,
  critChance: 2.5,
  characterClass: CLASSES.SNIPER,
};
export const MEDIC_BASE_MODEL = {
  endurance: 6,
  currentHealth: 60,
  maxHealth: 60,
  accuracy: 5,
  agility: 4,
  critChance: 2,
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
      Object.keys(ALMANAC_ENEMIES_GENERIC_TYPES).map((item) => [item, 0]),
    ) as KillCounter,
  },
  hasCamera: false,
  junk: [
    [JUNK_TYPES.AXE, "3"],
    [JUNK_TYPES.CRYSTAL_ORB, "2"],
  ],
  resources: [],
  resourcesBagLevel: 1,
  collected: [],
  flags: [],
  specialEncounterChance: SPECIAL_ENCOUNTER_DEFAULT_CHANCE,
  volume: 100,
};

export const DEFAULT_GAME_SAVE = {
  gameState: DEFAULT_GAME_STATE,
  date: new Date(),
};

export const DEFAULT_GAME_SAVES = [DEFAULT_GAME_SAVE];

export const TANK_DEFAULT_XP = 700;
export const SNIPER_DEFAULT_XP = 1500;
export const MEDIC_DEFAULT_XP = 1000;

export const DEFAULT_EXP_BY_CLASS_MAP = {
  [CLASSES.MEDIC]: MEDIC_DEFAULT_XP,
  [CLASSES.SNIPER]: SNIPER_DEFAULT_XP,
  [CLASSES.TANK]: TANK_DEFAULT_XP,
};
