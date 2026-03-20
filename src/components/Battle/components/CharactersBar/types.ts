import { Dispatch, SetStateAction } from "react";
import { BattleCharacterModel } from "../../../../types/gameState";

export interface CharactersBarProps {
  selectedPlayer?: BattleCharacterModel;
  setSelectedPlayer: Dispatch<SetStateAction<BattleCharacterModel | undefined>>;
  damageTargetIndex: number | null;
  selectedNextPlayer: (party: BattleCharacterModel[]) => void;
  damageReceived: number | null;
  damageTarget: string | null;
}
