import { GEAR_SLOTS } from "../../entities/gear";
import { GUN_TYPES } from "../../entities/guns";
import { Item } from "../../types/gameState";
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
export const SV98_TIER_1: Omit<Item, "gearId"> = {
  name: "SV-98",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  description: "",
  iconSrc: "",
  soundSrc: "",
  magSize: 10,
  critChance: 8,
  criticalStrike: 2.5,
  bulletsPerTurn: 1,
  minValue: 12,
  value: 24,
  tier: 1,
  overAllTier: 1,
  price: 500,
  baseId: BASE_ITEMS_ID.SV98_TIER_1,
};

export const SV98_TIER_2 = {
  name: "SV-98 MKII",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  description: "",
  iconSrc: "",
  soundSrc: "",
  magSize: 12,
  critChance: 10,
  criticalStrike: 2.8,
  bulletsPerTurn: 1,
  minValue: 16,
  value: 32,
  tier: 2,
  overAllTier: 1,
  price: 900,
  baseId: BASE_ITEMS_ID.SV98_TIER_2,
};

export const SV98_TIER_3 = {
  name: "SV-98 MKIII",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  description: "",
  iconSrc: "",
  soundSrc: "",
  magSize: 12,
  critChance: 12,
  criticalStrike: 3.0,
  bulletsPerTurn: 1,
  minValue: 22,
  value: 40,
  tier: 3,
  overAllTier: 1,
  price: 1500,
  baseId: BASE_ITEMS_ID.SV98_TIER_3,
};

// ===== DVL-10 (Локация 2) =====
export const DLV10_TIER_1 = {
  name: "ДВЛ-10",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  description: "",
  iconSrc: "",
  soundSrc: "",
  magSize: 10,
  critChance: 12,
  criticalStrike: 3.5,
  bulletsPerTurn: 1,
  minValue: 28,
  value: 50,
  tier: 1,
  overAllTier: 2,
  price: 2200,
  baseId: BASE_ITEMS_ID.DLV10_TIER_1,
};

export const DLV10_TIER_2 = {
  name: "ДВЛ-10 MKII",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  description: "",
  iconSrc: "",
  soundSrc: "",
  magSize: 10,
  critChance: 14,
  criticalStrike: 3.8,
  bulletsPerTurn: 1,
  minValue: 35,
  value: 65,
  tier: 2,
  overAllTier: 2,
  price: 3500,
  baseId: BASE_ITEMS_ID.DLV10_TIER_2,
};

export const DLV10_TIER_3 = {
  name: "ДВЛ-10 MKIII",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  description: "",
  iconSrc: "",
  soundSrc: "",
  magSize: 10,
  critChance: 15,
  criticalStrike: 4.2,
  bulletsPerTurn: 1,
  minValue: 45,
  value: 85,
  tier: 3,
  overAllTier: 2,
  price: 5000,
  baseId: BASE_ITEMS_ID.DLV10_TIER_3,
};

// ===== AXMC (Локация 3) =====
export const AXMC_TIER_1 = {
  name: "AXMC",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  description: "",
  iconSrc: "",
  soundSrc: "",
  magSize: 6,
  critChance: 15,
  criticalStrike: 4.5,
  bulletsPerTurn: 2,
  minValue: 55,
  value: 100,
  tier: 1,
  overAllTier: 3,
  price: 6500,
  baseId: BASE_ITEMS_ID.AXMC_TIER_1,
};

export const AXMC_TIER_2 = {
  name: "AXMC MKII",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  description: "",
  iconSrc: "",
  soundSrc: "",
  magSize: 6,
  critChance: 18,
  criticalStrike: 4.8,
  bulletsPerTurn: 2,
  minValue: 70,
  value: 130,
  tier: 2,
  overAllTier: 3,
  price: 9000,
  baseId: BASE_ITEMS_ID.AXMC_TIER_2,
};

export const AXMC_TIER_3 = {
  name: "AXMC MKIII",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  description: "",
  iconSrc: "",
  soundSrc: "",
  magSize: 6,
  critChance: 20,
  criticalStrike: 5.0,
  bulletsPerTurn: 2,
  minValue: 90,
  value: 170,
  tier: 3,
  overAllTier: 3,
  price: 15000,
  baseId: BASE_ITEMS_ID.AXMC_TIER_3,
};

