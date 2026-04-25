import { Battle } from "../../types/gameState";

export interface DamageData {
  target: string | null;
  damage: number | null;
  isCritical: boolean;
  isEvasion: boolean;
  isEffect?: boolean;
  isHealing?: boolean;
  shouldPlayDeathAnimation: boolean;
}

export interface UseBattleEffectsExecutorProps {
  selectedCharacter?: string;
  selectedEnemy?: string;
  toggleNextEnemy: (data: Battle) => void;
  toggleNextPlayer: (data: Battle) => void;
  updateDamageModel: (battleModel: Battle, damageModel: DamageData) => void;
  isReadyToTrigger: boolean;
}
