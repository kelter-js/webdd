import { POTION_TYPES } from "../entities/consumables";

export const getPotionDescriptionByType = (potionType: POTION_TYPES) => {
  switch (potionType) {
    case POTION_TYPES.SMALL_HEALTH_POTION:
      return "Малое зелье здоровья";
    case POTION_TYPES.MEDIUM_HEALTH_POTION:
      return "Среднее зелье здоровья";
    case POTION_TYPES.LARGE_HEALTH_POTION:
      return "Большое зелье здоровья";
    case POTION_TYPES.EXTRA_LARGE_HEALTH_POTION:
      return "Ритуальное зелье здоровья";
    default:
      return "Малое зелье здоровья";
  }
};
