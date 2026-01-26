import { useState } from "react";
import { TRADE_TYPES } from "./constants";
import { GameModal } from "../GameModal";
import { TabsContainer } from "./TradeModal.styled";
import { Button, Stack, Typography } from "@mui/material";
import { useAppState } from "../../stores";
import { BuyList } from "./components/BuyList";
import { SellList } from "./components/SellList";

export const TradeModal = () => {
  const { toggleTradeModal } = useAppState();
  const [tab, setTab] = useState<TRADE_TYPES>(TRADE_TYPES.BUY);

  return (
    <GameModal onClose={toggleTradeModal} withoutPadding>
      <TabsContainer>
        <Button
          variant="text"
          fullWidth
          sx={{ p: 0, opacity: tab === TRADE_TYPES.BUY ? 0.5 : 1 }}
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
          sx={{ p: 0, opacity: tab === TRADE_TYPES.SELL ? 0.5 : 1 }}
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
