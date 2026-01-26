import { ChangeEventHandler, KeyboardEvent, useState } from "react";
import { Button, Stack } from "@mui/material";

import {
  NAME_FIELD_INPUT_PROPS,
  NAME_FIELD_LABEL_PROPS,
} from "./input-styles-config";
import { useGameState, useAppState } from "../../../../stores";
import * as S from "./SetNameModal.styled";
import { CLASSES } from "../../../../entities/characterClasses";
import medic from "../../../../assets/classIcons/medical.svg";
import sniper from "../../../../assets/classIcons/sniper.svg";
import tank from "../../../../assets/classIcons/soldier.svg";
import { FLAGS } from "../../../../constants";

// REFACTORING CHECKED ✅

const CLASS_DESCRIPTIONS = {
  [CLASSES.SNIPER]:
    "Класс стрелка - рассчитан на нанесение большого количества урона, мало защиты.",
  [CLASSES.MEDIC]:
    "Класс поддержки - направлен на лечение сопартийцев, средняя защита и урон.",
  [CLASSES.TANK]:
    "Класс инженера - способен пережить большое количество ранений, наносит мало урона.",
};

export const SetNameModal = () => {
  const [name, setName] = useState("");
  const [tryAmount, setTryAmount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<CLASSES>(CLASSES.SNIPER);

  const { setPlayerName, setSliders, updateFlags } = useGameState();
  const { setFading, setNewGame } = useAppState();

  const isEmptyName = name.trim().length === 0;

  const handleSetName = () => {
    if (isEmptyName) {
      setTryAmount(1);
    } else {
      setFading(true);
      setPlayerName(name, selectedClass);
      // FIXME: передавать нужно реальный объект слайдеров
      // setSliders(INTRO_SLIDES);
      setSliders("something");
      updateFlags(FLAGS.GAME_INITIATED);
      setNewGame(true);
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

          <Stack gap={1} direction="row" justifyContent="center">
            <Button
              onClick={() => setSelectedClass(CLASSES.SNIPER)}
              sx={{
                ...(selectedClass === CLASSES.SNIPER && {
                  border: "2px solid #c0a080",
                }),
              }}
            >
              <img src={sniper} />
            </Button>

            <Button
              onClick={() => setSelectedClass(CLASSES.MEDIC)}
              sx={{
                ...(selectedClass === CLASSES.MEDIC && {
                  border: "2px solid #c0a080",
                }),
              }}
            >
              <img src={medic} />
            </Button>

            <Button
              onClick={() => setSelectedClass(CLASSES.TANK)}
              sx={{
                ...(selectedClass === CLASSES.TANK && {
                  border: "2px solid #c0a080",
                }),
              }}
            >
              <img src={tank} />
            </Button>
          </Stack>

          <div>
            <S.ClassDescription variant="h5">
              {CLASS_DESCRIPTIONS[selectedClass]}
            </S.ClassDescription>
          </div>

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
