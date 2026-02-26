import { useCallback, useEffect } from "react";

import { useAppState, useGameSaves, useGameState } from "../stores";
import { useSnackbar } from "../contexts/Snackbar";

// REFACTORING CHECKED ✅

export const useAutoSave = () => {
  const { isAutoSaveRequired, toggleAutoSave } = useAppState();
  const { showSnackbar } = useSnackbar();
  const { autoSave } = useGameSaves();
  const { player } = useGameState();

  const handleAutoSave = useCallback(() => {
    console.log("so we triggered?");
    autoSave(player);
    showSnackbar("Автосохранение");
  }, [player]);

  useEffect(() => {
    if (isAutoSaveRequired) {
      console.log("so we triggered autosave??");
      toggleAutoSave();
      handleAutoSave();
    }
  }, [isAutoSaveRequired, handleAutoSave, toggleAutoSave]);

  return handleAutoSave;
};
