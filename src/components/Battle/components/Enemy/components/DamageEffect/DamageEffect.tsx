import { FC, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { DamageInstance, DamageEffectProps } from "./types";
import {
  CriticalText,
  DamageNumber,
  NumbersContainer,
} from "./DamageEffect.styled";
import {
  getCriticalAnimationConfig,
  getCriticalInitialAnimationConfig,
  getDamageAnimationConfig,
  getDamageInitialAnimationConfig,
} from "./constants";

export const DamageEffect: FC<DamageEffectProps> = ({
  onDamageAnimationEnd,
  damage,
  isCritical,
  containerId,
  isEvasion,
}) => {
  const [damageNumbers, setDamageNumbers] = useState<DamageInstance | null>(
    null,
  );
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  useEffect(() => {
    // containerId теперь обязательный, но на всякий случай проверяем
    if (!containerId) {
      console.warn("DamageEffect: containerId is required");
      return;
    }

    const container = document.getElementById(containerId);

    if (!container) {
      console.warn(
        `DamageEffect: Container with id "${containerId}" not found`,
      );
      return;
    }

    const containerRect = container.getBoundingClientRect();

    // Позиционируем снизу контейнера
    const bottomX = containerRect.left + containerRect.width / 2;
    const bottomY = containerRect.top + containerRect.height - 20;

    setPosition({
      x: bottomX,
      y: bottomY,
    });

    const newDamage: DamageInstance = {
      id: Date.now() + Math.random(),
      damage,
      x: 0,
      y: 0,
    };

    setDamageNumbers(newDamage);
  }, [damage, containerId]);

  const removeDamageNumber = () => {
    setDamageNumbers(null);
    setPosition(null);
    onDamageAnimationEnd?.();
  };

  const handleAllAnimationsComplete = () => {
    onDamageAnimationEnd?.();
  };

  const { id, damage: damageNumber } = damageNumbers || {};

  // Если нет позиции или цифр, не рендерим
  if (!position || !damageNumbers) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={handleAllAnimationsComplete}>
      <NumbersContainer
        key={id}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 999999999,
        }}
      >
        <DamageNumber
          as={motion.div}
          initial={getDamageInitialAnimationConfig(0, 0)}
          animate={getDamageAnimationConfig(0, 0)}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          onAnimationComplete={removeDamageNumber}
          style={{
            position: "relative",
            whiteSpace: "nowrap",
          }}
        >
          {isEvasion ? "ПРОМАХ" : damageNumber}
        </DamageNumber>

        {isCritical && !isEvasion && (
          <CriticalText
            as={motion.div}
            initial={getCriticalInitialAnimationConfig(0, 0)}
            animate={getCriticalAnimationConfig(0, 0)}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{
              position: "relative",
              whiteSpace: "nowrap",
            }}
          >
            CRIT!
          </CriticalText>
        )}
      </NumbersContainer>
    </AnimatePresence>
  );
};
