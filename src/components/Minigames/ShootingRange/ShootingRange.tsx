import { FC } from "react";
import { Container } from "./ShootingRange.styled";
import { useShootingGame } from "./useShootingGame";
import { Target } from "./components/Target";
import { MiniGameProps } from "../types";

export const ShootingRange: FC<MiniGameProps> = (props) => {
  const {
    currentIndex,
    isStarted,
    targets,
    animatedElements,
    handleHitTarget,
    handleAnimationEnd,
  } = useShootingGame(props);

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
    </Container>
  );
};
