import { LOCATION_NAMES, LOCATIONS } from "../constants";

export const useGetLocation = (location: LOCATION_NAMES) => {
  switch (location) {
    case LOCATION_NAMES.CITY:
      return LOCATIONS[LOCATION_NAMES.CITY];
    case LOCATION_NAMES.CITY2:
      return LOCATIONS[LOCATION_NAMES.CITY2];
    case LOCATION_NAMES.CITY3:
      return LOCATIONS[LOCATION_NAMES.CITY3];

    default: {
      return LOCATIONS[LOCATION_NAMES.CITY];
    }
  }
};
