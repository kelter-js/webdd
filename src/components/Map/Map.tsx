import { useCallback, useMemo, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import {
  RENDER_LOCATIONS,
  QUEST_STATUSES,
  DUNGEONS,
  DIRECTIONS,
} from "../../entities";
import {
  ARROW_MAP,
  ENCOUNTER_SFX_PLAYER_REF,
  MAP_LEGEND_STYLES,
  ROOM_STYLES,
} from "./constants";
import { getRandomRewardByQuest } from "../../stores/utils";
import { useAppState, useGameState } from "../../stores";
import { BattleResult } from "./components/BattleResult";
import { useSnackbar } from "../../contexts/Snackbar";
import { getDungeonBackgroundByTier } from "./utils";
import { getFlagStoryBossByTier } from "../../utils";
import { ClosePortal, QTEGame } from "../Minigames";
import { usePlayer } from "../../contexts/Player";
import { useMovement } from "./hooks/useMovement";
import { ROOM_TYPES } from "../../entities/room";

import { Room } from "../../types";
import encounterSFX from "../../assets/audio/encounter.mp3";
import * as S from "./Map.styled";

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
  } = location || {};

  const handleWin = useCallback(() => {
    if (!location?.type) return;

    setLocationState(RENDER_LOCATIONS.SETTLEMENT);
    const reward = getRandomRewardByQuest(
      currentTier,
      location.type,
      QUEST_STATUSES.SUCCESS,
    );

    setFading(true);
    setQuestData(reward);
    handleExitDungeon();
    setDungeon(null);
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
    typeof position?.y === "number" &&
    typeof position?.x === "number" &&
    dungeon[position.y]
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
      const reward = getRandomRewardByQuest(
        currentTier,
        location.type,
        QUEST_STATUSES.SUCCESS,
      );

      setQuestData(reward);
    }
  };

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

    const currentRoom = ROOM_STYLES[roomType];

    return (
      <S.MapContainer
        bgColor={currentRoom.bg}
        color={currentRoom.color}
        isDeadEndRoom={Boolean(room.isDeadEndRoom)}
        isCurrent={isCurrent}
      >
        {/* Стены комнаты */}
        {!room.exits[DIRECTIONS.UP] && <S.DirectionUpWall />}
        {!room.exits[DIRECTIONS.RIGHT] && <S.DirectionRightWall />}
        {!room.exits[DIRECTIONS.DOWN] && <S.DirectionDownWall />}
        {!room.exits[DIRECTIONS.LEFT] && <S.DirectionLeftWall />}

        {/* Содержимое комнаты */}
        <div style={{ position: "relative", zIndex: 4 }}>
          {roomType === ROOM_TYPES.START &&
            ROOM_STYLES[ROOM_TYPES.START].symbol}

          {roomType === ROOM_TYPES.END && ROOM_STYLES[ROOM_TYPES.END].symbol}

          {roomType === "deadEnd" && (
            <div style={{ textAlign: "center" }}>
              {entranceDir && (
                <div style={{ fontSize: 14, marginBottom: -8 }}>
                  {ARROW_MAP[entranceDir as DIRECTIONS]}
                </div>
              )}

              {ROOM_STYLES.deadEnd.symbol}
            </div>
          )}

          {roomType === "visited" && ROOM_STYLES.visited.symbol}
          {roomType === "unvisited" && ROOM_STYLES.unvisited.symbol}
        </div>
      </S.MapContainer>
    );
  };

  const isAbleToMoveUp = canMove(DIRECTIONS.UP);
  const isAbleToMoveLeft = canMove(DIRECTIONS.LEFT);
  const isAbleToMoveRight = canMove(DIRECTIONS.RIGHT);
  const isAbleToMoveDown = canMove(DIRECTIONS.DOWN);

  return (
    <S.MainContainer>
      <S.BackgroundMap src={currentBackground} />

      {dungeon.length > 0 && (
        <S.DungeonContainer
          width={dungeon[0].length * 64}
          height={dungeon.length * 64}
        >
          {/* Комнаты */}
          <S.Rooms columns={dungeon[0].length} rows={dungeon.length}>
            {dungeon.map((row, y) =>
              row.map((room, x) => (
                <S.RoomContainer
                  gridColumn={x + 1}
                  gridRow={y + 1}
                  key={room.id}
                >
                  {renderRoom(room)}
                </S.RoomContainer>
              )),
            )}
          </S.Rooms>
        </S.DungeonContainer>
      )}

      <S.ControlsContainer>
        {isDungeonExit &&
          (type === DUNGEONS.STORY ||
            (type === DUNGEONS.FIND && isQuestCompleted)) && (
            <S.LeaveDungeonButton onClick={handleEscapeFromDungeon}>
              Выйти из подземелья
            </S.LeaveDungeonButton>
          )}

        <S.GuideButtonContainer
          onMouseEnter={handleMapVisibilityChange}
          onMouseLeave={handleMapVisibilityChange}
        >
          <QuestionMarkIcon />
        </S.GuideButtonContainer>
      </S.ControlsContainer>

      <S.MovementsContainer>
        <S.MovementButton
          canMove={isAbleToMoveUp}
          onClick={() => movePlayer(DIRECTIONS.UP)}
          disabled={!isAbleToMoveUp}
        >
          <Typography fontFamily="inherit">↑</Typography>
        </S.MovementButton>

        <Stack direction="row" gap={6}>
          <S.MovementButton
            canMove={isAbleToMoveLeft}
            onClick={() => movePlayer(DIRECTIONS.LEFT)}
            disabled={!isAbleToMoveLeft}
          >
            <Typography fontFamily="inherit">←</Typography>
          </S.MovementButton>

          <S.MovementButton
            canMove={isAbleToMoveRight}
            onClick={() => movePlayer(DIRECTIONS.RIGHT)}
            disabled={!isAbleToMoveRight}
          >
            <Typography fontFamily="inherit">→</Typography>
          </S.MovementButton>
        </Stack>

        <S.MovementButton
          canMove={isAbleToMoveDown}
          onClick={() => movePlayer(DIRECTIONS.DOWN)}
          disabled={!isAbleToMoveDown}
        >
          <Typography fontFamily="inherit">↓</Typography>
        </S.MovementButton>
      </S.MovementsContainer>

      {isMapVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={MAP_LEGEND_STYLES}
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
              <span style={{ color: "#fbbf24" }}>Золотая рамка</span> - Текущая
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
    </S.MainContainer>
  );
};
