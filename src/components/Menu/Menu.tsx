import { useRef } from "react";
import { Button } from "@mui/material";

import { SAVE_MODES } from "../../entities/saveModes";
import { useClickOutside } from "../../hooks";
import { SaveList } from "../SaveList";
import { MenuButtonText, ModalContent, ModalWindow } from "./Menu.styled";
import { useGameState, useAppState } from "../../stores";
import { resetDialogs } from "../../constants/dialogs";

// REFACTORING CHECKED ✅

export const Menu = () => {
  const { isMenuOpen, toggleMenu, toggleSaveList, saveMode, resetMenu, reset } =
    useAppState();
  const { resetGame } = useGameState();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleLoadMode = () => toggleSaveList(SAVE_MODES.LOAD_MODE);
  const handleSaveMode = () => toggleSaveList(SAVE_MODES.SAVE_MODE);
  const handleCloseSaves = () => toggleSaveList(null);

  const startNewGame = () => {
    resetGame();
    reset();
    resetDialogs();
  };

  useClickOutside(modalRef, resetMenu);

  return (
    <ModalWindow open={isMenuOpen} onClose={resetMenu} disableEscapeKeyDown>
      <ModalContent ref={modalRef}>
        {!saveMode && (
          <div>
            <Button
              variant="text"
              fullWidth
              sx={{ p: 0 }}
              onClick={startNewGame}
            >
              <MenuButtonText variant="h5">Новая игра</MenuButtonText>
            </Button>

            <Button
              variant="text"
              fullWidth
              sx={{ p: 0 }}
              onClick={handleSaveMode}
            >
              <MenuButtonText variant="h5">Сохранить игру</MenuButtonText>
            </Button>

            <Button
              variant="text"
              fullWidth
              sx={{ p: 0 }}
              onClick={handleLoadMode}
            >
              <MenuButtonText variant="h5">Загрузить игру</MenuButtonText>
            </Button>

            <Button variant="text" fullWidth sx={{ p: 0 }} onClick={toggleMenu}>
              <MenuButtonText variant="h5">Выход из меню</MenuButtonText>
            </Button>
          </div>
        )}

        {saveMode && (
          <div>
            <SaveList isLoadMode={saveMode === SAVE_MODES.LOAD_MODE} />

            <Button
              variant="text"
              fullWidth
              sx={{ p: 0 }}
              onClick={handleCloseSaves}
            >
              <MenuButtonText variant="h5">Назад</MenuButtonText>
            </Button>
          </div>
        )}
      </ModalContent>
    </ModalWindow>
  );
};
