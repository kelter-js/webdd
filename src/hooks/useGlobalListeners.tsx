import { useEffect } from "react";

import { useAppState } from "../stores/AppState";
import { useGameState } from "../stores/GameState";
import { RENDER_LOCATIONS } from "../entities/renderLocations";
import { ROOM_TYPES } from "../entities/room";
import { useSnackbar } from "../contexts/Snackbar";
import { useGameSaves } from "../stores";

// REFACTORING CHECKED ✅

export const useGlobalListeners = () => {
  const {
    isMenuOpen,
    resetMenu,
    saveMode,
    toggleMenu,
    isDialogueOpen,
    setDialogueOpen,
  } = useAppState();

  const {
    toggleInventory,
    toggleCharacterPanel,
    player: { name, locationState, location, isGameOver },
    setState,
  } = useGameState();

  const { defaultSave } = useGameSaves();

  const isGameInitiated = Boolean(name);
  const { showSnackbar } = useSnackbar();

  const hasChallenge =
    location &&
    location?.position &&
    location?.dungeon?.length &&
    location?.dungeon[location?.position?.x][location?.position?.y]?.type ===
      ROOM_TYPES.END;

  useEffect(() => {
    const handleKeyBindings = (event: KeyboardEvent) => {
      if (isGameInitiated && !hasChallenge && !isGameOver) {
        if (event.key === "Escape") {
          if (isDialogueOpen) {
            setDialogueOpen(null);
            return;
          }

          if (isMenuOpen || saveMode) {
            resetMenu();
          } else {
            toggleMenu();
          }
        }

        if (event.key === "F9") {
          if (defaultSave) {
            setState(defaultSave.gameState);
            showSnackbar("Автосохранение загружено");
          } else {
            showSnackbar("Автосохранения отсутствуют!");
          }
        }

        if (
          event.code === "KeyI" &&
          locationState !== RENDER_LOCATIONS.BATTLE
        ) {
          toggleInventory();
        }

        if (
          event.code === "KeyC" &&
          locationState !== RENDER_LOCATIONS.BATTLE
        ) {
          toggleCharacterPanel();
        }
      }
    };

    document.addEventListener("keydown", handleKeyBindings);

    return () => {
      document.removeEventListener("keydown", handleKeyBindings);
    };
  }, [
    isMenuOpen,
    saveMode,
    isGameInitiated,
    locationState,
    isDialogueOpen,
    hasChallenge,
    defaultSave,
    isGameOver,
  ]);
};
