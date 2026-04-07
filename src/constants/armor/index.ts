import { GEAR_SLOTS } from "../../entities/gear";
import { BASE_ITEMS_ID } from "../items";

import bnti1 from "../../assets/gear/armor/bnti (1).png";
import bnti2 from "../../assets/gear/armor/bnti (2).png";
import bnti3 from "../../assets/gear/armor/bnti (3).png";

import npp1 from "../../assets/gear/armor/npp (1).png";
import npp2 from "../../assets/gear/armor/npp (2).png";
import npp3 from "../../assets/gear/armor/npp (3).png";

import iotv1 from "../../assets/gear/armor/iotv (1).png";
import iotv2 from "../../assets/gear/armor/iotv (2).png";
import iotv3 from "../../assets/gear/armor/iotv (3).png";

import fort1 from "../../assets/gear/armor/fort (1).png";
import fort2 from "../../assets/gear/armor/fort (2).png";
import fort3 from "../../assets/gear/armor/fort (3).png";

import nfm1 from "../../assets/gear/armor/nfm (1).png";
import nfm2 from "../../assets/gear/armor/nfm (2).png";
import nfm3 from "../../assets/gear/armor/nfm (3).png";

import redut1 from "../../assets/gear/armor/redut (1).png";
import redut2 from "../../assets/gear/armor/redut (2).png";
import redut3 from "../../assets/gear/armor/redut (3).png";

import osrpey from "../../assets/gear/armor/osrpey.png";

export const ARMOR_ICON_SOURCES = {
  [BASE_ITEMS_ID.BNTI_TIER_1]: bnti1,
  [BASE_ITEMS_ID.BNTI_TIER_2]: bnti2,
  [BASE_ITEMS_ID.BNTI_TIER_3]: bnti3,

  [BASE_ITEMS_ID.NPP_TIER_1]: npp1,
  [BASE_ITEMS_ID.NPP_TIER_2]: npp2,
  [BASE_ITEMS_ID.NPP_TIER_3]: npp3,

  [BASE_ITEMS_ID.IOTV_TIER_1]: iotv1,
  [BASE_ITEMS_ID.IOTV_TIER_2]: iotv2,
  [BASE_ITEMS_ID.IOTV_TIER_3]: iotv3,

  [BASE_ITEMS_ID.FORT_TIER_1]: fort1,
  [BASE_ITEMS_ID.FORT_TIER_2]: fort2,
  [BASE_ITEMS_ID.FORT_TIER_3]: fort3,

  [BASE_ITEMS_ID.NFM_TIER_1]: nfm1,
  [BASE_ITEMS_ID.NFM_TIER_2]: nfm2,
  [BASE_ITEMS_ID.NFM_TIER_3]: nfm3,

  [BASE_ITEMS_ID.REDUT_TIER_1]: redut1,
  [BASE_ITEMS_ID.REDUT_TIER_2]: redut2,
  [BASE_ITEMS_ID.REDUT_TIER_3]: redut3,

  [BASE_ITEMS_ID.OSPREY_TIER_1]: osrpey,
};

console.log("BASE_ITEMS_ID", BASE_ITEMS_ID);

export const BNTI_TIER_1 = {
  name: "БНТИ",
  description:
    "БНТИ «Жук» - бронежилет выполненный в камуфляже EMR. Предназначен для защиты от пуль и осколков, а также оснащается модульной системой креплений для размещения снаряжения.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 1,
  value: 10,
  baseId: BASE_ITEMS_ID.BNTI_TIER_1,
  overAllTier: 1,
  price: 200,
};

export const BNTI_TIER_2 = {
  name: "БНТИ",
  description:
    "БНТИ «Жук» - бронежилет выполненный в камуфляже EMR. Предназначен для защиты от пуль и осколков, а также оснащается модульной системой креплений для размещения снаряжения.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 2,
  value: 13,
  baseId: BASE_ITEMS_ID.BNTI_TIER_2,
  price: 500,
  overAllTier: 1,
};

