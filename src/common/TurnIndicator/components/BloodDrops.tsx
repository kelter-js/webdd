import { FC } from "react";
import { motion } from "framer-motion";

import {
  BLOOD_DROP_DEFAULT_COUNT,
  BLOOD_DROPS_ANIMATE_CONFIG,
  BLOOD_DROPS_EXIT_CONFIG,
  BLOOD_DROPS_INITIAL_CONFIG,
  BLOOD_DROPS_STYLE_CONFIG,
  BLOOD_DROPS_TRANSITION_CONFIG,
} from "../constants";
import { BloodDropsProps } from "../types";

export const BloodDrops: FC<BloodDropsProps> = ({
  count = BLOOD_DROP_DEFAULT_COUNT,
}) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={BLOOD_DROPS_INITIAL_CONFIG}
        animate={BLOOD_DROPS_ANIMATE_CONFIG}
        exit={BLOOD_DROPS_EXIT_CONFIG}
        transition={BLOOD_DROPS_TRANSITION_CONFIG}
        style={BLOOD_DROPS_STYLE_CONFIG}
      />
    ))}
  </>
);
