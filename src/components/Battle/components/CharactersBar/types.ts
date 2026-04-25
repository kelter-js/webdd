import { Battle, BattleCharacterModel } from "../../../../types/gameState";
import { BASE_ITEMS_ID } from "../../../../constants/items";
import { PerkData } from "../../../../types";
import { DamageData } from "../../types";

export interface CharactersBarProps {
  selectedPlayer?: BattleCharacterModel;
  onReload: VoidFunction;
  damageModel: DamageData[] | null;
  selectedNextPlayer: (party: Battle) => void;
  onAttack: (battle?: Battle) => void;
  isPlayerTurnAvailable: boolean;
  onDamageReceiveAnimationEnd: VoidFunction | null;
  currentMaxMagSize: {
    [k: string]: {
      magSize: number;
      baseId: BASE_ITEMS_ID | null;
      roundsPerTurn: number | null;
    };
  };
}

export interface AbilityData extends PerkData {
  isDisabled: boolean;
}
