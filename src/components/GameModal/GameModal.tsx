import { FC } from "react";

import { GameModalProps } from "./types";
import * as S from "./GameModal.styled";

// REFACTORING CHECKED ✅

export const GameModal: FC<GameModalProps> = ({
  onClose,
  children,
  width = "75%",
  height = "75%",
  withoutPadding = false,
}) => (
  <S.StyledModal open onClose={onClose}>
    <S.ModalContainer width={width} height={height}>
      <S.ModalBorder>
        <S.Sparkles style={{ top: 4, left: 4, animationDelay: "0s" }} />
        <S.Sparkles style={{ top: 4, right: 4, animationDelay: "0.3s" }} />
        <S.Sparkles style={{ bottom: 4, left: 4, animationDelay: "0.6s" }} />
        <S.Sparkles style={{ bottom: 4, right: 4, animationDelay: "0.9s" }} />

        <S.ModalInner withoutPadding={withoutPadding}>{children}</S.ModalInner>
      </S.ModalBorder>
    </S.ModalContainer>
  </S.StyledModal>
);
