import { Stack } from "@mui/material";

import { ImageMapHighlight } from "../../components/ImageMapHighlight";
import { QUEST_STATUSES } from "../../entities/questStatuses";
import { QuestResults } from "../../components/QuestResults";
import { useGetDialogue, useGetLocation } from "../../hooks";

import { Dialogue } from "../../components/Dialogue";
import { BUILDING_NAMES, LOCATION_NAMES } from "../../constants";
import { useAppState, useGameState } from "../../stores";
import {
  AVAILABLE_ECONOMIC_TYPES,
  AVAILABLE_QUESTS_TYPES,
  DUNGEON_TYPES,
} from "./constants";
import { GameModal } from "../../components/GameModal";
import { QuestCard } from "../../components/QuestCard";
import { EconomicCard } from "../../components/EconomicCard";
import { PotionsBuyModal } from "../../components/PotionsBuyModal";
import { AlmanacModal } from "../../components/AlmanacModal";
import { TradeModal } from "../../components/TradeModal";
import { CraftModal } from "../../components/CraftModal";
import { DungeonCard } from "../../components/DungeonCard";

export const Settlement = () => {
  const {
    player: { quest, economic },
    generateDungeon,
  } = useGameState();

  const {
    isDialogueOpen,
    setDialogueOpen,
    toggleQuestModal,
    isQuestModalOpen,
    toggleEconomicModal,
    isEconomicModalOpen,
    isBuyPotionsModalOpen,
    isAlmanacOpen,
    isTradeModalOpen,
    isCraftMenuOpen,
    toggleDungeonModal,
    isDungeonModalOpen,
  } = useAppState();

  const dialogTree = useGetDialogue(isDialogueOpen);

  const { coords, mapImage } = useGetLocation(LOCATION_NAMES.CITY);

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
      if (quest) {
        toggleDungeonModal();
      } else {
        generateDungeon();
      }

      return;
    }

    setDialogueOpen(building);
  };

  const hasQuestResults = quest && quest.status !== QUEST_STATUSES.INITIATED;

  return (
    <>
      <ImageMapHighlight
        onOpen={handleInteractWithBuilding}
        isDialogueOpen={Boolean(dialogTree)}
        mapImage={mapImage}
        coords={coords}
      />

      {dialogTree && <Dialogue dialogueTree={dialogTree} />}

      {hasQuestResults && <QuestResults />}

      {isQuestModalOpen && (
        <GameModal onClose={toggleQuestModal}>
          <Stack direction="row" justifyContent="space-between">
            {AVAILABLE_QUESTS_TYPES.map((type) => (
              <QuestCard type={type} key={type} />
            ))}
          </Stack>
        </GameModal>
      )}

      {isDungeonModalOpen && quest?.type && (
        <GameModal onClose={toggleDungeonModal} width="875px">
          <Stack direction="row" justifyContent="center" gap={5}>
            {[...DUNGEON_TYPES, quest?.type].map((type) => (
              <DungeonCard type={type} key={type} />
            ))}
          </Stack>
        </GameModal>
      )}

      {isBuyPotionsModalOpen && <PotionsBuyModal />}
      {isAlmanacOpen && <AlmanacModal />}
      {isTradeModalOpen && <TradeModal />}
      {isCraftMenuOpen && <CraftModal />}

      {isEconomicModalOpen && (
        <GameModal onClose={() => toggleEconomicModal()}>
          <Stack direction="row" justifyContent="space-between">
            {AVAILABLE_ECONOMIC_TYPES.map((type) => (
              <EconomicCard type={type} key={type} />
            ))}
          </Stack>
        </GameModal>
      )}
    </>
  );
};
