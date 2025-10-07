import { Stack } from "@mui/material";
import { FC, RefObject } from "react";
import { useDrag, useDrop } from "react-dnd";
import { InventoryCellProps } from "./types";

export const CharacterCell: FC<InventoryCellProps> = ({ type, id, index }) => {
  const [{ isOver }, drop] = useDrop<
    { id: string; fromIndex: number },
    unknown,
    { isOver: boolean }
  >(() => ({
    //здесь будет определенный тип в завимости от слота - принимать только шлем например, или броню или оружие
    accept: "INVENTORY_ITEM",
    drop: (draggedItem: any) => {
      console.log("we are dropped item", draggedItem);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag<
    { id: string; index: number; type: any },
    unknown,
    { isDragging: boolean }
  >({
    type: "INVENTORY_ITEM_EQUIPED",
    item: { id, index, type },
    canDrag: type !== "placeholder",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isOver) {
    console.log("isOver", isOver);
  }

  if (isDragging) {
    console.log("isDragging CHARACTER CELL", isDragging);
  }

  // useAutoScroll(isDragging);

  return (
    <Stack
      ref={(node: any) => {
        drag(node);
        drop(node);
      }}
      sx={{
        border: `${isOver || isDragging ? "5px" : "1px"} solid ${
          isOver || isDragging ? "gold" : "orange"
        }`,
        height: 190,
        width: 190,
        flexGrow: 1,
        opacity: isOver ? 0.5 : isDragging ? 0 : 1,
        cursor: "pointer",
      }}
    ></Stack>
  );
};
