import { Button } from "@mui/material";

import { useAppState, useGameState } from "../../stores";
import { resetDialogs } from "../../constants/dialogs";
import { FLAGS } from "../../constants";
import { Text, Container } from "./End.styled";

export const End = () => {
  const {
    resetGame,
    player: { flags },
  } = useGameState();
  const { reset } = useAppState();

  if (!flags.includes(FLAGS.THIRD_STORY_BOSS_VICTORY)) {
    return null;
  }

  const startNewGame = () => {
    resetGame();
    reset();
    resetDialogs();
  };

  return (
    <Container>
      <Button variant="outlined" onClick={startNewGame}>
        <Text variant="h2">Начать новую игру</Text>
      </Button>

      <Text variant="h1">Автор: kelter</Text>

      <Text fontSize="3rem !important" variant="h6" textAlign="center">
        Права на sfx/музыку принадлежат их оригинальным правообладателям
      </Text>
    </Container>
  );
};
