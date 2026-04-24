import { GEAR_SLOTS } from "../../entities/gear";
import { GUN_TYPES } from "../../entities/guns";
import { Item } from "../../types/gameState";
import { BASE_ITEMS_ID } from "../items";

import sv98_1 from "../../assets/gear/weapons/sv98_1.png";
import sv98_2 from "../../assets/gear/weapons/sv98_2.png";
import sv98_3 from "../../assets/gear/weapons/sv98_3.png";

import dvl_1 from "../../assets/gear/weapons/dvl_1.png";
import dvl_2 from "../../assets/gear/weapons/dvl_2.png";
import dvl_3 from "../../assets/gear/weapons/dvl_3.png";

import axmc_1 from "../../assets/gear/weapons/axmc_1.png";
import axmc_2 from "../../assets/gear/weapons/axmc_2.png";
import axmc_3 from "../../assets/gear/weapons/axmc_3.png";

import mp155_1 from "../../assets/gear/weapons/mp155_1.png";
import mp155_2 from "../../assets/gear/weapons/mp155_2.png";
import mp155_3 from "../../assets/gear/weapons/mp155_3.png";

import m870_1 from "../../assets/gear/weapons/m870_1.png";
import m870_2 from "../../assets/gear/weapons/m870_2.png";
import m870_3 from "../../assets/gear/weapons/m870_3.png";

import saiga_1 from "../../assets/gear/weapons/saiga_1.png";
import saiga_2 from "../../assets/gear/weapons/saiga_2.png";
import saiga_3 from "../../assets/gear/weapons/saiga_3.png";

import aa12 from "../../assets/gear/weapons/aa12.png";

import ak12_1 from "../../assets/gear/weapons/ak12_1.png";
import ak12_2 from "../../assets/gear/weapons/ak12_2.png";
import ak12_3 from "../../assets/gear/weapons/ak12_3.png";

import m4_1 from "../../assets/gear/weapons/m4_1.png";
import m4_2 from "../../assets/gear/weapons/m4_2.png";
import m4_3 from "../../assets/gear/weapons/m4_3.png";

import sa58_1 from "../../assets/gear/weapons/sa58_1.png";
import sa58_2 from "../../assets/gear/weapons/sa58_2.png";
import sa58_3 from "../../assets/gear/weapons/sa58_3.png";

import mk18 from "../../assets/gear/weapons/mk18.png";

import mp_1 from "../../assets/gear/weapons/mp_1.png";
import mp_2 from "../../assets/gear/weapons/mp_2.png";
import mp_3 from "../../assets/gear/weapons/mp_3.png";

import p90_1 from "../../assets/gear/weapons/p90_1.png";
import p90_2 from "../../assets/gear/weapons/p90_2.png";
import p90_3 from "../../assets/gear/weapons/p90_3.png";

import vector_1 from "../../assets/gear/weapons/vector_1.png";
import vector_2 from "../../assets/gear/weapons/vector_2.png";
import vector_3 from "../../assets/gear/weapons/vector_3.png";

import veresk from "../../assets/gear/weapons/veresk.png";

import glock_1 from "../../assets/gear/weapons/glock_1.png";
import glock_2 from "../../assets/gear/weapons/glock_2.png";
import glock_3 from "../../assets/gear/weapons/glock_3.png";

import fn57_1 from "../../assets/gear/weapons/fn57_1.png";
import fn57_2 from "../../assets/gear/weapons/fn57_2.png";
import fn57_3 from "../../assets/gear/weapons/fn57_3.png";

import deagle_1 from "../../assets/gear/weapons/deagle_1.png";
import deagle_2 from "../../assets/gear/weapons/deagle_2.png";
import deagle_3 from "../../assets/gear/weapons/deagle_3.png";

import rpd_1 from "../../assets/gear/weapons/rpd_1.png";
import rpd_2 from "../../assets/gear/weapons/rpd_2.png";
import rpd_3 from "../../assets/gear/weapons/rpd_3.png";

