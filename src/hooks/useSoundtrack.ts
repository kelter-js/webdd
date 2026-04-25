import { useEffect } from "react";

import dungeonAmbient from "../assets/audio/dungeon_ambient.mp3";
import battleAmbient from "../assets/audio/battle_ambient.mp3";
import settlementAmbient from "../assets/audio/settlement.mp3";
import { useAppState, useGameState } from "../stores";
import { RENDER_LOCATIONS } from "../entities";
import { usePlayer } from "../contexts/Player";

const AMBIENT_DUNGEON_SOUNDTRACK = "ambient_dungeon";
const AMBIENT_SETTLEMENT_SOUNDTRACK = "ambient_settlement";
const AMBIENT_BATTLE_SOUNDTRACK = "ambient_battle";

export const useSoundtrack = (loaded: boolean) => {
  const { handleSetSrc, handleRemoveSrc } = usePlayer();
  const { isAudioEnabled } = useAppState();

  const {
    player: { locationState, prevLocationState },
  } = useGameState();

  useEffect(() => {
    if (
      (locationState === RENDER_LOCATIONS.DUNGEON ||
        prevLocationState === RENDER_LOCATIONS.DUNGEON) &&
      loaded &&
      isAudioEnabled
    ) {
      handleRemoveSrc(AMBIENT_SETTLEMENT_SOUNDTRACK);
      handleRemoveSrc(AMBIENT_BATTLE_SOUNDTRACK);
      handleSetSrc(AMBIENT_DUNGEON_SOUNDTRACK, dungeonAmbient, true);
    }

    if (
      (locationState === RENDER_LOCATIONS.SETTLEMENT ||
        prevLocationState === RENDER_LOCATIONS.SETTLEMENT) &&
      loaded &&
      isAudioEnabled
    ) {
      handleRemoveSrc(AMBIENT_DUNGEON_SOUNDTRACK);
      handleRemoveSrc(AMBIENT_BATTLE_SOUNDTRACK);
      handleSetSrc(AMBIENT_SETTLEMENT_SOUNDTRACK, settlementAmbient, true);
    }

    if (locationState === RENDER_LOCATIONS.BATTLE && loaded && isAudioEnabled) {
      handleRemoveSrc(AMBIENT_DUNGEON_SOUNDTRACK);
      handleSetSrc(AMBIENT_BATTLE_SOUNDTRACK, battleAmbient, true);
    }
  }, [prevLocationState, locationState, loaded, isAudioEnabled]);
};
