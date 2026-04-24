import { FC, useRef } from "react";
import { motion } from "framer-motion";

import {
  DEFAULT_AMOUNT_OF_SHOTS,
  DEFAULT_SHOOTING_DURATION,
  PROJECTILE_STYLES,
} from "./constants";
import { Projectile, ProjectileLayerProps } from "./types";
import { getCenter } from "./utils";
import { ShootingContainer } from "./ShootingEffect.styled";

export const ShootingEffect: FC<ProjectileLayerProps> = ({
  sourceId,
  targetId,
  shots = DEFAULT_AMOUNT_OF_SHOTS,
  duration = DEFAULT_SHOOTING_DURATION,
  onComplete,
}) => {
  const idRef = useRef(0);
  const lastCompletedRef = useRef<number | null>(null);

  if (!sourceId || !targetId) return null;

  const sourceEl = document.getElementById(sourceId);
  const targetEl = document.getElementById(targetId);

  if (!sourceEl || !targetEl) return null;

  const from = getCenter(sourceEl);
  const to = getCenter(targetEl);

  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const baseAngle = Math.atan2(dy, dx);
  const baseDistance = Math.sqrt(dx * dx + dy * dy);

  const SPREAD = 0.12;
  const DISTANCE_JITTER = 0.08;

  const projectiles: Projectile[] = Array.from({ length: shots }).map(
    (_, i) => {
      const id = ++idRef.current;

      const angleOffset = (Math.random() - 0.5) * SPREAD;
      const distanceMultiplier = 1 + (Math.random() - 0.5) * DISTANCE_JITTER;

      const angle = baseAngle + angleOffset;
      const distance = baseDistance * distanceMultiplier;

      return {
        id,
        from,
        to: {
          x: from.x + Math.cos(angle) * distance,
          y: from.y + Math.sin(angle) * distance,
        },
        delay: i * 0.05 + Math.random() * 0.02,
      };
    },
  );

  const lastProjectileId = projectiles[projectiles.length - 1]?.id;

  return (
    <ShootingContainer>
      {projectiles.map((p) => {
        const dx = p.to.x - p.from.x;
        const dy = p.to.y - p.from.y;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        if (!isFinite(distance) || !isFinite(angle)) return null;

        return (
          <motion.div
            key={p.id}
            initial={{
              x: p.from.x,
              y: p.from.y,
              rotate: angle,
              opacity: 1,
            }}
            animate={{
              x: p.to.x,
              y: p.to.y,
            }}
            transition={{
              duration,
              delay: p.delay,
              ease: "linear",
            }}
            onAnimationComplete={() => {
              if (p.id === lastProjectileId) {
                // защита от двойного вызова
                if (lastCompletedRef.current === p.id) return;

                lastCompletedRef.current = p.id;
                onComplete?.();
              }
            }}
            style={{
              ...PROJECTILE_STYLES,
              width: distance,
            }}
          />
        );
      })}
    </ShootingContainer>
  );
};