// !!! ДРОБОВИКИ
export const MP155_TIER_1 = {
  name: "MP-155",
  description: "Российский самозарядный дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 10,
  tier: 1,
  criticalStrike: 1.6,
  bulletsPerTurn: 1,
  minValue: 14,
  value: 22,
  baseId: BASE_ITEMS_ID.MP155_TIER_1,
  price: 400,
  overAllTier: 1,
};

export const MP155_TIER_2 = {
  name: "MP-155 MKII",
  description: "Российский самозарядный дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 12,
  tier: 2,
  criticalStrike: 1.7,
  bulletsPerTurn: 1,
  minValue: 18,
  value: 28,
  baseId: BASE_ITEMS_ID.MP155_TIER_2,
  price: 850,
  overAllTier: 1,
};

export const MP155_TIER_3 = {
  name: "MP-155 MKIII",
  description: "Российский самозарядный дробовик",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 14,
  tier: 3,
  criticalStrike: 1.8,
  bulletsPerTurn: 1,
  minValue: 22,
  value: 35,
  baseId: BASE_ITEMS_ID.MP155_TIER_3,
  price: 1400,
  overAllTier: 1,
};

// ===== Remington 870 (Локация 2: overAllTier 2) =====
export const REMINGTON_870_TIER_1 = {
  name: "Remington 870",
  description: "Американская классика",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 15,
  tier: 1,
  criticalStrike: 1.9,
  bulletsPerTurn: 2,
  minValue: 30,
  value: 45,
  baseId: BASE_ITEMS_ID.REMINGTON_870_TIER_1,
  price: 2000,
  overAllTier: 2,
};

export const REMINGTON_870_TIER_2 = {
  name: "Remington 870 MKII",
  description: "Американская классика",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 17,
  tier: 2,
  criticalStrike: 2.0,
  bulletsPerTurn: 2,
  minValue: 36,
  value: 54,
  baseId: BASE_ITEMS_ID.REMINGTON_870_TIER_2,
  price: 2800,
  overAllTier: 2,
};

export const REMINGTON_870_TIER_3 = {
  name: "Remington 870 MKIII",
  description: "Американская классика",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 8,
  critChance: 20,
  tier: 3,
  criticalStrike: 2.1,
  bulletsPerTurn: 2,
  minValue: 44,
  value: 65,
  baseId: BASE_ITEMS_ID.REMINGTON_870_TIER_3,
  price: 3800,
  overAllTier: 2,
};

// ===== Saiga-12 (Локация 3: overAllTier 3) =====
export const SAIGA_TIER_1 = {
  name: "Saiga-12",
  description: "Полуавтоматический дробовик на базе АК",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 12,
  critChance: 20,
  tier: 1,
  criticalStrike: 2.2,
  bulletsPerTurn: 2,
  minValue: 55,
  value: 85,
  baseId: BASE_ITEMS_ID.SAIGA_TIER_1,
  price: 5000,
  overAllTier: 3,
};

export const SAIGA_TIER_2 = {
  name: "Saiga-12 MKII",
  description: "Полуавтоматический дробовик на базе АК",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 12,
  critChance: 22,
  tier: 2,
  criticalStrike: 2.3,
  bulletsPerTurn: 2,
  minValue: 65,
  value: 100,
  baseId: BASE_ITEMS_ID.SAIGA_TIER_2,
  price: 7200,
  overAllTier: 3,
};

export const SAIGA_TIER_3 = {
  name: "Saiga-12 MKIII",
  description: "Полуавтоматический дробовик на базе АК",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 12,
  critChance: 25,
  tier: 3,
  criticalStrike: 2.4,
  bulletsPerTurn: 2,
  minValue: 80,
  value: 125,
  baseId: BASE_ITEMS_ID.SAIGA_TIER_3,
  price: 11000,
  overAllTier: 3,
};

export const AA12_TIER_1 = {
  name: "AA-12",
  description: "Полуавтоматический дробовик на базе АК",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SHOTGUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 20,
  tier: 3,
  criticalStrike: 3,
  bulletsPerTurn: 5,
  minValue: 120,
  value: 155,
  baseId: BASE_ITEMS_ID.AA12_TIER_1,
  price: 45000,
  overAllTier: 3,
};

