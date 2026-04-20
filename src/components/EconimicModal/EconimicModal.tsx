import { Stack } from "@mui/material";

import { AVAILABLE_ECONOMIC_TYPES } from "../../Views/Settlement/constants";
import { EconomicCard } from "../EconomicCard";
import { useAppState } from "../../stores";
import { GameModal } from "../GameModal";

export const EconimicModal = () => {
  const { toggleEconomicModal, isEconomicModalOpen } = useAppState();

  if (!isEconomicModalOpen) return null;

  return (
    <GameModal onClose={() => toggleEconomicModal()}>
      <Stack direction="row" justifyContent="space-between">
        {AVAILABLE_ECONOMIC_TYPES.map((type) => (
          <EconomicCard type={type} key={type} />
        ))}
      </Stack>
    </GameModal>
  );
};
