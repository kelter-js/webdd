import { Icons } from "../common";
import { RESOURCES } from "../entities/resources";

export const getResourceIcon = (resourceType: RESOURCES) => {
  switch (resourceType) {
    case RESOURCES.ORE:
      return <Icons.Ore />;
    case RESOURCES.SOUL:
      return <Icons.Soul />;
    default:
      return <Icons.Photo />;
  }
};
