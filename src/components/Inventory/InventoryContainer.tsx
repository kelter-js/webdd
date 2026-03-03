import * as S from "./Inventory.styled";
import { MIN_AMOUNT_OF_ITEMS_PER_ROW } from "./constants";
import { Fragment, RefObject, useMemo } from "react";
import { InventoryCell } from "./InventoryCell";
import { useDrop } from "react-dnd";
import { Stack, Typography } from "@mui/material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useGameState } from "../../stores";
import { GEAR_SLOTS } from "../../entities/gear";
import { DragItemWithMeta } from "./CharacterCell";

export const InventoryContainer = () => {
  const { inventory = [], removeItemFromGear } = useGameState();

  const [{ isOver }, drop] = useDrop<
    DragItemWithMeta,
    unknown,
    { isOver: boolean }
  >(() => ({
    accept: [
      GEAR_SLOTS.ARMOR,
      GEAR_SLOTS.ARTIFACT,
      GEAR_SLOTS.HELMET,
      GEAR_SLOTS.WEAPON,
    ],
    drop: (draggedItem) => {
      const { item, characterName } = draggedItem;
      console.log("item !!!", item);

      if (characterName && item) {
        removeItemFromGear(characterName, item?.gearId);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const inventoryList = inventory || [];
  const isEmptyInventory = inventoryList.length === 0;
  console.log("inventoryList", inventoryList);
  return (
    <OverlayScrollbarsComponent
      options={{
        overflow: {
          y: "scroll", // всегда готов к скроллу
          x: "hidden",
        },
        scrollbars: {
          theme: "os-theme-light",
          autoHide: "scroll",
          autoHideDelay: 800,
          autoHideSuspend: false,
          clickScroll: true,
        },
      }}
      defer
      style={{
        height: "100%", // если родитель имеет высоту
        width: "100%",
        minHeight: 0,
      }}
    >
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={drop as unknown as RefObject<HTMLDivElement>}
      >
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
      </div>
    </OverlayScrollbarsComponent>
  );
};
