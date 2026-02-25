import { GEAR_SLOTS } from "../../entities/gear";
import { EFFECT_TYPES } from "../../types/gameState";
import { BASE_ITEMS_ID } from "../items";

// артефакт увеличивающий хп - PHOTO
// артефакт увеличивающий урон - soul
// артефакт увеличивающий защиту - руда

// артефакт со спешиал энкаунтера даёт и урон и хп и защиту но немного
// ещё один артефакт легендарный будет давать перк отхила c атаки

export const HEALTH_ORB_TIER_1 = {
  name: "Кристалл здоровья",
  description:
    "Странно пульсирующая сфера, если носить на поясе даёт ощущение тепла, растекающегося по телу. Даёт + 15% к базовому здоровью",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 1,
  value: 15,
  baseId: BASE_ITEMS_ID.HEALTH_ORB_TIER_1,
  price: 2000,
  overAllTier: 1,
  effectType: EFFECT_TYPES.HEALTH,
};

export const HEALTH_ORB_TIER_2 = {
  name: "Кристалл здоровья MKII",
  description:
    "Странно пульсирующая сфера, если носить на поясе даёт ощущение тепла, растекающегося по телу. Даёт + 20% к базовому здоровью",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 2,
  value: 20,
  baseId: BASE_ITEMS_ID.HEALTH_ORB_TIER_2,
  price: 2000,
  overAllTier: 1,
  effectType: EFFECT_TYPES.HEALTH,
};

export const HEALTH_ORB_TIER_3 = {
  name: "Кристалл здоровья MKIII",
  description:
    "Странно пульсирующая сфера, если носить на поясе даёт ощущение тепла, растекающегося по телу. Даёт + 25% к базовому здоровью",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 3,
  value: 25,
  baseId: BASE_ITEMS_ID.HEALTH_ORB_TIER_3,
  price: 2000,
  overAllTier: 1,
  effectType: EFFECT_TYPES.HEALTH,
};

export const BULLET_NECKLACE_TIER_1 = {
  name: "Ожерелье из патронов",
  description:
    "Аккуратно просверленный ряд патронов, в отверстия всталена проволка, вероятно для ношения на шее. После экипировки появляется ощущение, что весь мир у ваших ног. Даёт +5% к наносимому урону",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 1,
  value: 5,
  baseId: BASE_ITEMS_ID.HEALTH_ORB_TIER_1,
  price: 2000,
  overAllTier: 1,
  effectType: EFFECT_TYPES.ATTACK,
};

export const BULLET_NECKLACE_TIER_2 = {
  name: "Ожерелье из патронов",
  description:
    "Аккуратно просверленный ряд патронов, в отверстия всталена проволка, вероятно для ношения на шее. После экипировки появляется ощущение, что весь мир у ваших ног. Даёт +5% к наносимому урону",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 2,
  value: 10,
  baseId: BASE_ITEMS_ID.BULLET_NECKLACE_TIER_2,
  price: 2000,
  overAllTier: 1,
  effectType: EFFECT_TYPES.ATTACK,
};

export const BULLET_NECKLACE_TIER_3 = {
  name: "Ожерелье из патронов",
  description:
    "Аккуратно просверленный ряд патронов, в отверстия всталена проволка, вероятно для ношения на шее. После экипировки появляется ощущение, что весь мир у ваших ног. Даёт +5% к наносимому урону",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 3,
  value: 15,
  baseId: BASE_ITEMS_ID.BULLET_NECKLACE_TIER_3,
  price: 2000,
  overAllTier: 1,
  effectType: EFFECT_TYPES.ATTACK,
};

export const LEAD_CLOAK_TIER_1 = {
  name: "Свинцовая пелена",
  description:
    "Эта вещь вобрала в себя боль бесчиленного количества людей, павших за время всех войн. Носящий эту вещь ощущает, что в нем есть силы пережить даже самый сильный удар судьбы. Даёт +10% к защите",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 1,
  value: 10,
  baseId: BASE_ITEMS_ID.LEAD_CLOAK_TIER_1,
  price: 2000,
  overAllTier: 1,
  effectType: EFFECT_TYPES.DEFENSE,
};
export const LEAD_CLOAK_TIER_2 = {
  name: "Свинцовая пелена",
  description:
    "Эта вещь вобрала в себя боль бесчиленного количества людей, павших за время всех войн. Носящий эту вещь ощущает, что в нем есть силы пережить даже самый сильный удар судьбы. Даёт +15% к защите",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 2,
  value: 15,
  baseId: BASE_ITEMS_ID.LEAD_CLOAK_TIER_2,
  price: 2000,
  overAllTier: 1,
  effectType: EFFECT_TYPES.DEFENSE,
};
export const LEAD_CLOAK_TIER_3 = {
  name: "Свинцовая пелена",
  description:
    "Эта вещь вобрала в себя боль бесчиленного количества людей, павших за время всех войн. Носящий эту вещь ощущает, что в нем есть силы пережить даже самый сильный удар судьбы. Даёт +20% к защите",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 3,
  value: 20,
  baseId: BASE_ITEMS_ID.LEAD_CLOAK_TIER_3,
  price: 2000,
  overAllTier: 1,
  effectType: EFFECT_TYPES.DEFENSE,
};

export const CHAOS_CHALICE_TIER_1 = {
  name: "Чаша хаоса",
  description:
    "Держа ее в руках вас не покидает ощущение, что этот предмет не имеет отношения к вашему миру. +10% к защите, здоровью и атаке.",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 3,
  value: 5,
  baseId: BASE_ITEMS_ID.CHAOS_CHALICE_TIER_1,
  price: 5000,
  overAllTier: 3,
  effectType: EFFECT_TYPES.ALL,
};

export const VAMPIRE_RING_TIER_1 = {
  name: "Кольцо вампира",
  description:
    "Каждый кто носит это кольцо ощущает, что отнимая жизни врагов, он забирает часть их жизненной силы себе",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 3,
  value: 10,
  baseId: BASE_ITEMS_ID.VAMPIRE_RING_TIER_1,
  price: 5000,
  overAllTier: 3,
  effectType: EFFECT_TYPES.VAMPIRE,
};
