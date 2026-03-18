import { EnemyProps } from "../../types";

export interface DamageInstance {
  id: number;
  damage: number;
  x: number;
  y: number;
}

export interface DamageEffectProps extends Pick<
  EnemyProps,
  "isCritical" | "onDamageAnimationEnd"
> {
  damage: number;
  containerId?: string;
}
