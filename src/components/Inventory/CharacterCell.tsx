import { Stack } from "@mui/material";
import { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { InventoryCellProps } from "./types";
import { useGameState } from "../../stores";
import { Item } from "../../types/gameState";
import { GEAR_SLOTS } from "../../entities/gear";
import { CLASS_GUN_RESTRICTIONS } from "../../constants/characters";

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
  const { equipItem } = useGameState();
  console.log("item", item);

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
        equipItem(draggedItem.gearId, name, item?.gearId);
      }

      console.log("we are dropped item", draggedItem);
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
    canDrag: true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (canDrop) {
    console.log("isOver", canDrop);
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
        border: `${canDrop || isDragging ? "5px" : "1px"} solid ${
          canDrop || isDragging ? "gold" : "orange"
        }`,
        height: 100,
        width: 150,
        flexGrow: 1,
        opacity: canDrop ? 0.5 : isDragging ? 0 : 1,
        cursor: "pointer",
      }}
    ></Stack>
  );
};