import m60_1 from "../../assets/gear/weapons/m60_1.png";
import m60_2 from "../../assets/gear/weapons/m60_2.png";
import m60_3 from "../../assets/gear/weapons/m60_3.png";

import pkm_1 from "../../assets/gear/weapons/pkm_1.png";
import pkm_2 from "../../assets/gear/weapons/pkm_2.png";
import pkm_3 from "../../assets/gear/weapons/pkm_3.png";

import axmcSfx from "../../assets/audio/weapons/axmc.mp3";
import sv98Sfx from "../../assets/audio/weapons/sv98.mp3";
import dvlSfx from "../../assets/audio/weapons/dvl.mp3";
import mp155Sfx from "../../assets/audio/weapons/mp155.mp3";
import m870Sfx from "../../assets/audio/weapons/m870.mp3";
import saigaSfx from "../../assets/audio/weapons/saiga.mp3";
import ak12Sfx from "../../assets/audio/weapons/ak12.mp3";
import aa12Sfx from "../../assets/audio/weapons/aa12.mp3";
import m4a1Sfx from "../../assets/audio/weapons/m4a1.mp3";
import sa58Sfx from "../../assets/audio/weapons/sa58.mp3";
import mk18Sfx from "../../assets/audio/weapons/mk18.mp3";
import mp5sdSfx from "../../assets/audio/weapons/mp5sd.mp3";
import p90Sfx from "../../assets/audio/weapons/p90.mp3";
import vectorSfx from "../../assets/audio/weapons/vector.mp3";
import vereskSfx from "../../assets/audio/weapons/veresk.mp3";
import glockSfx from "../../assets/audio/weapons/glock.mp3";
import fn57Sfx from "../../assets/audio/weapons/fn57.mp3";
import deagleSfx from "../../assets/audio/weapons/deagle.mp3";
import rpdSfx from "../../assets/audio/weapons/rpd.mp3";
import m60Sfx from "../../assets/audio/weapons/m60.mp3";
import pkmSfx from "../../assets/audio/weapons/pkm.mp3";

