import { AlertColor } from "@mui/material";

export interface PlayerContextData {
  players: Record<string, string>; // key = id плеера, value = src
  handleSetSrc: (id: string, newSrc: string) => void;
  getPlayerRef: (id: string) => HTMLAudioElement | null | undefined;
  handleRemoveSrc: (id: string) => void;
}

export type SnackbarContextType = {
  showSnackbar: (message: string, severity?: AlertColor) => void;
};
