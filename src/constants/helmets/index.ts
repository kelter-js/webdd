import { BASE_ITEMS_ID } from "../items";
import { GEAR_SLOTS } from "../../entities/gear";

// СИЛЬНЫЙ
export const GALVION_TIER_1 = {
  name: "Galvion Caiman",
  description:
    "Galvion Caiman Hybrid Helmet - модульный шлем с углепластиковой оболочкой, сочетающий лёгкость «bump»-шлема и возможность установки баллистических накладок. Предназначен для спецподразделений и обеспечивает масштабируемую защиту.",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 4,
  baseId: BASE_ITEMS_ID.GALVION_TIER_1,
  overAllTier: 1,
  price: 200,
};

export const GALVION_TIER_2 = {
  name: "Galvion Caiman",
  description:
    "Galvion Caiman Hybrid Helmet - модульный шлем с углепластиковой оболочкой, сочетающий лёгкость «bump»-шлема и возможность установки баллистических накладок. Предназначен для спецподразделений и обеспечивает масштабируемую защиту.",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 6,
  baseId: BASE_ITEMS_ID.GALVION_TIER_2,
  price: 500,
  overAllTier: 1,
};

export const GALVION_TIER_3 = {
  name: "Galvion Caiman",
  description:
    "Galvion Caiman Hybrid Helmet - модульный шлем с углепластиковой оболочкой, сочетающий лёгкость «bump»-шлема и возможность установки баллистических накладок. Предназначен для спецподразделений и обеспечивает масштабируемую защиту.",
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
  name: "NFM HJELM Helmet",
  description:
    "NFM HJELM Helmet - модульный боевой шлем, выполненный в цвете Hellhound Grey. Обеспечивает баллистическую и противоосколочную защиту при малом весе, поддерживает установку оборудования (NVG, аксессуары) и отличается высокой эргономикой и системой распределения нагрузки.",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 3,
  baseId: BASE_ITEMS_ID.HJELM_TIER_1,
  price: 200,
  overAllTier: 1,
};

export const HJELM_TIER_2 = {
  name: "NFM HJELM Helmet",
  description:
    "NFM HJELM Helmet - модульный боевой шлем, выполненный в цвете Hellhound Grey. Обеспечивает баллистическую и противоосколочную защиту при малом весе, поддерживает установку оборудования (NVG, аксессуары) и отличается высокой эргономикой и системой распределения нагрузки.",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 5,
  baseId: BASE_ITEMS_ID.HJELM_TIER_2,
  price: 500,
  overAllTier: 1,
};

export const HJELM_TIER_3 = {
  name: "NFM HJELM Helmet",
  description:
    "NFM HJELM Helmet - модульный боевой шлем, выполненный в цвете Hellhound Grey. Обеспечивает баллистическую и противоосколочную защиту при малом весе, поддерживает установку оборудования (NVG, аксессуары) и отличается высокой эргономикой и системой распределения нагрузки.",
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
  name: "Алтын",
  description:
    "Алтын - тяжёлый бронешлем, разработанный в СССР и применяемый спецподразделениями КГБ/ФСБ. Оснащён титановым корпусом и бронированным забралом, обеспечивает высокую защиту от пистолетных пуль и осколков.",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 7,
  baseId: BASE_ITEMS_ID.ALTYN_TIER_1,
  price: 800,
  overAllTier: 2,
};

export const ALTYN_TIER_2 = {
  name: "Алтын",
  description:
    "Алтын - тяжёлый бронешлем, разработанный в СССР и применяемый спецподразделениями КГБ/ФСБ. Оснащён титановым корпусом и бронированным забралом, обеспечивает высокую защиту от пистолетных пуль и осколков.",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 9,
  baseId: BASE_ITEMS_ID.ALTYN_TIER_2,
  price: 1200,
  overAllTier: 2,
};

export const ALTYN_TIER_3 = {
  name: "Алтын",
  description:
    "Алтын - тяжёлый бронешлем, разработанный в СССР и применяемый спецподразделениями КГБ/ФСБ. Оснащён титановым корпусом и бронированным забралом, обеспечивает высокую защиту от пистолетных пуль и осколков.",
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
  name: "Маска-1щ",
  description:
    "Маска-1щ - тяжёлый стальной бронешлем, разработанный в 1990-е годы для спецподразделений МВД России. Оснащён цельнометаллическим пулестойким забралом и обеспечивает высокую защиту головы и лица от пистолетных пуль и осколков, но отличается большим весом и ограниченным обзором",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 6,
  baseId: BASE_ITEMS_ID.MASKA_TIER_1,
  price: 700,
  overAllTier: 2,
};

