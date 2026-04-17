import { DIRECTIONS } from "../entities/directions";
import { DirectionTuple } from "./types";
import { isDeadEnd } from "./";
import { Room } from "../types";
import { getRandom } from "./";
import { ROOM_TYPES } from "../entities/room";
import {
  FIRST_TIER_DUNGEONS_AMOUNT,
  SECOND_TIER_DUNGEONS_AMOUNT,
  THIRD_TIER_DUNGEONS_AMOUNT,
} from "../constants";
import { DUNGEONS } from "../entities";

const MAX_ITERATIONS_COUNTER = 100000;

const getEndRoomTypeByCounter = (counter: number, isQuest?: boolean) => {
  if (isQuest) {
    return ROOM_TYPES.END;
  }

  if (
    counter === FIRST_TIER_DUNGEONS_AMOUNT ||
    counter === SECOND_TIER_DUNGEONS_AMOUNT ||
    counter >= THIRD_TIER_DUNGEONS_AMOUNT
  ) {
    return ROOM_TYPES.STORY_BOSS;
  }

  return ROOM_TYPES.END;
};

export const generateDungeon = (
  width: number,
  height: number,
  dungeonsAmount: number,
  dungeonType: DUNGEONS,
): Room[][] => {
  // 1. Создаём пустую сетку комнат
  const isQuest = dungeonType !== DUNGEONS.STORY;

  let dungeon: Room[][] = Array(height)
    .fill(null)
    .map((_, y) =>
      Array(width)
        .fill(null)
        .map((_, x) => ({
          id: `${x}-${y}`,
          x,
          y,
          type: ROOM_TYPES.EMPTY,
          visited: false,
          exits: { top: false, right: false, bottom: false, left: false },
        })),
    );

  // 2. Начинаем с (0, 0)
  const stack: [number, number][] = [[0, 0]];
  dungeon[0][0].type = ROOM_TYPES.START;
  dungeon[0][0].visited = true;

  // 3. Пока есть непосещённые комнаты
  while (stack.length > 0) {
    const [x, y] = stack.pop()!; // Берём последнюю комнату из стека

    // 4. Случайно перемешиваем направления
    const directions: DirectionTuple[] = [
      [0, -1, DIRECTIONS.UP, DIRECTIONS.DOWN] as DirectionTuple, // Вверх
      [1, 0, DIRECTIONS.RIGHT, DIRECTIONS.LEFT] as DirectionTuple, // Вправо
      [0, 1, DIRECTIONS.DOWN, DIRECTIONS.UP] as DirectionTuple, // Вниз
      [-1, 0, DIRECTIONS.LEFT, DIRECTIONS.RIGHT] as DirectionTuple, // Влево
    ].sort(() => Math.random() - 0.5); // Рандомизируем порядок

    // 5. Проверяем все 4 направления
    for (const [dx, dy, exit, backExit] of directions) {
      const nx = x + dx; // Новые координаты
      const ny = y + dy;

      // 6. Если соседняя клетка в пределах карты и не посещена
      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        !dungeon[ny][nx].visited
      ) {
        // 7. Делаем проход между текущей и новой комнатой
        dungeon[y][x].exits[exit] = true;
        dungeon[ny][nx].exits[backExit] = true;

        // 8. Помечаем как посещённую и добавляем в стек
        dungeon[ny][nx].visited = true;
        stack.push([nx, ny]);
      }
    }
  }

  // 9. Делаем последнюю комнату "концом"
  dungeon[height - 1][width - 1].type = getEndRoomTypeByCounter(
    dungeonsAmount,
    isQuest,
  );

  dungeon = dungeon.map((row, rowIndex) =>
    row.map((room, roomIndex) => {
      const isDeadEndRoom = isDeadEnd(room);
      room.visited = rowIndex === 0 && roomIndex === 0 ? true : false;

      return { ...room, isDeadEndRoom };
    }),
  );

  if (dungeonType === DUNGEONS.FIND) {
    let counter = 0;

    while (counter < MAX_ITERATIONS_COUNTER) {
      const randomRow = getRandom(0, width);
      const randomColumn = getRandom(0, height);
      const cell = dungeon[randomColumn][randomRow];

      if (
        cell.type === ROOM_TYPES.END ||
        cell.type === ROOM_TYPES.START ||
        cell.isDeadEndRoom
      ) {
        counter++;
        continue;
      }

      cell.type = ROOM_TYPES.ENEMY;
      break;
    }
  }

  return dungeon;
};
