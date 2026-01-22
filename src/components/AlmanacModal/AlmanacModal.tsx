import { GameModal } from "../GameModal";
import { useAppState, useGameState } from "../../stores";
import almanacCover from "../../assets/traders/almanac.png";
import { Button, Stack, Typography } from "@mui/material";

import { useState } from "react";
import { ControlsContainer } from "./AlmanacModal.styled";
import { Tooltip } from "../../common";

const DISABLE_TEXT = "Эта страница пока что недоступна";

export const AlmanacModal = () => {
  const {
    player: { currentTier },
  } = useGameState();

  const [page, setPage] = useState(currentTier);

  const { toggleAlmanac } = useAppState();

  return (
    <GameModal onClose={toggleAlmanac} withoutPadding>
      <Stack position="relative">
        <img style={{ width: "1180px", height: "675px" }} src={almanacCover} />

        <ControlsContainer>
          <Button
            sx={{
              minWidth: "50px",
              width: "50px",
              height: "50px",
              background: page === 1 ? "#1a0a0a" : "",
              border: `4px solid rgba(192, 160, 128, ${
                page === 1 ? "0.8" : "0.3"
              })`,
              fontFamily: "inherit",
            }}
            onClick={() => setPage(1)}
          >
            <Typography
              variant="h6"
              fontFamily="inherit"
              fontSize="30px"
              color="#e0c4a0"
            >
              I
            </Typography>
          </Button>

          <Tooltip title={currentTier < 2 ? DISABLE_TEXT : ""}>
            <div>
              <Button
                disabled={currentTier < 2}
                sx={{
                  minWidth: "50px",
                  width: "50px",
                  height: "50px",
                  background: page === 2 ? "#1a0a0a" : "",
                  border: `4px solid rgba(192, 160, 128, ${
                    page === 2 ? "0.8" : "0.3"
                  })`,
                  fontFamily: "inherit",
                }}
                onClick={() => setPage(2)}
              >
                <Typography
                  variant="h6"
                  fontFamily="inherit"
                  fontSize="30px"
                  color="#e0c4a0"
                >
                  II
                </Typography>
              </Button>
            </div>
          </Tooltip>

          <Tooltip title={currentTier < 3 ? DISABLE_TEXT : ""}>
            <div>
              <Button
                disabled={currentTier < 3}
                sx={{
                  minWidth: "50px",
                  width: "50px",
                  height: "50px",
                  background: page === 3 ? "#1a0a0a" : "",
                  border: `4px solid rgba(192, 160, 128, ${
                    page === 3 ? "0.8" : "0.3"
                  })`,
                  fontFamily: "inherit",
                }}
                onClick={() => setPage(3)}
              >
                <Typography
                  variant="h6"
                  fontFamily="inherit"
                  fontSize="30px"
                  color="#e0c4a0"
                >
                  III
                </Typography>
              </Button>
            </div>
          </Tooltip>
        </ControlsContainer>
      </Stack>
    </GameModal>
  );
};
