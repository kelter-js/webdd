import { FC, useRef } from "react";

import { useGetEnemyImage } from "../../hooks/useGetEnemyImage";
import { FragmentData, EnemyProps } from "./types";
import { cols, fragHeight, fragWidth, rows } from "./constants";
import { useGameState } from "../../../../stores/GameState";
import { RenderedFragment } from "./components";
import { Container, TargetContainer } from "./Enemy.styled";
import { DamageEffect } from "./components/DamageEffect";
import { RENDER_LOCATIONS } from "../../../../entities";
import { Icons } from "../../../../common";

export const Enemy: FC<EnemyProps> = ({
  damage = 0,
  onDamageAnimationEnd,
  isCritical,
  layout,
  isAttacking = false,
  onAttackEnd,
  isSelected = false,
}) => {
  const {
    player: { battle },
    setLocationState,
    // endbattle коллбэк
  } = useGameState();

  const isEnemyDead = Boolean(battle?.reward);

  // const enemySource = getSource(battle?.enemy?.type);
  const enemySource = useGetEnemyImage();

  const fragmentsRef = useRef<FragmentData[] | null>(null);

  const handleEndBattle = () => {
    setLocationState(RENDER_LOCATIONS.DUNGEON);
  };

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

  console.log("isSelected", isSelected);

  return (
    <Container
      id="image-container"
      left={layout}
      initial={{ x: "-50%", scale: 1, y: 0 }}
      animate={
        isAttacking
          ? {
              // 1. Слегка оттягивается назад (замах)
              // 2. Резко прыгает вперед (удар)
              // 3. Возвращается
              scale: [1, 0.95, 1.3, 1],
              y: [0, -20, 100, 0], // Отрицательный y — это движение вверх (назад)
              x: "-50%",
            }
          : { x: "-50%", scale: 1, y: 0 }
      }
      transition={
        isAttacking
          ? {
              duration: 0.6,
              // times сопоставляет моменты анимации (0..1)
              // 0.2 - конец замаха, 0.4 - пик удара, 1 - возврат
              times: [0, 0.2, 0.4, 1],
              ease: "easeInOut",
            }
          : { duration: 0.3 }
      }
      onAnimationComplete={() => {
        if (isAttacking && onAttackEnd) {
          onAttackEnd();
        }
      }}
    >
      {fragmentsRef.current?.map((frag) => (
        <RenderedFragment
          key={frag.key}
          data={frag}
          imgSrc={enemySource}
          animated={isEnemyDead}
          onAnimationEnd={handleEndBattle}
        />
      ))}

      {isSelected && (
        <TargetContainer>
          <Icons.Target />
        </TargetContainer>
      )}

      {Boolean(damage) && (
        <DamageEffect
          damage={damage}
          isCritical={isCritical}
          onDamageAnimationEnd={onDamageAnimationEnd}
        />
      )}
    </Container>
  );
};
