// types.ts

import { BASE_ITEMS_ID } from "../constants/items";
import { MEDIC_PERKS } from "../constants/perks";
import { ROOM_TYPES } from "../entities/room";
import { GameStateData, PERK_ID_DATA } from "./gameState";

export type Location =
  | "Ruins"
  | "Warrens"
  | "Weald"
  | "Cove"
  | "Darkest Dungeon"
  | "Hamlet";

export interface Room {
  id: string; // Уникальный ID
  x: number; // Позиция по X
  y: number; // Позиция по Y
  type: ROOM_TYPES;
  visited: boolean; // Посещена ли комната
  exits: {
    // Куда можно пойти
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  isDeadEndRoom?: boolean;
  isLighted?: boolean;
}

// BASE_ITEMS_ID - для маппинга на основной предмет
// второй стринг - uuidv4 уникальный айди для каждого предмета
export type MemoizedItem = [BASE_ITEMS_ID, string];
export interface PerkData {
  id: PERK_ID_DATA;
  description: string;
  isAbility?: boolean;
}

export interface ReceiptData {
  isDisabled: (state: GameStateData) => boolean;
  create: (state: GameStateData) => GameStateData;
  title: string;
  sourceItemIcon: string;
  targetItemIcon: string;
  goldRequiredToCraft?: number;
}
