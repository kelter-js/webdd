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
export const SV98_TIER_1 = {
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
  baseId: BASE_ITEMS_ID.SV98_TIER_1,
  price: 200,
};

export const SV98_TIER_2 = {
  name: "SV-98 MKII",
  description: "Российская снайперская винтовка СВ-98",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 12,
  critChance: 6,
  tier: 2,
  criticalStrike: 2.5,
  bulletsPerTurn: 1,
  minValue: 11,
  value: 23,
  baseId: BASE_ITEMS_ID.SV98_TIER_2,
  price: 500,
};

export const SV98_TIER_3 = {
  name: "SV-98 MKIII",
  description: "Российская снайперская винтовка СВ-98",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 12,
  critChance: 6,
  tier: 3,
  criticalStrike: 2.5,
  bulletsPerTurn: 1,
  minValue: 14,
  value: 28,
  baseId: BASE_ITEMS_ID.SV98_TIER_3,
  price: 1000,
};

export const DLV10_TIER_1 = {
  name: "ДВЛ-10",
  description: "Российская снайперская винтовка",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 10,
  critChance: 10,
  tier: 1,
  criticalStrike: 4,
  bulletsPerTurn: 1,
  minValue: 14,
  value: 28,
  baseId: BASE_ITEMS_ID.DLV10_TIER_1,
  price: 800,
};

export const DLV10_TIER_2 = {
  name: "ДВЛ-10",
  description: "Российская снайперская винтовка",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 10,
  critChance: 10,
  tier: 2,
  criticalStrike: 4,
  bulletsPerTurn: 1,
  minValue: 18,
  value: 35,
  baseId: BASE_ITEMS_ID.DLV10_TIER_2,
  price: 1200,
};

export const DLV10_TIER_3 = {
  name: "ДВЛ-10",
  description: "Российская снайперская винтовка",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 10,
  critChance: 10,
  tier: 3,
  criticalStrike: 4,
  bulletsPerTurn: 1,
  minValue: 22,
  value: 43,
  baseId: BASE_ITEMS_ID.DLV10_TIER_3,
  price: 1500,
};

export const AXMC_TIER_1 = {
  name: "AXMC",
  description: ".338 rifle",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 6,
  critChance: 12,
  tier: 1,
  criticalStrike: 5,
  bulletsPerTurn: 2,
  minValue: 22,
  value: 40,
  baseId: BASE_ITEMS_ID.AXMC_TIER_1,
  price: 1500,
};

export const AXMC_TIER_2 = {
  name: "AXMC",
  description: ".338 rifle",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 6,
  critChance: 12,
  tier: 2,
  criticalStrike: 5,
  bulletsPerTurn: 2,
  minValue: 27,
  value: 50,
  baseId: BASE_ITEMS_ID.AXMC_TIER_2,
  price: 1500,
};

export const AXMC_TIER_3 = {
  name: "AXMC",
  description: ".338 rifle",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 6,
  critChance: 12,
  tier: 3,
  criticalStrike: 5,
  bulletsPerTurn: 2,
  minValue: 34,
  value: 62,
  baseId: BASE_ITEMS_ID.AXMC_TIER_3,
  price: 2000,
};

// !!! ДРОБОВИКИ
export const MP155_TIER_1 = {
  name: "MP-155",
  description: "Американский дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 1.2,
  tier: 1,
  criticalStrike: 0.9,
  bulletsPerTurn: 1,
  minValue: 6,
  value: 10,
  baseId: BASE_ITEMS_ID.MP155_TIER_1,
  price: 1500,
};

export const MP155_TIER_2 = {
  name: "MP-155",
  description: "Американский дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 1.2,
  tier: 2,
  criticalStrike: 0.9,
  bulletsPerTurn: 1,
  minValue: 8,
  value: 13,
  baseId: BASE_ITEMS_ID.MP155_TIER_2,
  price: 2000,
};

export const MP155_TIER_3 = {
  name: "MP-155",
  description: "Американский дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 1.2,
  tier: 3,
  criticalStrike: 0.9,
  bulletsPerTurn: 1,
  minValue: 9,
  value: 15,
  baseId: BASE_ITEMS_ID.MP155_TIER_3,
  price: 2500,
};

export const REMINGTON_870_TIER_1 = {
  name: "Remington Model 870",
  description: "Итальянский дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 1.3,
  tier: 1,
  criticalStrike: 1,
  bulletsPerTurn: 2,
  minValue: 10,
  value: 16,
  baseId: BASE_ITEMS_ID.REMINGTON_870_TIER_1,
  price: 1500,
};

