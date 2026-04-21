import { FC } from "react";
import { motion } from "framer-motion";

import {
  ORNAMENT_ANIMATION_CONFIG,
  ORNAMENT_EXIT_CONFIG,
  ORNAMENT_INITIAL_CONFIG,
  ORNAMENT_TRANSITION_CONFIG,
  positions,
} from "../constants";
import { OrnamentProps } from "../types";
import { POSITIONS } from "../entities";

export const Ornament: FC<OrnamentProps> = ({
  position = POSITIONS.TOP_LEFT,
}) => (
  <motion.div
    initial={ORNAMENT_INITIAL_CONFIG}
    animate={ORNAMENT_ANIMATION_CONFIG}
    exit={ORNAMENT_EXIT_CONFIG}
    transition={ORNAMENT_TRANSITION_CONFIG}
    style={{
      position: "absolute",
      ...positions[position],
      width: 40,
      height: 40,
    }}
  >
    <svg viewBox="0 0 40 40" fill="none">
      <motion.path
        d="M5,20 Q20,5 35,20 Q20,35 5,20"
        stroke="#8B0000"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d="M10,20 Q20,10 30,20 Q20,30 10,20"
        stroke="#FF0000"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
    </svg>
  </motion.div>
);
