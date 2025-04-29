import { useEffect } from "react";
import { Map } from "./components/Map";
import { GameState } from "./types";
import { useGameSaves } from "./stores/GameSave";
import { SaveList } from "./components/SaveList";
import { SnackbarProvider } from "./contexts/Snackbar";
import { ImageMapHighlight } from "./components/PatternBackground";

export const App = () => {
  const { gameSaves } = useGameSaves();
  console.log(gameSaves);

  return (
    <SnackbarProvider>
      <Map />
      <SaveList isLoadMode />
    </SnackbarProvider>
  );
};
