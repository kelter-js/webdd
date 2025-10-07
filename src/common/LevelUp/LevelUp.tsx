import { motion, AnimatePresence } from "framer-motion";
import { LevelUpContainer, PlayerLevel, PlayerName } from "./LevelUp.styled";
import ornament from "../../assets/effects/lvlup.png";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export const LevelUp = () => {
  const [show, setShow] = useState(false);
  const duration = 2000;

  useEffect(() => {
    setShow(true);

    // const timer = setTimeout(() => {
    //   setShow(false);
    // }, duration);

    // return () => clearTimeout(timer);
  }, [duration]);

  return (
    <LevelUpContainer>
      {/* в пропе onExitComplete вызываем коллбэк */}
      {/* анимации о лвл апе показываем через useGameState, это же анимация, поэтому если перезагрузили страницу - это проблема юзера */}
      {/* после боя высчитываем и зачисляем эксп, всех кто лвлапнулся - помещаем в массив с именами чаров, но это поле не должно мемоизироваться - оно не персистентное */}
      {/* далее, если массив не пустой - берем первого персонажа - для него показываем анимацию, по завершению анимации - удаляем из массива первое вхождение */}
      {/* и так пока массив не опустеет, коллбэк для опустошения коллекции получаем через пропсы */}
      <AnimatePresence onExitComplete={() => {}}>
        {show && (
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "none",
              zIndex: 2000,
            }}
          >
            <motion.img
              src={ornament}
              alt="Level Up Ornament"
              initial={{
                opacity: 0,
                scale: 0.8,
                filter: "drop-shadow(0 0 0px #ff0000)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: [
                  "drop-shadow(0 0 8px #ff0000)",
                  "drop-shadow(0 0 16px #ff4444)",
                  "drop-shadow(0 0 8px #ff0000)",
                ],
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                filter: "drop-shadow(0 0 0px #ff0000)",
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                filter: {
                  duration: 2,
                  repeat: Infinity,
                },
              }}
              style={{
                maxWidth: "600px",
              }}
            />
            <PlayerName
              initial={{
                opacity: 0,
                scale: 0.1,
                filter: "drop-shadow(0 0 0px #ff0000)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: [
                  "drop-shadow(0 0 8px #ff0000)",
                  "drop-shadow(0 0 16px #ff4444)",
                  "drop-shadow(0 0 8px #ff0000)",
                ],
                transform: "translate(-50%, 0)",
              }}
              exit={{
                opacity: 0,
                scale: 1,
                filter: "drop-shadow(0 0 0px #ff0000)",
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                filter: {
                  duration: 2,
                  repeat: Infinity,
                },
              }}
            >
              kelter
            </PlayerName>
            <PlayerLevel
              initial={{
                opacity: 0,
                scale: 0.1,
                filter: "drop-shadow(0 0 0px #ff0000)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: [
                  "drop-shadow(0 0 8px #ff0000)",
                  "drop-shadow(0 0 16px #ff4444)",
                  "drop-shadow(0 0 8px #ff0000)",
                ],
                transform: "translate(-50%, 0)",
              }}
              exit={{
                opacity: 0,
                scale: 1,
                filter: "drop-shadow(0 0 0px #ff0000)",
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                filter: {
                  duration: 2,
                  repeat: Infinity,
                },
              }}
            >
              42
            </PlayerLevel>
          </Box>
        )}
      </AnimatePresence>
    </LevelUpContainer>
  );
};
