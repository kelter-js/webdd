import {
  ImageMapHighlight,
  QuestModal,
  PotionsBuyModal,
  DungeonContainer,
  EconimicModal,
  QuestResults,
  AlmanacModal,
  TradeModal,
  CraftModal,
  BuyTorches,
  Dialogue,
} from "../../components";
import { useGetDialogue, useGetLocation } from "../../hooks";
import { useAppState, useGameState } from "../../stores";
import { BUILDING_NAMES } from "../../constants";

export const Settlement = () => {
  const {
    player: { quest, currentTier },
  } = useGameState();

  const {
    isDialogueOpen,
    setDialogueOpen,
    toggleQuestModal,

    toggleDungeonModal,
  } = useAppState();

  const dialogTree = useGetDialogue(isDialogueOpen);

  const { coords, mapImage } = useGetLocation(currentTier);

  const handleInteractWithBuilding = (building: string) => {
    if (building === BUILDING_NAMES.QUEST_DESK) {
      if (!quest) {
        toggleQuestModal();
      } else {
        setDialogueOpen(building);
      }
      return;
    }

    if (building === BUILDING_NAMES.GRAVEYARD) {
      toggleDungeonModal();

      return;
    }

    setDialogueOpen(building);
  };

  return (
    <>
      <ImageMapHighlight
        onOpen={handleInteractWithBuilding}
        isDialogueOpen={Boolean(dialogTree)}
        mapImage={mapImage}
        coords={coords}
      />

      {dialogTree && <Dialogue dialogueTree={dialogTree} />}

      <QuestResults />

      <QuestModal />

      <DungeonContainer />

      <PotionsBuyModal />

      <AlmanacModal />

      <TradeModal />

      <CraftModal />

      <BuyTorches />

      <EconimicModal />
    </>
  );
};
