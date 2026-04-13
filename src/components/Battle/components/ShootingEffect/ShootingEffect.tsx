import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

import { Projectile, ProjectileLayerProps } from "./types";
import { getCenter } from "./utils";

export const ShootingEffect: FC<ProjectileLayerProps> = ({
  sourceId,
  targetId,
  shots = 1,
  duration = 0.4,
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
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
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
              position: "absolute",
              width: distance,
              height: 3,
              transformOrigin: "0% 50%",
              background:
                "linear-gradient(90deg, rgba(255,200,50,1) 0%, rgba(255,200,50,0) 100%)",
              boxShadow: "0 0 6px rgba(255,200,50,0.8)",
              willChange: "transform",
            }}
          />
        );
      })}
    </Box>
  );
};
