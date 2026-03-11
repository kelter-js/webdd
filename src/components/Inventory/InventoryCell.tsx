import { FC, useState, MouseEvent } from "react";
import { InventoryCellProps } from "./types";
import { Popper, Stack, Typography } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";

import emptySlot from "../../assets/static/empty_slot.png";
import { Item } from "../../types/gameState";

import { ItemDataModal } from "../../common/ItemDataModal/ItemDataModal";

export const InventoryCell: FC<InventoryCellProps> = ({ type, item }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleEnter = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [{ isDragging }, drag] = useDrag<
    Item | null | undefined,
    unknown,
    { isDragging: boolean }
  >({
    //Здесь будет указан тип, приходящий из массива инвентаря, чтобы в будущем понимать - шлем, броня или оружие это
    type,
    item,
    canDrag: true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging) {
    console.log("isDragging", isDragging);
  }

  console.log("item", item);

  return (
    <Stack
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={(node: any) => {
        drag(node);
      }}
      sx={{
        border: `${isDragging ? "5px" : "1px"} solid ${
          isDragging ? "gold" : "transparent"
        }`,
        height: 190,
        width: 190,
        flexGrow: 0,
        opacity: isDragging ? 0 : 1,
        cursor: "pointer",
      }}
    >
      <img src={emptySlot} style={{ width: "100%", height: "100%" }} />

      {item && anchorEl && (
        <ItemDataModal open={open} anchorEl={anchorEl} item={item} />
      )}
    </Stack>
  );
};
