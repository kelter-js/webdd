import { GUN_TYPES } from "../../entities/guns";

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

// !!! ПИСТОЛЕТЫ-ПУЛЕМЕТЫ
export const SMG_TIER_1 = {
  name: "MP5SD",
  description: "Немецкий ПП",
  id: "SMG_TIER_1",
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

// !!! ПИСТОЛЕТЫ
export const PISTOL_TIER_1 = {
  name: "GLOCK 17",
  description: "Пистолет глок",
  id: "PISTOL_TIER_1",
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
  id: "PISTOL_TIER_2",
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
  id: "PISTOL_TIER_3",
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
export const WEAPONS_TIER_1 = [SMG_TIER_1, PISTOL_TIER_1];
export const WEAPONS_TIER_2 = [PISTOL_TIER_2];
export const WEAPONS_TIER_3 = [PISTOL_TIER_3];
