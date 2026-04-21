import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ORNAMENT_ANIMATE_CONFIG,
  ORNAMENT_TRANSITION_CONFIG,
} from "./constants";
import { useAppState } from "../../stores";
import { LeveledUpData } from "../../types/appState";
import ornament from "../../assets/effects/lvlup.png";

import * as S from "./LevelUp.styled";

export const LevelUp = () => {
  const { deleteLeveledUpList, charactersLeveledUp } = useAppState();

  const [current, setCurrent] = useState<LeveledUpData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Берём следующего персонажа, если ничего не показываем
  useEffect(() => {
    if (!current && charactersLeveledUp.length > 0) {
      setCurrent(charactersLeveledUp[0]);
      setIsVisible(true);
    }
  }, [charactersLeveledUp, current]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!current) return null;

  return (
    <S.LevelUpContainer>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          deleteLeveledUpList(current.id);
          setCurrent(null);
        }}
      >
        {isVisible && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <S.NameContainer>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.img
                  src={ornament}
                  alt="Level Up Ornament"
                  animate={ORNAMENT_ANIMATE_CONFIG}
                  transition={ORNAMENT_TRANSITION_CONFIG}
                  style={{ maxWidth: "600px" }}
                />

                <S.PlayerName
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {current.name}
                </S.PlayerName>

                <S.PlayerLevel
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  {current.level}
                </S.PlayerLevel>
              </motion.div>
            </S.NameContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </S.LevelUpContainer>
  );
};
