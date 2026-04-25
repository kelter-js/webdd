import { CLASSES } from "../../../../entities/characterClasses";
import { PerkData } from "../../../../types";
import { PERK_ID_DATA } from "../../../../types/gameState";

export interface PerkListProps {
  perksList: PerkData[];
  selectedPerksList: PERK_ID_DATA[];
  canAcquirePerk: boolean;
  onSelect: (perkId: PERK_ID_DATA) => void;
  characterClass: CLASSES;
}
