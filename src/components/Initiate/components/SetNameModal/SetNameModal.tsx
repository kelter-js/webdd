import { ChangeEventHandler, KeyboardEvent, useState } from "react";
import { Button } from "@mui/material";

import {
  NAME_FIELD_INPUT_PROPS,
  NAME_FIELD_LABEL_PROPS,
} from "./input-styles-config";
import { useGameState, useAppState } from "../../../../stores";
import * as S from "./SetNameModal.styled";

// REFACTORING CHECKED ✅

export const SetNameModal = () => {
  const [name, setName] = useState("");
  const [tryAmount, setTryAmount] = useState(0);

  const { setPlayerName } = useGameState();
  const { setFading } = useAppState();

  const isEmptyName = name.trim().length === 0;

  const handleSetName = () => {
    if (isEmptyName) {
      setTryAmount(1);
    } else {
      setFading(true);
      setPlayerName(name);
    }
  };

  const handleBlur = () => {
    if (isEmptyName) {
      setTryAmount(1);
    }
  };

  const handleFocus = () => setTryAmount(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSetName();
    }
  };

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    setTryAmount(0);
  };

  return (
    <S.ModalContainer open disableEscapeKeyDown>
      <S.ModalContent>
        <div>
          <S.NameField
            onBlur={handleBlur}
            onFocus={handleFocus}
            helperText={
              Boolean(tryAmount) && "Имя персонажа не может быть пустым"
            }
            id="outlined-basic"
            label="Имя персонажа"
            variant="outlined"
            fullWidth
            onKeyDown={handleKeyDown}
            hasNoAttemptsLeft={tryAmount === 0}
            InputProps={NAME_FIELD_INPUT_PROPS}
            InputLabelProps={NAME_FIELD_LABEL_PROPS}
            value={name}
            onChange={handleChangeName}
          />

          <Button
            variant="text"
            fullWidth
            sx={{ p: 0 }}
            onClick={handleSetName}
          >
            <S.StartGameText variant="h5">Начать игру</S.StartGameText>
          </Button>
        </div>
      </S.ModalContent>
    </S.ModalContainer>
  );
};
