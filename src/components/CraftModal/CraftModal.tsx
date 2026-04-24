import { useEffect, useMemo, useRef, useState, ChangeEvent } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Stack, Typography } from "@mui/material";

import { HoldProgressButton } from "./components/HoldProgressButton";
import { useAppState, useGameState } from "../../stores";
import { SearchField } from "../../common/SearchField";
import { useSnackbar } from "../../contexts/Snackbar";
import { RECEIPTS } from "../../constants/receipts";
import { CraftDrop } from "./components/CraftDrop";
import { Item } from "../../types/gameState";
import { GameModal } from "../GameModal";
import { Icons, ItemIconContainer } from "../../common";
import craftBg from "../../assets/static/craft.png";
import { SCROLLBAR_CONFIG, SCROLLBAR_STYLES } from "./constants";
import * as S from "./CraftModal.styled";

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
    // @ts-ignore - нет типизации корректной у библиотеки
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
          options={SCROLLBAR_CONFIG}
          defer
          style={SCROLLBAR_STYLES}
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
              const handleSelect = () => {
                if (!craftedItem) {
                  setSelectedIndex(index);
                }
              };

              return (
                <Typography
                  fontFamily="inherit"
                  variant="h5"
                  key={index}
                  p={0.5}
                  onClick={handleSelect}
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
            <S.CraftBackgroundImg src={craftBg} />

            <Stack gap={3} mb={8}>
              <S.ReceiptImageContainer right="151px" top="44px">
                <ItemIconContainer src={currentCraftData?.sourceItemIcon} />
              </S.ReceiptImageContainer>

              <S.ReceiptImageContainer right="333px" top="44px">
                <ItemIconContainer src={currentCraftData?.sourceItemIcon} />
              </S.ReceiptImageContainer>

              <S.ReceiptImageContainer right="522px" top="44px">
                <ItemIconContainer src={currentCraftData?.sourceItemIcon} />
              </S.ReceiptImageContainer>
            </Stack>

            <Stack>
              <S.ReceiptResultImageContainer>
                <ItemIconContainer src={currentCraftData?.targetItemIcon} />
              </S.ReceiptResultImageContainer>
            </Stack>

            {currentCraftData?.goldRequiredToCraft && (
              <S.RequiredResourcesText variant="h4">
                Требуется: {currentCraftData?.goldRequiredToCraft}{" "}
                <Icons.GoldIcon />
              </S.RequiredResourcesText>
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
