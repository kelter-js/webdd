import { LOCATION_NAMES, LOCATIONS } from "../constants";

export const useGetLocation = (tier: number) => {
  switch (tier) {
    case 1:
      return LOCATIONS[LOCATION_NAMES.VILLAGE];
    case 2:
      return LOCATIONS[LOCATION_NAMES.BUNKER];
    case 3:
      return LOCATIONS[LOCATION_NAMES.OUTPOST];

    default: {
      return LOCATIONS[LOCATION_NAMES.VILLAGE];
    }
  }
};