export const WEAPONS_SFX_SOURCES = {
  [BASE_ITEMS_ID.SV98_TIER_1]: sv98Sfx,
  [BASE_ITEMS_ID.SV98_TIER_2]: sv98Sfx,
  [BASE_ITEMS_ID.SV98_TIER_3]: sv98Sfx,

  [BASE_ITEMS_ID.AXMC_TIER_1]: axmcSfx,
  [BASE_ITEMS_ID.AXMC_TIER_2]: axmcSfx,
  [BASE_ITEMS_ID.AXMC_TIER_3]: axmcSfx,

  [BASE_ITEMS_ID.DLV10_TIER_1]: dvlSfx,
  [BASE_ITEMS_ID.DLV10_TIER_2]: dvlSfx,
  [BASE_ITEMS_ID.DLV10_TIER_3]: dvlSfx,

  [BASE_ITEMS_ID.MP155_TIER_1]: mp155Sfx,
  [BASE_ITEMS_ID.MP155_TIER_2]: mp155Sfx,
  [BASE_ITEMS_ID.MP155_TIER_3]: mp155Sfx,

  [BASE_ITEMS_ID.REMINGTON_870_TIER_1]: m870Sfx,
  [BASE_ITEMS_ID.REMINGTON_870_TIER_2]: m870Sfx,
  [BASE_ITEMS_ID.REMINGTON_870_TIER_3]: m870Sfx,

  [BASE_ITEMS_ID.SAIGA_TIER_1]: saigaSfx,
  [BASE_ITEMS_ID.SAIGA_TIER_2]: saigaSfx,
  [BASE_ITEMS_ID.SAIGA_TIER_3]: saigaSfx,

  [BASE_ITEMS_ID.AK_12_TIER_1]: ak12Sfx,
  [BASE_ITEMS_ID.AK_12_TIER_2]: ak12Sfx,
  [BASE_ITEMS_ID.AK_12_TIER_3]: ak12Sfx,

  [BASE_ITEMS_ID.AA12_TIER_1]: aa12Sfx,

  [BASE_ITEMS_ID.M4A1_TIER_1]: m4a1Sfx,
  [BASE_ITEMS_ID.M4A1_TIER_2]: m4a1Sfx,
  [BASE_ITEMS_ID.M4A1_TIER_3]: m4a1Sfx,

  [BASE_ITEMS_ID.SA58_TIER_1]: sa58Sfx,
  [BASE_ITEMS_ID.SA58_TIER_2]: sa58Sfx,
  [BASE_ITEMS_ID.SA58_TIER_3]: sa58Sfx,

  [BASE_ITEMS_ID.MP5SD_TIER_1]: mp5sdSfx,
  [BASE_ITEMS_ID.MP5SD_TIER_2]: mp5sdSfx,
  [BASE_ITEMS_ID.MP5SD_TIER_3]: mp5sdSfx,

  [BASE_ITEMS_ID.SWORD_MK18_TIER_1]: mk18Sfx,

  [BASE_ITEMS_ID.FN_P90S_TIER_1]: p90Sfx,
  [BASE_ITEMS_ID.FN_P90S_TIER_2]: p90Sfx,
  [BASE_ITEMS_ID.FN_P90S_TIER_3]: p90Sfx,

  [BASE_ITEMS_ID.KRISS_VECTOR_TIER_1]: vectorSfx,
  [BASE_ITEMS_ID.KRISS_VECTOR_TIER_2]: vectorSfx,
  [BASE_ITEMS_ID.KRISS_VECTOR_TIER_3]: vectorSfx,

  [BASE_ITEMS_ID.VERESK_TIER_1]: vereskSfx,

  [BASE_ITEMS_ID.GLOCK_17_TIER_1]: glockSfx,
  [BASE_ITEMS_ID.GLOCK_17_TIER_2]: glockSfx,
  [BASE_ITEMS_ID.GLOCK_17_TIER_3]: glockSfx,

  [BASE_ITEMS_ID.FN_57_TIER_1]: fn57Sfx,
  [BASE_ITEMS_ID.FN_57_TIER_2]: fn57Sfx,
  [BASE_ITEMS_ID.FN_57_TIER_3]: fn57Sfx,

  [BASE_ITEMS_ID.DESERT_EAGLE_TIER_1]: deagleSfx,
  [BASE_ITEMS_ID.DESERT_EAGLE_TIER_2]: deagleSfx,
  [BASE_ITEMS_ID.DESERT_EAGLE_TIER_3]: deagleSfx,

  [BASE_ITEMS_ID.RPD_TIER_1]: rpdSfx,
  [BASE_ITEMS_ID.RPD_TIER_2]: rpdSfx,
  [BASE_ITEMS_ID.RPD_TIER_3]: rpdSfx,

  [BASE_ITEMS_ID.M60_TIER_1]: m60Sfx,
  [BASE_ITEMS_ID.M60_TIER_2]: m60Sfx,
  [BASE_ITEMS_ID.M60_TIER_3]: m60Sfx,

  [BASE_ITEMS_ID.PKM_TIER_1]: pkmSfx,
  [BASE_ITEMS_ID.PKM_TIER_2]: pkmSfx,
  [BASE_ITEMS_ID.PKM_TIER_3]: pkmSfx,
};

// MK18, PKM