export const AK_12_TIER_1 = {
  name: "AK-12",
  description: "Калашников",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 12, // Поднял шанс
  criticalStrike: 1.6, // Был 1.0
  bulletsPerTurn: 5,
  minValue: 8,
  value: 14,
  tier: 1,
  overAllTier: 1,
  price: 400, // Снизил цену для старта
  baseId: BASE_ITEMS_ID.AK_12_TIER_1,
};

export const AK_12_TIER_2 = {
  name: "AK-12 MKII",
  description: "Калашников",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 14,
  criticalStrike: 1.7,
  bulletsPerTurn: 5,
  minValue: 10,
  value: 18,
  tier: 2,
  overAllTier: 1,
  price: 800,
  baseId: BASE_ITEMS_ID.AK_12_TIER_2,
};

export const AK_12_TIER_3 = {
  name: "AK-12 MKIII",
  description: "Калашников",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 16,
  criticalStrike: 1.8,
  bulletsPerTurn: 5,
  minValue: 13,
  value: 22,
  tier: 3,
  overAllTier: 1,
  price: 1300,
  baseId: BASE_ITEMS_ID.AK_12_TIER_3,
};

// ===== M4A1 (Локация 2) =====
export const M4A1_TIER_1 = {
  name: "M4A1",
  description: "Кольт",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 18,
  criticalStrike: 1.9,
  bulletsPerTurn: 6,
  minValue: 16,
  value: 26,
  tier: 1,
  overAllTier: 2,
  price: 1800,
  baseId: BASE_ITEMS_ID.M4A1_TIER_1,
};

export const M4A1_TIER_2 = {
  name: "M4A1 MKII",
  description: "Кольт",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 20,
  criticalStrike: 2.0,
  bulletsPerTurn: 6,
  minValue: 20,
  value: 32,
  tier: 2,
  overAllTier: 2,
  price: 2400,
  baseId: BASE_ITEMS_ID.M4A1_TIER_2,
};

export const M4A1_TIER_3 = {
  name: "M4A1 MKIII",
  description: "Кольт",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 22,
  criticalStrike: 2.1,
  bulletsPerTurn: 6,
  minValue: 25,
  value: 38,
  tier: 3,
  overAllTier: 2,
  price: 3200,
  baseId: BASE_ITEMS_ID.M4A1_TIER_3,
};

// ===== SA-58 (Локация 3) =====
export const SA58_TIER_1 = {
  name: "SA-58",
  description: "Австрия",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 24,
  criticalStrike: 2.2,
  bulletsPerTurn: 5,
  minValue: 28,
  value: 45,
  tier: 1,
  overAllTier: 3,
  price: 4000,
  baseId: BASE_ITEMS_ID.SA58_TIER_1,
};

export const SA58_TIER_2 = {
  name: "SA-58 MKII",
  description: "Австрия",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 26,
  criticalStrike: 2.3,
  bulletsPerTurn: 5,
  minValue: 35,
  value: 55,
  tier: 2,
  overAllTier: 3,
  price: 5200,
  baseId: BASE_ITEMS_ID.SA58_TIER_2,
};

export const SA58_TIER_3 = {
  name: "SA-58 MKIII",
  description: "Австрия",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.ASSAULT_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 28,
  criticalStrike: 2.4,
  bulletsPerTurn: 5,
  minValue: 42,
  value: 65,
  tier: 3,
  overAllTier: 3,
  price: 7000,
  baseId: BASE_ITEMS_ID.SA58_TIER_3,
};

export const SWORD_MK18_TIER_1 = {
  name: "Sword MK-18",
  description: "Полуавтоматический дробовик на базе АК",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  magSize: 10,
  critChance: 25,
  tier: 3,
  criticalStrike: 5,
  bulletsPerTurn: 1,
  minValue: 170,
  value: 200,
  baseId: BASE_ITEMS_ID.SWORD_MK18_TIER_1,
  price: 45000,
  overAllTier: 3,
};

// !!! ПИСТОЛЕТЫ-ПУЛЕМЕТЫ
// ===== MP5SD (Локация 1: overAllTier 1) =====
export const MP5SD_TIER_1 = {
  name: "MP5SD",
  description: "Немецкий ПП с интегрированным глушителем",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 20, // Высокий шанс для старта
  criticalStrike: 1.6, // Урон x1.6
  bulletsPerTurn: 10,
  minValue: 6,
  value: 10,
  tier: 1,
  overAllTier: 1,
  price: 300,
  baseId: BASE_ITEMS_ID.MP5SD_TIER_1,
};

