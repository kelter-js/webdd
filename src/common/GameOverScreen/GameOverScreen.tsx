import { FC } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import { SAVE_LOAD_STATUSES } from "../../components/SaveList/constants";
import { useAppState, useGameSaves, useGameState } from "../../stores";
import { useSnackbar } from "../../contexts/Snackbar";
import { GameOverScreenProps } from "./types";

import * as A from "./animation";
import * as C from "./constants";
import * as S from "./GameOverScreen.styled";
import { resetDialogs } from "../../constants/dialogs";

// REFACTORING CHECKED ✅

export const GameOverScreen: FC<GameOverScreenProps> = ({
  isVisible = true,
}) => {
  const { setState, resetGame } = useGameState();
  const { reset } = useAppState();
  const { defaultSave } = useGameSaves();
  const { showSnackbar } = useSnackbar();

  const loadAutoSave = () => {
    if (defaultSave) {
      setState(defaultSave.gameState);
      showSnackbar(SAVE_LOAD_STATUSES.LOAD);
    } else {
      showSnackbar(SAVE_LOAD_STATUSES.NO_AUTO_SAVES);
    }
  };

  const startNewGame = () => {
    resetGame();
    reset();
    resetDialogs();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Блокирующий слой - перехватывает все клики */}
          <S.OverlayBlocker />

          {/* Основной компонент конца игры */}
          <S.OverlayContent>
            {/* Анимация распространяющейся черной пелены */}
            <S.BlackHole
              component={motion.div}
              initial={A.BLACK_HOLE_INITIAL_CONFIG}
              animate={A.BLACK_HOLE_ANIMATION_CONFIG}
            />

            {/* Основной слой статических помех */}
            <S.StaticInterference
              component={motion.div}
              initial={A.STATIC_INTERFERENCE_INITIAL_CONFIG}
              animate={A.STATIC_INTERFERENCE_ANIMATION_CONFIG}
            />

            {/* Быстрые движущиеся линии - группа 1 */}
            {C.MAIN_LINE_GROUP.map((_, i) => (
              <S.MainInterferenceLine
                key={`main-line-${i}`}
                component={motion.div}
                initial={A.INTERFERENCE_LINE_INITIAL_CONFIG}
                animate={{
                  y: "100%",
                  transition: {
                    delay: 1.2 + i * 0.1,
                    duration: 0.15,
                    repeat: Infinity,
                    repeatDelay: 0.1 + i * 0.05,
                  },
                }}
                index={i}
              />
            ))}

            {/* Медленные толстые линии сканирования - группа 2 */}
            {C.SUB_LINE_GROUP.map((_, i) => (
              <S.SubInterferenceLine
                key={`sub-line-${i}`}
                component={motion.div}
                initial={A.INTERFERENCE_LINE_INITIAL_CONFIG}
                animate={{
                  y: "100%",
                  transition: {
                    delay: 1.5 + i * 0.3,
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 0.8 + i * 0.2,
                  },
                }}
                index={i}
              />
            ))}

            {/* Цветные движущиеся линии */}
            {C.MOVING_LINES_GROUP.map((line, i) => (
              <S.MovingLine
                key={`color-line-${i}`}
                component={motion.div}
                initial={A.INTERFERENCE_LINE_INITIAL_CONFIG}
                animate={{
                  y: "100%",
                  transition: {
                    delay: line.delay,
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                  },
                }}
                color={line.color}
              />
            ))}

            {/* Случайные вспышки полос */}
            {C.FLASHES_GROUP.map((_, i) => (
              <S.Flash
                key={`flash-${i}`}
                component={motion.div}
                animate={A.FLASH_ANIMATION_CONFIG}
                transition={{
                  delay: 2 + i * 0.7,
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 3 + i * 0.5,
                }}
              />
            ))}

            {/* Горизонтальные волны искажения */}
            <S.HorizontalWave
              component={motion.div}
              animate={A.HORIZONTAL_WAVE_ANIMATION_CONFIG}
              transition={A.HORIZONTAL_WAVE_TRANSITION_CONFIG}
            />

            {/* Частые тонкие линии */}
            <S.ThinLines
              component={motion.div}
              initial={A.STATIC_INTERFERENCE_INITIAL_CONFIG}
              animate={A.THIN_LINES_ANIMATION_CONFIG}
            />

            {/* Мерцающий слой */}
            <S.TwinklingOverlay
              component={motion.div}
              initial={A.STATIC_INTERFERENCE_INITIAL_CONFIG}
              animate={A.TWINKLING_OVERLAY_ANIMATION_CONFIG}
            />

            {/* Текст "КОНЕЦ ИГРЫ" */}
            <Box position="relative" zIndex={4} textAlign="center">
              {/* Основной текст */}
              <S.GameEndText
                component={motion.h1}
                initial={A.GAME_END_INITIAL_CONFIG}
                animate={A.GAME_END_ANIMATION_CONFIG}
                variant="h1"
              >
                КОНЕЦ ИГРЫ
              </S.GameEndText>

              {/* Мерцающая копия текста с эффектом помех */}
              <S.GameEndTextDuplicate
                component={motion.div}
                initial={A.STATIC_INTERFERENCE_INITIAL_CONFIG}
                animate={A.GAME_END_DUPLICATE_ANIMATION_CONFIG}
                transition={A.GAME_END_DUPLICATE_TRANSITION_CONFIG}
                variant="h1"
              >
                КОНЕЦ ИГРЫ
              </S.GameEndTextDuplicate>

              <S.GameEndButton
                component={motion.h3}
                onClick={startNewGame}
                variant="h1"
              >
                Новая игра
              </S.GameEndButton>

              <S.GameEndButton
                component={motion.h3}
                variant="h1"
                onClick={loadAutoSave}
              >
                Загрузка сохранения
              </S.GameEndButton>
            </Box>

            {/* Дополнительные случайные полосы по бокам */}
            {C.RANDOM_LINES_GROUP.map((_, i) => (
              <S.RandomLine
                key={`side-stripe-${i}`}
                component={motion.div}
                animate={A.RANDOM_LINES_ANIMATION_CONFIG}
                initial={A.RANDOM_LINES_INITIAL_CONFIG}
                transition={{
                  delay: 2.5 + i * 1.2,
                  duration: 2 + Math.random() * 1,
                  repeat: Infinity,
                  repeatDelay: 4 + Math.random() * 3,
                  ease: "linear",
                }}
                index={i}
              />
            ))}
          </S.OverlayContent>
        </>
      )}
    </AnimatePresence>
  );
};
