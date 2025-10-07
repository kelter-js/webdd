import { Room } from "../types";

export const isDeadEnd = (room: Room) =>
  Object.values(room.exits).filter(Boolean).length === 1 &&
  room.type !== "start" &&
  room.type !== "end";
