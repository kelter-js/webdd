import { Stack } from "@mui/material";

import { useGameState } from "../../stores";
import { CharacterCard } from "./CharacterCard";

export const LevelingContainer = () => {
  const {
    player: { party },
  } = useGameState();

  return (
    <Stack gap={3} direction="row" width="100vw" justifyContent="center">
      {party.map((character) => (
        <CharacterCard key={character.name} {...character} />
      ))}
    </Stack>
  );
};
