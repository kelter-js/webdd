// types.ts
export type Hero = {
  id: string;
  name: string;
  class: "Crusader" | "Plague Doctor" | "Highwayman" | "Vestal"; // и т.д.
  health: number;
  maxHealth: number;
  stress: number;
  maxStress: number;
  skills: string[];
  perks: string[];
  quirks: string[]; // Особенности персонажа (позитивные/негативные)
};

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
  type: "start" | "end" | "enemy" | "treasure" | "empty";
  visited: boolean; // Посещена ли комната
  exits: {
    // Куда можно пойти
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  isDeadEndRoom?: boolean;
}

export type GameState = {
  // Текущее местоположение и прогресс
  currentLocation: Location;
  currentRoom: Room | null;
  discoveredRooms: Room[];
  exploredLocations: Location[];

  // Отряд героев
  party: Hero[];
  reserveHeroes: Hero[]; // Герои в городе
  wagonHeroes: Hero[]; // Новые рекруты

  // Ресурсы
  gold: number;
  heirlooms: {
    deeds: number;
    portraits: number;
    busts: number;
    crests: number;
  };

  // Стресс и освещение (механика "Torch")
  torchLevel: number; // 0-100, влияет на сложность
  isDarkestDungeon: boolean; // Особый режим для финальных подземелий

  // Инвентарь
  inventory: {
    provisions: {
      food: number;
      torches: number;
      shovels: number;
      keys: number;
    };
    trinkets: string[]; // Артефакты
  };

  // Флаги событий
  stageCoachWeek: number; // Номер недели для вагонетки
  hasActiveQuest: boolean;
};
