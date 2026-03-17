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
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const idRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const sourceEl = document.getElementById(sourceId);
    const targetEl = document.getElementById(targetId);

    // 🔒 защита от отсутствия DOM
    if (!sourceEl || !targetEl) {
      console.warn("ProjectileLayer: source or target not found");
      return;
    }

    const from = getCenter(sourceEl);
    const to = getCenter(targetEl);

    const dx = to.x - from.x;
    const dy = to.y - from.y;

    const baseAngle = Math.atan2(dy, dx);
    const baseDistance = Math.sqrt(dx * dx + dy * dy);

    // 🔥 настройки разброса
    const SPREAD = 0.12; // ~7°
    const DISTANCE_JITTER = 0.08; // ±8%

    const created: Projectile[] = [];

    for (let i = 0; i < shots; i++) {
      idRef.current += 1;

      // 🎯 случайный угол
      const angleOffset = (Math.random() - 0.5) * SPREAD;

      // 🎯 небольшая вариация дальности
      const distanceMultiplier = 1 + (Math.random() - 0.5) * DISTANCE_JITTER;

      const angle = baseAngle + angleOffset;
      const distance = baseDistance * distanceMultiplier;

      const newTo = {
        x: from.x + Math.cos(angle) * distance,
        y: from.y + Math.sin(angle) * distance,
      };

      created.push({
        id: idRef.current,
        from,
        to: newTo,
        delay: i * 0.05 + Math.random() * 0.02,
      });
    }

    setProjectiles(created);

    const maxDelay = created.length
      ? Math.max(...created.map((p) => p.delay))
      : 0;

    timeoutRef.current = window.setTimeout(
      () => {
        onComplete?.();
      },
      (maxDelay + duration) * 1000 + 200,
    );

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [sourceId, targetId, shots, duration, onComplete]);

  if (!sourceId || !targetId) {
    onComplete?.();
    return null;
  }

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

        // 🔒 защита от NaN (редкий кейс)
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
            style={{
              position: "absolute",
              width: distance,
              height: 3,
              transformOrigin: "0% 50%",
              background:
                "linear-gradient(90deg, rgba(255,200,50,1) 0%, rgba(255,200,50,0) 100%)",
              boxShadow: "0 0 6px rgba(255,200,50,0.8)",
              willChange: "transform", // 🚀 perf
            }}
          />
        );
      })}
    </Box>
  );
};