export const REMINGTON_870_TIER_2 = {
  name: "Remington Model 870",
  description: "Итальянский дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 1.3,
  tier: 2,
  criticalStrike: 1,
  bulletsPerTurn: 2,
  minValue: 13,
  value: 20,
  baseId: BASE_ITEMS_ID.REMINGTON_870_TIER_2,
  price: 2000,
};

export const REMINGTON_870_TIER_3 = {
  name: "Remington Model 870",
  description: "Итальянский дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 1.3,
  tier: 3,
  criticalStrike: 1,
  bulletsPerTurn: 2,
  minValue: 15,
  value: 25,
  baseId: BASE_ITEMS_ID.REMINGTON_870_TIER_3,
  price: 2500,
};

export const SAIGA_TIER_1 = {
  name: "Saiga-12",
  description: "Полуавтоматический дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 12,
  critChance: 1.2,
  tier: 1,
  criticalStrike: 1.1,
  bulletsPerTurn: 2,
  minValue: 15,
  value: 25,
  baseId: BASE_ITEMS_ID.SAIGA_TIER_1,
  price: 2500,
};

export const SAIGA_TIER_2 = {
  name: "Saiga-12",
  description: "Полуавтоматический дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 12,
  critChance: 1.2,
  tier: 2,
  criticalStrike: 1.1,
  bulletsPerTurn: 2,
  minValue: 19,
  value: 31,
  baseId: BASE_ITEMS_ID.SAIGA_TIER_2,
  price: 2500,
};

export const SAIGA_TIER_3 = {
  name: "Saiga-12",
  description: "Полуавтоматический дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 12,
  critChance: 1.2,
  tier: 3,
  criticalStrike: 1.1,
  bulletsPerTurn: 2,
  minValue: 23,
  value: 39,
  baseId: BASE_ITEMS_ID.SAIGA_TIER_3,
  price: 2500,
};

export const AK_12_TIER_1 = {
  name: "AK-12",
  description: "Калашников",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 1.5,
  tier: 1,
  criticalStrike: 1,
  bulletsPerTurn: 5,
  minValue: 7,
  value: 12,
  baseId: BASE_ITEMS_ID.AK_12_TIER_1,
  price: 2500,
};

export const AK_12_TIER_2 = {
  name: "AK-12",
  description: "Калашников",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 1.5,
  tier: 2,
  criticalStrike: 1,
  bulletsPerTurn: 5,
  minValue: 9,
  value: 15,
  baseId: BASE_ITEMS_ID.AK_12_TIER_2,
  price: 2500,
};

export const AK_12_TIER_3 = {
  name: "AK-12",
  description: "Калашников",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 1.5,
  tier: 3,
  criticalStrike: 1,
  bulletsPerTurn: 5,
  minValue: 11,
  value: 19,
  baseId: BASE_ITEMS_ID.AK_12_TIER_3,
  price: 2500,
};

export const M4A1_TIER_1 = {
  name: "M4A1",
  description: "Кольт",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 1.4,
  tier: 1,
  criticalStrike: 1.1,
  bulletsPerTurn: 6,
  minValue: 11,
  value: 18,
  baseId: BASE_ITEMS_ID.M4A1_TIER_1,
  price: 2500,
};

export const M4A1_TIER_2 = {
  name: "M4A1",
  description: "Кольт",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 1.4,
  tier: 2,
  criticalStrike: 1.1,
  bulletsPerTurn: 6,
  minValue: 14,
  value: 23,
  baseId: BASE_ITEMS_ID.M4A1_TIER_2,
  price: 2500,
};

export const M4A1_TIER_3 = {
  name: "M4A1",
  description: "Кольт",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 1.4,
  tier: 3,
  criticalStrike: 1.1,
  bulletsPerTurn: 6,
  minValue: 17,
  value: 28,
  baseId: BASE_ITEMS_ID.M4A1_TIER_3,
  price: 2500,
};

export const SA58_TIER_1 = {
  name: "SA-58",
  description: "Австрия",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 1.8,
  tier: 1,
  criticalStrike: 1.2,
  bulletsPerTurn: 5,
  minValue: 16,
  value: 26,
  baseId: BASE_ITEMS_ID.SA58_TIER_1,
  price: 2500,
};