export const WEAPONS_ICON_SOURCES = {
  [BASE_ITEMS_ID.SV98_TIER_1]: sv98_1,
  [BASE_ITEMS_ID.SV98_TIER_2]: sv98_2,
  [BASE_ITEMS_ID.SV98_TIER_3]: sv98_3,

  [BASE_ITEMS_ID.DLV10_TIER_1]: dvl_1,
  [BASE_ITEMS_ID.DLV10_TIER_2]: dvl_2,
  [BASE_ITEMS_ID.DLV10_TIER_3]: dvl_3,

  [BASE_ITEMS_ID.AXMC_TIER_1]: axmc_1,
  [BASE_ITEMS_ID.AXMC_TIER_2]: axmc_2,
  [BASE_ITEMS_ID.AXMC_TIER_3]: axmc_3,

  [BASE_ITEMS_ID.MP155_TIER_1]: mp155_1,
  [BASE_ITEMS_ID.MP155_TIER_2]: mp155_2,
  [BASE_ITEMS_ID.MP155_TIER_3]: mp155_3,

  [BASE_ITEMS_ID.REMINGTON_870_TIER_1]: m870_1,
  [BASE_ITEMS_ID.REMINGTON_870_TIER_2]: m870_2,
  [BASE_ITEMS_ID.REMINGTON_870_TIER_3]: m870_3,

  [BASE_ITEMS_ID.SAIGA_TIER_1]: saiga_1,
  [BASE_ITEMS_ID.SAIGA_TIER_2]: saiga_2,
  [BASE_ITEMS_ID.SAIGA_TIER_3]: saiga_3,

  [BASE_ITEMS_ID.AA12_TIER_1]: aa12,

  [BASE_ITEMS_ID.AK_12_TIER_1]: ak12_1,
  [BASE_ITEMS_ID.AK_12_TIER_2]: ak12_2,
  [BASE_ITEMS_ID.AK_12_TIER_3]: ak12_3,

  [BASE_ITEMS_ID.M4A1_TIER_1]: m4_1,
  [BASE_ITEMS_ID.M4A1_TIER_2]: m4_2,
  [BASE_ITEMS_ID.M4A1_TIER_3]: m4_3,

  [BASE_ITEMS_ID.SA58_TIER_1]: sa58_1,
  [BASE_ITEMS_ID.SA58_TIER_2]: sa58_2,
  [BASE_ITEMS_ID.SA58_TIER_3]: sa58_3,

  [BASE_ITEMS_ID.SWORD_MK18_TIER_1]: mk18,

  [BASE_ITEMS_ID.MP5SD_TIER_1]: mp_1,
  [BASE_ITEMS_ID.MP5SD_TIER_2]: mp_2,
  [BASE_ITEMS_ID.MP5SD_TIER_3]: mp_3,

  [BASE_ITEMS_ID.FN_P90S_TIER_1]: p90_1,
  [BASE_ITEMS_ID.FN_P90S_TIER_2]: p90_2,
  [BASE_ITEMS_ID.FN_P90S_TIER_3]: p90_3,

  [BASE_ITEMS_ID.KRISS_VECTOR_TIER_1]: vector_1,
  [BASE_ITEMS_ID.KRISS_VECTOR_TIER_2]: vector_2,
  [BASE_ITEMS_ID.KRISS_VECTOR_TIER_3]: vector_3,

  [BASE_ITEMS_ID.VERESK_TIER_1]: veresk,

  [BASE_ITEMS_ID.GLOCK_17_TIER_1]: glock_1,
  [BASE_ITEMS_ID.GLOCK_17_TIER_2]: glock_2,
  [BASE_ITEMS_ID.GLOCK_17_TIER_3]: glock_3,

  [BASE_ITEMS_ID.FN_57_TIER_1]: fn57_1,
  [BASE_ITEMS_ID.FN_57_TIER_2]: fn57_2,
  [BASE_ITEMS_ID.FN_57_TIER_3]: fn57_3,

  [BASE_ITEMS_ID.DESERT_EAGLE_TIER_1]: deagle_1,
  [BASE_ITEMS_ID.DESERT_EAGLE_TIER_2]: deagle_2,
  [BASE_ITEMS_ID.DESERT_EAGLE_TIER_3]: deagle_3,

  [BASE_ITEMS_ID.RPD_TIER_1]: rpd_1,
  [BASE_ITEMS_ID.RPD_TIER_2]: rpd_2,
  [BASE_ITEMS_ID.RPD_TIER_3]: rpd_3,

  [BASE_ITEMS_ID.M60_TIER_1]: m60_1,
  [BASE_ITEMS_ID.M60_TIER_2]: m60_2,
  [BASE_ITEMS_ID.M60_TIER_3]: m60_3,

  [BASE_ITEMS_ID.PKM_TIER_1]: pkm_1,
  [BASE_ITEMS_ID.PKM_TIER_2]: pkm_2,
  [BASE_ITEMS_ID.PKM_TIER_3]: pkm_3,
};

