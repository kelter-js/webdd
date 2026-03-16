import { useCallback, useEffect, useMemo, useState } from "react";

import { Room } from "../../types";
import { generateDungeon } from "../../utils";

import { ClosePortal, QTEGame } from "../Minigames";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
  RENDER_LOCATIONS,
  QUEST_STATUSES,
  DUNGEONS,
  DIRECTIONS,
  ECONOMIC_TYPES,
} from "../../entities";

import { useAppState, useGameState } from "../../stores";
import { ROOM_TYPES } from "../../entities/room";
import { DiceRollModal } from "../../common";
import { BattleResult } from "./components/BattleResult";
import { usePlayer } from "../../contexts/Player";
import encounterSFX from "../../assets/audio/encounter.mp3";
import { SPECIAL_ENCOUNTERS } from "../../entities/specialEncounters";

import { useMovement } from "./hooks/useMovement";
import { Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { getDungeonBackgroundByTier } from "./utils";
import { getFlagStoryBossByTier } from "../../utils/getFlagStoryBossByTier";
import { useSnackbar } from "../../contexts/Snackbar";
import { getRandomRewardByQuest } from "../../stores/utils";

// Текстура каменной стены в base64
const COBBLESTONE_TEXTURE = `
  linear-gradient(0deg, 
    #333 1px, #444 1px, #444 2px, 
    #555 2px, #555 3px, #444 3px
  )
`;

const ROOM_STYLES = {
  [ROOM_TYPES.START]: { bg: "#065f46", symbol: "🚪", color: "white" },
  [ROOM_TYPES.END]: { bg: "#7f1d1d", symbol: "🏁", color: "white" },
  [ROOM_TYPES.STORY_BOSS]: { bg: "#7f1d1d", symbol: "🏁", color: "white" },
  deadEnd: { bg: "#1e293b", symbol: "✖", color: "#f59e0b" },
  visited: { bg: "#334155", symbol: "•", color: "white" },
  unvisited: { bg: "#1e293b", symbol: "?", color: "#64748b" },
};

const ENCOUNTER_SFX_PLAYER_REF = "encounter";

export const Map = () => {
  const {
    player: { location, economic, battle, currentTier, flags },
    setDungeon,
    setPlayerPosition,
    updateDungeon,
    setLocationState,
    setQuestData,
    handleExitDungeon,
  } = useGameState();
  const { setFading, toggleAutoSave } = useAppState();
  const [isMapVisible, setMapVisible] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleMapVisibilityChange = () => setMapVisible((state) => !state);

  const { handleSetSrc } = usePlayer();

  const {
    dungeon: currentDungeon,
    position,
    type,
    isQuestCompleted,
    ...rest
  } = location || {};

  useEffect(() => {
    if (!location || !position || !dungeon) {
      setDungeon({
        dungeon: [],
        position: { x: 0, y: 0 },
        type: DUNGEONS.CLOSE_PORTAL,
      });
    }
  }, [location, position, currentDungeon]);

  const handleWin = useCallback(() => {
    if (!location?.type) return;

    setLocationState(RENDER_LOCATIONS.SETTLEMENT);
    const reward = getRandomRewardByQuest(
      currentTier,
      location.type,
      QUEST_STATUSES.SUCCESS,
    );
    console.log("reward", reward);
    setFading(true);
    setQuestData(reward);
    handleExitDungeon();
    setDungeon(null);

    console.log("we win!");
  }, [
    toggleAutoSave,
    economic,
    handleExitDungeon,
    location?.type,
    currentTier,
  ]);

  const handleFail = useCallback(() => {
    if (!location?.type) return;

    setLocationState(RENDER_LOCATIONS.SETTLEMENT);
    setFading(true);
    const reward = getRandomRewardByQuest(
      currentTier,
      location.type,
      QUEST_STATUSES.FAILED,
    );
    setQuestData(reward);

    handleExitDungeon();
    setDungeon(null);
    toggleAutoSave();
  }, [
    toggleAutoSave,
    economic,
    handleExitDungeon,
    location?.type,
    currentTier,
  ]);

  const movePlayer = (direction: DIRECTIONS) => {
    if (!canMove(direction) || !position) return;

    const { x, y } = position;
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

    setPlayerPosition(newPos);

    updateDungeon(
      { position: newPos },
      (isSpecialEncounter = false) => {
        setFading(true);

        if (!isSpecialEncounter) {
          handleSetSrc(ENCOUNTER_SFX_PLAYER_REF, encounterSFX);
        }
      },
      (result) => showSnackbar(result),
    );
  };

  const dungeon = currentDungeon || [];

  const currentCell =
    position?.y && position?.x && dungeon[position.y]
      ? dungeon[position.y][position.x]
      : undefined;
  const isDungeonExit =
    currentCell?.type === ROOM_TYPES.END ||
    (currentCell?.type === ROOM_TYPES.STORY_BOSS &&
      flags.includes(getFlagStoryBossByTier(currentTier)));

  const reward = battle?.reward;

  const hasQuest =
    (isDungeonExit && type === DUNGEONS.CLOSE_PORTAL) ||
    (isDungeonExit && type === DUNGEONS.CATCH_GOBLIN) ||
    Boolean(reward);

  useMovement(movePlayer, hasQuest);

  const currentBackground = useMemo(
    () => getDungeonBackgroundByTier(location?.dungeonLevel || currentTier),
    [position?.x, position?.y, currentTier],
  );

  if (!location || !position || !dungeon) {
    return null;
  }

  const handleEscapeFromDungeon = () => {
    setFading(true);
    handleExitDungeon();
    setDungeon(null);
    toggleAutoSave();
    setLocationState(RENDER_LOCATIONS.SETTLEMENT);

    if (location.type === DUNGEONS.FIND) {
      // здесь нужна функция рандомизации сколько золота получено
      // в зависимости от типа квеста награда - передаем type, чтобы потом рассчитать кол-во шанса на айтем -
      // награда item только за закрытие портала и поиск предмета
      // портал - 20%, поиск предмета - 65%
      // item нужно генерить в зависимости от открытого тира игроком подземелья
      // разделить оружие на тиры
      const reward = getRandomRewardByQuest(
        currentTier,
        location.type,
        QUEST_STATUSES.SUCCESS,
      );

      setQuestData(reward);
    }
  };

  // const generateNewDungeon = () => {
  //   const newDungeon = generateDungeon(5, 5);

  //   // тут нужен мок код отвечающий за кол-во попыток исходя из типа подземелья
  //   const DEFAULT_ATTEMPS_AMOUNT = 5;
  //   // здесь определяется тип подземелья
  //   setDungeon({
  //     dungeon: newDungeon,
  //     type: DUNGEONS.CLOSE_PORTAL,
  //     attempts: DEFAULT_ATTEMPS_AMOUNT,
  //     position: { x: 0, y: 0 },
  //   });
  // };

  const canMove = (direction: DIRECTIONS) => {
    const { x, y } = position;
    const room = dungeon[y]?.[x];
    return room?.exits[direction] || false;
  };

  const renderRoom = (room: Room) => {
    const isCurrent = position.x === room.x && position.y === room.y;

    const roomType =
      room.type === ROOM_TYPES.START
        ? ROOM_TYPES.START
        : room.type === ROOM_TYPES.END || room.type === ROOM_TYPES.STORY_BOSS
          ? ROOM_TYPES.END
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
          {roomType === ROOM_TYPES.START &&
            ROOM_STYLES[ROOM_TYPES.START].symbol}
          {roomType === ROOM_TYPES.END && ROOM_STYLES[ROOM_TYPES.END].symbol}
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

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 600,
        margin: "0 auto",
        position: "fixed",
        right: "20px",
        top: "20px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "column",
      }}
    >
      <img
        src={currentBackground}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      />
      {/* <button
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
      </button> */}

      {dungeon.length > 0 && (
        <div
          style={{
            position: "relative",
            width: dungeon[0].length * 64,
            height: dungeon.length * 64,
            marginBottom: 16,
            backgroundColor: "#111827",
            marginTop: 20,

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
              )),
            )}
          </div>
        </div>
      )}

      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        mb={2}
        justifyContent="space-between"
      >
        {/* FIXME: нужна доп проверка на квесты типа найти предмет-убить врага - если цель выполнена - отображать кнопку покинуть подземелье */}
        {isDungeonExit &&
          (type === DUNGEONS.STORY ||
            (type === DUNGEONS.FIND && isQuestCompleted)) && (
            <button
              style={{
                fontSize: 18,
                padding: "10px 20px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: 5,
              }}
              onClick={handleEscapeFromDungeon}
            >
              Выйти из подземелья
            </button>
          )}

        <Box
          sx={{
            backgroundColor: "rgb(51, 65, 85)",
            color: "white",
            borderRadius: "50%",
            display: "inline-flex",
            p: 1,
            cursor: "pointer",
          }}
          onMouseEnter={handleMapVisibilityChange}
          onMouseLeave={handleMapVisibilityChange}
        >
          <QuestionMarkIcon />
        </Box>
      </Stack>

      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "50%",
          transform: "translate(-50%, 0)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
          width: "100px",
        }}
      >
        <Button
          sx={{
            padding: 0,
            minWidth: "40px !important",
            width: "40px",
            height: "40px",
            fontSize: 18,
            backgroundColor: canMove(DIRECTIONS.UP) ? "#4ade80" : "#64748b",
            color: "white",
          }}
          onClick={() => movePlayer(DIRECTIONS.UP)}
          disabled={!canMove(DIRECTIONS.UP)}
        >
          <Typography fontFamily="inherit">↑</Typography>
        </Button>
        <Stack direction="row" gap={6}>
          <Button
            sx={{
              padding: 0,
              minWidth: "40px !important",
              width: "40px",
              height: "40px",
              backgroundColor: canMove(DIRECTIONS.LEFT) ? "#4ade80" : "#64748b",
              color: "white",
            }}
            onClick={() => movePlayer(DIRECTIONS.LEFT)}
            disabled={!canMove(DIRECTIONS.LEFT)}
          >
            <Typography fontFamily="inherit">←</Typography>
          </Button>
          <Button
            sx={{
              fontSize: 18,
              backgroundColor: canMove(DIRECTIONS.RIGHT)
                ? "#4ade80"
                : "#64748b",
              color: "white",
              padding: 0,
              minWidth: "40px !important",
              width: "40px",
              height: "40px",
            }}
            onClick={() => movePlayer(DIRECTIONS.RIGHT)}
            disabled={!canMove(DIRECTIONS.RIGHT)}
          >
            <Typography fontFamily="inherit">→</Typography>
          </Button>
        </Stack>
        <Button
          sx={{
            padding: 0,
            minWidth: "40px !important",
            width: "40px",
            height: "40px",
            fontSize: 18,
            backgroundColor: canMove(DIRECTIONS.DOWN) ? "#4ade80" : "#64748b",
            color: "white",
          }}
          onClick={() => movePlayer(DIRECTIONS.DOWN)}
          disabled={!canMove(DIRECTIONS.DOWN)}
        >
          <Typography fontFamily="inherit">↓</Typography>
        </Button>
      </div>

      {isMapVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
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
              <span style={{ color: ROOM_STYLES[ROOM_TYPES.START].color }}>
                🚪
              </span>{" "}
              - Старт
            </li>
            <li>
              <span style={{ color: ROOM_STYLES[ROOM_TYPES.END].color }}>
                🏁
              </span>{" "}
              - Выход
            </li>
            <li>
              <span style={{ color: ROOM_STYLES.deadEnd.color }}>✖</span> -
              Тупик (стрелка показывает вход)
            </li>

            <li>
              <span style={{ color: "#fbbf24" }}>Золотая рамка</span> - Ваша
              позиция
            </li>
          </ul>
        </motion.div>
      )}

      {reward && <BattleResult />}

      {isDungeonExit && type === DUNGEONS.CATCH_GOBLIN && (
        <ClosePortal onFail={handleFail} onWin={handleWin} />
      )}

      {isDungeonExit && type === DUNGEONS.CLOSE_PORTAL && (
        <QTEGame onFail={handleFail} onWin={handleWin} />
      )}

      {/* <ShootingRange onFail={handleFail} onWin={handleWin} /> */}
    </div>
  );
};
