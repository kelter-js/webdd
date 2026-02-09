import { FC, useEffect, useMemo, useRef } from "react";
import { ShopItemProps } from "./types";
import { useGameState } from "../../../../../../stores";
import { GEAR_SLOTS } from "../../../../../../entities/gear";
import { CLASS_BY_GUN_TYPE_MAPPING } from "../../../../../../constants/characters";

import { ShopItemContainer } from "./ShopItem.styled";
import emptySlot from "../../../../../../assets/static/empty_slot.png";
import { Divider, Stack, Typography } from "@mui/material";
import { getIconByType } from "./utils";
import { createPortal } from "react-dom";

export const ShopItem: FC<ShopItemProps> = ({
  isHovered,
  top,
  left,
  itemData,
  onBlur,
  onHover,
  index,
}) => {
  const { description, gunType, type, value, name, tier, minValue } =
    itemData ?? {};

  const {
    gear,
    player: { party },
  } = useGameState();

  const itemStatsElementRef = useRef<HTMLDivElement>(null);

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

          return [{ name: characterName, item: currentlyEquippedGun }];
        }
      }

      return Object.entries(gear)
        .map(([name, items]) => ({
          name,
          item: items.find((item) => item.type === type),
        }))
        .filter((item) => Boolean(item.item));
    }

    return [];
  }, [gunType, type]);

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

  return (
    <ShopItemContainer
      isEmptySlot={!itemData}
      top={top}
      left={left}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      ref={itemRef}
    >
      <img src={emptySlot} style={{ width: "100%", height: "100%" }} />

      {isHovered &&
        createPortal(
          <Stack
            ref={floatingRef}
            position="fixed"
            zIndex={2000}
            direction="row"
            gap={0.5}
            sx={{
              backdropFilter: "blur(2px)",
            }}
          >
            <Stack
              gap={0.5}
              bgcolor="rgba(30, 20, 10, 0.50)"
              border="1px solid rgba(192, 160, 128, 0.3)"
              justifyContent="flex-start"
              alignItems="center"
              p={1}
              ref={itemStatsElementRef}
              maxHeight="80px"
              minWidth="120px"
            >
              <Typography fontFamily="inherit" variant="h6" whiteSpace="pre">
                {name} (MK{tier})
              </Typography>

              <Stack
                direction="row"
                gap={1}
                alignItems="center"
                justifyContent="center"
              >
                <div>{getIconByType(type!)}</div>

                <Typography fontFamily="inherit" variant="h6">
                  {minValue && `${minValue} - `} {value}
                </Typography>
              </Stack>
            </Stack>

            {hasSomeGearEquipped && (
              <Stack
                bgcolor="rgba(30, 20, 10, 0.50)"
                border="1px solid rgba(192, 160, 128, 0.3)"
                justifyContent="center"
                alignItems="center"
                p={0.2}
              >
                <Typography fontFamily="inherit" variant="h6">
                  Экипировано:
                </Typography>

                {sameTypeGearEquipped.map((gear, index, self) => (
                  <Stack
                    key={`${gear?.name}-${index}`}
                    borderBottom={
                      self.length !== index + 1
                        ? "3px solid rgba(192, 160, 128,1)"
                        : "none"
                    }
                  >
                    <Typography
                      fontFamily="inherit"
                      variant="h6"
                      mb={0.2}
                      textAlign="center"
                    >
                      {gear.name}
                    </Typography>

                    {gear.item && (
                      <Stack
                        direction={
                          gear.item.type === GEAR_SLOTS.WEAPON
                            ? "column"
                            : "row"
                        }
                        alignItems="center"
                        justifyContent="center"
                        gap={gear.item.type === GEAR_SLOTS.WEAPON ? 0 : 0.4}
                      >
                        <Typography fontFamily="inherit" variant="h6">
                          {gear.item.name} (MK{gear.item.tier})
                        </Typography>

                        <Stack direction="row">
                          <div>{getIconByType(gear?.item?.type)}</div>

                          {gear.item.type !== GEAR_SLOTS.ARTIFACT && (
                            <Typography fontFamily="inherit" variant="h6">
                              {gear.item?.minValue &&
                                `${gear.item?.minValue} - `}{" "}
                              {gear.item.value}
                            </Typography>
                          )}

                          {gear.item.type === GEAR_SLOTS.ARTIFACT && (
                            <Typography fontFamily="inherit" variant="h6">
                              {gear.item.description}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    )}

                    <Divider />
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>,
          document.body,
        )}
    </ShopItemContainer>
  );
};
