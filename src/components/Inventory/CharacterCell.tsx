import { Stack } from "@mui/material";
import { FC, useState, MouseEvent, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { InventoryCellProps } from "./types";
import { useGameState } from "../../stores";
import { Item } from "../../types/gameState";
import { GEAR_SLOTS } from "../../entities/gear";
import { CLASS_GUN_RESTRICTIONS } from "../../constants/characters";
import frame from "../../assets/static/gear_slot_frame.png";
import { ItemDataModal } from "../../common/ItemDataModal/ItemDataModal";
import { getItemIcon } from "../../utils/getItemIcon";

export interface DragItemWithMeta {
  characterName?: string;
  item: Item | undefined | null;
}

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
    //здесь будет определенный тип в завимости от слота - принимать только шлем например, или броню или оружие
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
      canDrop: monitor.canDrop(), // результат canDrop
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
    <Stack
      ref={(node: any) => {
        drag(node);
        drop(node);
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      sx={{
        position: "relative",
        height: 100,
        width: 150,
        flexGrow: 1,
        opacity: canDrop ? 0.8 : isDragging ? 0 : !item ? 0.3 : 1,
        cursor: "pointer",
      }}
    >
      <img
        src={frame}
        style={{
          width: "191px",
          height: "140px",
          position: "relative",
          left: "-21px",
          top: "-30px",
        }}
      />
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
