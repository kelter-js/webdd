import { Icons } from "../common";
import { RESOURCES } from "../entities/resources";

export const getResourceIcon = (resourceType: RESOURCES, size?: number) => {
  switch (resourceType) {
    case RESOURCES.ORE:
      return <Icons.Ore size={size} />;
    case RESOURCES.SOUL:
      return <Icons.Soul size={size} />;
    default:
      return <Icons.Jewelry size={size} />;
  }
};
