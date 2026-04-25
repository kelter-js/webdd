import { Button, Stack } from "@mui/material";

import { useAppState } from "../../stores";
import { GameModal } from "../GameModal";
import { MainButtonText } from "../../common/styled.index";
import { ContinueButton } from "./AudioEnabler.styled";

export const AudioEnabler = () => {
  const { enableAudio, setNewGame } = useAppState();

  const handleEnablerClick = () => {
    enableAudio();
    setNewGame(true);
  };

  return (
    <GameModal height="155px" width="375px">
      <Stack height="100%" justifyContent="space-between">
        <ContinueButton variant="h5">
          Готовы продолжить путешествие?
        </ContinueButton>
        <Button
          variant="text"
          fullWidth
          sx={{ p: 0 }}
          onClick={handleEnablerClick}
        >
          <MainButtonText variant="h5">Начать игру</MainButtonText>
        </Button>
      </Stack>
    </GameModal>
  );
};
