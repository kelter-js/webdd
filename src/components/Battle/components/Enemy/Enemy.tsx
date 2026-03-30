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

const DEFAULT_ANIMATION_STATE = { x: "-50%", scale: 1, y: 0, rotate: 0 };

const variants = {
  idle: DEFAULT_ANIMATION_STATE,

  attack: {
    scale: [1, 0.95, 1.3, 1],
    y: [0, -20, 100, 0],
    x: "-50%",
  },

  hit: {
    x: ["-50%", "-55%", "-45%", "-52%", "-48%", "-50%"],
    rotate: [0, -2, 2, -2, 2, 0],
    filter: ["brightness(1)", "brightness(1.8)", "brightness(1)"],
  },
};

export const Enemy: FC<EnemyProps> = ({
  damage = null,
  onDamageAnimationEnd,
  isCritical,
  layout,
  isAttacking = false,
  onAttackEnd,
  isSelected = false,
  index,
  isUnderAttack,
  isEvasion,
  shouldPlayDeathAnimation,
  type,
}) => {
  const isEnemyDead = shouldPlayDeathAnimation;

  console.log("type", type);
  console.log("isAttacking", isAttacking);

  const enemySource = useGetEnemyImage(type);

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

  console.log("isSelected", layout);
  console.log("isAttacking", isAttacking);

  return (
    <Container
      id={`enemy-${index}`}
      left={layout}
      initial={DEFAULT_ANIMATION_STATE}
      animate={
        shouldPlayDeathAnimation
          ? "idle"
          : isAttacking
            ? "attack"
            : isUnderAttack
              ? "hit"
              : "idle"
      }
      variants={variants}
      transition={
        shouldPlayDeathAnimation
          ? DEFAULT_ANIMATION_STATE
          : isAttacking
            ? {
                duration: 0.6,
                times: [0, 0.2, 0.4, 1],
                ease: "easeInOut",
              }
            : isUnderAttack
              ? {
                  duration: 0.4, // Тряска должна быть быстрой
                  ease: "linear",
                }
              : { duration: 0.3 }
      }
      onAnimationComplete={(definition) => {
        if (definition === "attack" && !shouldPlayDeathAnimation) {
          onAttackEnd?.();
        }
      }}
    >
      {fragmentsRef.current?.map((frag) => (
        <RenderedFragment
          key={frag.key}
          data={frag}
          imgSrc={enemySource}
          animated={isEnemyDead}
          onAnimationComplete={() => {
            if (isEnemyDead && index === 0 && shouldPlayDeathAnimation) {
              onAttackEnd();
            }
          }}
        />
      ))}

      {isSelected && !isEnemyDead && (
        <TargetContainer>
          <Icons.Target />
        </TargetContainer>
      )}

      {((Boolean(damage) && damage !== null) || isEvasion) && (
        <DamageEffect
          isEvasion={isEvasion}
          damage={damage || 0}
          isCritical={isCritical}
        />
      )}
    </Container>
  );
};
