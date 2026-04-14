import { Fragment, RefObject } from "react";
import { InventoryCell } from "./InventoryCell";
import { useDrop } from "react-dnd";
import { Stack, Typography } from "@mui/material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useGameState } from "../../stores";
import { GEAR_SLOTS } from "../../entities/gear";
import { DragItemWithMeta } from "./CharacterCell";
import * as S from "./Inventory.styled";

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
              background: "rgba(8, 5, 2, 0.85)",
              backdropFilter: "blur(2px)",
              border: "2px solid rgba(100, 60, 35, 0.8)",
              boxShadow:
                "inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(180, 60, 30, 0.3)",
              zIndex: 9999999999999999,

              "&::before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle at 30% 40%, rgba(70, 30, 15, 0.4), transparent)",
                pointerEvents: "none",
              },
              "&::after": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                opacity: 0.25,
                pointerEvents: "none",
              },
              animation: "pulseDark 0.8s ease-in-out infinite alternate",
              "@keyframes pulseDark": {
                "0%": {
                  boxShadow:
                    "inset 0 0 20px rgba(0, 0, 0, 0.9), 0 0 10px rgba(120, 50, 30, 0.3)",
                  borderColor: "rgba(100, 60, 35, 0.7)",
                },
                "100%": {
                  boxShadow:
                    "inset 0 0 25px rgba(0, 0, 0, 1), 0 0 20px rgba(180, 70, 40, 0.6)",
                  borderColor: "rgba(160, 80, 45, 0.9)",
                },
              },
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
