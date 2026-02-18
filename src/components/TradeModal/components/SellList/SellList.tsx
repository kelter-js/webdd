import { Button, Divider, Stack, Typography } from "@mui/material";
import { useGameState } from "../../../../stores";
import emptySlot from "../../../../assets/static/empty_slot.png";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useEffect, useRef, useState } from "react";

export const SellList = () => {
  const { inventory, sellItem } = useGameState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollListElement = useRef<any>(null);
  console.log("inventory", inventory);

  const currentItemToSellData = (inventory || [])[selectedIndex];

  const handleSellItem = () => {
    sellItem(currentItemToSellData.gearId);
    setSelectedIndex(0);
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
          <img src={emptySlot} style={{ width: "190px", height: "190px" }} />

          <Stack borderBottom="1px solid #5a3020">
            <Typography fontFamily="inherit" variant="h6">
              Название:
            </Typography>

            <Typography fontFamily="inherit" variant="h5">
              {currentItemToSellData.name}
            </Typography>
          </Stack>

          <Stack borderBottom="1px solid #5a3020">
            <Typography fontFamily="inherit" variant="h6">
              Описание:
            </Typography>

            <Typography fontFamily="inherit" variant="h5">
              {currentItemToSellData.description}
            </Typography>
          </Stack>

          <Stack borderBottom="1px solid #5a3020">
            <Typography fontFamily="inherit" variant="h6">
              Цена:
            </Typography>

            <Typography fontFamily="inherit" variant="h5">
              {currentItemToSellData.price}
            </Typography>
          </Stack>

          <Stack borderBottom="1px solid #5a3020">
            <Typography fontFamily="inherit" variant="h6">
              Текущий тир предмета:
            </Typography>

            <Typography fontFamily="inherit" variant="h5">
              {currentItemToSellData.tier}
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
