import { FC, useState, MouseEvent, useMemo } from "react";
import { InventoryCellProps } from "./types";
import { Popper, Stack, Typography } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";

import emptySlot from "../../assets/static/empty_slot.png";
import { Item } from "../../types/gameState";

import { ItemDataModal } from "../../common/ItemDataModal/ItemDataModal";
import { getItemIcon } from "../../utils/getItemIcon";

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

  const itemIcon = useMemo(() => {
    if (item?.baseId) {
      return getItemIcon(type, item.baseId);
    }
  }, [type, item?.baseId]);

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
      <Stack
        style={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
        direction="row"
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
      </Stack>

      {item && anchorEl && (
        <ItemDataModal
          open={open}
          anchorEl={isDragging ? undefined : anchorEl}
          item={item}
          displayDescription
        />
      )}
    </Stack>
  );
};
