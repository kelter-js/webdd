import { FC, useState, MouseEvent, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";

import { CLASS_GUN_RESTRICTIONS } from "../../../../constants/characters";
import { ItemDataModal } from "../../../../common/ItemDataModal";
import { GEAR_SLOTS } from "../../../../entities/gear";
import { ItemIconContainer } from "../../../../common";
import { Item } from "../../../../types/gameState";
import { useGameState } from "../../../../stores";
import { getItemIcon } from "../../../../utils";
import { DragItemWithMeta } from "../../types";
import { InventoryCellProps } from "./types";
import frame from "../../../../assets/static/gear_slot_frame.png";
import {
  CharacterCellContainer,
  CharacterCellFrame,
} from "../../Inventory.styled";

export const CharacterCell: FC<InventoryCellProps> = ({
  type,
  item,
  characterClass,
  name,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleEnter = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { equipItem } = useGameState();

  const [{ canDrop }, drop] = useDrop<
    Item | undefined | null,
    unknown,
    { canDrop: boolean }
  >(() => ({
    accept: type,
    canDrop: (item?: Item | null) => {
      if (item) {
        if (
          type === GEAR_SLOTS.WEAPON &&
          item.type === GEAR_SLOTS.WEAPON &&
          characterClass &&
          item.gunType
        ) {
          const currentClassRestrictions =
            CLASS_GUN_RESTRICTIONS[characterClass];

          return currentClassRestrictions.includes(item.gunType);
        }

        return item.type === type;
      }

      return false;
    },
    drop: (draggedItem: Item | undefined | null) => {
      if (draggedItem && name) {
        equipItem(draggedItem.gearId, name, type);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag<
    DragItemWithMeta,
    unknown,
    { isDragging: boolean }
  >({
    type,
    item: {
      item,
      characterName: name,
    },
    canDrag: !!item,
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
    <CharacterCellContainer
      ref={(node: any) => {
        drag(node);
        drop(node);
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      canDrop={canDrop}
      isDragging={isDragging}
      item={Boolean(item)}
    >
      <CharacterCellFrame src={frame} />

      <ItemIconContainer src={itemIcon} />

      {item && anchorEl && (
        <ItemDataModal
          open={open}
          anchorEl={isDragging ? undefined : anchorEl}
          item={item}
          displayDescription
        />
      )}
    </CharacterCellContainer>
  );
};
