import { GameModal } from "../GameModal";
import { useAppState, useGameState } from "../../stores";
import almanacCover from "../../assets/traders/almanac.png";
import { Button, Stack, Typography } from "@mui/material";

import { useState } from "react";
import ForwardIcon from "@mui/icons-material/Forward";
import { ControlsContainer } from "./AlmanacModal.styled";
import { Tooltip } from "../../common";

const DISABLE_TEXT = "Эта страница пока что недоступна";
const DEFAULT_PAGE_DISPLAY_AMOUNT = 2;
// DEFAULT_DATA_ARRAY.slice(page *DEFAULT_PAGE_DISPLAY_AMOUNT , page * DEFAULT_PAGE_DISPLAY_AMOUNT  + DEFAULT_PAGE_DISPLAY_AMOUNT  );
// сначала - 0,2
// потом 2,4
// потом 4,6

export const AlmanacModal = () => {
  const {
    player: { currentTier },
  } = useGameState();

  const [pageHeader, setPageHeader] = useState(currentTier);
  const [page, setPage] = useState(0);

  const { toggleAlmanac } = useAppState();

  const handleForward = () => setPage((state) => state + 1);
  const handleBackward = () => setPage((state) => state - 1);
  const isBackwardButtonAvailable = page !== 0;

  return (
    <GameModal onClose={toggleAlmanac} withoutPadding>
      <Stack position="relative">
        <img style={{ width: "1180px", height: "675px" }} src={almanacCover} />

        {isBackwardButtonAvailable && (
          <Button
            onClick={handleBackward}
            sx={{
              position: "absolute",
              top: 17,
              left: 85,
              transform: "rotate(180deg)",
              "&:active": {
                boxShadow: "none", // убирает эффект нажатия
              },
              "& .MuiTouchRipple-root": {
                display: "none",
              },
            }}
          >
            <ForwardIcon
              sx={{
                fontSize: 60,
                color: "#e0c0a0",
              }}
            />
          </Button>
        )}

        <Button
          sx={{
            position: "absolute",
            top: 17,
            right: 85,
            "&:active": {
              boxShadow: "none", // убирает эффект нажатия
            },
            "& .MuiTouchRipple-root": {
              display: "none",
            },
          }}
          onClick={handleForward}
        >
          <ForwardIcon
            sx={{
              fontSize: 60,
              color: "#e0c0a0",
            }}
          />
        </Button>

        {/* <Stack position="absolute"></Stack>

        <Stack position="absolute"></Stack> */}

        <ControlsContainer>
          <Button
            sx={{
              minWidth: "50px",
              width: "50px",
              height: "50px",
              background: pageHeader === 1 ? "#1a0a0a" : "",
              border: `4px solid rgba(192, 160, 128, ${
                pageHeader === 1 ? "0.8" : "0.3"
              })`,
              fontFamily: "inherit",
            }}
            onClick={() => setPageHeader(1)}
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
                  background: pageHeader === 2 ? "#1a0a0a" : "",
                  border: `4px solid rgba(192, 160, 128, ${
                    pageHeader === 2 ? "0.8" : "0.3"
                  })`,
                  fontFamily: "inherit",
                }}
                onClick={() => setPageHeader(2)}
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
                  background: pageHeader === 3 ? "#1a0a0a" : "",
                  border: `4px solid rgba(192, 160, 128, ${
                    pageHeader === 3 ? "0.8" : "0.3"
                  })`,
                  fontFamily: "inherit",
                }}
                onClick={() => setPageHeader(3)}
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
