import { useState } from "react";

import { DEFAULT_SLOTS, GRID_ITEM_COORDINATES } from "./constants";
import { useSnackbar } from "../../../../contexts/Snackbar";
import { usePlayer } from "../../../../contexts/Player";
import { SELL_SFX_ID } from "../../../../constants";
import { useGameState } from "../../../../stores";
import { ShopItem } from "./components/ShopItem";
import buyBackground from "../../../../assets/static/gun_trader.png";
import sellSfx from "../../../../assets/audio/sell.mp3";
import { BackgroundFiller, Container } from "./BuyList.styled";

export const BuyList = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const {
    sell_inventory,
    buyItem,
    player: { gold },
  } = useGameState();

  const { showSnackbar } = useSnackbar();
  const { handleSetSrc } = usePlayer();

  const sellInventory = sell_inventory || [];
  const handleBlur = () => setHoveredIndex(null);

  const handleBuy = (itemId: string, price: number) => {
    if (price > gold) {
      showSnackbar("Недостаточно денег!");
    } else {
      buyItem(itemId);
      handleSetSrc(SELL_SFX_ID, sellSfx);
    }
  };

  return (
    <Container>
      <BackgroundFiller src={buyBackground} />

      {DEFAULT_SLOTS.map((_, index) => (
        <ShopItem
          top={GRID_ITEM_COORDINATES[index].y}
          left={GRID_ITEM_COORDINATES[index].x}
          key={sellInventory[index]?.gearId ?? index}
          itemData={sellInventory[index]}
          isHovered={index === hoveredIndex}
          onHover={() => {
            if (sellInventory[index]) {
              setHoveredIndex(index);
            }
          }}
          onBlur={handleBlur}
          onClick={handleBuy}
        />
      ))}
    </Container>
  );
};
