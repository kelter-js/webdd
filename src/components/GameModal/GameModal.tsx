import { FC } from "react";

import { GameModalProps } from "./types";
import * as S from "./GameModal.styled";

// REFACTORING CHECKED ✅

export const GameModal: FC<GameModalProps> = ({ onClose, children }) => (
  <S.StyledModal open onClose={onClose}>
    <S.ModalContainer>
      <S.ModalBorder>
        <S.Sparkles style={{ top: 4, left: 4, animationDelay: "0s" }} />
        <S.Sparkles style={{ top: 4, right: 4, animationDelay: "0.3s" }} />
        <S.Sparkles style={{ bottom: 4, left: 4, animationDelay: "0.6s" }} />
        <S.Sparkles style={{ bottom: 4, right: 4, animationDelay: "0.9s" }} />

        <S.ModalInner>{children}</S.ModalInner>
      </S.ModalBorder>
    </S.ModalContainer>
  </S.StyledModal>
);