export const MASKA_TIER_2 = {
  name: "Маска-1щ",
  description:
    "Маска-1щ - тяжёлый стальной бронешлем, разработанный в 1990-е годы для спецподразделений МВД России. Оснащён цельнометаллическим пулестойким забралом и обеспечивает высокую защиту головы и лица от пистолетных пуль и осколков, но отличается большим весом и ограниченным обзором",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 8,
  baseId: BASE_ITEMS_ID.MASKA_TIER_2,
  price: 1300,
  overAllTier: 2,
};

export const MASKA_TIER_3 = {
  name: "Маска-1щ",
  description:
    "Маска-1щ - тяжёлый стальной бронешлем, разработанный в 1990-е годы для спецподразделений МВД России. Оснащён цельнометаллическим пулестойким забралом и обеспечивает высокую защиту головы и лица от пистолетных пуль и осколков, но отличается большим весом и ограниченным обзором",
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
  name: "DevTac Ronin",
  description:
    "DevTac Ronin - высокотехнологичный полноразмерный баллистический шлем японской компании Devtac, обеспечивающий защиту головы и лица до уровня NIJ IIIA. Отличается модульной конструкцией с полной маской, системой вентиляции/антизапотевания и совместимостью с NVG и средствами связи, ориентирован на штурмовые и CQB-задачи.",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 10,
  baseId: BASE_ITEMS_ID.RONIN_HELMET_TIER_1,
  price: 1500,
  overAllTier: 3,
};

export const RONIN_HELMET_TIER_2 = {
  name: "DevTac Ronin",
  description:
    "DevTac Ronin - высокотехнологичный полноразмерный баллистический шлем, обеспечивающий защиту головы и лица до уровня NIJ IIIA. Отличается модульной конструкцией с полной маской, системой вентиляции/антизапотевания и совместимостью с NVG и средствами связи, ориентирован на штурмовые и CQB-задачи.",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 13,
  baseId: BASE_ITEMS_ID.RONIN_HELMET_TIER_2,
  price: 2000,
  overAllTier: 3,
};

export const RONIN_HELMET_TIER_3 = {
  name: "DevTac Ronin",
  description:
    "DevTac Ronin - высокотехнологичный полноразмерный баллистический шлем, обеспечивающий защиту головы и лица до уровня NIJ IIIA. Отличается модульной конструкцией с полной маской, системой вентиляции/антизапотевания и совместимостью с NVG и средствами связи, ориентирован на штурмовые и CQB-задачи.",
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
  name: "DevTac Ronin Respirator",
  description:
    "DevTac Ronin Respirator - модификация шлема Ronin с интегрированной системой респиратора. Обеспечивает защиту уровня NIJ IIIA с покрытием до ~80% головы и лица, поддерживает использование полумаски с фильтрами, оснащён съёмными бронеплитами и активной вентиляцией/антизапотеванием визора",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 1,
  value: 9,
  baseId: BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_1,
  price: 1400,
  overAllTier: 3,
};

export const RONIN_RESPIRATOR_TIER_2 = {
  name: "DevTac Ronin Respirator",
  description:
    "DevTac Ronin Respirator - модификация шлема Ronin с интегрированной системой респиратора. Обеспечивает защиту уровня NIJ IIIA с покрытием до ~80% головы и лица, поддерживает использование полумаски с фильтрами, оснащён съёмными бронеплитами и активной вентиляцией/антизапотеванием визора",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 2,
  value: 12,
  baseId: BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_2,
  price: 1400,
  overAllTier: 3,
};

export const RONIN_RESPIRATOR_TIER_3 = {
  name: "DevTac Ronin Respirator",
  description:
    "DevTac Ronin Respirator - модификация шлема Ronin с интегрированной системой респиратора. Обеспечивает защиту уровня NIJ IIIA с покрытием до ~80% головы и лица, поддерживает использование полумаски с фильтрами, оснащён съёмными бронеплитами и активной вентиляцией/антизапотеванием визора",
  iconSrc: "",
  type: GEAR_SLOTS.HELMET,
  tier: 3,
  value: 17, // слабый T3 > сильный T3
  baseId: BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_3,
  price: 3500,
  overAllTier: 3,
};

export const CQCM_DEFENSE_ATOMIC_TIER_1 = {
  name: "Atomic Defense CQCM ballistic mask",
  description:
    "Atomic Defense CQCM ballistic mask - полноразмерная баллистическая маска, обеспечивающая защиту лица уровня NIJ IIIA+. Закрывает всё лицо и выдерживает попадания пистолетных патронов и дроби, сочетая защиту с вентиляцией и системой амортизации удара.",
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
