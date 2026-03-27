import { Dispatch, SetStateAction } from "react";
import { Battle, BattleCharacterModel } from "../../../../types/gameState";
import { PerkData } from "../../../../types";

export interface CharactersBarProps {
  selectedPlayer?: BattleCharacterModel;
  setSelectedPlayer: Dispatch<SetStateAction<BattleCharacterModel | undefined>>;
  damageTargetIndex: number | null;
  selectedNextPlayer: (party: Battle) => void;
  damageReceived: number | null;
  damageTarget: string | null;
  onAttack: (battle?: Battle) => void;
}

export interface AbilityData extends PerkData {
  isDisabled: boolean;
}
