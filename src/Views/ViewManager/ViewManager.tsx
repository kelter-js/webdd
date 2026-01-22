import { RENDER_LOCATIONS } from "../../entities";
import { LevelingMock } from "../../components/Leveling/LevelingMock";
import { Inventory } from "../../components/Inventory";
import { Map } from "../../components/Map";
import { Battle } from "../../components/Battle";
import { MenuLayout } from "../MenuLayout";
import { Settlement } from "../Settlement";
import { useAppState, useGameState } from "../../stores";
import { InfoBar } from "../../components/InfoBar/InfoBar";
import { LevelUp, Shake } from "../../common";

export const ViewManager = () => {
  const {
    player: { locationState, sliderId },
  } = useGameState();

  // const { isModalOpen, toggleModal } = useAppState();

  const isServiceLayoutVisible =
    locationState !== RENDER_LOCATIONS.BATTLE &&
    locationState !== RENDER_LOCATIONS.INVENTORY &&
    locationState !== RENDER_LOCATIONS.LEVELING &&
    !sliderId;

  return (
    <Shake>
      {/* <DiceRollModal /> */}
      {locationState === RENDER_LOCATIONS.LEVELING && <LevelingMock />}

      {locationState === RENDER_LOCATIONS.SETTLEMENT && <Settlement />}
      {locationState === RENDER_LOCATIONS.INVENTORY && <Inventory />}
      {locationState === RENDER_LOCATIONS.BATTLE && <Battle />}
      {locationState === RENDER_LOCATIONS.DUNGEON && <Map />}
      {isServiceLayoutVisible && <MenuLayout />}
      {isServiceLayoutVisible && <InfoBar />}
      {/* <LevelUp /> */}
    </Shake>
  );
};