export const BNTI_TIER_3 = {
  name: "БНТИ",
  description:
    "БНТИ «Жук» - бронежилет выполненный в камуфляже EMR. Предназначен для защиты от пуль и осколков, а также оснащается модульной системой креплений для размещения снаряжения.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 3,
  value: 15,
  baseId: BASE_ITEMS_ID.BNTI_TIER_3,
  price: 1000,
  overAllTier: 1,
};

export const NPP_TIER_1 = {
  name: "NPP",
  description:
    "бронежилеты НПП «Корунд» - линейка бронежилетов НПП. Предназначены для защиты от пуль и осколков, отличаются различными классами защиты и модульной конструкцией для размещения снаряжения.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 1,
  value: 7,
  baseId: BASE_ITEMS_ID.NPP_TIER_1,
  price: 200,
  overAllTier: 1,
};

export const NPP_TIER_2 = {
  name: "NPP",
  description:
    "бронежилеты НПП «Корунд» - линейка бронежилетов НПП. Предназначены для защиты от пуль и осколков, отличаются различными классами защиты и модульной конструкцией для размещения снаряжения.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 2,
  value: 10,
  baseId: BASE_ITEMS_ID.NPP_TIER_2,
  price: 500,
  overAllTier: 1,
};

export const NPP_TIER_3 = {
  name: "NPP",
  description:
    "бронежилеты НПП «Корунд» - линейка бронежилетов НПП. Предназначены для защиты от пуль и осколков, отличаются различными классами защиты и модульной конструкцией для размещения снаряжения.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 3,
  value: 17,
  baseId: BASE_ITEMS_ID.NPP_TIER_3,
  price: 1200,
  overAllTier: 1,
};

export const IOTV_TIER_1 = {
  name: "IOTV",
  description:
    "IOTV Gen 4 - модульный армейский бронежилет системы Improved Outer Tactical Vest, обеспечивающий защиту с использованием плит ESAPI и мягкой брони. Отличается развитой системой MOLLE и рассчитан на баланс защиты и подвижности.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 1,
  value: 13,
  baseId: BASE_ITEMS_ID.IOTV_TIER_1,
  price: 800,
  overAllTier: 2,
};

export const IOTV_TIER_2 = {
  name: "IOTV",
  description:
    "IOTV Gen 4 - модульный армейский бронежилет системы Improved Outer Tactical Vest, обеспечивающий защиту с использованием плит ESAPI и мягкой брони. Отличается развитой системой MOLLE и рассчитан на баланс защиты и подвижности.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 2,
  value: 16,
  baseId: BASE_ITEMS_ID.IOTV_TIER_2,
  price: 1200,
  overAllTier: 2,
};

export const IOTV_TIER_3 = {
  name: "IOTV",
  description:
    "IOTV Gen 4 - модульный армейский бронежилет системы Improved Outer Tactical Vest, обеспечивающий защиту с использованием плит ESAPI и мягкой брони. Отличается развитой системой MOLLE и рассчитан на баланс защиты и подвижности.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 3,
  value: 19,
  baseId: BASE_ITEMS_ID.IOTV_TIER_3,
  price: 1800,
  overAllTier: 2,
};

export const FORT_TIER_1 = {
  name: "FORT",
  description:
    "Форт «Редут-Т5» - бронежилет предназначенный для защиты от пуль и осколков. Оснащён модульной системой креплений и рассчитан на использование с бронеплитами различных классов защиты.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 1,
  value: 10,
  baseId: BASE_ITEMS_ID.FORT_TIER_1,
  price: 700,
  overAllTier: 2,
};

export const FORT_TIER_2 = {
  name: "FORT",
  description:
    "Форт «Редут-Т5» - бронежилет предназначенный для защиты от пуль и осколков. Оснащён модульной системой креплений и рассчитан на использование с бронеплитами различных классов защиты.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 2,
  value: 15,
  baseId: BASE_ITEMS_ID.FORT_TIER_2,
  price: 1300,
  overAllTier: 2,
};

export const FORT_TIER_3 = {
  name: "FORT",
  description:
    "Форт «Редут-Т5» - бронежилет предназначенный для защиты от пуль и осколков. Оснащён модульной системой креплений и рассчитан на использование с бронеплитами различных классов защиты.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 3,
  value: 21,
  baseId: BASE_ITEMS_ID.FORT_TIER_3,
  price: 2500,
  overAllTier: 2,
};

