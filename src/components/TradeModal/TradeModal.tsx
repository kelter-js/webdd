import { useState } from "react";
import { Button, Stack } from "@mui/material";

import { useAppState, useGameState } from "../../stores";
import { usePlayer } from "../../contexts/Player";
import { SellList } from "./components/SellList";
import { MainText } from "../../common";
import { BuyList } from "./components/BuyList";
import { SELL_SFX_ID } from "../../constants";
import { TRADE_TYPES } from "./constants";
import { GameModal } from "../GameModal";
import sellSfx from "../../assets/audio/sell.mp3";
import { SellJunkButton, TabsContainer } from "./TradeModal.styled";

export const TradeModal = () => {
  const { toggleTradeModal, isTradeModalOpen } = useAppState();
  const [tab, setTab] = useState<TRADE_TYPES>(TRADE_TYPES.BUY);

  const {
    sellJunk,
    player: { junk },
  } = useGameState();

  const { handleSetSrc } = usePlayer();

  if (!isTradeModalOpen) return null;

  const handleSellJunk = () => {
    sellJunk();
    handleSetSrc(SELL_SFX_ID, sellSfx);
  };

  const cantSellJunk = junk.length === 0;

  return (
    <GameModal onClose={toggleTradeModal} withoutPadding withoutScrolls>
      <SellJunkButton
        cantSellJunk={cantSellJunk}
        onClick={handleSellJunk}
        disabled={cantSellJunk}
      >
        <MainText variant="h5">Продать мусор [R]</MainText>
      </SellJunkButton>

      <TabsContainer>
        <Button
          variant="text"
          fullWidth
          sx={{ p: 0, opacity: tab === TRADE_TYPES.BUY ? 1 : 0.5 }}
          disabled={tab === TRADE_TYPES.BUY}
          onClick={() => setTab(TRADE_TYPES.BUY)}
        >
          <MainText sx={{ borderBottom: "1px solid #5a3020" }} variant="h5">
            Покупка
          </MainText>
        </Button>

        <Button
          variant="text"
          fullWidth
          sx={{ p: 0, opacity: tab === TRADE_TYPES.SELL ? 1 : 0.5 }}
          disabled={tab === TRADE_TYPES.SELL}
          onClick={() => setTab(TRADE_TYPES.SELL)}
        >
          <MainText sx={{ borderBottom: "1px solid #5a3020" }} variant="h5">
            Продажа
          </MainText>
        </Button>
      </TabsContainer>

      <Stack mt={4}>
        {tab === TRADE_TYPES.BUY && <BuyList />}
        {tab === TRADE_TYPES.SELL && <SellList />}
      </Stack>
    </GameModal>
  );
};
