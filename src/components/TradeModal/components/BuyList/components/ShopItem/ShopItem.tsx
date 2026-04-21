import { FC, useEffect, useMemo, useRef } from "react";
import { ShopItemProps } from "./types";
import { useGameState } from "../../../../../../stores";
import { GEAR_SLOTS } from "../../../../../../entities/gear";
import { CLASS_BY_GUN_TYPE_MAPPING } from "../../../../../../constants/characters";

import { ShopItemContainer } from "./ShopItem.styled";
import emptySlot from "../../../../../../assets/static/empty_slot.png";

import { createPortal } from "react-dom";

import { ItemDataModal } from "../../../../../../common/ItemDataModal";
import { getItemIcon } from "../../../../../../utils";

export const ShopItem: FC<ShopItemProps> = ({
  isHovered,
  top,
  left,
  itemData,
  onBlur,
  onHover,
  index,
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

      return Object.entries(gear)
        .map(([name, items]) => ({
          name,
          item: items.find((item) => item.type === type),
        }))
        .filter((item) => Boolean(item.item));
    }

    return [];
  }, [gunType, type, isHovered, gear]);

  const hasSomeGearEquipped = Boolean(sameTypeGearEquipped.length);

  useEffect(() => {
    if (!isHovered) return;
    if (!itemRef.current || !floatingRef.current) return;

    const anchor = itemRef.current.getBoundingClientRect();
    const floating = floatingRef.current;

    const gap = 8;

    let top = anchor.bottom + gap;
    let left = anchor.left;

    const floatingRect = floating.getBoundingClientRect();

    if (top + floatingRect.height > window.innerHeight) {
      top = anchor.top - floatingRect.height - gap;
    }

    if (left + floatingRect.width > window.innerWidth) {
      left = window.innerWidth - floatingRect.width - 8;
    }

    top = Math.max(8, top);
    left = Math.max(8, left);

    floating.style.top = `${top}px`;
    floating.style.left = `${left}px`;
  }, [isHovered, index, hasSomeGearEquipped]);

  const itemRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

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
      <img
        src={itemIcon}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          objectFit: "contain",
        }}
      />

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
