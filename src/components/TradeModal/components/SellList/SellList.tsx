import { Button, Stack, Typography } from "@mui/material";
import { useGameState } from "../../../../stores";
import emptySlot from "../../../../assets/static/empty_slot.png";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SELL_SFX_ID } from "../../../../constants";
import sellSfx from "../../../../assets/audio/sell.mp3";
import { usePlayer } from "../../../../contexts/Player";
import { ItemDataModal } from "../../../../common/ItemDataModal/ItemDataModal";
import { getItemIcon } from "../../../../utils/getItemIcon";

export const SellList = () => {
  const { inventory, sellItem } = useGameState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollListElement = useRef<any>(null);

  const currentItemToSellData = (inventory || [])[selectedIndex] || {};
  const { handleSetSrc } = usePlayer();

  const handleSellItem = () => {
    sellItem(currentItemToSellData?.gearId);
    setSelectedIndex(0);
    handleSetSrc(SELL_SFX_ID, sellSfx);
    setTimeout(() => {
      const osInstance = scrollListElement.current?.osInstance();
      if (!osInstance) {
        console.warn("osInstance still not ready");
        return;
      }

      const viewport = osInstance.elements().viewport;

      if (viewport) {
        viewport.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };

  useEffect(() => {
    const handleKeyBindings = (event: KeyboardEvent) => {
      if (event.code === "KeyT") {
        handleSellItem();
      }
    };

    document.addEventListener("keydown", handleKeyBindings);

    return () => {
      document.removeEventListener("keydown", handleKeyBindings);
    };
  }, [currentItemToSellData, sellItem]);

  const hasEmptyInventory = inventory?.length === 0;

  const itemIcon = useMemo(() => {
    if (currentItemToSellData?.type && currentItemToSellData?.baseId) {
      return getItemIcon(
        currentItemToSellData.type,
        currentItemToSellData.baseId,
      );
    }
  }, [currentItemToSellData?.type, currentItemToSellData?.baseId]);

  return (
    <Stack gap={4} pt={6} px={5} direction="row">
      <OverlayScrollbarsComponent
        options={{
          overflow: {
            y: "scroll",
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
          width: "35%",
          height: "550px",
          border: "4px solid rgba(192, 160, 128, 0.3)",
          background: "rgba(0,0,0,0.3)",
          padding: "8px",
        }}
        ref={scrollListElement}
      >
        {!hasEmptyInventory && (
          <Stack gap={1} width="100%" pr={0.5}>
            {(inventory || []).map((item, index) => {
              return (
                <Typography
                  fontFamily="inherit"
                  variant="h5"
                  key={index}
                  p={0.5}
                  onClick={() => setSelectedIndex(index)}
                  sx={{ cursor: "pointer" }}
                  border={`${index === selectedIndex ? "4px" : "2px"} solid ${
                    index === selectedIndex
                      ? "rgba(150, 80, 0, 1)"
                      : "rgba(192, 160, 128, 0.3)"
                  }`}
                >
                  {item.name} MK({item.tier})
                </Typography>
              );
            })}
          </Stack>
        )}

        {hasEmptyInventory && (
          <Typography fontFamily="inherit" variant="h3" p={0.5}>
            Пустой инвентарь
          </Typography>
        )}
      </OverlayScrollbarsComponent>

      {!hasEmptyInventory && (
        <Stack gap={1}>
          <Stack gap={5} direction="row">
            <div
              style={{ width: "190px", height: "190px", position: "relative" }}
            >
              <img
                src={emptySlot}
                style={{ width: "190px", height: "190px" }}
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
            </div>
            <ItemDataModal item={currentItemToSellData} displayDescription />
          </Stack>

          <Stack borderBottom="1px solid #5a3020">
            <Typography fontFamily="inherit" variant="h6">
              Цена:
            </Typography>

            <Typography fontFamily="inherit" variant="h5">
              {currentItemToSellData?.price}
            </Typography>
          </Stack>

          <Button
            sx={{
              position: "absolute",
              bottom: 0,
              right: 270,
              zIndex: 9,
            }}
            onClick={handleSellItem}
          >
            <Typography
              sx={{
                width: "100%",
                color: "#c08040",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: (theme) => theme.spacing(1),
                fontFamily: "Cormorant Unicase",
              }}
              variant="h5"
            >
              Продать предмет [T]
            </Typography>
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
