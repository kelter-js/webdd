import { Button, Stack, Typography } from "@mui/material";
import { useAppState } from "../../stores";
import { GameModal } from "../GameModal";
import { MainButtonText } from "../../common/styled.index";

export const AudioEnabler = () => {
  const { enableAudio, setNewGame } = useAppState();

  const handleEnablerClick = () => {
    enableAudio();
    setNewGame(true);
  };

  return (
    <GameModal height="155px" width="375px">
      <Stack height="100%" justifyContent="space-between">
        <Typography
          sx={{
            borderBottom: "none",
            borderTop: "none",
            fontSize: "18px",
            textAlign: "center",
          }}
          variant="h5"
        >
          Готовы продолжить путешествие?
        </Typography>
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
