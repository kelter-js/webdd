import { FC } from "react";
import { motion } from "framer-motion";

import {
  getShardsAnimationConfig,
  SHARDS_DEFAULT_COLOR,
  SHARDS_DEFAULT_COUNT,
  SHARDS_EXIT_CONFIG,
  SHARDS_INITIAL_CONFIG,
  SHARDS_STYLE_CONFIG,
  SHARDS_TRANSITION_CONFIG,
} from "../constants";
import { ShardsProps } from "../types";

export const Shards: FC<ShardsProps> = ({
  count = SHARDS_DEFAULT_COUNT,
  color = SHARDS_DEFAULT_COLOR,
}) => (
  <>
    {Array.from({ length: count }).map((_, i) => {
      const angle = (i * 360) / count;
      const distance = 80 + Math.random() * 60;

      return (
        <motion.div
          key={i}
          initial={SHARDS_INITIAL_CONFIG}
          animate={getShardsAnimationConfig(angle, distance)}
          exit={SHARDS_EXIT_CONFIG}
          transition={SHARDS_TRANSITION_CONFIG}
          style={{
            ...SHARDS_STYLE_CONFIG,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      );
    })}
  </>
);
