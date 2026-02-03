import { FC, useMemo } from "react";
import { ShopItemProps } from "./types";
import { useGameState } from "../../../../../../stores";
import { GEAR_SLOTS } from "../../../../../../entities/gear";
import { CLASS_BY_GUN_TYPE_MAPPING } from "../../../../../../constants/characters";
import { GRID_ITEM_COORDINATES } from "../../constants";
import { ShopItemContainer } from "./ShopItem.styled";
import emptySlot from "../../../../../../assets/static/empty_slot.png";

export const ShopItem: FC<ShopItemProps> = ({
  isHovered,
  top,
  left,
  itemData,
  onBlur,
  onHover,
}) => {
  const { description, gunType, type } = itemData ?? {};

  const {
    gear,
    player: { party },
  } = useGameState();

  if (isHovered) {
    console.log("isHovered", itemData?.description);
  }

  const sameTypeGearEquipped = useMemo(() => {
    if (gear) {
      if (type === GEAR_SLOTS.WEAPON) {
        const availableClassByGunType = CLASS_BY_GUN_TYPE_MAPPING[gunType!];
        const characterName = party.find(
          (character) => character.characterClass === availableClassByGunType,
        )?.name;

        if (characterName && gear[characterName]) {
          const currentlyEquippedGun = gear[characterName].find(
            (item) => item.type === GEAR_SLOTS.WEAPON,
          );

          return [currentlyEquippedGun];
        }
      }

      if (type === GEAR_SLOTS.HELMET || type === GEAR_SLOTS.ARMOR) {
        return Object.entries(gear)
          .map(([name, items]) => ({
            name,
            item: items.find((item) => item.type === type),
          }))
          .filter((item) => Boolean(item.item));
      }
    }

    return null;
  }, [gunType, type]);

  return (
    <ShopItemContainer
      isEmptySlot={!itemData}
      top={top}
      left={left}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
    >
      <img src={emptySlot} style={{ width: "100%", height: "100%" }} />
      {description}
    </ShopItemContainer>
  );
};
