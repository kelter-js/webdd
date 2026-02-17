import { Dispatch, SetStateAction } from "react";
import { Character } from "../../../../types/gameState";

export interface CharactersBarProps {
  selectedPlayer?: Character;
  setSelectedPlayer: Dispatch<SetStateAction<Character | undefined>>;
  damageTargetIndex: number | null;
  selectedNextPlayer: VoidFunction;
}
