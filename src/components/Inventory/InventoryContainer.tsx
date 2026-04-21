import { Fragment, RefObject, FC, useMemo } from "react";
import { InventoryCell } from "./InventoryCell";
import { useDrop } from "react-dnd";
import { Stack, Typography } from "@mui/material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useGameState } from "../../stores";
import { GEAR_SLOTS } from "../../entities/gear";

import * as S from "./Inventory.styled";
import {
  DragItemWithMeta,
  InventoryContainerProps,
  SORT_TYPES_BY_TIER,
  SORT_TYPES_BY_UPGRADE,
} from "./types";
import { Item } from "../../types/gameState";

import { CLASS_GUN_RESTRICTIONS } from "../../constants/characters";
import { INVENTORY_ACCEPT_TYPES } from "./constants";

export const InventoryContainer: FC<InventoryContainerProps> = ({
  searchTerm,
  tier,
  upgradeTier,
  classFilter,
}) => {
  const { inventory = [], removeItemFromGear } = useGameState();
  const [{ isOver }, drop] = useDrop<
    DragItemWithMeta,
    unknown,
    { isOver: boolean }
  >(() => ({
    accept: INVENTORY_ACCEPT_TYPES,
    drop: (draggedItem) => {
      const { item, characterName } = draggedItem;

      if (characterName && item) {
        removeItemFromGear(characterName, item?.gearId);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const inventoryList = useMemo(() => {
    if (!inventory) return [];

    const normalizedSearchTerm = searchTerm?.toLocaleLowerCase();

    return inventory.reduce<Item[]>((acc, item) => {
      let isIncluded = false;

      if (tier) {
        switch (tier) {
          case SORT_TYPES_BY_TIER.FIRST: {
            isIncluded = item.overAllTier === 1;
            break;
          }

          case SORT_TYPES_BY_TIER.SECOND: {
            isIncluded = item.overAllTier === 2;
            break;
          }

          case SORT_TYPES_BY_TIER.THIRD: {
            isIncluded = item.overAllTier === 3;
            break;
          }
        }
      }

      if (upgradeTier) {
        switch (upgradeTier) {
          case SORT_TYPES_BY_UPGRADE.FIRST: {
            isIncluded = item.tier === 1;
            break;
          }

          case SORT_TYPES_BY_UPGRADE.SECOND: {
            isIncluded = item.tier === 2;
            break;
          }

          case SORT_TYPES_BY_UPGRADE.THIRD: {
            isIncluded = item.tier === 3;
            break;
          }
        }
      }

      if (classFilter) {
        if (item.type === GEAR_SLOTS.WEAPON) {
          isIncluded = CLASS_GUN_RESTRICTIONS[classFilter].includes(
            item.gunType!,
          );
        } else {
          return acc;
        }
      }

      if (
        normalizedSearchTerm &&
        item.name.toLocaleLowerCase().includes(normalizedSearchTerm)
      ) {
        isIncluded = true;
      }

      if (
        isIncluded ||
        (!normalizedSearchTerm && !tier && !upgradeTier && !classFilter)
      ) {
        acc.push(item);
      }

      return acc;
    }, []);
  }, [inventory, searchTerm, tier, upgradeTier, classFilter]);

  console.log("inventoryList", inventoryList);

  const isEmptyInventory = inventoryList.length === 0;

  return (
    <OverlayScrollbarsComponent
      options={{
        overflow: {
          y: "scroll", // всегда готов к скроллу
          x: "hidden",
        },
        scrollbars: {
          theme: "os-theme-light",
          autoHide: "scroll",
          autoHideDelay: 800,
          autoHideSuspend: false,
          clickScroll: true,
        },
      }}
      defer
      style={{
        height: "100%", // если родитель имеет высоту
        width: "100%",
        minHeight: 0,
      }}
    >
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={drop as unknown as RefObject<HTMLDivElement>}
      >
        {isOver && (
          <Stack
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(8, 5, 2, 0.85)",
              backdropFilter: "blur(2px)",
              border: "2px solid rgba(100, 60, 35, 0.8)",
              boxShadow:
                "inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(180, 60, 30, 0.3)",
              zIndex: 9999999999999999,

              "&::before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle at 30% 40%, rgba(70, 30, 15, 0.4), transparent)",
                pointerEvents: "none",
              },
              "&::after": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                opacity: 0.25,
                pointerEvents: "none",
              },
              animation: "pulseDark 0.8s ease-in-out infinite alternate",
              "@keyframes pulseDark": {
                "0%": {
                  boxShadow:
                    "inset 0 0 20px rgba(0, 0, 0, 0.9), 0 0 10px rgba(120, 50, 30, 0.3)",
                  borderColor: "rgba(100, 60, 35, 0.7)",
                },
                "100%": {
                  boxShadow:
                    "inset 0 0 25px rgba(0, 0, 0, 1), 0 0 20px rgba(180, 70, 40, 0.6)",
                  borderColor: "rgba(160, 80, 45, 0.9)",
                },
              },
            }}
          ></Stack>
        )}

        {isEmptyInventory && (
          <Typography variant="h4">Пустой инвентарь</Typography>
        )}

        {!isEmptyInventory && (
          <S.InventoryContainer>
            {inventoryList.map((item, index) => (
              <Fragment key={index}>
                <InventoryCell item={item} type={item.type || ""} />
              </Fragment>
            ))}
          </S.InventoryContainer>
        )}
      </div>
    </OverlayScrollbarsComponent>
  );
};
