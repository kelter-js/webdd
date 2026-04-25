import { ALMANAC_ENEMIES_GENERIC_TYPES } from "../entities/enemies";
import { GameStateData, KillCounter } from "../types/gameState";
import { RENDER_LOCATIONS } from "../entities/renderLocations";
import { CLASSES } from "../entities/characterClasses";
import { DUNGEONS } from "../entities/dungeons";
import { JUNK_TYPES } from "../entities/junk";

export const MIN_ENCOUNTER_CHANCE = 8;
export const MIN_ENCOUNTER_CHANCE_MID_TIER = 6;
export const MIN_ENCOUNTER_CHANCE_HIGHT_TIER = 4;
export const MAX_ENCOUNTER_CHANCE = 85;
export const VISITED_LOCATION_WITH_LIGHT = 10;
export const VISITED_LOCATION_WITHOUT_LIGHT = 25;
export const DEAD_END_ENEMY_CHANCE = 70;

export const HP_PER_ENDURANCE_POINT = 10;
export const MAX_AMOUNT_OF_POTIONS_TO_SELL = 8;
export const MAX_AMOUNT_OF_ITEMS_TO_SELL = 12;

// Изначально даётся 10 очков - каждый лвл по 3 очка
// формула рассчета урона исходя из брони на персонаже
export const getFinalDamage = (rawDamage: number, armor: number) => {
  const K = 30; // Балансный коэффициент
  const totalDefense = armor;

  // Рассчитываем множитель (от 1.0 до ~0.35)
  const multiplier = K / (K + totalDefense);

  // Итоговый урон
  const damage = rawDamage * multiplier;

  // Округляем до ближайшего целого, минимум 1
  return Math.max(1, Math.round(damage));
};

// формула рассчета шанса уворота
export const calculateFinalEvasion = (totalEvasion: number): number => {
  // Коэффициент "мягкого капа".
  const K = 60;

  // Рассчитываем шанс по гиперболической кривой (от 0 до 1)
  // Формула: x / (x + K)
  const chance = totalEvasion / (totalEvasion + K);

  // Жесткий лимит (Hard Cap) в 80%
  const maxChance = 0.8;

  return Math.min(chance, maxChance);
};

export const calculateCritDamage = (
  rawDamage: number,
  critMultiplier: number,
) => Math.round(rawDamage * Math.ceil(critMultiplier / 2));

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

export const SPECIAL_ENCOUNTER_DEFAULT_CHANCE = 1;

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
