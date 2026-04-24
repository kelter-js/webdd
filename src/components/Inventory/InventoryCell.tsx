import { FC, useState, MouseEvent, useMemo } from "react";
import { useDrag } from "react-dnd";

import { InventoryCellProps } from "./components/CharacterCell/types";
import { ItemDataModal } from "../../common/ItemDataModal";
import { ItemIconContainer } from "../../common";
import { Item } from "../../types/gameState";
import { getItemIcon } from "../../utils";
import emptySlot from "../../assets/static/empty_slot.png";
import { InventoryCellContainer, ItemContainer } from "./Inventory.styled";

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
    type,
    item,
    canDrag: true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const itemIcon = useMemo(() => {
    if (item?.baseId) {
      return getItemIcon(type, item.baseId);
    }
  }, [type, item?.baseId]);

  return (
    <InventoryCellContainer
      isDragging={isDragging}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={(node: any) => {
        drag(node);
      }}
    >
      <ItemContainer>
        <img src={emptySlot} style={{ width: "100%", height: "100%" }} />

        <ItemIconContainer src={itemIcon} />
      </ItemContainer>

      {item && anchorEl && (
        <ItemDataModal
          open={open}
          anchorEl={isDragging ? undefined : anchorEl}
          item={item}
          displayDescription
        />
      )}
    </InventoryCellContainer>
  );
};
