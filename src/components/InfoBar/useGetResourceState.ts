import { useMemo } from "react";

import {
  FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT,
  SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT,
  THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT,
} from "../../constants";
import { DIALOGUE_FLAGS } from "../../entities/dialogues";
import { RESOURCES } from "../../entities/resources";
import { useGameState } from "../../stores";
import { FLAGS } from "../../constants";
import { ResourcesMapData } from "./types";

export const useGetResourceState = () => {
  const {
    player: { collected, dialogFlags, flags, resources, battle },
  } = useGameState();

  const resourcesState = useMemo(() => {
    const resourceMap: ResourcesMapData = {
      ore: null,
      soul: null,
      treasures: null,
    };

    const collectedMap = Object.fromEntries(collected);

    if (!collectedMap[RESOURCES.ORE]) {
      collectedMap[RESOURCES.ORE] = "0";
    }

    if (!collectedMap[RESOURCES.PARTS]) {
      collectedMap[RESOURCES.PARTS] = "0";
    }

    if (!collectedMap[RESOURCES.OLD_WORLD_TREASURES]) {
      collectedMap[RESOURCES.OLD_WORLD_TREASURES] = "0";
    }

    resources.forEach((resource) => {
      collectedMap[resource] = String(Number(collectedMap[resource]) + 1);
    });

    if (
      dialogFlags.includes(DIALOGUE_FLAGS.SMITH_WELCOMED) &&
      !flags.includes(FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_3)
    ) {
      if (flags.includes(FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_2)) {
        resourceMap.ore = {
          collected: Number(collectedMap[RESOURCES.ORE]) || 0,
          required: THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT,
        };
      } else if (flags.includes(FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_1)) {
        resourceMap.ore = {
          collected: Number(collectedMap[RESOURCES.ORE]) || 0,
          required: SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT,
        };
      } else {
        resourceMap.ore = {
          collected: Number(collectedMap[RESOURCES.ORE]) || 0,
          required: FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT,
        };
      }
    }

    if (
      dialogFlags.includes(DIALOGUE_FLAGS.BODY_PARTS) &&
      !flags.includes(FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_3)
    ) {
      if (flags.includes(FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_2)) {
        resourceMap.soul = {
          collected: Number(collectedMap[RESOURCES.PARTS]) || 0,
          required: THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT,
        };
      } else if (flags.includes(FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_1)) {
        resourceMap.soul = {
          collected: Number(collectedMap[RESOURCES.PARTS]) || 0,
          required: SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT,
        };
      } else {
        resourceMap.soul = {
          collected: Number(collectedMap[RESOURCES.PARTS]) || 0,
          required: FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT,
        };
      }
    }

    if (
      dialogFlags.includes(DIALOGUE_FLAGS.PRIEST_WELCOME) &&
      !flags.includes(FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_3)
    ) {
      if (flags.includes(FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_2)) {
        resourceMap.treasures = {
          collected: Number(collectedMap[RESOURCES.OLD_WORLD_TREASURES]) || 0,
          required: THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT,
        };
      } else if (flags.includes(FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_1)) {
        resourceMap.treasures = {
          collected: Number(collectedMap[RESOURCES.OLD_WORLD_TREASURES]) || 0,
          required: SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT,
        };
      } else {
        resourceMap.treasures = {
          collected: Number(collectedMap[RESOURCES.OLD_WORLD_TREASURES]) || 0,
          required: FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT,
        };
      }
    }

    return resourceMap;
  }, [collected, dialogFlags, flags, resources, battle?.reward]);

  return resourcesState;
};
