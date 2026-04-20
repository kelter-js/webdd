import { useEffect, useMemo, useRef, useState, ChangeEvent } from "react";
import { GameModal } from "../GameModal";

import { useAppState, useGameState } from "../../stores";
import { Item } from "../../types/gameState";
import { RECEIPTS } from "../../constants/receipts";
import { Stack, Typography } from "@mui/material";
import craftBg from "../../assets/static/craft.png";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { HoldProgressButton } from "./components/HoldProgressButton";
import { Icons } from "../../common";
import { CraftDrop } from "./components/CraftDrop";

import { useSnackbar } from "../../contexts/Snackbar";

import { SearchField } from "../../common/SearchField";

export const CraftModal = () => {
  const { player, craftItem } = useGameState();
  const { toggleCraftMenu, isCraftMenuOpen } = useAppState();
  const [craftedItem, setCraftedItem] = useState<null | Item>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleClearCraftedResult = () => setCraftedItem(null);
  const { showSnackbar } = useSnackbar();
  const [result, setResult] = useState<null | string | Item>(null);
  const [search, setSearch] = useState("");

  const handleUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (result) {
      if (typeof result === "string") {
        showSnackbar(result);
      } else {
        setCraftedItem(result);
      }
    }

    const timerId = setTimeout(() => {
      setResult(null);
    }, 1500);

    return () => clearTimeout(timerId);
  }, [result]);

  const psRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    const ps = psRef.current?.ps;
    if (!ps) return;

    ps.update();

    // на всякий случай — через небольшой таймаут
    const timer = setTimeout(() => ps.update(), 100);

    window.addEventListener("resize", () => ps.update());

    return () => {
      window.removeEventListener("resize", () => ps.update());
      clearTimeout(timer);
    };
  }, [RECEIPTS, selectedIndex]);

  const handleCraft = () => {
    const { state, item } = currentCraftData.create(player);

    setResult(item);

    craftItem(state);
  };

  const receiptsList = useMemo(() => {
    if (search) {
      const normalizedSearchValue = search.toLocaleLowerCase();

      return RECEIPTS.filter((receipt) =>
        receipt.title.toLocaleLowerCase().includes(normalizedSearchValue),
      );
    }

    return RECEIPTS;
  }, [search]);

  const currentCraftData = receiptsList[selectedIndex];

  const isCraftButtonDisabled = useMemo(
    () => currentCraftData?.isDisabled(player) || false,
    [player, currentCraftData?.isDisabled],
  );

  if (!isCraftMenuOpen) return null;

  return (
    <GameModal onClose={toggleCraftMenu} withoutPadding>
      <Stack gap={2} direction="row" p={2} height="675px">
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
            width: "45%",
            height: "100%",
            border: "4px solid rgba(192, 160, 128, 0.3)",
            background: "rgba(0,0,0,0.3)",
            padding: "8px",
          }}
        >
          <Stack gap={1} width="100%" pr={0.5}>
            <SearchField
              value={search}
              onChange={handleUpdateSearch}
              hasNoAttemptsLeft={true}
              label="Название рецепта"
              variant="outlined"
              fullWidth
            />

            {receiptsList.map((receipt, index) => {
              return (
                <Typography
                  fontFamily="inherit"
                  variant="h5"
                  key={index}
                  p={0.5}
                  onClick={() => {
                    if (!craftedItem) {
                      setSelectedIndex(index);
                    }
                  }}
                  sx={{ cursor: "pointer", opacity: craftedItem ? 0.3 : 1 }}
                  border={`${index === selectedIndex ? "4px" : "2px"} solid ${
                    index === selectedIndex
                      ? "rgba(150, 80, 0, 1)"
                      : "rgba(192, 160, 128, 0.3)"
                  }`}
                >
                  {receipt.title}
                </Typography>
              );
            })}
          </Stack>
        </OverlayScrollbarsComponent>

        {currentCraftData && (
          <Stack alignItems="center" justifyContent="center" width="100%">
            <img
              src={craftBg}
              style={{
                position: "absolute",
                width: 815,
                height: 630,
                top: "-22px",
              }}
            />
            <Stack gap={3} mb={8}>
              <Stack
                border="1px solid #5a3020"
                sx={{
                  position: "absolute",
                  right: "151px",
                  top: "44px",
                  height: "107px",
                  width: "151px",
                }}
              >
                <img
                  src={currentCraftData?.sourceItemIcon}
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
              <Stack
                border="1px solid #5a3020"
                sx={{
                  position: "absolute",
                  right: "333px",
                  top: "44px",
                  height: "107px",
                  width: "151px",
                }}
              >
                <img
                  src={currentCraftData?.sourceItemIcon}
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
              <Stack
                border="1px solid #5a3020"
                sx={{
                  position: "absolute",
                  right: "522px",
                  top: "44px",
                  height: "107px",
                  width: "151px",
                }}
              >
                <img
                  src={currentCraftData?.sourceItemIcon}
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
            </Stack>

            <Stack>
              <Stack
                border="1px solid #5a3020"
                sx={{
                  position: "absolute",
                  right: "265px",
                  top: "326px",
                  height: "180px",
                  width: "290px",
                }}
              >
                <img
                  src={currentCraftData?.targetItemIcon}
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
            </Stack>

            {currentCraftData?.goldRequiredToCraft && (
              <Typography
                position="absolute"
                bottom="90px"
                fontFamily="inherit"
                display="flex"
                alignItems="center"
                gap={1}
                variant="h4"
              >
                Требуется: {currentCraftData?.goldRequiredToCraft}{" "}
                <Icons.GoldIcon />
              </Typography>
            )}

            {craftedItem && (
              <CraftDrop
                item={craftedItem}
                onClose={handleClearCraftedResult}
              />
            )}

            <HoldProgressButton
              sx={{ mt: "auto" }}
              onComplete={handleCraft}
              disabled={isCraftButtonDisabled}
            >
              Создать
            </HoldProgressButton>
          </Stack>
        )}
      </Stack>
    </GameModal>
  );
};
