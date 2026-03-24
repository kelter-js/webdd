export interface DamageData {
  target: string | null;
  damage: number | null;
  isCritical: boolean;
  isEvasion: boolean;
  isEffect?: boolean;
  shouldPlayDeathAnimation: boolean;
}
