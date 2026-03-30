import { FC, useMemo, useState } from "react";
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
import { createPortal } from "react-dom";

export const DamageEffect: FC<DamageEffectProps> = ({
  onDamageAnimationEnd,
  damage,
  isCritical,
  containerId,
  isEvasion,
}) => {
  const addDamageNumber = (damage: number) => {
    const container = document.getElementById(containerId ?? "image-container");

    const newDamage: DamageInstance = {
      id: Date.now() + Math.random(),
      damage,
      x: 0,
      y: 0,
    };

    if (!container) {
      return newDamage;
    }

    const containerRect = container.getBoundingClientRect();

    // Рандомные координаты в пределах контейнера врага, но выше центра
    const randomX =
      Math.random() * containerRect.width * 0.6 + containerRect.width * 0.2;
    const randomY = Math.random() * containerRect.height * 0.3;

    newDamage.x = randomX;
    newDamage.y = randomY;

    return newDamage;
  };

  const [damageNumbers, setDamageNumbers] = useState<DamageInstance | null>(
    addDamageNumber(damage),
  );

  const removeDamageNumber = () => {
    setDamageNumbers(null);

    onDamageAnimationEnd?.();
  };

  const handleAllAnimationsComplete = () => {
    // Вызываем коллбэк когда все анимации урона завершены
    onDamageAnimationEnd?.();
  };

  const { id, x, y, damage: damageNumber } = damageNumbers || {};

  const container = useMemo(() => {
    if (containerId) {
      const element = document.getElementById(containerId);

      if (element) {
        return element.getBoundingClientRect();
      }

      return null;
    }

    return null;
  }, [containerId]);

  return (
    <AnimatePresence onExitComplete={handleAllAnimationsComplete}>
      <NumbersContainer
        key={id}
        hasId={!!container}
        x={container?.left}
        y={container?.top}
      >
        <DamageNumber
          as={motion.div}
          initial={getDamageInitialAnimationConfig(x, y)}
          animate={getDamageAnimationConfig(x, y)}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onAnimationComplete={removeDamageNumber}
        >
          {isEvasion ? "ПРОМАХ" : damageNumber}
        </DamageNumber>

        {/* CRIT! позиционируем относительно цифры */}
        {isCritical && (
          <CriticalText
            as={motion.div}
            initial={getCriticalInitialAnimationConfig(x, y)}
            animate={getCriticalAnimationConfig(x, y)}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            CRIT!
          </CriticalText>
        )}
      </NumbersContainer>
    </AnimatePresence>
  );
};
