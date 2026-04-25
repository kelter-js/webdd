import { POSITIONS } from "./entities";

export interface BloodDropsProps {
  count: number;
}

export interface ShardsProps extends BloodDropsProps {
  color: string;
}

export interface OrnamentProps {
  position: POSITIONS;
}

export interface TurnIndicatorProps {
  show: boolean;
  text: string;
}
