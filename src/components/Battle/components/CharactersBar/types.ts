import { Dispatch, SetStateAction } from "react";
import { Battle, BattleCharacterModel } from "../../../../types/gameState";
import { PerkData } from "../../../../types";
import { DamageData } from "../../types";

export interface CharactersBarProps {
  selectedPlayer?: BattleCharacterModel;

  damageModel: DamageData[] | null;
  selectedNextPlayer: (party: Battle) => void;
  onAttack: (battle?: Battle) => void;
  onResetAnimation: VoidFunction;
  isPlayerTurnAvailable: boolean;
}

export interface AbilityData extends PerkData {
  isDisabled: boolean;
}
