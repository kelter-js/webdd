import { RESOURCES } from "../entities/resources";

export const getResourceDescription = (resourceType: RESOURCES) => {
  switch (resourceType) {
    case RESOURCES.ORE:
      return "Редкая горная порода";
    case RESOURCES.PARTS:
      return "Части тела павшего противника";
    default:
      return "Сокровище реального мира";
  }
};
