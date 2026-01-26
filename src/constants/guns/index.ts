import { GEAR_SLOTS } from "../../entities/gear";
import { GUN_TYPES } from "../../entities/guns";
import { BASE_ITEMS_ID } from "../items";

// FIXME: возможные эффекты на оружии в текущий момент - увеличение кол-ва патронов в магазине
// увеличение шанса крита
// увеличение силы крита
// эффект с некоторым шансом может быть на 3 тире

// SMG 1 - MP5SD
// SMG 2 - FN P90S
// SMG 1 - KRISS VECTOR

// PISTOL 1 - GLOCK 17
// PISTOL 2 - FN 57
// PISTOL 3 - DEAGLE

// SHOTGUN 1 - MP-155
// SHOTGUN 2 - Remington Model 870
// SHOTGUN 3 - saiga 12

// ASSAULT 1 - AK-12
// ASSAULT 2 - M4A1
// ASSAULT 3 - SA-58

// MACHINE GUN 1 - RPK
// MACHINE GUN 2 - PKM
// MACHINE GUN 3 - M60

// SNIPER 1 - SV-98
// SNIPER 2 - ДВЛ-10
// SNIPER 3 - AXMC .338

// !!! СНАЙПЕРКИ
export const SNIPER_TIER_1 = {
  name: "SV-98",
  description: "Российская снайперская винтовка СВ-98",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 10,
  critChance: 5,
  tier: 1,
  criticalStrike: 2.5,
  bulletsPerTurn: 1,
  minValue: 9,
  value: 18,
  baseId: BASE_ITEMS_ID.SNIPER_TIER_1,
  price: 200,
};

export const SNIPER_TIER_2 = {
  name: "ДВЛ-10",
  description: "Российская снайперская винтовка",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.SNIPER_RIFLE,
  magSize: 10,
  critChance: 10,
  tier: 1,
  criticalStrike: 4,
  bulletsPerTurn: 1,
  minDamage: 14,
  maxDamage: 28,
};

export const SNIPER_TIER_3 = {
  name: "AXMC",
  description: ".338 rifle",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.SNIPER_RIFLE,
  magSize: 6,
  critChance: 12,
  tier: 1,
  criticalStrike: 5,
  bulletsPerTurn: 2,
  minDamage: 22,
  maxDamage: 40,
};

// !!! ДРОБОВИКИ
export const SHOTGUN_TIER_1 = {
  name: "MP-155",
  description: "Американский дробовик",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.SHOTGUN,
  magSize: 8,
  critChance: 1.2,
  tier: 1,
  criticalStrike: 0.9,
  bulletsPerTurn: 1,
  minDamage: 6,
  maxDamage: 10,
};

export const SHOTGUN_TIER_2 = {
  name: "Remington Model 870",
  description: "Итальянский дробовик",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.SHOTGUN,
  magSize: 8,
  critChance: 1.3,
  tier: 2,
  criticalStrike: 1,
  bulletsPerTurn: 2,
  minDamage: 10,
  maxDamage: 16,
};

export const SHOTGUN_TIER_3 = {
  name: "Saiga-12",
  description: "Полуавтоматический дробовик",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.SHOTGUN,
  magSize: 12,
  critChance: 1.2,
  tier: 2,
  criticalStrike: 1.1,
  bulletsPerTurn: 2,
  minDamage: 15,
  maxDamage: 25,
};

export const ASSAULT_TIER_1 = {
  name: "AK-12",
  description: "Калашников",

  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.ASSAULT_RIFLE,
  magSize: 30,
  critChance: 1.5,
  tier: 1,
  criticalStrike: 1,
  bulletsPerTurn: 5,
  minDamage: 7,
  maxDamage: 12,
};

export const ASSAULT_TIER_2 = {
  name: "M4A1",
  description: "Кольт",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.ASSAULT_RIFLE,
  magSize: 30,
  critChance: 1.4,
  tier: 2,
  criticalStrike: 1.1,
  bulletsPerTurn: 6,
  minDamage: 11,
  maxDamage: 18,
};

export const ASSAULT_TIER_3 = {
  name: "SA-58",
  description: "Австрия",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.ASSAULT_RIFLE,
  magSize: 20,
  critChance: 1.8,
  tier: 3,
  criticalStrike: 1.2,
  bulletsPerTurn: 5,
  minDamage: 16,
  maxDamage: 26,
};

// !!! ПИСТОЛЕТЫ-ПУЛЕМЕТЫ
export const SMG_TIER_1 = {
  name: "MP5SD",
  description: "Немецкий ПП",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.SMG,
  magSize: 30,
  critChance: 1.5,
  tier: 1,
  criticalStrike: 1,
  bulletsPerTurn: 10,
  minDamage: 5,
  maxDamage: 9,
};

export const SMG_TIER_2 = {
  name: "FN P90S",
  description: "Футуристичный ПП",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.SMG,
  magSize: 50,
  critChance: 3,
  tier: 2,
  criticalStrike: 0.9,
  bulletsPerTurn: 10,
  minDamage: 7,
  maxDamage: 13,
};

export const SMG_TIER_3 = {
  name: "KRISS VECTOR",
  description: "Не менее футуристичный ПП",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.SMG,
  magSize: 48,
  critChance: 2,
  tier: 3,
  criticalStrike: 1.5,
  bulletsPerTurn: 12,
  minDamage: 8,
  maxDamage: 14,
};

// !!! ПИСТОЛЕТЫ
export const PISTOL_TIER_1 = {
  name: "GLOCK 17",
  description: "Пистолет глок",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.PISTOL,
  magSize: 17,
  critChance: 1.5,
  tier: 1,
  criticalStrike: 1,
  bulletsPerTurn: 4,
  minDamage: 4,
  maxDamage: 8,
};

export const PISTOL_TIER_2 = {
  name: "FN Five Seven",
  description: "Пистолет Five Seven",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.PISTOL,
  magSize: 20,
  critChance: 2,
  tier: 2,
  criticalStrike: 5,
  bulletsPerTurn: 5,
  minDamage: 7,
  maxDamage: 13,
};

export const PISTOL_TIER_3 = {
  name: "Desert Eagle",
  description: "Пистолет DEAGLE",
  iconSrc: "",
  soundSrc: "",
  type: GUN_TYPES.PISTOL,
  magSize: 7,
  critChance: 5,
  tier: 3,
  criticalStrike: 10,
  bulletsPerTurn: 2,
  minDamage: 12,
  maxDamage: 20,
};

// массив, который будет содержать все оружия первого тира
export const WEAPONS_TIER_1 = [
  SMG_TIER_1,
  PISTOL_TIER_1,
  SHOTGUN_TIER_1,
  ASSAULT_TIER_1,
  SNIPER_TIER_1,
];
export const WEAPONS_TIER_2 = [
  PISTOL_TIER_2,
  SMG_TIER_2,
  SHOTGUN_TIER_2,
  ASSAULT_TIER_2,
  SNIPER_TIER_2,
];
export const WEAPONS_TIER_3 = [
  PISTOL_TIER_3,
  SMG_TIER_3,
  SHOTGUN_TIER_3,
  ASSAULT_TIER_3,
];
