import { AlertColor } from "@mui/material";

export interface PlayerContextData {
  players: AudioFilesData;
  handleSetSrc: (id: string, newSrc: string, hasLoop?: boolean) => void;
  getPlayerRef: (id: string) => HTMLAudioElement | null | undefined;
  handleRemoveSrc: (id: string) => void;
}

export type SnackbarContextType = {
  showSnackbar: (message: string, severity?: AlertColor) => void;
};

export interface AudioFilesData {
  [key: string]: {
    src: string;
    hasLoop: boolean;
  };
}
