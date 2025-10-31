import { GUN_TYPES } from "../entities/guns";

export interface GunData {
  name: string;
  description: string;
  id: string;
  iconSrc: string;
  soundSrc: string;
  type: GUN_TYPES;
  magSize: number;
  critChance: number;
  tier: number;
  criticalStrike: number;
  bulletsPerTurn: number;
  minDamage: number;
  maxDamage: number;
}
