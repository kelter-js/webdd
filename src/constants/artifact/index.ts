import { GEAR_SLOTS } from "../../entities/gear";
import { BASE_ITEMS_ID } from "../items";

// артефакт увеличивающий хп - PHOTO
// артефакт увеличивающий урон - soul
// артефакт увеличивающий защиту - руда

// артефакт со спешиал энкаунтера даёт и урон и хп и защиту но немного
// ещё один артефакт легендарный будет давать перк отхила c атаки

export const HEALTH_ORB_TIER_1 = {
  name: "Кристалл здоровья",
  description:
    "Странно пульсирующая сфера, если носить на поясе даёт ощущение тепла, растекающегося по телу, заживляя раны",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 1,
  value: 5,
  baseId: BASE_ITEMS_ID.HEALTH_ORB_TIER_1,
  price: 2000,
  overAllTier: 1,
};

export const BULLET_NECKLACE_TIER_1 = {
  name: "Ожерелье из патронов",
  description:
    "Аккуратно просверленный ряд патронов, в отверстия всталена проволка, вероятно для ношения на шее. После экипировки появляется ощущение, что весь мир у ваших ног",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 1,
  value: 5,
  baseId: BASE_ITEMS_ID.HEALTH_ORB_TIER_1,
  price: 2000,
  overAllTier: 1,
};

export const LEAD_CLOAK_TIER_1 = {
  name: "Свинцовая пелена",
  description:
    "Эта вещь вобрала в себя боль бесчиленного количества людей, павших за время всех войн. Носящий эту вещь ощущает, что в нем есть силы пережить даже самый сильный удар судьбы",
  iconSrc: "",
  type: GEAR_SLOTS.ARTIFACT,
  tier: 1,
  value: 10,
  baseId: BASE_ITEMS_ID.LEAD_CLOAK_TIER_1,
  price: 2000,
  overAllTier: 1,
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
};
