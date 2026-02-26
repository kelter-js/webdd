import { RENDER_LOCATIONS } from "../../entities";
import { LevelingContainer } from "../../components/Leveling/LevelingContainer";
import { Inventory } from "../../components/Inventory";
import { Map } from "../../components/Map";
import { Battle } from "../../components/Battle";
import { MenuLayout } from "../MenuLayout";
import { Settlement } from "../Settlement";
import { useAppState, useGameState } from "../../stores";
import { InfoBar } from "../../components/InfoBar/InfoBar";
import { LevelUp, Shake } from "../../common";
import { SpecialEncounterContainer } from "../../components/SpecialEncounters";

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

  return (
    <Shake>
      {/* <DiceRollModal /> */}
      {locationState === RENDER_LOCATIONS.LEVELING && <LevelingContainer />}

      {locationState === RENDER_LOCATIONS.SETTLEMENT && <Settlement />}
      {locationState === RENDER_LOCATIONS.INVENTORY && <Inventory />}
      {locationState === RENDER_LOCATIONS.BATTLE && <Battle />}
      {locationState === RENDER_LOCATIONS.DUNGEON && <Map />}
      {locationState === RENDER_LOCATIONS.SPECIAL_ENCOUNTER && (
        <SpecialEncounterContainer />
      )}
      {isServiceLayoutVisible && <MenuLayout />}
      {isServiceLayoutVisible && <InfoBar />}
      {pushLeveledUpList.length !== 0 && <LevelUp />}
    </Shake>
  );
};
