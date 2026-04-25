import { ChangeEventHandler, KeyboardEvent, useState } from "react";
import { Button, Stack } from "@mui/material";

import { CLASSES } from "../../../../entities/characterClasses";
import { useGameState, useAppState } from "../../../../stores";
import { SearchField } from "../../../../common/SearchField";
import { SLIDERS } from "../../../../entities/sliders";
import { CLASS_DESCRIPTIONS } from "./constants";
import { FLAGS } from "../../../../constants";
import medic from "../../../../assets/classIcons/medical.svg";
import sniper from "../../../../assets/classIcons/sniper.svg";
import tank from "../../../../assets/classIcons/soldier.svg";
import * as S from "./SetNameModal.styled";

export const SetNameModal = () => {
  const [name, setName] = useState("");
  const [tryAmount, setTryAmount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<CLASSES>(CLASSES.SNIPER);

  const { setPlayerName, setSliders, updateFlags } = useGameState();
  const { setFading, setNewGame, enableAudio } = useAppState();

  const isEmptyName = name.trim().length === 0;

  const handleSetName = () => {
    if (isEmptyName) {
      setTryAmount(1);
    } else {
      setFading(true);
      setPlayerName(name, selectedClass);
      setSliders(SLIDERS.INTRO);
      updateFlags(FLAGS.GAME_INITIATED);
      setNewGame(true);
      enableAudio();
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
          <SearchField
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
            value={name}
            onChange={handleChangeName}
          />

          <Stack gap={1} direction="row" justifyContent="center">
            <S.CharacterClassButton
              onClick={() => setSelectedClass(CLASSES.SNIPER)}
              isSelected={selectedClass === CLASSES.SNIPER}
            >
              <img src={sniper} />
            </S.CharacterClassButton>

            <S.CharacterClassButton
              onClick={() => setSelectedClass(CLASSES.MEDIC)}
              isSelected={selectedClass === CLASSES.MEDIC}
            >
              <img src={medic} />
            </S.CharacterClassButton>

            <S.CharacterClassButton
              onClick={() => setSelectedClass(CLASSES.TANK)}
              isSelected={selectedClass === CLASSES.TANK}
            >
              <img src={tank} />
            </S.CharacterClassButton>
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
