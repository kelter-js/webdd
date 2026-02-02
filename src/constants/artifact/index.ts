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
  value: 28,
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
  value: 28,
  baseId: BASE_ITEMS_ID.HEALTH_ORB_TIER_1,
  price: 2000,
  overAllTier: 1,
};
