import { RESOURCES } from "../entities/resources";

export const getTotalAmountOfResourceByType = (
  resources: RESOURCES[],
  collected: [RESOURCES, string][],
  type: RESOURCES,
) => {
  const inventoryResources = resources.filter((item) => item === type).length;

  const collectedResources = collected.find((resource) => resource[0] === type);

  const collectedResourcesAmount = collectedResources
    ? Number(collectedResources[1])
    : 0;

  return collectedResourcesAmount + inventoryResources;
};
