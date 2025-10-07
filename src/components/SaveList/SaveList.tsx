import { FC } from "react";

import {
  AVAILABLE_SAVE_SLOTS,
  EMPTY_SAVE_DESCRIPTION,
  SAVE_LOAD_STATUSES,
} from "./constants";
import { useGameSaves, useGameState, useAppState } from "../../stores";
import { useSnackbar } from "../../contexts/Snackbar";
import { SaveListProps } from "./types";
import { SaveListContainer } from "./SaveList.styled";

// REFACTORING CHECKED ✅

export const SaveList: FC<SaveListProps> = ({ isLoadMode }) => {
  const { gameSaves, updateGameSaves, defaultSave } = useGameSaves();
  const { toggleMenu, toggleSaveList } = useAppState();
  const { setState, player } = useGameState();
  const { showSnackbar } = useSnackbar();

  const handleSaveClick = (index: number) => () => {
    if (isLoadMode && gameSaves) {
      setState(gameSaves[index].gameState);
    } else {
      updateGameSaves(player, index);
    }

    showSnackbar(
      isLoadMode ? SAVE_LOAD_STATUSES.LOAD : SAVE_LOAD_STATUSES.SAVE
    );

    toggleMenu();
    toggleSaveList(null);
  };

  const loadAutoSave = () => {
    if (defaultSave) {
      setState(defaultSave.gameState);
      showSnackbar(SAVE_LOAD_STATUSES.LOAD);
      toggleMenu();
      toggleSaveList(null);
    }
  };

  const saveDate = defaultSave?.date.toLocaleString();
  const slotName = `Автосохранение ${saveDate}`;

  return (
    <SaveListContainer>
      {isLoadMode && defaultSave && (
        <button onClick={loadAutoSave}>
          <p>{slotName}</p>
        </button>
      )}

      {AVAILABLE_SAVE_SLOTS.map((_, index) => {
        const saveContent = gameSaves ? gameSaves[index] : null;
        const saveDate = saveContent?.date.toLocaleString();
        const playerName = saveContent?.gameState.name ?? "";
        const slotName = `${playerName ? playerName + " - " : ""} ${saveDate}`;

        return (
          <button
            key={index}
            onClick={handleSaveClick(index)}
            disabled={isLoadMode && !saveContent}
          >
            <p>{saveContent ? slotName : EMPTY_SAVE_DESCRIPTION}</p>
          </button>
        );
      })}
    </SaveListContainer>
  );
};
