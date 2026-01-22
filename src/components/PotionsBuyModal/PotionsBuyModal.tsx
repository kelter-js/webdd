import { GameModal } from "../GameModal";
import { useAppState, useGameState } from "../../stores";
import coat from "../../assets/traders/potionsTrader.png";
import { Stack } from "@mui/material";
import { Potion } from "./Potion/Potion";
import { POTION_COORDINATES } from "./constants";
import { useSnackbar } from "../../contexts/Snackbar";

export const PotionsBuyModal = () => {
  const { toggleBuyPotionsModal } = useAppState();
  const { showSnackbar } = useSnackbar();

  const handleCloseModal = () => toggleBuyPotionsModal(false);

  const {
    player: { potionsToBuy, gold },
    buyPotion,
  } = useGameState();

  const handleBuyPotion = (index: number) => {
    try {
      buyPotion(index);
    } catch (err) {
      showSnackbar("Недостаточно золота для покупки");
    }
  };

  console.log("potionsToBuy", potionsToBuy);

  return (
    <GameModal onClose={handleCloseModal} width="500px" height="auto">
      <Stack position="relative">
        <img src={coat} />

        {(potionsToBuy || []).map((potion, index) => (
          <Potion
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
