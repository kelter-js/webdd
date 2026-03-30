import { ENEMIES } from "../../../../entities";

export interface FragmentProps {
  dx: string;
  dy: string;
  animated: boolean;
  imgSrc: string;
}

export interface FragmentData {
  key: string;
  left: number;
  top: number;
  backgroundPosition: string;
  dx: string;
  dy: string;
}

export interface EnemyProps {
  type: ENEMIES;
  damage?: number | null;
  isCritical?: boolean;
  onDamageAnimationEnd?: VoidFunction;
  layout: string;
  isAttacking: boolean;
  isSelected: boolean;
  index: number;
  onAttackEnd: VoidFunction;
  isUnderAttack: boolean;
  isEvasion: boolean;
  shouldPlayDeathAnimation: boolean;
}
