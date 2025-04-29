import { FC } from "react";
import { useGameSaves } from "../../stores/GameSave";
import { useGameState } from "../../stores/GameState";
import { useSnackbar } from "../../contexts/Snackbar";

const MAX_AMOUNT_OF_SAVES = 3;

interface SaveListProps {
  isLoadMode: boolean;
}

export const SaveList: FC<SaveListProps> = ({ isLoadMode }) => {
  const { gameSaves, updateGameSaves } = useGameSaves();
  const { setState, player } = useGameState();
  const { showSnackbar } = useSnackbar();

  const handleSaveClick = (index: number) => {
    if (isLoadMode) {
      setState(gameSaves[index].gameState);
      showSnackbar("Сохранение загружено");
    } else {
      updateGameSaves(player, index);
      showSnackbar("Игра сохранена");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {new Array(MAX_AMOUNT_OF_SAVES).fill(null).map((item, index) => (
        <button key={index} onClick={() => handleSaveClick(index)}>
          <p>
            {gameSaves[index]?.date.toLocaleString() ?? "Пустое сохранение"}
          </p>
        </button>
      ))}
    </div>
  );
};
