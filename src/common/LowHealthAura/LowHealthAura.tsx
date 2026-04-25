import { FC } from "react";
import { motion } from "framer-motion";

import {
  LOW_HEALTH_INITIAL_SETTINGS,
  LOW_HEALTH_TRANSITION,
  LOW_HEALTH_ANIMATE,
  LOW_HEALTH_STYLES,
} from "./constants";
import { LowHpAuraProps } from "./types";
import { LowHealthAuraContainer } from "./LowHealthAura.styled";

export const LowHealthAura: FC<LowHpAuraProps> = ({ isActive }) => (
  <LowHealthAuraContainer>
    {isActive && (
      <motion.div
        initial={LOW_HEALTH_INITIAL_SETTINGS}
        animate={LOW_HEALTH_ANIMATE}
        transition={LOW_HEALTH_TRANSITION}
        style={LOW_HEALTH_STYLES}
      />
    )}
  </LowHealthAuraContainer>
);
