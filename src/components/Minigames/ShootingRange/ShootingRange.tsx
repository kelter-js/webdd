import React, { FC } from "react";
import { Container } from "./ShootingRange.styled";
import { useShootingGame } from "./useShootingGame";
import { Target } from "./components/Target";
import { MiniGameProps } from "../types";
import { GameModal } from "../../GameModal";
import { Button, Stack, Typography } from "@mui/material";

export const ShootingRange: FC<MiniGameProps> = (props) => {
  const {
    currentIndex,
    isStarted,
    targets,
    handleRestart,
    animatedElements,
    handleHitTarget,
    handleAnimationEnd,
  } = useShootingGame(props);
  console.log("currentIndex", currentIndex);
  console.log("targets", targets);
  console.log("isStarted", isStarted);

  return (
    <Container>
      {isStarted &&
        new Array(targets.length).fill(null).map((_, index) => {
          return (
            <div
              key={index}
              onClick={handleHitTarget}
              style={{
                position: "absolute",
                top: `${targets[index].y}px`,
                left: `${targets[index].x}px`,
                zIndex: 9999999999999999999999999999999999,
                display:
                  currentIndex === index || animatedElements.includes(index)
                    ? "block"
                    : "none",
              }}
            >
              <Target
                isScattering={animatedElements.includes(index)}
                onScatterComplete={() => handleAnimationEnd(index)}
              />
            </div>
          );
        })}

      {!isStarted && (
        <GameModal height="auto" width="550px">
          <Stack gap={1}>
            <Typography
              sx={{
                width: "100%",
                color: "#c08040",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: (theme) => theme.spacing(1),
                fontFamily: "inherit",
                textAlign: "center",
              }}
              variant="h5"
            >
              В данном испытании необходимо отстрелить как минимум 15 мишеней.
              Даётся 5 попыток. Всего мишеней будет выброшено 20.
            </Typography>

            <Button
              variant="text"
              fullWidth
              sx={{ p: 0, m: "0 auto", width: "80%" }}
              onClick={handleRestart}
            >
              <Typography
                sx={{
                  width: "100%",
                  color: "#c08040",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  padding: (theme) => theme.spacing(1),
                  borderBottom: "1px solid #5a3020",
                  borderTop: "1px solid #5a3020",
                  fontFamily: "inherit",
                }}
                variant="h5"
              >
                Начать испытание
              </Typography>
            </Button>
          </Stack>
        </GameModal>
      )}
    </Container>
  );
};
