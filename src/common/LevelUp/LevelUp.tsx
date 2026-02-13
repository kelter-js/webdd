import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";

import ornament from "../../assets/effects/lvlup.png";
import { LevelUpContainer, PlayerLevel, PlayerName } from "./LevelUp.styled";
import { useAppState } from "../../stores";
import { LeveledUpData } from "../../types/appState";

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

  // Автоматически скрываем через 2.5 секунды
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!current) return null;

  return (
    <LevelUpContainer>
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
            {/* Центрирование ТОЛЬКО здесь */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                pointerEvents: "none",
                zIndex: 2000,
              }}
            >
              {/* ВНУТРЕННЯЯ обёртка для scale */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.9,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <motion.img
                  src={ornament}
                  alt="Level Up Ornament"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 8px #ff0000)",
                      "drop-shadow(0 0 16px #ff4444)",
                      "drop-shadow(0 0 8px #ff0000)",
                    ],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: 1,
                  }}
                  style={{
                    maxWidth: "600px",
                  }}
                />

                <PlayerName
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {current.name}
                </PlayerName>

                <PlayerLevel
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  {current.level}
                </PlayerLevel>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </LevelUpContainer>
  );
};
