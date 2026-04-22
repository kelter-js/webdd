import { DIRECTIONS } from "../../entities";
import { ROOM_TYPES } from "../../entities/room";

export const COBBLESTONE_TEXTURE = `
  linear-gradient(0deg, 
    #333 1px, #444 1px, #444 2px, 
    #555 2px, #555 3px, #444 3px
  )
`;

export const ROOM_STYLES = {
  [ROOM_TYPES.START]: { bg: "#065f46", symbol: "🚪", color: "white" },
  [ROOM_TYPES.END]: { bg: "#7f1d1d", symbol: "🏁", color: "white" },
  [ROOM_TYPES.STORY_BOSS]: { bg: "#7f1d1d", symbol: "🏁", color: "white" },
  deadEnd: { bg: "#1e293b", symbol: "✖", color: "#f59e0b" },
  visited: { bg: "#334155", symbol: "•", color: "white" },
  unvisited: { bg: "#1e293b", symbol: "?", color: "#64748b" },
};

export const ENCOUNTER_SFX_PLAYER_REF = "encounter";
export const ARROW_MAP = {
  [DIRECTIONS.UP]: "↓",
  [DIRECTIONS.RIGHT]: "←",
  [DIRECTIONS.DOWN]: "↑",
  [DIRECTIONS.LEFT]: "→",
};

export const MAP_LEGEND_STYLES = {
  backgroundColor: "#1e293b",
  padding: 15,
  borderRadius: 5,
  color: "#e2e8f0",
};
