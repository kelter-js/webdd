import { BASE_ITEMS_ID } from "../items";
import { GEAR_SLOTS } from "../../entities/gear";

// СИЛЬНЫЙ
export const GALVION_TIER_1 = {
  name: "БНТИ",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 4,
  baseId: BASE_ITEMS_ID.GALVION_TIER_1,
  overAllTier: 1,
  price: 200,
};

export const GALVION_TIER_2 = {
  name: "БНТИ",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 6,
  baseId: BASE_ITEMS_ID.GALVION_TIER_2,
  price: 500,
  overAllTier: 1,
};

export const GALVION_TIER_3 = {
  name: "БНТИ",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 3,
  value: 8,
  baseId: BASE_ITEMS_ID.GALVION_TIER_3,
  price: 1000,
  overAllTier: 1,
};

// СЛАБЫЙ
export const HJELM_TIER_1 = {
  name: "NPP",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 3,
  baseId: BASE_ITEMS_ID.HJELM_TIER_1,
  price: 200,
  overAllTier: 1,
};

export const HJELM_TIER_2 = {
  name: "NPP",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 5,
  baseId: BASE_ITEMS_ID.HJELM_TIER_2,
  price: 500,
  overAllTier: 1,
};

export const HJELM_TIER_3 = {
  name: "NPP",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 3,
  value: 9, // слабый T3 > сильный T3
  baseId: BASE_ITEMS_ID.HJELM_TIER_3,
  price: 1200,
  overAllTier: 1,
};

// ===== ЛОКАЦИЯ 2 (overAllTier: 2) =====

// СИЛЬНЫЙ
export const ALTYN_TIER_1 = {
  name: "IOTV",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 7,
  baseId: BASE_ITEMS_ID.ALTYN_TIER_1,
  price: 800,
  overAllTier: 2,
};

export const ALTYN_TIER_2 = {
  name: "IOTV",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 9,
  baseId: BASE_ITEMS_ID.ALTYN_TIER_2,
  price: 1200,
  overAllTier: 2,
};

export const ALTYN_TIER_3 = {
  name: "IOTV",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 3,
  value: 11,
  baseId: BASE_ITEMS_ID.ALTYN_TIER_3,
  price: 1800,
  overAllTier: 2,
};

// СЛАБЫЙ
export const MASKA_TIER_1 = {
  name: "FORT",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 6,
  baseId: BASE_ITEMS_ID.MASKA_TIER_1,
  price: 700,
  overAllTier: 2,
};

export const MASKA_TIER_2 = {
  name: "FORT",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 8,
  baseId: BASE_ITEMS_ID.MASKA_TIER_2,
  price: 1300,
  overAllTier: 2,
};

export const MASKA_TIER_3 = {
  name: "FORT",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 3,
  value: 12, // переворот
  baseId: BASE_ITEMS_ID.MASKA_TIER_3,
  price: 2500,
  overAllTier: 2,
};

// ===== ЛОКАЦИЯ 3 (overAllTier: 3) =====

// СИЛЬНЫЙ
export const RONIN_HELMET_TIER_1 = {
  name: "NFM",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 10,
  baseId: BASE_ITEMS_ID.RONIN_HELMET_TIER_1,
  price: 1500,
  overAllTier: 3,
};

export const RONIN_HELMET_TIER_2 = {
  name: "NFM",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 13,
  baseId: BASE_ITEMS_ID.RONIN_HELMET_TIER_2,
  price: 2000,
  overAllTier: 3,
};

export const RONIN_HELMET_TIER_3 = {
  name: "NFM",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 3,
  value: 15,
  baseId: BASE_ITEMS_ID.RONIN_HELMET_TIER_3,
  price: 2000,
  overAllTier: 3,
};

// СЛАБЫЙ
export const RONIN_RESPIRATOR_TIER_1 = {
  name: "REDUT",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 9,
  baseId: BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_1,
  price: 1400,
  overAllTier: 3,
};

export const RONIN_RESPIRATOR_TIER_2 = {
  name: "REDUT",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 12,
  baseId: BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_2,
  price: 1400,
  overAllTier: 3,
};

export const RONIN_RESPIRATOR_TIER_3 = {
  name: "REDUT",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 3,
  value: 17, // слабый T3 > сильный T3
  baseId: BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_3,
  price: 3500,
  overAllTier: 3,
};

export const CQCM_DEFENSE_ATOMIC_TIER_1 = {
  name: "REDUT",
  description: "Простой бронежилет",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 3,
  value: 20, // слабый T3 > сильный T3
  baseId: BASE_ITEMS_ID.CQCM_DEFENSE_ATOMIC_TIER_1,
  price: 30000,
  overAllTier: 3,
};

export const HELMETS_TIER_1 = [GALVION_TIER_1, HJELM_TIER_1];
export const HELMETS_TIER_2 = [ALTYN_TIER_1, MASKA_TIER_1];
export const HELMETS_TIER_3 = [RONIN_HELMET_TIER_1, RONIN_RESPIRATOR_TIER_1];

export const RARE_HELMETS_TIER_1 = [GALVION_TIER_2, HJELM_TIER_2];
export const RARE_HELMETS_TIER_2 = [ALTYN_TIER_2, MASKA_TIER_2];
export const RARE_HELMETS_TIER_3 = [
  RONIN_HELMET_TIER_2,
  RONIN_RESPIRATOR_TIER_2,
];

export const SUPER_RARE_HELMETS_TIER_1 = [GALVION_TIER_3, HJELM_TIER_3];
export const SUPER_RARE_HELMETS_TIER_2 = [ALTYN_TIER_3, MASKA_TIER_3];
export const SUPER_RARE_HELMETS_TIER_3 = [
  RONIN_HELMET_TIER_3,
  RONIN_RESPIRATOR_TIER_3,
];