export const SA58_TIER_2 = {
  name: "SA-58",
  description: "Австрия",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 1.8,
  tier: 2,
  criticalStrike: 1.2,
  bulletsPerTurn: 5,
  minValue: 20,
  value: 33,
  baseId: BASE_ITEMS_ID.SA58_TIER_2,
  price: 2500,
};

export const SA58_TIER_3 = {
  name: "SA-58",
  description: "Австрия",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 1.8,
  tier: 3,
  criticalStrike: 1.2,
  bulletsPerTurn: 5,
  minValue: 25,
  value: 40,
  baseId: BASE_ITEMS_ID.SA58_TIER_3,
  price: 2500,
};

// !!! ПИСТОЛЕТЫ-ПУЛЕМЕТЫ
export const MP5SD_TIER_1 = {
  name: "MP5SD",
  description: "Немецкий ПП",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 1.5,
  tier: 1,
  criticalStrike: 1,
  bulletsPerTurn: 10,
  minValue: 5,
  value: 9,
  baseId: BASE_ITEMS_ID.MP5SD_TIER_1,
  price: 2500,
};

export const MP5SD_TIER_2 = {
  name: "MP5SD",
  description: "Немецкий ПП",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 1.5,
  tier: 2,
  criticalStrike: 1,
  bulletsPerTurn: 10,
  minValue: 6,
  value: 11,
  baseId: BASE_ITEMS_ID.MP5SD_TIER_2,
  price: 2500,
};

export const MP5SD_TIER_3 = {
  name: "MP5SD",
  description: "Немецкий ПП",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 1.5,
  tier: 3,
  criticalStrike: 1,
  bulletsPerTurn: 10,
  minValue: 8,
  value: 14,
  baseId: BASE_ITEMS_ID.MP5SD_TIER_3,
  price: 2500,
};

export const FN_P90S_TIER_1 = {
  name: "FN P90S",
  description: "Футуристичный ПП",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 50,
  critChance: 3,
  tier: 1,
  criticalStrike: 0.9,
  bulletsPerTurn: 10,
  minValue: 8,
  value: 14,
  baseId: BASE_ITEMS_ID.FN_P90S_TIER_1,
  price: 2500,
};

export const FN_P90S_TIER_2 = {
  name: "FN P90S",
  description: "Футуристичный ПП",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 50,
  critChance: 3,
  tier: 2,
  criticalStrike: 0.9,
  bulletsPerTurn: 10,
  minValue: 10,
  value: 17,
  baseId: BASE_ITEMS_ID.FN_P90S_TIER_2,
  price: 2500,
};

export const FN_P90S_TIER_3 = {
  name: "FN P90S",
  description: "Футуристичный ПП",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 50,
  critChance: 3,
  tier: 3,
  criticalStrike: 0.9,
  bulletsPerTurn: 10,
  minValue: 12,
  value: 21,
  baseId: BASE_ITEMS_ID.FN_P90S_TIER_3,
  price: 2500,
};

export const KRISS_VECTOR_TIER_1 = {
  name: "KRISS VECTOR",
  description: "Не менее футуристичный ПП",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 48,
  critChance: 2,
  tier: 1,
  criticalStrike: 1.5,
  bulletsPerTurn: 12,
  minValue: 12,
  value: 20,
  baseId: BASE_ITEMS_ID.KRISS_VECTOR_TIER_1,
  price: 2500,
};

export const KRISS_VECTOR_TIER_2 = {
  name: "KRISS VECTOR",
  description: "Не менее футуристичный ПП",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 48,
  critChance: 2,
  tier: 2,
  criticalStrike: 1.5,
  bulletsPerTurn: 12,
  minValue: 15,
  value: 25,
  baseId: BASE_ITEMS_ID.KRISS_VECTOR_TIER_2,
  price: 2500,
};

export const KRISS_VECTOR_TIER_3 = {
  name: "KRISS VECTOR",
  description: "Не менее футуристичный ПП",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 48,
  critChance: 2,
  tier: 3,
  criticalStrike: 1.5,
  bulletsPerTurn: 12,
  minValue: 19,
  value: 31,
  baseId: BASE_ITEMS_ID.KRISS_VECTOR_TIER_3,
  price: 2500,
};

// !!! ПИСТОЛЕТЫ
export const GLOCK_17_TIER_1 = {
  name: "GLOCK 17",
  description: "Пистолет глок",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 17,
  critChance: 1.5,
  tier: 1,
  criticalStrike: 1,
  bulletsPerTurn: 4,
  minValue: 4,
  value: 8,
  baseId: BASE_ITEMS_ID.GLOCK_17_TIER_1,
  price: 2500,
};

