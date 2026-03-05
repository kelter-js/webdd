import { LOCATION_NAMES, LOCATIONS } from "../constants";

export const useGetLocation = (tier: number) => {
  switch (tier) {
    case 1:
      return LOCATIONS[LOCATION_NAMES.CITY];
    case 2:
      return LOCATIONS[LOCATION_NAMES.CITY2];
    case 3:
      return LOCATIONS[LOCATION_NAMES.CITY3];

    default: {
      return LOCATIONS[LOCATION_NAMES.CITY];
    }
  }
};
