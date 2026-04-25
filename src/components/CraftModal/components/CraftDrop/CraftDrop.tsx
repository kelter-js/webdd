import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, Button } from "@mui/material";

import {
  MAIN_CONTAINER_ANIMATE_CONFIG,
  MAIN_CONTAINER_INITIAL_CONFIG,
  MAIN_CONTAINER_STYLES,
  MAIN_CONTAINER_TRANSITION_CONFIG,
} from "./constants";
import { GEAR_SLOTS } from "../../../../entities/gear";
import { getItemIcon } from "../../../../utils";
import { MainText } from "../../../../common";
import { CraftDropProps } from "./types";
import { Container, ReceiptResultIcon } from "./CraftDrop.styled";

export const CraftDrop: FC<CraftDropProps> = ({ item, onClose }) => {
  if (!item) return null;

  const {
    name,
    tier,
    magSize,
    critChance,
    criticalStrike,
    value,
    minValue,
    bulletsPerTurn,
    type,
    baseId,
  } = item;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={MAIN_CONTAINER_INITIAL_CONFIG}
          animate={MAIN_CONTAINER_ANIMATE_CONFIG}
          exit={{ opacity: 0 }}
          transition={MAIN_CONTAINER_TRANSITION_CONFIG}
          style={MAIN_CONTAINER_STYLES}
        >
          <Container>
            <ReceiptResultIcon src={getItemIcon(type, baseId)} />

            <Typography fontFamily="inherit" variant="h6" whiteSpace="pre">
              {name}
            </Typography>

            <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
              Уровень предмета: {tier}
            </Typography>

            <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
              {type === GEAR_SLOTS.WEAPON ? "Урон:" : "Броня:"}
              {minValue && `${minValue} - `} {value}
            </Typography>

            {item.critChance !== undefined && (
              <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
                Шанс крит. удара: {critChance}%
              </Typography>
            )}

            {item.criticalStrike !== undefined && (
              <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
                Критический урон: {criticalStrike}
              </Typography>
            )}

            {item.magSize !== undefined && (
              <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
                Размер магазина: {magSize}
              </Typography>
            )}

            {item.bulletsPerTurn !== undefined && (
              <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
                Выстрелов за один ход: {bulletsPerTurn}
              </Typography>
            )}

            <Button variant="text" onClick={onClose} sx={{ mt: 1 }}>
              <MainText
                borderBottom="1px solid #5a3020"
                borderTop="1px solid #5a3020"
              >
                Ок
              </MainText>
            </Button>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
