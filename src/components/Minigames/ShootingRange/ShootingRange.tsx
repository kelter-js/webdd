import { FC } from "react";

import { useShootingGame } from "./useShootingGame";
import { Target } from "./components/Target";
import { MiniGameProps } from "../types";
import { Container } from "./ShootingRange.styled";

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
        new Array(targets.length).fill(null).map((_, index) => (
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
        ))}
    </Container>
  );
};
