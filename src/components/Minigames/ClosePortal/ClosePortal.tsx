import { FC } from "react";
import { Modal } from "@mui/material";

import { useClosePortalGame } from "./useClosePortalGame";
import { MiniGameProps } from "../types";
import { QteContainer } from "../QTEGame/QTEGame.styled";
import * as S from "./ClosePortal.styled";

// REFACTORING CHECKED ✅

export const ClosePortal: FC<MiniGameProps> = (props) => {
  const {
    startGame,
    playerZoneRef,
    targetZoneRef,
    startBtnRef,
    hintElement,
    totalTimeRef,
    gameTimeRef,
    gameAttempts,
  } = useClosePortalGame(props);

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
      <QteContainer>
        <S.PlayerZone ref={playerZoneRef} />

        <S.TargetZone ref={targetZoneRef} />

        <S.StartButton ref={startBtnRef} onClick={startGame}>
          Начать испытание
        </S.StartButton>

        <S.Hint ref={hintElement}>
          В данном испытании необходимо удерживать пробел чтобы двигать серую
          фигуру, она должна находиться в пределах зеленой зоны - определенное
          время, выход за пределы сбрасывает прогресс
        </S.Hint>

        <S.TotalTime ref={totalTimeRef}>0.0/5.0s</S.TotalTime>

        <S.GameTime ref={gameTimeRef}>0.0/24.0s</S.GameTime>

        <S.Attempts>Количество попыток - {gameAttempts}</S.Attempts>
      </QteContainer>
    </Modal>
  );
};
