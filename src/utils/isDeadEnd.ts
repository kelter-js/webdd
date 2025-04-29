import { Room } from "../types";

export const isDeadEnd = (room: Room) => {
  const exits = Object.values(room.exits).filter(Boolean).length;
  return exits === 1 && room.type !== "start" && room.type !== "end";
};
