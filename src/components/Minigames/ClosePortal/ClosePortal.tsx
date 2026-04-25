import { FC } from "react";

import { useClosePortalGame } from "./useClosePortalGame";
import { MiniGameProps } from "../types";
import { ModalWindow, QteContainer } from "../QTEGame/QTEGame.styled";
import goblin from "../../../assets/minigame/goblin.png";
import bag from "../../../assets/minigame/bag.png";
import * as S from "./ClosePortal.styled";

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
    <ModalWindow open={true} disableEscapeKeyDown>
      <QteContainer>
        <S.PlayerZone ref={playerZoneRef}>
          <img src={bag} width="80px" height="80px" />
        </S.PlayerZone>

        <S.TargetZone ref={targetZoneRef}>
          <img src={goblin} width="80px" height="80px" />
        </S.TargetZone>

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
    </ModalWindow>
  );
};
