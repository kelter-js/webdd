import { FC, useRef } from "react";
import { Stack, Typography } from "@mui/material";

import {
  cols,
  fragHeight,
  fragWidth,
  rows,
  bossFragWidth,
  bossFragHeight,
  DEFAULT_ANIMATION_STATE,
  ANIMATION_VARIANTS,
  ATTACKING_TRANSITION_CONFIG,
  UNDER_ATTACK_TRANSITION_CONFIG,
} from "./constants";
import {
  EFFECTS_DESCRIPTIONS,
  EFFECTS_ICONS,
} from "../../../../entities/effects";
import { CREATURE_NAME_MAP } from "../../../../constants/creatures";
import { useGetEnemyImage } from "../../hooks/useGetEnemyImage";
import { RenderedFragment, DamageEffect } from "./components";
import { Icons, Tooltip } from "../../../../common";
import { FragmentData, EnemyProps } from "./types";
import { ENEMIES } from "../../../../entities";

import { MainButtonText } from "../../../../common/styled.index";
import { Container, HealthBar, TargetContainer } from "./Enemy.styled";

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

  const enemySource = useGetEnemyImage(creature.type);

  const fragmentsRef = useRef<FragmentData[] | null>(null);

  const isBoss =
    creature.type === ENEMIES.SIN_ICON_TIER_1 ||
    creature.type === ENEMIES.GENERAL_TIER_1 ||
    creature.type === ENEMIES.MERGED_MASS_TIER_1;

  if (!fragmentsRef.current) {
    const frags: FragmentData[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const dx = `${(Math.random() - 0.5) * 800}px`;
        const dy = `${(Math.random() - 0.5) * 800}px`;

        frags.push({
          key: `${x}-${y}`,
          left: x * (isBoss ? bossFragWidth : fragWidth),
          top: y * (isBoss ? bossFragHeight : fragHeight),
          backgroundPosition: `-${x * (isBoss ? bossFragWidth : fragWidth)}px -${y * (isBoss ? bossFragHeight : fragHeight)}px`,
          dx,
          dy,
        });
      }
    }

    fragmentsRef.current = frags;
  }

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
        isBoss={isBoss}
        variants={ANIMATION_VARIANTS}
        transition={
          shouldPlayDeathAnimation
            ? DEFAULT_ANIMATION_STATE
            : isAttacking
              ? ATTACKING_TRANSITION_CONFIG
              : isUnderAttack
                ? UNDER_ATTACK_TRANSITION_CONFIG
                : { duration: 0.3 }
        }
        onAnimationComplete={(definition) => {
          if (definition === "attack" && !shouldPlayDeathAnimation) {
            onAttackEnd?.();
          }
        }}
      >
        {shouldPlayDeathAnimation ? (
          fragmentsRef.current?.map((frag) => (
            <RenderedFragment
              isBoss={isBoss}
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
          ))
        ) : (
          <img
            src={enemySource}
            style={{
              width: `${isBoss ? 650 : 408}px`,
              height: `${isBoss ? 800 : 612}px`,
            }}
          />
        )}

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
          <MainButtonText
            variant="h4"
            sx={{ backgroundColor: "rgba(30, 20, 10, 0.9)" }}
          >
            {CREATURE_NAME_MAP[creature.type]}
          </MainButtonText>

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
          onDamageAnimationEnd={onDamageAnimationEnd}
        />
      )}
    </div>
  );
};
