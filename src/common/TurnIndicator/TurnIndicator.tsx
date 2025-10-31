import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  TURN_INDICATOR_MAIN_CONTAINER_ANIMATE_CONFIG,
  TURN_INDICATOR_MAIN_CONTAINER_EXIT_CONFIG,
  TURN_INDICATOR_MAIN_CONTAINER_INITIAL_CONFIG,
  TURN_INDICATOR_MAIN_CONTAINER_TRANSITION_CONFIG,
  TURN_INDICATOR_MAIN_PANEL_ANIMATE_CONFIG,
  TURN_INDICATOR_MAIN_PANEL_STYLE_CONFIG,
  TURN_INDICATOR_MAIN_PANEL_TRANSITION_CONFIG,
  TURN_INDICATOR_PATTERNS_STYLE_CONFIG,
  TURN_INDICATOR_PULSE_STYLE_CONFIG,
  TURN_INDICATOR_PULSE_TRANSITION_CONFIG,
  TURN_INDICATOR_STYLE_CONFIG,
} from "./constants";
import { BloodDrops, Ornament, Shards } from "./components";
import { TurnIndicatorProps } from "./types";
import { POSITIONS } from "./entities";
import { TurnName } from "./styled.index";

export const TurnIndicator: FC<TurnIndicatorProps> = ({ show, text }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={TURN_INDICATOR_STYLE_CONFIG}
      >
        <motion.div
          initial={TURN_INDICATOR_MAIN_CONTAINER_INITIAL_CONFIG}
          animate={TURN_INDICATOR_MAIN_CONTAINER_ANIMATE_CONFIG}
          exit={TURN_INDICATOR_MAIN_CONTAINER_EXIT_CONFIG}
          transition={TURN_INDICATOR_MAIN_CONTAINER_TRANSITION_CONFIG}
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Основные осколки */}
          <Shards count={12} color="#FF4444" />

          {/* Вторичные осколки */}
          <Shards count={6} color="#8B0000" />

          {/* Капли крови */}
          <BloodDrops count={8} />

          {/* Орнаменты по углам */}
          <Ornament position={POSITIONS.TOP_LEFT} />
          <Ornament position={POSITIONS.TOP_RIGHT} />
          <Ornament position={POSITIONS.BOTTOM_LEFT} />
          <Ornament position={POSITIONS.BOTTOM_RIGHT} />

          {/* Основная панель */}
          <motion.div
            initial={{ boxShadow: "0 0 0px rgba(139, 0, 0, 0.5)" }}
            animate={TURN_INDICATOR_MAIN_PANEL_ANIMATE_CONFIG}
            exit={{
              boxShadow: "0 0 0px rgba(139, 0, 0, 0)",
            }}
            transition={TURN_INDICATOR_MAIN_PANEL_TRANSITION_CONFIG}
            style={TURN_INDICATOR_MAIN_PANEL_STYLE_CONFIG}
          >
            {/* Фоновые узоры */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              style={TURN_INDICATOR_PATTERNS_STYLE_CONFIG}
            />

            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
            >
              <TurnName variant="h3">{text}</TurnName>
            </motion.div>

            {/* Пульсирующая обводка */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={TURN_INDICATOR_PULSE_TRANSITION_CONFIG}
              style={TURN_INDICATOR_PULSE_STYLE_CONFIG}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
