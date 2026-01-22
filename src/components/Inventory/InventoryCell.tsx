import { FC } from "react";
import { InventoryCellProps } from "./types";
import { Stack } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";

import emptySlot from "../../assets/static/empty_slot.png";

const ITEM_TYPE = "INVENTORY_ITEM";

export const InventoryCell: FC<InventoryCellProps> = ({ type, id, index }) => {
  const [{ isDragging }, drag] = useDrag<
    { id: string; index: number; type: any },
    unknown,
    { isDragging: boolean }
  >({
    //Здесь будет указан тип, приходящий из массива инвентаря, чтобы в будущем понимать - шлем, броня или оружие это
    type: ITEM_TYPE,
    item: { id, index, type },
    canDrag: type !== "placeholder",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop<
    { id: string; fromIndex: number },
    unknown,
    { isOver: boolean }
  >(() => ({
    accept: "INVENTORY_ITEM",
    drop: (draggedItem: any) => {
      console.log("we are dropped item", draggedItem);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  if (isDragging) {
    console.log("isDragging", isDragging);
  }

  return (
    <Stack
      ref={(node: any) => {
        drag(node);
        drop(node);
      }}
      sx={{
        border: `${isDragging ? "5px" : "1px"} solid ${
          isDragging ? "gold" : "transparent"
        }`,
        height: 190,
        width: 190,
        flexGrow: 1,
        opacity: isDragging ? 0 : 1,
        cursor: "pointer",
      }}
    >
      <img src={emptySlot} />
    </Stack>
  );
};
