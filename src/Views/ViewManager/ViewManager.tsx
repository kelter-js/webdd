import { LevelingContainer } from "../../components/Leveling/LevelingContainer";
import { SpecialEncounterContainer } from "../../components/SpecialEncounters";
import { InfoBar } from "../../components/InfoBar/InfoBar";
import { BattleContainer } from "../../components/Battle";
import { useAppState, useGameState } from "../../stores";
import { Inventory } from "../../components/Inventory";
import { RENDER_LOCATIONS } from "../../entities";
import { LevelUp, Shake } from "../../common";
import { Map } from "../../components/Map";
import { MenuLayout } from "../MenuLayout";
import { Settlement } from "../Settlement";

export const ViewManager = () => {
  const {
    player: { locationState, sliderId },
  } = useGameState();

  const { pushLeveledUpList } = useAppState();

  const isServiceLayoutVisible =
    locationState !== RENDER_LOCATIONS.BATTLE &&
    locationState !== RENDER_LOCATIONS.INVENTORY &&
    locationState !== RENDER_LOCATIONS.LEVELING &&
    locationState !== RENDER_LOCATIONS.SPECIAL_ENCOUNTER &&
    !sliderId;

  const isMenuVisible =
    locationState !== RENDER_LOCATIONS.DUNGEON && isServiceLayoutVisible;

  return (
    <Shake>
      {locationState === RENDER_LOCATIONS.LEVELING && <LevelingContainer />}

      {locationState === RENDER_LOCATIONS.SETTLEMENT && <Settlement />}

      {locationState === RENDER_LOCATIONS.INVENTORY && <Inventory />}

      {locationState === RENDER_LOCATIONS.BATTLE && <BattleContainer />}

      {locationState === RENDER_LOCATIONS.DUNGEON && <Map />}

      {locationState === RENDER_LOCATIONS.SPECIAL_ENCOUNTER && (
        <SpecialEncounterContainer />
      )}

      {isMenuVisible && <MenuLayout />}

      {isServiceLayoutVisible && <InfoBar />}

      {pushLeveledUpList.length !== 0 && <LevelUp />}
    </Shake>
  );
};
