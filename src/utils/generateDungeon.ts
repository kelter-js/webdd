import { DIRECTIONS } from "../entities/directions";
import { Room } from "../types";
import { isDeadEnd } from "./isDeadEnd";

type DirectionTuple = [
  dx: number,
  dy: number,
  exit: DIRECTIONS,
  backExit: DIRECTIONS
];

export const generateDungeon = (width: number, height: number): Room[][] => {
  // 1. Создаём пустую сетку комнат
  let dungeon: Room[][] = Array(height)
    .fill(null)
    .map((_, y) =>
      Array(width)
        .fill(null)
        .map((_, x) => ({
          id: `${x}-${y}`,
          x,
          y,
          type: "empty",
          visited: false,
          exits: { top: false, right: false, bottom: false, left: false },
        }))
    );

  // 2. Начинаем с (0, 0)
  const stack: [number, number][] = [[0, 0]];
  dungeon[0][0].type = "start";
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
  dungeon[height - 1][width - 1].type = "end";

  console.log("dungeon", dungeon);

  dungeon = dungeon.map((row) =>
    row.map((room) => {
      const isDeadEndRoom = isDeadEnd(room);

      return { ...room, isDeadEndRoom };
    })
  );

  return dungeon;
};
