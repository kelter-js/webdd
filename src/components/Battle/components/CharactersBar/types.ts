import { Dispatch, SetStateAction } from "react";
import { Battle, BattleCharacterModel } from "../../../../types/gameState";

export interface CharactersBarProps {
  selectedPlayer?: BattleCharacterModel;
  setSelectedPlayer: Dispatch<SetStateAction<BattleCharacterModel | undefined>>;
  damageTargetIndex: number | null;
  selectedNextPlayer: (party: Battle) => void;
  damageReceived: number | null;
  damageTarget: string | null;
}
