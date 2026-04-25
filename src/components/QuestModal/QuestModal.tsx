import { Stack } from "@mui/material";

import { AVAILABLE_QUESTS_TYPES } from "../../Views/Settlement/constants";
import { useAppState } from "../../stores";
import { GameModal } from "../GameModal";
import { QuestCard } from "../QuestCard";

export const QuestModal = () => {
  const { toggleQuestModal, isQuestModalOpen } = useAppState();

  if (!isQuestModalOpen) return null;

  return (
    <GameModal onClose={toggleQuestModal}>
      <Stack direction="row" justifyContent="space-between">
        {AVAILABLE_QUESTS_TYPES.map((type) => (
          <QuestCard type={type} key={type} />
        ))}
      </Stack>
    </GameModal>
  );
};
