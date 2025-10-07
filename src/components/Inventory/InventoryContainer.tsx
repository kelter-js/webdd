import PerfectScrollbar from "react-perfect-scrollbar";
import * as S from "./Inventory.styled";
import { MIN_AMOUNT_OF_ITEMS_PER_ROW } from "./constants";
import { Fragment, RefObject, useMemo } from "react";
import { InventoryCell } from "./InventoryCell";
import { useDrop } from "react-dnd";
import { Stack } from "@mui/material";

export const InventoryContainer = () => {
  const items = useMemo(
    () =>
      new Array(MIN_AMOUNT_OF_ITEMS_PER_ROW * 3).fill(null).map((_, index) => ({
        id: `item-${index}`,
        type: "item",
      })),
    []
  );

  const [{ isOver }, drop] = useDrop<
    { id: string; fromIndex: number },
    unknown,
    { isOver: boolean }
  >(() => ({
    accept: "INVENTORY_ITEM_EQUIPED",
    drop: (draggedItem: any) => {
      console.log("we are dropped item", draggedItem);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <PerfectScrollbar>
      <S.InventoryContainer ref={drop as unknown as RefObject<HTMLDivElement>}>
        {items.map((item, index) => (
          <Fragment key={index}>
            <InventoryCell id={item.id} index={index} type={item.type} />
          </Fragment>
        ))}
        {isOver && (
          <Stack
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "white",
            }}
          ></Stack>
        )}
      </S.InventoryContainer>
    </PerfectScrollbar>
  );
};
