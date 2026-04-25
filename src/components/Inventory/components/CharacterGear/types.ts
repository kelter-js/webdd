import { CLASSES } from "../../../../entities/characterClasses";

export interface CharacterGearProps {
  name: string;
  characterClass: CLASSES;
  currentHealth: number;
}