export const MP5SD_TIER_2 = {
  name: "MP5SD MKII",
  description: "Немецкий ПП с интегрированным глушителем",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 22,
  criticalStrike: 1.7,
  bulletsPerTurn: 10,
  minValue: 8,
  value: 13,
  tier: 2,
  overAllTier: 1,
  price: 700,
  baseId: BASE_ITEMS_ID.MP5SD_TIER_2,
};

export const MP5SD_TIER_3 = {
  name: "MP5SD MKIII",
  description: "Немецкий ПП с интегрированным глушителем",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 30,
  critChance: 25,
  criticalStrike: 1.8,
  bulletsPerTurn: 10,
  minValue: 10,
  value: 16,
  tier: 3,
  overAllTier: 1,
  price: 1200,
  baseId: BASE_ITEMS_ID.MP5SD_TIER_3,
};

// ===== FN P90S (Локация 2: overAllTier 2) =====
export const FN_P90S_TIER_1 = {
  name: "FN P90S",
  description: "Бельгийский ПП с огромным магазином",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 50,
  critChance: 25,
  criticalStrike: 1.8,
  bulletsPerTurn: 10,
  minValue: 14,
  value: 22,
  tier: 1,
  overAllTier: 2,
  price: 1800,
  baseId: BASE_ITEMS_ID.FN_P90S_TIER_1,
};

export const FN_P90S_TIER_2 = {
  name: "FN P90S MKII",
  description: "Бельгийский ПП с огромным магазином",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 50,
  critChance: 28,
  criticalStrike: 1.9,
  bulletsPerTurn: 10,
  minValue: 17,
  value: 27,
  tier: 2,
  overAllTier: 2,
  price: 2600,
  baseId: BASE_ITEMS_ID.FN_P90S_TIER_2,
};

export const FN_P90S_TIER_3 = {
  name: "FN P90S MKIII",
  description: "Бельгийский ПП с огромным магазином",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 50,
  critChance: 30,
  criticalStrike: 2.0,
  bulletsPerTurn: 10,
  minValue: 20,
  value: 32,
  tier: 3,
  overAllTier: 2,
  price: 3500,
  baseId: BASE_ITEMS_ID.FN_P90S_TIER_3,
};

// ===== KRISS VECTOR (Локация 3: overAllTier 3) =====
export const KRISS_VECTOR_TIER_1 = {
  name: "KRISS VECTOR",
  description: "ПП с уникальной системой отдачи",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 48,
  critChance: 30,
  criticalStrike: 2.0,
  bulletsPerTurn: 12, // Невероятная скорострельность
  minValue: 24,
  value: 38,
  tier: 1,
  overAllTier: 3,
  price: 4500,
  baseId: BASE_ITEMS_ID.KRISS_VECTOR_TIER_1,
};

export const KRISS_VECTOR_TIER_2 = {
  name: "KRISS VECTOR MKII",
  description: "ПП с уникальной системой отдачи",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 48,
  critChance: 32,
  criticalStrike: 2.1,
  bulletsPerTurn: 12,
  minValue: 30,
  value: 48,
  tier: 2,
  overAllTier: 3,
  price: 6000,
  baseId: BASE_ITEMS_ID.KRISS_VECTOR_TIER_2,
};

export const KRISS_VECTOR_TIER_3 = {
  name: "KRISS VECTOR MKIII",
  description: "ПП с уникальной системой отдачи",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 48,
  critChance: 35, // Каждый третий выстрел - критический
  criticalStrike: 2.2,
  bulletsPerTurn: 12,
  minValue: 38,
  value: 58,
  tier: 3,
  overAllTier: 3,
  price: 8500,
  baseId: BASE_ITEMS_ID.KRISS_VECTOR_TIER_3,
};

export const VERESK_TIER_1 = {
  name: "Вереск",
  description: "ПП с уникальной системой отдачи",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.SMG,
  type: GEAR_SLOTS.WEAPON,
  magSize: 25,
  critChance: 38, // Каждый третий выстрел - критический
  criticalStrike: 2.5,
  bulletsPerTurn: 5,
  minValue: 70,
  value: 90,
  tier: 3,
  overAllTier: 3,
  price: 45000,
  baseId: BASE_ITEMS_ID.VERESK_TIER_1,
};

