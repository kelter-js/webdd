import { FC, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

import { CLASS_BY_GUN_TYPE_MAPPING } from "../../../../../../constants/characters";
import { ItemDataModal } from "../../../../../../common/ItemDataModal";
import { ItemIconContainer } from "../../../../../../common";
import { GEAR_SLOTS } from "../../../../../../entities/gear";
import { Item } from "../../../../../../types/gameState";
import { useGameState } from "../../../../../../stores";
import { getItemIcon } from "../../../../../../utils";
import { ShopItemProps } from "./types";
import emptySlot from "../../../../../../assets/static/empty_slot.png";
import { ShopItemContainer } from "./ShopItem.styled";

export const ShopItem: FC<ShopItemProps> = ({
  isHovered,
  top,
  left,
  itemData,
  onBlur,
  onHover,
  onClick,
}) => {
  const { gunType, type } = itemData ?? {};

  const {
    gear,
    player: { party, gold },
  } = useGameState();

  const sameTypeGearEquipped = useMemo(() => {
    if (isHovered && gear) {
      if (type === GEAR_SLOTS.WEAPON) {
        const availableClassByGunType = CLASS_BY_GUN_TYPE_MAPPING[gunType!];

        const characterName = party.find(
          (character) => character.characterClass === availableClassByGunType,
        )?.name;

        if (characterName && gear[characterName]) {
          const currentlyEquippedGun = gear[characterName].find(
            (item) => item.type === GEAR_SLOTS.WEAPON,
          );

          if (currentlyEquippedGun) {
            return [{ name: characterName, item: currentlyEquippedGun }];
          }

          return [];
        }

        return [];
      }

      return Object.entries(gear).reduce<{ name: string; item: Item }[]>(
        (acc, [name, items]) => {
          const item = items.find((item) => item.type === type);

          if (item) {
            acc.push({ name, item });
          }

          return acc;
        },
        [],
      );
    }

    return [];
  }, [gunType, type, isHovered, gear]);

  const itemRef = useRef<HTMLDivElement>(null);

  const itemIcon = useMemo(() => {
    if (itemData?.type && itemData?.baseId) {
      return getItemIcon(itemData.type, itemData.baseId);
    }
  }, [itemData?.type, itemData?.baseId]);

  return (
    <ShopItemContainer
      isEmptySlot={!itemData}
      top={top}
      left={left}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      ref={itemRef}
      onClick={() => {
        if (itemData) {
          onClick(itemData?.gearId, itemData?.price);
        }
      }}
    >
      <img src={emptySlot} style={{ width: "100%", height: "100%" }} />

      <ItemIconContainer src={itemIcon} />

      {itemData &&
        itemRef.current &&
        createPortal(
          <ItemDataModal
            open={isHovered}
            anchorEl={itemRef.current}
            item={itemData}
            sameGear={sameTypeGearEquipped}
            gold={gold}
          />,
          document.body,
        )}
    </ShopItemContainer>
  );
};
