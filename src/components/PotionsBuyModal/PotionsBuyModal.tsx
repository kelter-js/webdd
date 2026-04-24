import { Stack } from "@mui/material";

import { useAppState, useGameState } from "../../stores";
import { useSnackbar } from "../../contexts/Snackbar";
import { usePlayer } from "../../contexts/Player";
import { POTION_COORDINATES } from "./constants";
import { SELL_SFX_ID } from "../../constants";
import { GameModal } from "../GameModal";
import { Potion } from "./Potion/Potion";
import coat from "../../assets/traders/potionsTrader.png";
import sellSfx from "../../assets/audio/sell.mp3";

export const PotionsBuyModal = () => {
  const { toggleBuyPotionsModal, isBuyPotionsModalOpen } = useAppState();
  const { showSnackbar } = useSnackbar();

  const handleCloseModal = () => toggleBuyPotionsModal(false);
  const { handleSetSrc } = usePlayer();

  const {
    player: { potionsToBuy, gold },
    buyPotion,
  } = useGameState();

  if (!isBuyPotionsModalOpen) return null;

  const handleBuyPotion = (index: number) => {
    try {
      buyPotion(index);
      handleSetSrc(SELL_SFX_ID, sellSfx);
    } catch (err) {
      showSnackbar("Недостаточно золота для покупки");
    }
  };

  return (
    <GameModal onClose={handleCloseModal} width="500px" height="auto">
      <Stack position="relative">
        <img src={coat} />

        {(potionsToBuy || []).map((potion, index) => (
          <Potion
            key={index}
            {...POTION_COORDINATES[index]}
            type={potion.type}
            price={potion.price || 0}
            onBuy={() => handleBuyPotion(index)}
            isDisabled={gold < (potion.price || 0)}
          />
        ))}
      </Stack>
    </GameModal>
  );
};
