import { ARMOR_ICON_SOURCES } from "../constants/armor";
import { ARTIFACT_ICON_SOURCES } from "../constants/artifact";
import { WEAPONS_ICON_SOURCES } from "../constants/guns";
import { HELMETS_ICON_SOURCES } from "../constants/helmets";
import { BASE_ITEMS_ID } from "../constants/items";
import { GEAR_SLOTS } from "../entities/gear";

export const getItemIcon = (gear: GEAR_SLOTS, gearId: BASE_ITEMS_ID) => {
  if (gear === GEAR_SLOTS.ARMOR) {
    return ARMOR_ICON_SOURCES[gearId as keyof typeof ARMOR_ICON_SOURCES];
  }

  if (gear === GEAR_SLOTS.HELMET) {
    return HELMETS_ICON_SOURCES[gearId as keyof typeof HELMETS_ICON_SOURCES];
  }

  if (gear === GEAR_SLOTS.WEAPON) {
    return WEAPONS_ICON_SOURCES[gearId as keyof typeof WEAPONS_ICON_SOURCES];
  }

  console.log("gearId", gearId);

  return ARTIFACT_ICON_SOURCES[gearId as keyof typeof ARTIFACT_ICON_SOURCES];
};
