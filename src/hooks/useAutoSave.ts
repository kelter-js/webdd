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
    autoSave(player);
    showSnackbar("Автосохранение");
  }, [player]);

  useEffect(() => {
    if (isAutoSaveRequired) {
      toggleAutoSave();
      handleAutoSave();
    }
  }, [isAutoSaveRequired, handleAutoSave, toggleAutoSave]);

  return handleAutoSave;
};
