import { useMemo, useState } from "react";
import { MenuItem, SelectChangeEvent, Stack, Typography } from "@mui/material";

import { DUNGEON_TYPES } from "../../Views/Settlement/constants";
import { DEFAULT_DIFFICULTIES, menuProps } from "./constants";
import { useAppState, useGameState } from "../../stores";
import { DungeonCard } from "./DungeonCard";
import { GameModal } from "../GameModal";
import { StyledSelect } from "../../common/styled.index";
import { CardsContainer } from "./DungeonCard.styled";

export const DungeonContainer = () => {
  const {
    player: { quest, currentTier },
  } = useGameState();

  const { toggleDungeonModal, isDungeonModalOpen } = useAppState();

  const [difficulty, setDifficulty] = useState(currentTier);

  const handleDifficultyChange = (event: SelectChangeEvent<unknown>) => {
    setDifficulty(event.target.value as number);
  };

  const availableDifficulties = useMemo(
    () => DEFAULT_DIFFICULTIES.slice(0, currentTier),
    [currentTier],
  );

  if (!isDungeonModalOpen) return null;

  const availableDungeonTypes = quest?.type
    ? [...DUNGEON_TYPES, quest?.type]
    : DUNGEON_TYPES;

  return (
    <GameModal
      onClose={toggleDungeonModal}
      width="875px"
      height="85%"
      withoutPadding
      withoutScrolls
    >
      <Stack position="absolute" top="30px" left="30px" gap={1}>
        <StyledSelect
          value={difficulty}
          onChange={handleDifficultyChange}
          MenuProps={menuProps}
        >
          {availableDifficulties.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </StyledSelect>

        <Typography variant="body2" fontFamily="inherit">
          Выбор сложности влияет только на сюжетные подземелья, квестовые
          генерируются в соответствии с текущим тиром
        </Typography>
      </Stack>

      <CardsContainer>
        {availableDungeonTypes.map((type) => (
          <DungeonCard type={type} key={type} selectedDifficulty={difficulty} />
        ))}
      </CardsContainer>
    </GameModal>
  );
};