export const GLOCK_17_TIER_2 = {
  name: "GLOCK 17",
  description: "Пистолет глок",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 17,
  critChance: 1.5,
  tier: 2,
  criticalStrike: 1,
  bulletsPerTurn: 4,
  minValue: 5,
  value: 10,
  baseId: BASE_ITEMS_ID.GLOCK_17_TIER_2,
  price: 2500,
};

export const GLOCK_17_TIER_3 = {
  name: "GLOCK 17",
  description: "Пистолет глок",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 17,
  critChance: 1.5,
  tier: 3,
  criticalStrike: 1,
  bulletsPerTurn: 4,
  minValue: 6,
  value: 12,
  baseId: BASE_ITEMS_ID.GLOCK_17_TIER_3,
  price: 2500,
};

export const FN_57_TIER_1 = {
  name: "FN Five Seven",
  description: "Пистолет Five Seven",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 2,
  tier: 1,
  criticalStrike: 5,
  bulletsPerTurn: 5,
  minValue: 7,
  value: 13,
  baseId: BASE_ITEMS_ID.FN_57_TIER_1,
  price: 2500,
};

export const FN_57_TIER_2 = {
  name: "FN Five Seven",
  description: "Пистолет Five Seven",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 2,
  tier: 2,
  criticalStrike: 5,
  bulletsPerTurn: 5,
  minValue: 9,
  value: 16,
  baseId: BASE_ITEMS_ID.FN_57_TIER_2,
  price: 2500,
};

export const FN_57_TIER_3 = {
  name: "FN Five Seven",
  description: "Пистолет Five Seven",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 2,
  tier: 3,
  criticalStrike: 5,
  bulletsPerTurn: 5,
  minValue: 11,
  value: 20,
  baseId: BASE_ITEMS_ID.FN_57_TIER_3,
  price: 2500,
};

export const DESERT_EAGLE_TIER_1 = {
  name: "Desert Eagle",
  description: "Пистолет DEAGLE",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 7,
  critChance: 5,
  tier: 1,
  criticalStrike: 10,
  bulletsPerTurn: 2,
  minValue: 10,
  value: 18,
  baseId: BASE_ITEMS_ID.DESERT_EAGLE_TIER_1,
  price: 2500,
};

export const DESERT_EAGLE_TIER_2 = {
  name: "Desert Eagle",
  description: "Пистолет DEAGLE",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 7,
  critChance: 5,
  tier: 2,
  criticalStrike: 10,
  bulletsPerTurn: 2,
  minValue: 13,
  value: 23,
  baseId: BASE_ITEMS_ID.DESERT_EAGLE_TIER_2,
  price: 2500,
};

export const DESERT_EAGLE_TIER_3 = {
  name: "Desert Eagle",
  description: "Пистолет DEAGLE",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 7,
  critChance: 5,
  tier: 3,
  criticalStrike: 10,
  bulletsPerTurn: 2,
  minValue: 16,
  value: 28,
  baseId: BASE_ITEMS_ID.DESERT_EAGLE_TIER_3,
  price: 2500,
};

// !!! LMG
export const RPD_TIER_1 = {
  name: "RPD",
  description: "Пистолет глок",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 60,
  critChance: 1.2,
  tier: 1,
  criticalStrike: 1,
  bulletsPerTurn: 10,
  minValue: 5,
  value: 9,
  baseId: BASE_ITEMS_ID.RPD_TIER_1,
  price: 2500,
};

export const RPD_TIER_2 = {
  name: "RPD",
  description: "Пистолет глок",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 60,
  critChance: 1.2,
  tier: 2,
  criticalStrike: 1,
  bulletsPerTurn: 10,
  minValue: 6,
  value: 11,
  baseId: BASE_ITEMS_ID.RPD_TIER_2,
  price: 2500,
};

export const RPD_TIER_3 = {
  name: "RPD",
  description: "Пистолет глок",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 60,
  critChance: 1.2,
  tier: 3,
  criticalStrike: 1,
  bulletsPerTurn: 10,
  minValue: 8,
  value: 14,
  baseId: BASE_ITEMS_ID.RPD_TIER_3,
  price: 2500,
};

