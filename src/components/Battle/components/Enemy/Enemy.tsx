import { FC, useRef } from "react";

import { useGetEnemyImage } from "../../hooks/useGetEnemyImage";
import { FragmentData, EnemyProps } from "./types";
import { cols, fragHeight, fragWidth, rows } from "./constants";
import { useGameState } from "../../../../stores/GameState";
import { RenderedFragment } from "./components";
import { Container, HealthBar, TargetContainer } from "./Enemy.styled";
import { DamageEffect } from "./components/DamageEffect";
import { ENEMIES, RENDER_LOCATIONS } from "../../../../entities";
import { Icons, Tooltip } from "../../../../common";
import { Stack, Typography } from "@mui/material";
import { StartGameText } from "../../../CraftModal/TradeModal.styled";
import { CREATURE_NAME_MAP } from "../../../../constants/creatures";
import {
  EFFECTS_DESCRIPTIONS,
  EFFECTS_ICONS,
} from "../../../../entities/effects";

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
  effectsList,
  isCritical,
  layout,
  isAttacking = false,
  onAttackEnd,
  isSelected = false,
  index,
  isUnderAttack,
  isEvasion,
  shouldPlayDeathAnimation,
  creature,
}) => {
  const isEnemyDead = shouldPlayDeathAnimation;

  console.log("type", creature.type);
  console.log("isAttacking", isAttacking);

  const enemySource = useGetEnemyImage(creature.type);

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
    <div>
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

        <Stack
          position="absolute"
          bottom={0}
          left="50%"
          alignItems="center"
          justifyContent="center"
          sx={{ transform: "translate(-50%, 0)", zIndex: 999999999 }}
        >
          <StartGameText
            disabled={false}
            variant="h4"
            sx={{ backgroundColor: "rgba(30, 20, 10, 0.9)" }}
          >
            {CREATURE_NAME_MAP[creature.type]}
          </StartGameText>

          <HealthBar>
            <div
              style={{
                width:
                  creature.hp === creature.maxHP
                    ? "100%"
                    : `${Math.round((creature.hp / creature.maxHP) * 100)}%`,
                height: "25px",
              }}
            >
              <Typography variant="body1" fontFamily="inherit" color="black">
                {creature.hp}/{creature.maxHP}
              </Typography>
            </div>
          </HealthBar>

          <Stack flexWrap="wrap" gap={0.5} direction="row" mt={1}>
            {effectsList.map((effect) => (
              <Tooltip
                title={`${EFFECTS_DESCRIPTIONS[effect.type]}: ${effect.duration}`}
              >
                <div>
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src={EFFECTS_ICONS[effect.type]}
                  />
                </div>
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      </Container>
      {((Boolean(damage) && damage !== null) || isEvasion) && (
        <DamageEffect
          isEvasion={isEvasion}
          damage={damage || 0}
          isCritical={isCritical}
          containerId={`enemy-${index}`}
        />
      )}
    </div>
  );
};
