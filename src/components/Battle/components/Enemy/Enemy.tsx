import { FC, useRef } from "react";
import { Container, Fragment } from "./Enemy.styled";

import { useGetEnemyImage } from "../../hooks/useGetEnemyImage";
import { FragmentData, RenderedFragmentProps } from "./types";
import { cols, fragHeight, fragWidth, rows } from "./constants";
import { useGameState } from "../../../../stores/GameState/GameState";

const RenderedFragment: FC<RenderedFragmentProps> = ({
  data,
  imgSrc,
  animated,
  onAnimationEnd,
}) => (
  <Fragment
    dx={data.dx}
    dy={data.dy}
    imgSrc={imgSrc}
    animated={animated}
    onAnimationEnd={onAnimationEnd}
    style={{
      left: `${data.left}px`,
      top: `${data.top}px`,
      backgroundPosition: data.backgroundPosition,
    }}
  />
);

export const Enemy = () => {
  const {
    player: { battle },
    // endbattle коллбэк
  } = useGameState();

  const isEnemyDead = battle?.enemy?.health! <= 0;

  // const enemySource = getSource(battle?.enemy?.type);
  const enemySource = useGetEnemyImage();

  const fragmentsRef = useRef<FragmentData[] | null>(null);

  if (!fragmentsRef.current) {
    const frags: FragmentData[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = `${(Math.random() - 0.5) * 800}px`;
        const dy = `${(Math.random() - 0.5) * 800}px`;
        frags.push({
          key: `${x}-${y}`,
          left: x * fragWidth,
          top: y * fragHeight,
          backgroundPosition: `-${x * fragWidth}px -${y * fragHeight}px`,
          dx,
          dy,
        });
      }
    }

    fragmentsRef.current = frags;
  }

  return (
    <Container id="image-container">
      {fragmentsRef.current?.map((frag) => (
        <RenderedFragment
          key={frag.key}
          data={frag}
          imgSrc={enemySource}
          animated={isEnemyDead}
          // onAnimationEnd={endBattle}
          onAnimationEnd={() => {
            console.log("animation ended");
          }}
        />
      ))}
    </Container>
  );
};
