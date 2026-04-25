import { DIRECTIONS } from "../entities/directions";

export type DirectionTuple = [
  dx: number,
  dy: number,
  exit: DIRECTIONS,
  backExit: DIRECTIONS
];
