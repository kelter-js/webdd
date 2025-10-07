import { FC } from "react";
import { Button, Modal, Stack } from "@mui/material";

import { useQTEGame } from "./useQTEGame";
import { MiniGameProps } from "../types";
import { Text } from "../../../common/styled.index";
import * as S from "./QTEGame.styled";

// REFACTORING CHECKED ✅

export const QTEGame: FC<MiniGameProps> = (props) => {
  const {
    gameActiveFlag,
    sequence,
    currentIndex,
    startBtnRef,
    startGame,
    totalTimeRef,
    gameAttempts,
    resultRef,
  } = useQTEGame(props);

  return (
    <Modal
      open={true}
      disableEscapeKeyDown
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(2px)",
      }}
    >
      <S.QteContainer>
        {gameActiveFlag && (
          <S.SequenceContainer>
            {sequence[currentIndex - 1] && (
              <S.AdjacentSymbol>{sequence[currentIndex - 1]}</S.AdjacentSymbol>
            )}

            <S.CurrentSymbol>{sequence[currentIndex]}</S.CurrentSymbol>

            {sequence[currentIndex + 1] && (
              <S.AdjacentSymbol>{sequence[currentIndex + 1]}</S.AdjacentSymbol>
            )}
          </S.SequenceContainer>
        )}

        <Button
          variant="text"
          fullWidth
          sx={{ p: 0, m: "0 auto", width: "80%" }}
          onClick={startGame}
        >
          <Text ref={startBtnRef} variant="h5">
            Начать испытание
          </Text>
        </Button>

        {!gameActiveFlag && (
          <Text
            variant="caption"
            position="absolute"
            bottom="20px"
            textAlign="center"
          >
            В данном испытании необходимо нажать серию клавиш в определенной
            последовательности
          </Text>
        )}

        <S.TotalTime ref={totalTimeRef}>0.0/3.0s</S.TotalTime>

        <S.SuccessAttempts>
          {currentIndex}/{sequence.length - 1}
        </S.SuccessAttempts>

        <Stack>
          <S.Attempts>Количество попыток - {gameAttempts}</S.Attempts>
          <S.Result ref={resultRef} />
        </Stack>
      </S.QteContainer>
    </Modal>
  );
};
