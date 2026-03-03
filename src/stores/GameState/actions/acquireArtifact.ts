import { v4 } from "uuid";
import {
  FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT,
  SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT,
  THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT,
  FLAGS,
} from "../../../constants";
import { BASE_ITEMS_ID } from "../../../constants/items";
import { RESOURCES } from "../../../entities/resources";
import { getTotalAmountOfResourceByType } from "../../../utils/getTotalAmountOfResourceByType";
import { StoreSet } from "./types";
import { rebuildDerivedState } from "../../../utils/rebuildDerivedState";
import { resetReleaseOptions } from "../../../constants/dialogs";

const FLAGS_BY_RESOURCE_TYPE_MAP = {
  [RESOURCES.OLD_WORLD_TREASURES]: [
    FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_1,
    FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_2,
    FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_3,
  ],
  [RESOURCES.ORE]: [
    FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_1,
    FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_2,
    FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_3,
  ],
  [RESOURCES.PARTS]: [
    FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_1,
    FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_2,
    FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_3,
  ],
};

const ARTIFACTS_BY_FLAG_MAP = {
  [FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_1]: BASE_ITEMS_ID.HEALTH_ORB_TIER_1,
  [FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_2]: BASE_ITEMS_ID.HEALTH_ORB_TIER_2,
  [FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_3]: BASE_ITEMS_ID.HEALTH_ORB_TIER_3,

  [FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_1]: BASE_ITEMS_ID.LEAD_CLOAK_TIER_1,
  [FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_2]: BASE_ITEMS_ID.LEAD_CLOAK_TIER_2,
  [FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_3]: BASE_ITEMS_ID.LEAD_CLOAK_TIER_3,

  [FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_1]:
    BASE_ITEMS_ID.BULLET_NECKLACE_TIER_1,
  [FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_2]:
    BASE_ITEMS_ID.BULLET_NECKLACE_TIER_2,
  [FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_3]:
    BASE_ITEMS_ID.BULLET_NECKLACE_TIER_3,
};

export const acquireArtifact = (set: StoreSet) => (resourceType: RESOURCES) => {
  set((state) => {
    const stateCopy = { ...state, player: { ...state.player } };

    const { resources, collected, flags } = stateCopy.player;

    const totalAmountOfResources = getTotalAmountOfResourceByType(
      resources,
      collected,
      resourceType,
    );
    const flagsByResource = FLAGS_BY_RESOURCE_TYPE_MAP[resourceType];
    const [firstTierFlag, secondTierFlag, thirdTierFlag] = flagsByResource;

    if (
      !flags.includes(firstTierFlag) &&
      totalAmountOfResources >= FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT
    ) {
      stateCopy.player.flags.push(firstTierFlag);
      const artifactBaseId =
        ARTIFACTS_BY_FLAG_MAP[
          firstTierFlag as keyof typeof ARTIFACTS_BY_FLAG_MAP
        ];

      stateCopy.player.resources = stateCopy.player.resources.filter(
        (item) => item !== resourceType,
      );

      stateCopy.player.inventory_memoized.push([artifactBaseId, v4()]);

      stateCopy.player.collected = stateCopy.player.collected.map((item) => {
        if (item[0] === resourceType) {
          return [
            resourceType,
            `${totalAmountOfResources - FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT}`,
          ];
        }

        return item;
      });
    } else if (
      flags.includes(firstTierFlag) &&
      !flags.includes(secondTierFlag) &&
      totalAmountOfResources >= SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT
    ) {
      stateCopy.player.flags.push(secondTierFlag);

      const previousTierArtifactBaseId =
        ARTIFACTS_BY_FLAG_MAP[
          firstTierFlag as keyof typeof ARTIFACTS_BY_FLAG_MAP
        ];

      const artifactBaseId =
        ARTIFACTS_BY_FLAG_MAP[
          secondTierFlag as keyof typeof ARTIFACTS_BY_FLAG_MAP
        ];

      let isArtifactDeleted = false;

      stateCopy.player.inventory_memoized =
        stateCopy.player.inventory_memoized.filter(([baseId]) => {
          if (baseId === previousTierArtifactBaseId) {
            isArtifactDeleted = true;
          }

          return baseId !== previousTierArtifactBaseId;
        });

      stateCopy.player.inventory_memoized.push([artifactBaseId, v4()]);

      if (!isArtifactDeleted) {
        // если не удалили артефакт из инвентаря - значит он экипирован, чистим экипировку
        stateCopy.player.gear_memoized = Object.fromEntries(
          Object.entries(stateCopy.player.gear_memoized).map((item) => {
            const [playerName, gear] = item;
            return [
              playerName,
              gear.filter(
                (gearItem) => gearItem[0] !== previousTierArtifactBaseId,
              ),
            ];
          }),
        );
      }

      stateCopy.player.resources = stateCopy.player.resources.filter(
        (item) => item !== resourceType,
      );

      stateCopy.player.collected = stateCopy.player.collected.map((item) => {
        if (item[0] === resourceType) {
          return [
            resourceType,
            `${totalAmountOfResources - SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT}`,
          ];
        }

        return item;
      });
    } else if (
      flags.includes(firstTierFlag) &&
      flags.includes(secondTierFlag) &&
      !flags.includes(thirdTierFlag) &&
      totalAmountOfResources >= THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT
    ) {
      stateCopy.player.flags.push(thirdTierFlag);

      const previousTierArtifactBaseId =
        ARTIFACTS_BY_FLAG_MAP[
          secondTierFlag as keyof typeof ARTIFACTS_BY_FLAG_MAP
        ];

      const artifactBaseId =
        ARTIFACTS_BY_FLAG_MAP[
          thirdTierFlag as keyof typeof ARTIFACTS_BY_FLAG_MAP
        ];

      let isArtifactDeleted = false;

      // удаляем прошлый тир из инвентаря
      stateCopy.player.inventory_memoized =
        stateCopy.player.inventory_memoized.filter(([baseId]) => {
          if (baseId === previousTierArtifactBaseId) {
            isArtifactDeleted = true;
          }

          return baseId !== previousTierArtifactBaseId;
        });

      // Добавляем новый артефакт
      stateCopy.player.inventory_memoized.push([artifactBaseId, v4()]);

      if (!isArtifactDeleted) {
        // если не удалили артефакт из инвентаря - значит он экипирован, чистим экипировку
        stateCopy.player.gear_memoized = Object.fromEntries(
          Object.entries(stateCopy.player.gear_memoized).map((item) => {
            const [playerName, gear] = item;
            return [
              playerName,
              gear.filter(
                (gearItem) => gearItem[0] !== previousTierArtifactBaseId,
              ),
            ];
          }),
        );
      }

      stateCopy.player.resources = stateCopy.player.resources.filter(
        (item) => item !== resourceType,
      );

      stateCopy.player.collected = stateCopy.player.collected.map((item) => {
        if (item[0] === resourceType) {
          return [
            resourceType,
            `${totalAmountOfResources - THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT}`,
          ];
        }

        return item;
      });
    }

    resetReleaseOptions();
    return rebuildDerivedState(stateCopy);
  });
};
