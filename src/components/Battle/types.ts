export interface DamageData {
  target: string | null;
  damage: number | null;
  isCritical: boolean;
  isEvasion: boolean;
  isEffect?: boolean;
  isHealing?: boolean;
  shouldPlayDeathAnimation: boolean;
}