export const M60_TIER_1 = {
  name: "M60",
  description: "Пистолет Five Seven",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 1,
  tier: 1,
  criticalStrike: 2,
  bulletsPerTurn: 15,
  minValue: 9,
  value: 15,
  baseId: BASE_ITEMS_ID.M60_TIER_1,
  price: 2500,
};

export const M60_TIER_2 = {
  name: "M60",
  description: "Пистолет Five Seven",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 1,
  tier: 2,
  criticalStrike: 2,
  bulletsPerTurn: 15,
  minValue: 11,
  value: 19,
  baseId: BASE_ITEMS_ID.M60_TIER_2,
  price: 2500,
};

export const M60_TIER_3 = {
  name: "M60",
  description: "Пистолет Five Seven",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 1,
  tier: 3,
  criticalStrike: 2,
  bulletsPerTurn: 15,
  minValue: 14,
  value: 23,
  baseId: BASE_ITEMS_ID.M60_TIER_3,
  price: 2500,
};

export const PKM_TIER_1 = {
  name: "PKM",
  description: "Пистолет DEAGLE",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 5,
  tier: 1,
  criticalStrike: 1,
  bulletsPerTurn: 15,
  minValue: 14,
  value: 22,
  baseId: BASE_ITEMS_ID.PKM_TIER_1,
  price: 2500,
};

export const PKM_TIER_2 = {
  name: "PKM",
  description: "Пистолет DEAGLE",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 5,
  tier: 2,
  criticalStrike: 1,
  bulletsPerTurn: 15,
  minValue: 17,
  value: 27,
  baseId: BASE_ITEMS_ID.PKM_TIER_2,
  price: 2500,
};

export const PKM_TIER_3 = {
  name: "PKM",
  description: "Пистолет DEAGLE",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 5,
  tier: 3,
  criticalStrike: 1,
  bulletsPerTurn: 15,
  minValue: 22,
  value: 34,
  baseId: BASE_ITEMS_ID.PKM_TIER_3,
  price: 2500,
};

// массив, который будет содержать все оружия первого тира
export const WEAPONS_TIER_1 = [
  GLOCK_17_TIER_1,
  MP155_TIER_1,
  AK_12_TIER_1,
  SV98_TIER_1,
  RPD_TIER_1,
  MP5SD_TIER_1,
];

export const RARE_WEAPONS_TIER_1 = [
  GLOCK_17_TIER_2,
  MP155_TIER_2,
  AK_12_TIER_2,
  SV98_TIER_2,
  RPD_TIER_2,
  MP5SD_TIER_2,
];

export const SUPER_RARE_WEAPONS_TIER_1 = [
  GLOCK_17_TIER_3,
  MP155_TIER_3,
  AK_12_TIER_3,
  SV98_TIER_3,
  RPD_TIER_3,
  MP5SD_TIER_3,
];

export const WEAPONS_TIER_2 = [
  DLV10_TIER_1,
  REMINGTON_870_TIER_1,
  M4A1_TIER_1,
  FN_P90S_TIER_1,
  FN_57_TIER_1,
  M60_TIER_1,
];

export const RARE_WEAPONS_TIER_2 = [
  DLV10_TIER_2,
  REMINGTON_870_TIER_2,
  M4A1_TIER_2,
  FN_P90S_TIER_2,
  FN_57_TIER_2,
  M60_TIER_2,
];

export const SUPER_RARE_WEAPONS_TIER_2 = [
  DLV10_TIER_3,
  REMINGTON_870_TIER_3,
  M4A1_TIER_3,
  FN_P90S_TIER_3,
  FN_57_TIER_3,
  M60_TIER_3,
];

export const WEAPONS_TIER_3 = [
  AXMC_TIER_1,
  SAIGA_TIER_1,
  SA58_TIER_1,
  KRISS_VECTOR_TIER_1,
  DESERT_EAGLE_TIER_1,
  PKM_TIER_1,
];

export const RARE_WEAPONS_TIER_3 = [
  AXMC_TIER_2,
  SAIGA_TIER_2,
  SA58_TIER_2,
  KRISS_VECTOR_TIER_2,
  DESERT_EAGLE_TIER_2,
  PKM_TIER_2,
];

export const SUPER_RARE_WEAPONS_TIER_3 = [
  AXMC_TIER_3,
  SAIGA_TIER_3,
  SA58_TIER_3,
  KRISS_VECTOR_TIER_3,
  DESERT_EAGLE_TIER_3,
  PKM_TIER_3,
];
