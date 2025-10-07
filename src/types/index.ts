// types.ts

import { ROOM_TYPES } from "../entities/room";

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
