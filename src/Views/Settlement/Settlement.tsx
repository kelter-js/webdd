import { ImageMapHighlight } from "../../components/ImageMapHighlight";
import { QuestModal } from "../../components/QuestModal/QuestModal";
import { PotionsBuyModal } from "../../components/PotionsBuyModal";
import { DungeonContainer } from "../../components/DungeonCard";
import { EconimicModal } from "../../components/EconimicModal";
import { QuestResults } from "../../components/QuestResults";
import { useGetDialogue, useGetLocation } from "../../hooks";
import { AlmanacModal } from "../../components/AlmanacModal";
import { useAppState, useGameState } from "../../stores";
import { TradeModal } from "../../components";
import { CraftModal } from "../../components/CraftModal";
import { BuyTorches } from "../../components/BuyTorches";
import { Dialogue } from "../../components/Dialogue";
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
