import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";

import { AlmanacCreature } from "./components/AlmanacCreature";
import { useGetEnemiesData } from "./hooks/useGetEnemiesData";
import { DISABLE_TEXT, MAX_PAGE_COUNTER } from "./constants";
import { useAppState, useGameState } from "../../stores";
import { GameModal } from "../GameModal";
import { Tooltip } from "../../common";
import almanacCover from "../../assets/traders/almanac.png";

import {
  ChapterButton,
  ControlsContainer,
  MovementButton,
} from "./AlmanacModal.styled";

export const AlmanacModal = () => {
  const { player } = useGameState();
  const { currentTier } = player;

  const [pageHeader, setPageHeader] = useState(currentTier);
  const [page, setPage] = useState(0);

  const { toggleAlmanac, isAlmanacOpen } = useAppState();

  const handleForward = () => setPage((state) => state + 1);
  const handleBackward = () => setPage((state) => state - 1);
  const isBackwardButtonAvailable = page !== 0;

  const creaturesToRender = useGetEnemiesData(pageHeader, page);

  if (!isAlmanacOpen) return null;

  const forwardIcon = <ForwardIcon sx={{ fontSize: 60, color: "#e0c0a0" }} />;

  return (
    <GameModal onClose={toggleAlmanac} withoutPadding withoutScrolls>
      <Stack position="relative">
        <img style={{ width: "1180px", height: "675px" }} src={almanacCover} />

        {isBackwardButtonAvailable && (
          <MovementButton
            onClick={handleBackward}
            sx={{ left: 85, transform: "rotate(180deg)" }}
          >
            {forwardIcon}
          </MovementButton>
        )}

        {page + 1 < MAX_PAGE_COUNTER && (
          <MovementButton
            sx={{ right: 85 }}
            onClick={handleForward}
            disabled={page + 1 === MAX_PAGE_COUNTER}
          >
            {forwardIcon}
          </MovementButton>
        )}

        {creaturesToRender.map((creature, index) => (
          <AlmanacCreature index={index} key={creature.src} {...creature} />
        ))}

        <ControlsContainer>
          <ChapterButton
            isCurrentPageHeader={pageHeader === 1}
            onClick={() => {
              setPageHeader(1);
              setPage(0);
            }}
          >
            <Typography
              variant="h6"
              fontFamily="inherit"
              fontSize="30px"
              color="#e0c4a0"
            >
              I
            </Typography>
          </ChapterButton>

          <Tooltip title={currentTier < 2 ? DISABLE_TEXT : ""}>
            <div>
              <ChapterButton
                disabled={currentTier < 2}
                isCurrentPageHeader={pageHeader === 2}
                onClick={() => {
                  setPageHeader(2);
                  setPage(0);
                }}
              >
                <Typography
                  variant="h6"
                  fontFamily="inherit"
                  fontSize="30px"
                  color="#e0c4a0"
                >
                  II
                </Typography>
              </ChapterButton>
            </div>
          </Tooltip>

          <Tooltip title={currentTier < 3 ? DISABLE_TEXT : ""}>
            <div>
              <ChapterButton
                isCurrentPageHeader={pageHeader === 3}
                disabled={currentTier < 3}
                onClick={() => {
                  setPageHeader(3);
                  setPage(0);
                }}
              >
                <Typography
                  variant="h6"
                  fontFamily="inherit"
                  fontSize="30px"
                  color="#e0c4a0"
                >
                  III
                </Typography>
              </ChapterButton>
            </div>
          </Tooltip>
        </ControlsContainer>
      </Stack>
    </GameModal>
  );
};
