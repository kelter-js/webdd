import { useEffect } from "react";

import { useAppState, useGameState, useGameSaves } from "../stores/";
import { getNextTargetIndex, getPrevTargetIndex } from "../utils";
import { RENDER_LOCATIONS } from "../entities/renderLocations";
import { ROOM_TYPES } from "../entities/room";
import { useSnackbar } from "../contexts/Snackbar";
import { usePlayer } from "../contexts/Player";
import { SELL_SFX_ID } from "../constants";
import sellSfx from "../assets/audio/sell.mp3";
import { TURN_STATES } from "../entities";

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
    isTradeModalOpen,
    isCraftMenuOpen,
  } = useAppState();

  const {
    toggleInventory,
    toggleCharacterPanel,
    player: { name, locationState, location, isGameOver, sliderId, battle },
    setState,
    sellJunk,
  } = useGameState();

  const { handleSetSrc } = usePlayer();

  const handleSellJunk = () => {
    sellJunk();
    handleSetSrc(SELL_SFX_ID, sellSfx);
  };

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
      if (
        isGameInitiated &&
        !hasChallenge &&
        !isGameOver &&
        !sliderId &&
        isAudioEnabled
      ) {
        if (event.key === "Escape") {
          if (
            locationState === RENDER_LOCATIONS.BATTLE ||
            locationState === RENDER_LOCATIONS.SPECIAL_ENCOUNTER ||
            locationState === RENDER_LOCATIONS.DUNGEON
          ) {
            return;
          }

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
          if (!isCraftMenuOpen) {
            toggleInventory();
          }
        }

        if (event.code === "KeyR" && isTradeModalOpen) {
          handleSellJunk();
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
          battle?.turn === TURN_STATES.PLAYER_TURN &&
          (battle?.enemy?.party?.length || 0) > 1
        ) {
          setSelectedEnemy(
            getPrevTargetIndex(selectedEnemy, battle.enemy.party),
          );
        }

        if (
          event.code === "KeyD" &&
          locationState === RENDER_LOCATIONS.BATTLE &&
          battle?.turn === TURN_STATES.PLAYER_TURN &&
          (battle?.enemy?.party?.length || 0) > 1
        ) {
          setSelectedEnemy(
            getNextTargetIndex(selectedEnemy, battle.enemy.party),
          );
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
    isTradeModalOpen,
    isCraftMenuOpen,
  ]);
};