// !!! СНАЙПЕРКИ
export const SV98_TIER_1: Omit<Item, "gearId"> = {
  name: "SV-98",
  gunType: GUN_TYPES.SNIPER_RIFLE,
  type: GEAR_SLOTS.WEAPON,
  description:
    "СВ-98 - болтовая снайперская винтовка калибра 7,62×54 мм R. Предназначена для высокоточной стрельбы на дальние дистанции.",
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
  description:
    "СВ-98 - болтовая снайперская винтовка калибра 7,62×54 мм R. Предназначена для высокоточной стрельбы на дальние дистанции.",
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
  description:
    "СВ-98 - болтовая снайперская винтовка калибра 7,62×54 мм R. Предназначена для высокоточной стрельбы на дальние дистанции.",
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
  description:
    "ДВЛ-10 - высокоточная болтовая снайперская винтовка. Использует патроны .308 Winchester, предназначена для тихой и точной стрельбы на средних и дальних дистанциях.",
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
  description:
    "ДВЛ-10 - высокоточная болтовая снайперская винтовка. Использует патроны .308 Winchester, предназначена для тихой и точной стрельбы на средних и дальних дистанциях.",
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
  description:
    "ДВЛ-10 - высокоточная болтовая снайперская винтовка. Использует патроны .308 Winchester, предназначена для тихой и точной стрельбы на средних и дальних дистанциях.",
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
  description:
    "AXMC — британская модульная болтовая снайперская винтовка, предназначенная для высокоточной стрельбы на дальние дистанции.",
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
  description:
    "AXMC — британская модульная болтовая снайперская винтовка, предназначенная для высокоточной стрельбы на дальние дистанции.",
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
  description:
    "AXMC — британская модульная болтовая снайперская винтовка, предназначенная для высокоточной стрельбы на дальние дистанции.",
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
  description:
    "МР-155 - полуавтоматический гладкоствольный дробовик, предназначенный для охоты и спортивной стрельбы. Работает на газоотводной автоматике и выпускается в 12-м калибре",
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
  description:
    "МР-155 - полуавтоматический гладкоствольный дробовик, предназначенный для охоты и спортивной стрельбы. Работает на газоотводной автоматике и выпускается в 12-м калибре",
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
  description:
    "МР-155 - полуавтоматический гладкоствольный дробовик, предназначенный для охоты и спортивной стрельбы. Работает на газоотводной автоматике и выпускается в 12-м калибре",
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
  description:
    "Remington 870 - американский помповый гладкоствольный дробовик. Известен высокой надёжностью и широко используется для охоты, самообороны и в правоохранительных структурах.",
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
  description:
    "Remington 870 - американский помповый гладкоствольный дробовик. Известен высокой надёжностью и широко используется для охоты, самообороны и в правоохранительных структурах.",
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
  description:
    "Remington 870 - американский помповый гладкоствольный дробовик. Известен высокой надёжностью и широко используется для охоты, самообороны и в правоохранительных структурах.",
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
  description:
    "Сайга‑12 - полуавтоматический гладкоствольный дробовик на базе автомата АК‑47. Использует коробчатые магазины и предназначен для охоты, спортивной стрельбы и тактического применения.",
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
  description:
    "Сайга‑12 - полуавтоматический гладкоствольный дробовик на базе автомата АК‑47. Использует коробчатые магазины и предназначен для охоты, спортивной стрельбы и тактического применения.",
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
  description:
    "Сайга‑12 - полуавтоматический гладкоствольный дробовик на базе автомата АК‑47. Использует коробчатые магазины и предназначен для охоты, спортивной стрельбы и тактического применения.",
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
  description:
    "AA-12 - американский полностью автоматический гладкоствольный дробовик. Использует магазины или барабаны на 12-й калибр и известен очень низкой отдачей благодаря специальной системе автоматики.",
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
  name: "АК-12",
  description:
    "АК-12 - современный автомат калибра 5,45×39 мм. Отличается улучшенной эргономикой, планками для прицелов и повышенной точностью стрельбы.",
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
  name: "АК-12 MKII",
  description:
    "АК-12 - современный автомат калибра 5,45×39 мм. Отличается улучшенной эргономикой, планками для прицелов и повышенной точностью стрельбы.",
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
  name: "АК-12 MKIII",
  description:
    "АК-12 - современный автомат калибра 5,45×39 мм. Отличается улучшенной эргономикой, планками для прицелов и повышенной точностью стрельбы.",
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
  description:
    "M4A1 - американский автоматический карабин калибра 5,56×45 мм. Широко используется благодаря компактности, модульности и высокой скорострельности.",
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
  description:
    "M4A1 - американский автоматический карабин калибра 5,56×45 мм. Широко используется благодаря компактности, модульности и высокой скорострельности.",
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
  description:
    "M4A1 - американский автоматический карабин калибра 5,56×45 мм. Широко используется благодаря компактности, модульности и высокой скорострельности.",
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
  description:
    "SA‑58 — современная модификация винтовки VZ.58. Использует патрон 7,62×39 мм и отличается модернизированной эргономикой, планками для прицелов и возможностью установки различных аксессуаров.",
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
  description:
    "SA‑58 — современная модификация винтовки VZ.58. Использует патрон 7,62×39 мм и отличается модернизированной эргономикой, планками для прицелов и возможностью установки различных аксессуаров.",
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
  description:
    "SA‑58 — современная модификация винтовки VZ.58. Использует патрон 7,62×39 мм и отличается модернизированной эргономикой, планками для прицелов и возможностью установки различных аксессуаров.",
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
  description:
    "SWORD MK‑18 Mjölnir — американская полуавтоматическая крупнокалиберная винтовка под патрон .50 BMG. Предназначена для дальнобойной высокоточной стрельбы и поражения техники или целей на больших дистанциях.",
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
  description:
    "HK MP5SD — версия пистолета‑пулемёта Heckler & Koch MP5 со встроенным глушителем. Использует патрон 9×19 мм и предназначена для скрытных операций благодаря значительно сниженной громкости выстрела.",
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
  description:
    "HK MP5SD — версия пистолета‑пулемёта Heckler & Koch MP5 со встроенным глушителем. Использует патрон 9×19 мм и предназначена для скрытных операций благодаря значительно сниженной громкости выстрела.",
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
  description:
    "HK MP5SD — версия пистолета‑пулемёта Heckler & Koch MP5 со встроенным глушителем. Использует патрон 9×19 мм и предназначена для скрытных операций благодаря значительно сниженной громкости выстрела.",
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
  description:
    "FN P90 — компактный бельгийский пистолет‑пулемёт компании FN Herstal, разработанный под патрон 5,7×28 мм. Отличается верхним горизонтальным магазином на 50 патронов и буллпап‑конструкцией, предназначенной для компактности и высокой скорострельности.",
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
  description:
    "FN P90 — компактный бельгийский пистолет‑пулемёт компании FN Herstal, разработанный под патрон 5,7×28 мм. Отличается верхним горизонтальным магазином на 50 патронов и буллпап‑конструкцией, предназначенной для компактности и высокой скорострельности.",
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
  description:
    "FN P90 — компактный бельгийский пистолет‑пулемёт компании FN Herstal, разработанный под патрон 5,7×28 мм. Отличается верхним горизонтальным магазином на 50 патронов и буллпап‑конструкцией, предназначенной для компактности и высокой скорострельности.",
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
  description:
    "KRISS Vector — американский пистолет‑пулемёт компании KRISS, известный системой снижения отдачи Super V. Чаще всего использует патрон .45 ACP и отличается высокой скорострельностью и хорошей управляемостью при стрельбе.",
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
  description:
    "KRISS Vector — американский пистолет‑пулемёт компании KRISS, известный системой снижения отдачи Super V. Чаще всего использует патрон .45 ACP и отличается высокой скорострельностью и хорошей управляемостью при стрельбе.",
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
  description:
    "KRISS Vector — американский пистолет‑пулемёт компании KRISS, известный системой снижения отдачи Super V. Чаще всего использует патрон .45 ACP и отличается высокой скорострельностью и хорошей управляемостью при стрельбе.",
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
  description:
    "СР‑2 «Вереск» - компактный пистолет-пулемёт под патрон 9×21 мм. Предназначен для спецподразделений и способен эффективно поражать цели в бронежилетах на ближних дистанциях.",
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
  description:
    "Glock 17 — австрийский самозарядный пистолет калибра 9×19 мм. Известен простотой конструкции, надёжностью и широко используется военными, полицией и гражданскими по всему миру.",
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
  description:
    "Glock 17 — австрийский самозарядный пистолет калибра 9×19 мм. Известен простотой конструкции, надёжностью и широко используется военными, полицией и гражданскими по всему миру.",
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
  description:
    "Glock 17 — австрийский самозарядный пистолет калибра 9×19 мм. Известен простотой конструкции, надёжностью и широко используется военными, полицией и гражданскими по всему миру.",
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
  description:
    "FN Five‑seveN — самозарядный пистолет разработанный под патрон 5,7×28 мм. Отличается высокой начальной скоростью пули, малой отдачей и используется военными и правоохранительными структурами.",
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
  description:
    "FN Five‑seveN — самозарядный пистолет разработанный под патрон 5,7×28 мм. Отличается высокой начальной скоростью пули, малой отдачей и используется военными и правоохранительными структурами.",
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
  description:
    "FN Five‑seveN — самозарядный пистолет разработанный под патрон 5,7×28 мм. Отличается высокой начальной скоростью пули, малой отдачей и используется военными и правоохранительными структурами.",
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
  description:
    "Desert Eagle — мощный самозарядный пистолет. Известен использованием мощных патронов, таких как .50 Action Express, и характерными крупными размерами.",
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
  description:
    "Desert Eagle — мощный самозарядный пистолет. Известен использованием мощных патронов, таких как .50 Action Express, и характерными крупными размерами.",
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
  description:
    "Desert Eagle — мощный самозарядный пистолет. Известен использованием мощных патронов, таких как .50 Action Express, и характерными крупными размерами.",
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
  description:
    "РПД — советский ручной пулемёт под патрон 7,62×39 мм. Использует ленточное питание и предназначен для огневой поддержки пехоты.",
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
  description:
    "РПД — советский ручной пулемёт под патрон 7,62×39 мм. Использует ленточное питание и предназначен для огневой поддержки пехоты.",
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
  description:
    "РПД — советский ручной пулемёт под патрон 7,62×39 мм. Использует ленточное питание и предназначен для огневой поддержки пехоты.",
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
  description:
    "M60 machine gun — американский единый пулемёт калибра 7,62×51 мм. Использует ленточное питание и предназначен для огневой поддержки пехоты.",
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
  description:
    "M60 machine gun — американский единый пулемёт калибра 7,62×51 мм. Использует ленточное питание и предназначен для огневой поддержки пехоты.",
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
  description:
    "M60 machine gun — американский единый пулемёт калибра 7,62×51 мм. Использует ленточное питание и предназначен для огневой поддержки пехоты.",
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
  description:
    "ПКМ — модернизированная версия пулемёта ПК (пулемёт Калашникова) под патрон 7,62×54 мм R. Отличается высокой надёжностью, ленточным питанием и широко используется для огневой поддержки пехоты.",
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
  description:
    "ПКМ — модернизированная версия пулемёта ПК (пулемёт Калашникова) под патрон 7,62×54 мм R. Отличается высокой надёжностью, ленточным питанием и широко используется для огневой поддержки пехоты.",
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
  description:
    "ПКМ — модернизированная версия пулемёта ПК (пулемёт Калашникова) под патрон 7,62×54 мм R. Отличается высокой надёжностью, ленточным питанием и широко используется для огневой поддержки пехоты.",
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
