import { POTION_TYPES } from "../entities/consumables";
import { Icons } from "../common";

export const getPotionIcon = (potionType: POTION_TYPES, size?: number) => {
  switch (potionType) {
    case POTION_TYPES.SMALL_HEALTH_POTION:
      return <Icons.HealthPotionClassic size={size} />;
    case POTION_TYPES.MEDIUM_HEALTH_POTION:
      return <Icons.HealthPotionBulbous size={size} />;
    case POTION_TYPES.LARGE_HEALTH_POTION:
      return <Icons.HealthPotionCrystal size={size} />;
    case POTION_TYPES.EXTRA_LARGE_HEALTH_POTION:
      return <Icons.HealthPotionRitual size={size} />;
    default:
      return <Icons.HealthPotionRitual size={size} />;
  }
};