export const NFM_TIER_1 = {
  name: "NFM",
  description:
    "NFM THOR Integrated Carrier - модульный бронежилет/плитник. Предназначен для размещения баллистических плит и снаряжения, сочетает защиту, эргономику и высокую подвижность благодаря интегрированной системе распределения нагрузки.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 1,
  value: 16,
  baseId: BASE_ITEMS_ID.NFM_TIER_1,
  price: 1500,
  overAllTier: 3,
};

export const NFM_TIER_2 = {
  name: "NFM",
  description:
    "NFM THOR Integrated Carrier - модульный бронежилет/плитник. Предназначен для размещения баллистических плит и снаряжения, сочетает защиту, эргономику и высокую подвижность благодаря интегрированной системе распределения нагрузки.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 2,
  value: 20,
  baseId: BASE_ITEMS_ID.NFM_TIER_2,
  price: 2000,
  overAllTier: 3,
};

export const NFM_TIER_3 = {
  name: "NFM",
  description:
    "NFM THOR Integrated Carrier - модульный бронежилет/плитник. Предназначен для размещения баллистических плит и снаряжения, сочетает защиту, эргономику и высокую подвижность благодаря интегрированной системе распределения нагрузки.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 3,
  value: 25,
  baseId: BASE_ITEMS_ID.NFM_TIER_3,
  price: 2000,
  overAllTier: 3,
};

export const REDUT_TIER_1 = {
  name: "REDUT",
  description:
    "6Б43 — штатный армейский бронежилет повышенного уровня защиты. Оснащается бронеплитами и дополнительными модулями.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 1,
  value: 14,
  baseId: BASE_ITEMS_ID.REDUT_TIER_1,
  price: 1400,
  overAllTier: 3,
};

export const REDUT_TIER_2 = {
  name: "REDUT",
  description:
    "6Б43 — штатный армейский бронежилет повышенного уровня защиты. Оснащается бронеплитами и дополнительными модулями.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 2,
  value: 19,
  baseId: BASE_ITEMS_ID.REDUT_TIER_2,
  price: 1400,
  overAllTier: 3,
};

export const REDUT_TIER_3 = {
  name: "REDUT",
  description:
    "6Б43 — штатный армейский бронежилет повышенного уровня защиты. Оснащается бронеплитами и дополнительными модулями.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 3,
  value: 28,
  baseId: BASE_ITEMS_ID.REDUT_TIER_3,
  price: 3500,
  overAllTier: 3,
};

export const OSPREY_TIER_1 = {
  name: "Osprey",
  description:
    "Osprey Mk4A — модульный бронежилет вооружённых сил, предназначенный для защиты от пуль и осколков с использованием керамических плит. Версия CQC ориентирована на ближний бой и отличается улучшенной подвижностью и возможностью крепления снаряжения через систему MOLLE.",
  iconSrc: "",
  type: GEAR_SLOTS.ARMOR,
  tier: 3,
  value: 35,
  baseId: BASE_ITEMS_ID.OSPREY_TIER_1,
  price: 30000,
  overAllTier: 3,
};

export const ARMORS_TIER_1 = [BNTI_TIER_1, NPP_TIER_1];
export const ARMORS_TIER_2 = [IOTV_TIER_1, FORT_TIER_1];
export const ARMORS_TIER_3 = [NFM_TIER_1, REDUT_TIER_1];

export const RARE_ARMORS_TIER_1 = [BNTI_TIER_2, NPP_TIER_2];
export const RARE_ARMORS_TIER_2 = [IOTV_TIER_2, FORT_TIER_2];
export const RARE_ARMORS_TIER_3 = [NFM_TIER_2, REDUT_TIER_2];

export const SUPER_RARE_ARMORS_TIER_1 = [BNTI_TIER_3, NPP_TIER_3];
export const SUPER_RARE_ARMORS_TIER_2 = [IOTV_TIER_3, FORT_TIER_3];
export const SUPER_RARE_ARMORS_TIER_3 = [NFM_TIER_3, REDUT_TIER_3];
