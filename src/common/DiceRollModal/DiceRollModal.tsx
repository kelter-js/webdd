import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stack, Typography } from "@mui/material";

import {
  DEFAULT_DICES_STATE,
  DICE_ROLL_ANIMATE,
  DICE_ROLL_CONTAINER_STYLES,
  DICE_ROLL_STATIC_ANIMATE,
  DICE_SHADOWS_ANIMATE,
  DICE_SHADOWS_EXIT,
  DICE_SHADOWS_INITIAL,
  DICE_SHADOWS_STYLES,
  DICE_STYLES,
  DICE_TRANSITION,
  DICES_AMOUNT,
  DICES_ROLL_DURATION,
  DICES_SIDES,
} from "./constants";
import { DiceRollModalProps, DicesData } from "./types";
import { DiceRollContainer } from "./DiceRollFramer.styled";

// REFACTORING CHECKED ✅

export const DiceRollModal: FC<DiceRollModalProps> = ({
  turnOwner,
  onAnimationEnd,
}) => {
  const [isRolling, setIsRolling] = useState(true);

  const [diceResults, setDiceResults] =
    useState<DicesData>(DEFAULT_DICES_STATE);

  useEffect(() => {
    setTimeout(() => {
      setDiceResults([
        Math.floor(Math.random() * DICES_SIDES) + 1,
        Math.floor(Math.random() * DICES_SIDES) + 1,
      ]);
      setIsRolling(false);
    }, DICES_ROLL_DURATION);
  }, []);

  return (
    <AnimatePresence>
      <DiceRollContainer>
        {/* Затемнённый фон */}
        <motion.div
          initial={DICE_SHADOWS_INITIAL}
          animate={DICE_SHADOWS_ANIMATE}
          exit={DICE_SHADOWS_EXIT}
          style={DICE_SHADOWS_STYLES}
        />

        {/* Контейнер для кубиков */}
        <motion.div style={DICE_ROLL_CONTAINER_STYLES}>
          {/* Анимация для двух кубиков */}
          <Stack direction="row" gap={2}>
            {DICES_AMOUNT.map((index) => (
              <motion.div
                key={`dice-${index}`}
                style={DICE_STYLES}
                animate={
                  isRolling ? DICE_ROLL_ANIMATE : DICE_ROLL_STATIC_ANIMATE
                }
                transition={DICE_TRANSITION}
              >
                {isRolling ? "?" : diceResults[index]}
              </motion.div>
            ))}
          </Stack>
          {!isRolling && (
            <Typography variant="h5" fontFamily="inherit">
              {turnOwner}
            </Typography>
          )}
        </motion.div>
      </DiceRollContainer>
    </AnimatePresence>
  );
};
