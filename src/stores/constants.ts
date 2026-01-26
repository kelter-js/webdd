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

// EVADE DAMAGE FORMULA
// Character.Agility × 0.4

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
};

export const DEFAULT_GAME_SAVE = {
  gameState: DEFAULT_GAME_STATE,
  date: new Date(),
};

export const DEFAULT_GAME_SAVES = [DEFAULT_GAME_SAVE];