// !!! ПИСТОЛЕТЫ
// ===== GLOCK 17 (Локация 1: overAllTier 1) =====
export const GLOCK_17_TIER_1 = {
  name: "GLOCK 17",
  description: "Австрийский полимерный пистолет",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 17,
  critChance: 15, // Неплохой шанс для старта
  tier: 1,
  criticalStrike: 1.8, // Ощутимый бонус вместо x1
  bulletsPerTurn: 4,
  minValue: 6,
  value: 10,
  baseId: BASE_ITEMS_ID.GLOCK_17_TIER_1,
  price: 200,
  overAllTier: 1,
};

export const GLOCK_17_TIER_2 = {
  name: "GLOCK 17 MKII",
  description: "Австрийский полимерный пистолет",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 17,
  critChance: 18,
  tier: 2,
  criticalStrike: 1.9,
  bulletsPerTurn: 4,
  minValue: 8,
  value: 13,
  baseId: BASE_ITEMS_ID.GLOCK_17_TIER_2,
  price: 450,
  overAllTier: 1,
};

export const GLOCK_17_TIER_3 = {
  name: "GLOCK 17 MKIII",
  description: "Австрийский полимерный пистолет",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 17,
  critChance: 20,
  tier: 3,
  criticalStrike: 2.0,
  bulletsPerTurn: 4,
  minValue: 10,
  value: 16,
  baseId: BASE_ITEMS_ID.GLOCK_17_TIER_3,
  price: 800,
  overAllTier: 1,
};

// ===== FN Five Seven (Локация 2: overAllTier 2) =====
export const FN_57_TIER_1 = {
  name: "FN Five Seven",
  description: "Пистолет с высокой пробивной способностью",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 12,
  tier: 1,
  criticalStrike: 2.5, // Солидный множитель
  bulletsPerTurn: 5,
  minValue: 14,
  value: 22,
  baseId: BASE_ITEMS_ID.FN_57_TIER_1,
  price: 1200,
  overAllTier: 2,
};

export const FN_57_TIER_2 = {
  name: "FN Five Seven MKII",
  description: "Пистолет с высокой пробивной способностью",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 14,
  tier: 2,
  criticalStrike: 2.7,
  bulletsPerTurn: 5,
  minValue: 18,
  value: 28,
  baseId: BASE_ITEMS_ID.FN_57_TIER_2,
  price: 1800,
  overAllTier: 2,
};

export const FN_57_TIER_3 = {
  name: "FN Five Seven MKIII",
  description: "Пистолет с высокой пробивной способностью",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 20,
  critChance: 16,
  tier: 3,
  criticalStrike: 3.0,
  bulletsPerTurn: 5,
  minValue: 22,
  value: 35,
  baseId: BASE_ITEMS_ID.FN_57_TIER_3,
  price: 2600,
  overAllTier: 2,
};

// ===== Desert Eagle (Локация 3: overAllTier 3) =====
export const DESERT_EAGLE_TIER_1 = {
  name: "Desert Eagle",
  description: "Легендарный крупнокалиберный пистолет",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 7,
  critChance: 8, // Крит редко, но метко
  tier: 1,
  criticalStrike: 3.5, // Тяжелый удар
  bulletsPerTurn: 2,
  minValue: 30,
  value: 50,
  baseId: BASE_ITEMS_ID.DESERT_EAGLE_TIER_1,
  price: 3500,
  overAllTier: 3,
};

export const DESERT_EAGLE_TIER_2 = {
  name: "Desert Eagle MKII",
  description: "Легендарный крупнокалиберный пистолет",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 7,
  critChance: 10,
  tier: 2,
  criticalStrike: 3.8,
  bulletsPerTurn: 2,
  minValue: 40,
  value: 65,
  baseId: BASE_ITEMS_ID.DESERT_EAGLE_TIER_2,
  price: 5000,
  overAllTier: 3,
};

export const DESERT_EAGLE_TIER_3 = {
  name: "Desert Eagle MKIII",
  description: "Легендарный крупнокалиберный пистолет",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.PISTOL,
  type: GEAR_SLOTS.WEAPON,
  magSize: 7,
  critChance: 12,
  tier: 3,
  criticalStrike: 4.0, // Потолок для пистолетов
  bulletsPerTurn: 2,
  minValue: 55,
  value: 85,
  baseId: BASE_ITEMS_ID.DESERT_EAGLE_TIER_3,
  price: 7500,
  overAllTier: 3,
};

