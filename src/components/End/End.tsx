import { Button, Stack } from "@mui/material";
import { resetDialogs } from "../../constants/dialogs";
import { useAppState, useGameState } from "../../stores";
import { Text, Container } from "./End.styled";
import { DIALOGUE_FLAGS } from "../../entities/dialogues";

export const End = () => {
  const {
    resetGame,
    player: { dialogFlags },
  } = useGameState();
  const { reset } = useAppState();

  if (!dialogFlags.includes(DIALOGUE_FLAGS.FINAL_DIALOG_ENDED)) {
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
