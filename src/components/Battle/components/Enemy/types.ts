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
  damage?: number;
  isCritical?: boolean;
  onDamageAnimationEnd?: VoidFunction;
  layout: string;
  isAttacking: boolean;
  isSelected: boolean;
  onAttackEnd: VoidFunction;
}