// !!! LMG
// ===== RPD (Локация 1: overAllTier 1) =====
export const RPD_TIER_1 = {
  name: "RPD",
  description: "Советский ручной пулемет Дегтярёва",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 60,
  critChance: 5, // Редкий крит
  tier: 1,
  criticalStrike: 2.0, // Но мощный x2
  bulletsPerTurn: 10,
  minValue: 10,
  value: 16,
  baseId: BASE_ITEMS_ID.RPD_TIER_1,
  price: 800,
  overAllTier: 1,
};

export const RPD_TIER_2 = {
  name: "RPD MKII",
  description: "Советский ручной пулемет Дегтярёва",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 60,
  critChance: 6,
  tier: 2,
  criticalStrike: 2.1,
  bulletsPerTurn: 10,
  minValue: 12,
  value: 20,
  baseId: BASE_ITEMS_ID.RPD_TIER_2,
  price: 1500,
  overAllTier: 1,
};

export const RPD_TIER_3 = {
  name: "RPD MKIII",
  description: "Советский ручной пулемет Дегтярёва",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 60,
  critChance: 7,
  tier: 3,
  criticalStrike: 2.2,
  bulletsPerTurn: 10,
  minValue: 15,
  value: 25,
  baseId: BASE_ITEMS_ID.RPD_TIER_3,
  price: 2500,
  overAllTier: 1,
};

// ===== M60 (Локация 2: overAllTier 2) =====
export const M60_TIER_1 = {
  name: "M60",
  description: "Американский пулемет времен Вьетнама",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 6,
  tier: 1,
  criticalStrike: 2.2,
  bulletsPerTurn: 15, // Огромный расход патронов
  minValue: 18,
  value: 28,
  baseId: BASE_ITEMS_ID.M60_TIER_1,
  price: 3200,
  overAllTier: 2,
};

export const M60_TIER_2 = {
  name: "M60 MKII",
  description: "Американский пулемет времен Вьетнама",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 7,
  tier: 2,
  criticalStrike: 2.3,
  bulletsPerTurn: 15,
  minValue: 22,
  value: 35,
  baseId: BASE_ITEMS_ID.M60_TIER_2,
  price: 4500,
  overAllTier: 2,
};

export const M60_TIER_3 = {
  name: "M60 MKIII",
  description: "Американский пулемет времен Вьетнама",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 8,
  tier: 3,
  criticalStrike: 2.4,
  bulletsPerTurn: 15,
  minValue: 28,
  value: 42,
  baseId: BASE_ITEMS_ID.M60_TIER_3,
  price: 6000,
  overAllTier: 2,
};

// ===== PKM (Локация 3: overAllTier 3) =====
export const PKM_TIER_1 = {
  name: "PKM",
  description: "Пулемет Калашникова Модернизированный",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 8,
  tier: 1,
  criticalStrike: 2.4,
  bulletsPerTurn: 15,
  minValue: 35,
  value: 55,
  baseId: BASE_ITEMS_ID.PKM_TIER_1,
  price: 7500,
  overAllTier: 3,
};

export const PKM_TIER_2 = {
  name: "PKM MKII",
  description: "Пулемет Калашникова Модернизированный",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 9,
  tier: 2,
  criticalStrike: 2.5,
  bulletsPerTurn: 15,
  minValue: 45,
  value: 68,
  baseId: BASE_ITEMS_ID.PKM_TIER_2,
  price: 10000,
  overAllTier: 3,
};

export const PKM_TIER_3 = {
  name: "PKM MKIII",
  description: "Пулемет Калашникова Модернизированный",
  iconSrc: "",
  soundSrc: "",
  gunType: GUN_TYPES.MACHINE_GUN,
  type: GEAR_SLOTS.WEAPON,
  magSize: 100,
  critChance: 10,
  tier: 3,
  criticalStrike: 2.6,
  bulletsPerTurn: 15,
  minValue: 55,
  value: 85,
  baseId: BASE_ITEMS_ID.PKM_TIER_3,
  price: 14000,
  overAllTier: 3,
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
