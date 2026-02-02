import { useEffect } from "react";

import { useAppState, useGameState, useGameSaves } from "../stores/";
import { RENDER_LOCATIONS } from "../entities/renderLocations";
import { ROOM_TYPES } from "../entities/room";
import { useSnackbar } from "../contexts/Snackbar";

// REFACTORING CHECKED ✅

export const useGlobalListeners = () => {
  const {
    isMenuOpen,
    resetMenu,
    saveMode,
    toggleMenu,
    isDialogueOpen,
    setDialogueOpen,
    selectedEnemy,
    setSelectedEnemy,
    isAudioEnabled,
  } = useAppState();

  const {
    toggleInventory,
    toggleCharacterPanel,
    player: { name, locationState, location, isGameOver, sliderId, battle },
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

  const getNextTargetIndex = () => {
    const aliveEnemies =
      battle?.enemy?.party?.filter((enemy) => enemy.health > 0)?.length || 0;

    console.log("aliveEnemies", aliveEnemies);
    if (aliveEnemies <= 1) {
      return 0;
    }

    switch (aliveEnemies) {
      case 2: {
        if (selectedEnemy === 1) {
          return 0;
        }

        return 1;
      }

      case 3: {
        if (selectedEnemy === 1) {
          return 2;
        }

        if (selectedEnemy === 2) {
          return 0;
        }

        return 1;
      }

      default: {
        return 0;
      }
    }
  };

  const getPreviousTargetIndex = () => {
    const aliveEnemies =
      battle?.enemy?.party?.filter((enemy) => enemy.health > 0)?.length || 0;

    console.log("aliveEnemies", aliveEnemies);
    if (aliveEnemies <= 1) {
      return 0;
    }

    switch (aliveEnemies) {
      case 2: {
        if (selectedEnemy === 1) {
          return 0;
        }

        return 1;
      }

      case 3: {
        if (selectedEnemy === 1) {
          return 0;
        }

        if (selectedEnemy === 2) {
          return 1;
        }

        return 2;
      }

      default: {
        return 0;
      }
    }
  };

  useEffect(() => {
    const handleKeyBindings = (event: KeyboardEvent) => {
      if (
        isGameInitiated &&
        !hasChallenge &&
        !isGameOver &&
        !sliderId &&
        isAudioEnabled
      ) {
        if (event.key === "Escape") {
          if (locationState === RENDER_LOCATIONS.LEVELING) {
            toggleCharacterPanel();
            return;
          }

          if (isDialogueOpen && !location?.specialEncounter) {
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

        if (
          event.code === "KeyA" &&
          locationState === RENDER_LOCATIONS.BATTLE &&
          (battle?.enemy?.party?.length || 0) > 1
        ) {
          console.log("we fire ", getPreviousTargetIndex());
          setSelectedEnemy(getPreviousTargetIndex());
        }

        if (
          event.code === "KeyD" &&
          locationState === RENDER_LOCATIONS.BATTLE &&
          (battle?.enemy?.party?.length || 0) > 1
        ) {
          console.log("we fire ", getNextTargetIndex());
          setSelectedEnemy(getNextTargetIndex());
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
    sliderId,
    battle,
    selectedEnemy,
    isAudioEnabled,
    location?.specialEncounter,
  ]);
};
