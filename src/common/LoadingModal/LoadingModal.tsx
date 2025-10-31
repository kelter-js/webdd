import { FC } from "react";
import { Modal } from "@mui/material";

import { LoadingModalProps } from "./types";
import * as S from "./LoadingModal.styled";

export const LoadingModal: FC<LoadingModalProps> = ({ progress }) => (
  <Modal open={true}>
    <S.LoadingContainer>
      <S.LoaderText variant="h6">Загружаем ассеты...</S.LoaderText>

      <S.Progress variant="determinate" value={progress} />

      <S.ProgressText variant="body2">{Math.round(progress)}%</S.ProgressText>
    </S.LoadingContainer>
  </Modal>
);
