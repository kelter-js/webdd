// types.ts

import { ReactNode } from "react";
import { BASE_ITEMS_ID } from "../constants/items";
import { MEDIC_PERKS } from "../constants/perks";
import { DUNGEONS, ENEMIES } from "../entities";
import { AI_CATEGORIES } from "../entities/ai";
import { ALMANAC_ENEMIES_GENERIC_TYPES } from "../entities/enemies";
import { RESOURCES } from "../entities/resources";
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
  isLooted?: boolean;
}

// BASE_ITEMS_ID - для маппинга на основной предмет
// второй стринг - uuidv4 уникальный айди для каждого предмета
export type MemoizedItem = [BASE_ITEMS_ID, string];
export interface PerkData {
  id: PERK_ID_DATA;
  description: string;
  isAbility?: boolean;
}

export enum RECEIPT_TYPES {
  CONSUMABLE = "CONSUMABLE",
  ITEM = "ITEM",
}

export interface ReceiptData {
  isDisabled: (state: GameStateData) => boolean;
  create: (state: GameStateData) => GameStateData;
  title: string;
  sourceItemIcon: string;
  targetItemIcon: string;
  goldRequiredToCraft?: number;
  type: RECEIPT_TYPES;
}

export interface ResourceData {
  resource: RESOURCES;
  id: string;
}

export enum RewardTypes {
  ITEM = "ITEM",
  JUNK = "JUNK",
  POTION = "POTION",
  GOLD = "GOLD",
}

export interface DungeonCreationData {
  dungeonType?: DUNGEONS;
  dungeonLevel?: number;
}

export interface CreatureBaseModel {
  aiPackage: AI_CATEGORIES;
  pictureSrc: string;
  audioSrc: string;
  baseModel: {
    hp: number;
    maxHP: number;
    minDmg: number;
    maxDmg: number;
    exp: number;
    evasionChance: number;
    type: ENEMIES;
    isEnhanced: boolean;
    subType: ALMANAC_ENEMIES_GENERIC_TYPES | null;
  };
}

export interface SlideData {
  id: number;
  text: string | ReactNode;
  image: string;
}
