import { Fragment, RefObject, FC } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { PartialOptions } from "overlayscrollbars";
import { Typography } from "@mui/material";
import { useDrop } from "react-dnd";

import { DragItemWithMeta, InventoryContainerProps } from "./types";
import { useSortedInventory } from "./hooks/useSortedInventory";
import {
  INVENTORY_ACCEPT_TYPES,
  INVENTORY_SCROLLBAR_CONFIG,
  SCROLLBAR_STYLES,
} from "./constants";
import { InventoryCell } from "./InventoryCell";
import { useGameState } from "../../stores";

import * as S from "./Inventory.styled";

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

  const inventoryList = useSortedInventory({
    inventory,
    searchTerm,
    tier,
    upgradeTier,
    classFilter,
  });

  const isEmptyInventory = inventoryList.length === 0;

  return (
    <OverlayScrollbarsComponent
      options={INVENTORY_SCROLLBAR_CONFIG as PartialOptions}
      defer
      style={SCROLLBAR_STYLES}
    >
      <S.MainInventoryContainer
        ref={drop as unknown as RefObject<HTMLDivElement>}
      >
        {isOver && <S.DroppableArea />}

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
      </S.MainInventoryContainer>
    </OverlayScrollbarsComponent>
  );
};
