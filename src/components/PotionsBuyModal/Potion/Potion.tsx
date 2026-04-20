import { FC } from "react";

import { getPotionIcon } from "../../../utils";
import { PotionProps } from "./types";
import * as S from "./Potion.styled";
import { Stack, Typography } from "@mui/material";
import { Icons } from "../../../common";
import { Tooltip } from "../../../common";

const POTION_SIZE = 55;

export const Potion: FC<PotionProps> = ({
  top,
  left,
  type,
  price,
  onBuy,
  isDisabled,
}) => (
  <Tooltip title={isDisabled ? "Недостаточно золота" : ""}>
    <S.PotionContainer
      top={top}
      left={left}
      onClick={onBuy}
      isDisabled={isDisabled}
    >
      {getPotionIcon(type, POTION_SIZE)}
      <Stack
        direction="row"
        alignItems="center"
        position="absolute"
        bottom="-36px"
      >
        <Icons.GoldIcon size={20} />

        <Typography fontFamily="inherit" variant="body2" fontSize="26px">
          {price}
        </Typography>
      </Stack>
    </S.PotionContainer>
  </Tooltip>
);
