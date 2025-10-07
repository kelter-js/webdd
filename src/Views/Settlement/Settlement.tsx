import { Stack } from "@mui/material";

import { ImageMapHighlight } from "../../components/ImageMapHighlight";
import { QUEST_STATUSES } from "../../entities/questStatuses";
import { QuestResults } from "../../components/QuestResults";
import { useGetDialogue, useGetLocation } from "../../hooks";

import { Dialogue } from "../../components/Dialogue";
import { BUILDING_NAMES, LOCATION_NAMES } from "../../constants";
import { useAppState, useGameState } from "../../stores";
import { AVAILABLE_ECONOMIC_TYPES, AVAILABLE_QUESTS_TYPES } from "./constants";
import { GameModal } from "../../components/GameModal";
import { QuestCard } from "../../components/QuestCard";
import { EconomicCard } from "../../components/EconomicCard";

export const Settlement = () => {
  const {
    player: { quest, economic },
  } = useGameState();

  const {
    isDialogueOpen,
    setDialogueOpen,
    toggleQuestModal,
    isQuestModalOpen,
    toggleEconomicModal,
    isEconomicModalOpen,
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
        <GameModal onClose={() => toggleQuestModal()}>
          <Stack direction="row" justifyContent="space-between">
            {AVAILABLE_QUESTS_TYPES.map((type) => (
              <QuestCard type={type} key={type} />
            ))}
          </Stack>
        </GameModal>
      )}

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
