import { useState } from "react";
import { DIRECTIONS } from "../../entities/directions";
import { Room } from "../../types";
import { generateDungeon } from "../../utils/generateDungeon";
import { useGameSaves } from "../../stores/GameSave";
import { useGameState } from "../../stores/GameState";

// Текстура каменной стены в base64
const COBBLESTONE_TEXTURE = `
  linear-gradient(0deg, 
    #333 1px, #444 1px, #444 2px, 
    #555 2px, #555 3px, #444 3px
  )
`;

const ROOM_STYLES = {
  start: { bg: "#065f46", symbol: "🚪", color: "white" },
  end: { bg: "#7f1d1d", symbol: "🏁", color: "white" },
  deadEnd: { bg: "#1e293b", symbol: "✖", color: "#f59e0b" },
  visited: { bg: "#334155", symbol: "•", color: "white" },
  unvisited: { bg: "#1e293b", symbol: "?", color: "#64748b" },
};

export const Map = () => {
  const {
    player: {
      location: { dungeon },
    },
    setDungeon,
  } = useGameState();
  console.log("dungeon", dungeon);

  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });

  const canMove = (direction: DIRECTIONS) => {
    const { x, y } = playerPos;
    const room = dungeon[y]?.[x];
    return room?.exits[direction] || false;
  };

  const generateNewDungeon = () => {
    const newDungeon = generateDungeon(5, 5);
    setDungeon(newDungeon);
    setPlayerPos({ x: 0, y: 0 });
  };

  const movePlayer = (direction: DIRECTIONS) => {
    if (!canMove(direction)) return;

    const { x, y } = playerPos;
    const newPos = {
      x:
        direction === DIRECTIONS.LEFT
          ? x - 1
          : direction === DIRECTIONS.RIGHT
          ? x + 1
          : x,
      y:
        direction === DIRECTIONS.UP
          ? y - 1
          : direction === DIRECTIONS.DOWN
          ? y + 1
          : y,
    };

    setPlayerPos(newPos);

    setDungeon(dungeon, newPos);

    //mock
    // setDungeon((state) => {
    //   const newDungeon = dungeon.map((row) => [...row]);
    //   console.log(
    //     "newDungeon[newPos.y][newPos.x]",
    //     newDungeon[newPos.y][newPos.x]
    //   );
    //   newDungeon[newPos.y][newPos.x].visited = true;
    //   return newDungeon;
    // });
  };

  const renderRoom = (room: Room) => {
    const isCurrent = playerPos.x === room.x && playerPos.y === room.y;

    const roomType =
      room.type === "start"
        ? "start"
        : room.type === "end"
        ? "end"
        : room.isDeadEndRoom
        ? "deadEnd"
        : room.visited
        ? "visited"
        : "unvisited";

    // Определяем направление входа для тупика
    const entranceDir = room.isDeadEndRoom
      ? Object.entries(room.exits).find(([_, open]) => open)?.[0]
      : null;

    const arrowMap = {
      [DIRECTIONS.UP]: "↓",
      [DIRECTIONS.RIGHT]: "←",
      [DIRECTIONS.DOWN]: "↑",
      [DIRECTIONS.LEFT]: "→",
    };

    return (
      <div
        style={{
          width: 60,
          height: 60,
          backgroundColor: ROOM_STYLES[roomType].bg,
          border: isCurrent ? "3px solid #fbbf24" : "none",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          color: ROOM_STYLES[roomType].color,
          position: "relative",
          zIndex: 2,
          boxShadow: room.isDeadEndRoom
            ? "inset 0 0 10px rgba(245,158,11,0.5)"
            : "none",
        }}
      >
        {/* Стены комнаты */}
        {!room.exits[DIRECTIONS.UP] && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 8,
              backgroundImage: COBBLESTONE_TEXTURE,
              boxShadow:
                "inset 0 0 5px rgba(0,0,0,0.5), 1px 1px 2px rgba(0,0,0,0.3)",
              backgroundSize: "8px 8px",
              backgroundColor: "#222",
              backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
              zIndex: 3,
            }}
          />
        )}
        {!room.exits[DIRECTIONS.RIGHT] && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: 8, // Увеличим толщину для заметности
              backgroundImage: COBBLESTONE_TEXTURE,
              backgroundSize: "8px 8px",
              backgroundColor: "#222",
              boxShadow: "inset 2px 0 3px rgba(0,0,0,0.5)",
              zIndex: 3,
            }}
          />
        )}
        {!room.exits[DIRECTIONS.DOWN] && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 6,
              backgroundImage: COBBLESTONE_TEXTURE,
              boxShadow:
                "inset 0 0 5px rgba(0,0,0,0.5), 1px 1px 2px rgba(0,0,0,0.3)",
              backgroundSize: "8px 8px",
              backgroundColor: "#222",
              backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
              zIndex: 3,
            }}
          />
        )}
        {!room.exits[DIRECTIONS.LEFT] && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: 6,
              backgroundImage: COBBLESTONE_TEXTURE,
              boxShadow:
                "inset 0 0 5px rgba(0,0,0,0.5), 1px 1px 2px rgba(0,0,0,0.3)",
              backgroundSize: "8px 8px",
              backgroundColor: "#222",
              backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
              zIndex: 3,
            }}
          />
        )}

        {/* Содержимое комнаты */}
        <div style={{ position: "relative", zIndex: 4 }}>
          {roomType === "start" && ROOM_STYLES.start.symbol}
          {roomType === "end" && ROOM_STYLES.end.symbol}
          {roomType === "deadEnd" && (
            <div style={{ textAlign: "center" }}>
              {entranceDir && (
                <div style={{ fontSize: 14, marginBottom: -8 }}>
                  {arrowMap[entranceDir as DIRECTIONS]}
                </div>
              )}
              {ROOM_STYLES.deadEnd.symbol}
            </div>
          )}
          {roomType === "visited" && ROOM_STYLES.visited.symbol}
          {roomType === "unvisited" && ROOM_STYLES.unvisited.symbol}
        </div>
      </div>
    );
  };

  const renderConnections = () => {
    const connections = [];
    const cellSize = 64;
    const connectionColor = "#4ade80";

    for (let y = 0; y < dungeon.length; y++) {
      for (let x = 0; x < dungeon[y].length; x++) {
        const room = dungeon[y][x];

        // Горизонтальные соединения
        if (room.exits[DIRECTIONS.LEFT] && x > 0) {
          connections.push(
            <div
              key={`h-${x}-${y}`}
              style={{
                position: "absolute",
                left: x * cellSize,
                top: y * cellSize + cellSize / 2 - 2,
                width: cellSize,
                height: 4,
                backgroundColor: connectionColor,
                zIndex: 1,
              }}
            />
          );
        }

        // Вертикальные соединения
        if (room.exits[DIRECTIONS.UP] && y > 0) {
          connections.push(
            <div
              key={`v-${x}-${y}`}
              style={{
                position: "absolute",
                left: x * cellSize + cellSize / 2 - 2,
                top: y * cellSize,
                width: 4,
                height: cellSize,
                backgroundColor: connectionColor,
                zIndex: 1,
              }}
            />
          );
        }
      }
    }

    return connections;
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <button
        style={{
          fontSize: 18,
          padding: "10px 20px",
          marginBottom: 20,
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: 5,
        }}
        onClick={generateNewDungeon}
      >
        Сгенерировать подземелье
      </button>

      {dungeon.length > 0 && (
        <div
          style={{
            position: "relative",
            width: dungeon[0].length * 64,
            height: dungeon.length * 64,
            marginBottom: 20,
            backgroundColor: "#111827",

            boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
            // Добавляем внешние стены
          }}
        >
          {/* Комнаты */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${dungeon[0].length}, 64px)`,
              gridTemplateRows: `repeat(${dungeon.length}, 64px)`,
              position: "relative",
              zIndex: 2,
            }}
          >
            {dungeon.map((row, y) =>
              row.map((room, x) => (
                <div
                  key={room.id}
                  style={{
                    gridColumn: x + 1,
                    gridRow: y + 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {renderRoom(room)}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateAreas: `". up ." "left . right" ". down ."`,
          gap: 10,
          marginBottom: 20,
        }}
      >
        <button
          style={{
            gridArea: "up",
            padding: "12px 20px",
            fontSize: 18,
            backgroundColor: canMove(DIRECTIONS.UP) ? "#4ade80" : "#64748b",
            color: "white",
            border: "none",
            borderRadius: 5,
          }}
          onClick={() => movePlayer(DIRECTIONS.UP)}
          disabled={!canMove(DIRECTIONS.UP)}
        >
          ↑ Вверх
        </button>
        <button
          style={{
            gridArea: "left",
            padding: "12px 20px",
            fontSize: 18,
            backgroundColor: canMove(DIRECTIONS.LEFT) ? "#4ade80" : "#64748b",
            color: "white",
            border: "none",
            borderRadius: 5,
          }}
          onClick={() => movePlayer(DIRECTIONS.LEFT)}
          disabled={!canMove(DIRECTIONS.LEFT)}
        >
          ← Влево
        </button>
        <button
          style={{
            gridArea: "right",
            padding: "12px 20px",
            fontSize: 18,
            backgroundColor: canMove(DIRECTIONS.RIGHT) ? "#4ade80" : "#64748b",
            color: "white",
            border: "none",
            borderRadius: 5,
          }}
          onClick={() => movePlayer(DIRECTIONS.RIGHT)}
          disabled={!canMove(DIRECTIONS.RIGHT)}
        >
          Вправо →
        </button>
        <button
          style={{
            gridArea: "down",
            padding: "12px 20px",
            fontSize: 18,
            backgroundColor: canMove(DIRECTIONS.DOWN) ? "#4ade80" : "#64748b",
            color: "white",
            border: "none",
            borderRadius: 5,
          }}
          onClick={() => movePlayer(DIRECTIONS.DOWN)}
          disabled={!canMove(DIRECTIONS.DOWN)}
        >
          ↓ Вниз
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#1e293b",
          padding: 15,
          borderRadius: 5,
          color: "#e2e8f0",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Легенда карты:</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
          <li>
            <span style={{ color: ROOM_STYLES.start.color }}>🚪</span> - Старт
          </li>
          <li>
            <span style={{ color: ROOM_STYLES.end.color }}>🏁</span> - Выход
          </li>
          <li>
            <span style={{ color: ROOM_STYLES.deadEnd.color }}>
              ✖ + стрелка
            </span>{" "}
            - Тупик (стрелка показывает вход)
          </li>
          <li>
            <span style={{ color: "#4ade80" }}>Зеленые линии</span> - Проходы
            между комнатами
          </li>
          <li>
            <span style={{ color: "#fbbf24" }}>Золотая рамка</span> - Ваша
            позиция
          </li>
          <li>
            Стрелка над тупиком всегда указывает, откуда в него можно войти
          </li>
        </ul>
      </div>
    </div>
  );
};
