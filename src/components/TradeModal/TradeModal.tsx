import { useState } from "react";
import { TRADE_TYPES } from "./constants";
import { GameModal } from "../GameModal";
import { TabsContainer } from "./TradeModal.styled";
import { Button, Stack, Typography } from "@mui/material";
import { useAppState, useGameState } from "../../stores";
import { BuyList } from "./components/BuyList";
import { SellList } from "./components/SellList";
import sellSfx from "../../assets/audio/sell.mp3";
import { usePlayer } from "../../contexts/Player";
import { SELL_SFX_ID } from "../../constants";

export const TradeModal = () => {
  const { toggleTradeModal } = useAppState();
  const [tab, setTab] = useState<TRADE_TYPES>(TRADE_TYPES.BUY);

  const {
    sellJunk,
    player: { junk },
  } = useGameState();

  const { handleSetSrc } = usePlayer();

  const handleSellJunk = () => {
    sellJunk();
    handleSetSrc(SELL_SFX_ID, sellSfx);
  };

  const cantSellJunk = junk.length === 0;

  return (
    <GameModal onClose={toggleTradeModal} withoutPadding withoutScrolls>
      <Button
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 9,
          opacity: cantSellJunk ? 0.3 : 1,
        }}
        onClick={handleSellJunk}
        disabled={cantSellJunk}
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
          Продать мусор [R]
        </Typography>
      </Button>

      <TabsContainer>
        <Button
          variant="text"
          fullWidth
          sx={{ p: 0, opacity: tab === TRADE_TYPES.BUY ? 1 : 0.5 }}
          disabled={tab === TRADE_TYPES.BUY}
          onClick={() => setTab(TRADE_TYPES.BUY)}
        >
          <Typography
            sx={{
              width: "100%",
              color: "#c08040",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              padding: (theme) => theme.spacing(1),
              borderBottom: "1px solid #5a3020",
              fontFamily: "Cormorant Unicase",
            }}
            variant="h5"
          >
            Покупка
          </Typography>
        </Button>

        <Button
          variant="text"
          fullWidth
          sx={{ p: 0, opacity: tab === TRADE_TYPES.SELL ? 1 : 0.5 }}
          disabled={tab === TRADE_TYPES.SELL}
          onClick={() => setTab(TRADE_TYPES.SELL)}
        >
          <Typography
            sx={{
              width: "100%",
              color: "#c08040",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              padding: (theme) => theme.spacing(1),
              borderBottom: "1px solid #5a3020",
              fontFamily: "Cormorant Unicase",
            }}
            variant="h5"
          >
            Продажа
          </Typography>
        </Button>
      </TabsContainer>

      <Stack sx={{ mt: 4 }}>
        {tab === TRADE_TYPES.BUY && <BuyList />}
        {tab === TRADE_TYPES.SELL && <SellList />}
      </Stack>
    </GameModal>
  );
};
