import { useEffect, useMemo, useRef, useState } from "react";
import { GameModal } from "../GameModal";

import { useAppState, useGameState } from "../../stores";
import { GameStateData } from "../../types/gameState";
import { RECEIPTS } from "../../constants/receipts";
import { Box, Button, Stack, Typography } from "@mui/material";
import craftBg from "../../assets/static/craft.png";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { StartGameText } from "../Initiate/components/SetNameModal/SetNameModal.styled";
import { HoldProgressButton } from "./components/HoldProgressButton";
import { Icons } from "../../common";

export const CraftModal = () => {
  const { player } = useGameState();
  const { toggleCraftMenu } = useAppState();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleCraft = (create: (state: GameStateData) => GameStateData) => {
    const newPlayerState = create(player);
    // mock
    // нужна функция обновления состояния игрока - из useGameState
    // внутри action из useGameState нужно делать ещё две вещи - обновлять инвентарь если receipt.type === item, который не memoized а обычный, а ещё
    // понадобится пересчет статов - ведь мы могли снять вещь
    // доработать рецепты - возвращать модель, в которой модель обновленного стейта + флаг, что мы взяли вещь из гира персонажа - и ориентируясь на этот флаг осуществлять пересчет статов
    // чтобы не делать лишние вычисления
  };

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
  }, [RECEIPTS, selectedIndex]); // или когда меняется selectedIndex / размер окна и т.д.

  const currentCraftData = RECEIPTS[selectedIndex];

  const isCraftButtonDisabled = useMemo(() => {
    return currentCraftData?.isDisabled(player) || false;
  }, [player, currentCraftData.isDisabled]);

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
            {RECEIPTS.map((receipt, index) => {
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
                  {receipt.title}
                </Typography>
              );
            })}
          </Stack>
        </OverlayScrollbarsComponent>

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
            <Stack border="1px solid #5a3020"></Stack>
            <Stack border="1px solid #5a3020"></Stack>
            <Stack border="1px solid #5a3020"></Stack>
          </Stack>

          <Stack>
            <Stack border="1px solid #5a3020"></Stack>
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

          <HoldProgressButton
            sx={{ mt: "auto" }}
            onComplete={() => console.log("Action completed!")}
            disabled={isCraftButtonDisabled}
          >
            Создать
          </HoldProgressButton>
        </Stack>
      </Stack>
    </GameModal>
  );
};
