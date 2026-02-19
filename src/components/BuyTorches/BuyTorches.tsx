import { ChangeEvent, useState } from "react";
import { useAppState, useGameState } from "../../stores";
import { isTorchesAffordable } from "./utils";
import { Button, Stack, Typography } from "@mui/material";
import { TORCH_PRICE } from "../../constants";
import { NameField } from "../Initiate/components/SetNameModal/SetNameModal.styled";
import { GameModal } from "../GameModal";
import {
  NAME_FIELD_INPUT_PROPS,
  NAME_FIELD_LABEL_PROPS,
} from "../Initiate/components/SetNameModal/input-styles-config";

export const BuyTorches = () => {
  const [amountOfTorches, setAmountOfTorches] = useState(1);
  const { toggleTorchBuyMenu } = useAppState();
  const {
    player: { gold },
    buyTorches,
  } = useGameState();

  const { isAffordable, finalPrice } = isTorchesAffordable(
    amountOfTorches,
    gold,
  );

  console.log("isAffordable", isAffordable);

  const handleIncreaseTorchesAmount = (e: ChangeEvent<HTMLInputElement>) =>
    setAmountOfTorches(Number(e.target.value));

  const handleBuyTorches = () => {
    buyTorches(amountOfTorches);
    toggleTorchBuyMenu();
  };

  return (
    <GameModal onClose={toggleTorchBuyMenu} width="395px" height="415px">
      <Stack gap={2} height="100%" justifyContent="space-between">
        <Typography fontSize="18px" fontFamily="inherit">
          Здесь вы можете приобрести факела по самой выгодной цене, ведь их
          продаю только я, и выгодность цен также устанавливаю я! Всего за
          <br />
          {TORCH_PRICE} золота <br />
          Итоговая стоимость: {finalPrice} золота
        </Typography>

        <NameField
          type="number"
          value={amountOfTorches}
          onChange={handleIncreaseTorchesAmount}
          hasNoAttemptsLeft={isAffordable}
          label="Количество факелов"
          variant="outlined"
          fullWidth
          InputProps={NAME_FIELD_INPUT_PROPS}
          inputProps={{ min: 0, max: 100 }}
          InputLabelProps={NAME_FIELD_LABEL_PROPS}
        />

        <Button
          variant="text"
          fullWidth
          sx={{ p: 0, opacity: isAffordable ? 1 : 0.3 }}
          onClick={handleBuyTorches}
          disabled={!isAffordable}
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
              borderTop: "1px solid #5a3020",
              fontFamily: "inherit",
            }}
          >
            Закончить сделку
          </Typography>
        </Button>
      </Stack>
    </GameModal>
  );
};
