import { useGameState } from "../../../../stores";
import buyBackground from "../../../../assets/static/gun_trader.png";
import { BackgroundFiller, Container } from "./BuyList.styled";
import { DEFAULT_SLOTS, GRID_ITEM_COORDINATES } from "./constants";
import { useState } from "react";
import { ShopItem } from "./components/ShopItem";

export const BuyList = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // MOCK: заменить potionsToBuy на itemToBuy - в listToBuy мы их демемоизируем и выводим список, значения пока не готовы в сторе
  const { sell_inventory } = useGameState();
  const sellInventory = sell_inventory || [];
  const handleBlur = () => setHoveredIndex(null);

  // на уровне хука инициализации нужно проверять - есть не сгенерирован ассортимент - генерить и класть в itemToBuy в мемоизированном состоянии
  // потом здесь

  return (
    <Container>
      <BackgroundFiller src={buyBackground} />

      {DEFAULT_SLOTS.map((_, index) => (
        <ShopItem
          index={index + 1}
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
        />
      ))}
    </Container>
  );
};
