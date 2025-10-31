import { Room } from "../types";
import { ROOM_TYPES } from "../entities/room";

export const isDeadEnd = (room: Room) =>
  Object.values(room.exits).filter(Boolean).length === 1 &&
  room.type !== ROOM_TYPES.START &&
  room.type !== ROOM_TYPES.END;
