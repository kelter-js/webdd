import { LOCATION_NAMES, LOCATIONS } from "../constants";

export const useGetLocation = (location: LOCATION_NAMES) => {
  switch (location) {
    case LOCATION_NAMES.CITY:
      return LOCATIONS[LOCATION_NAMES.CITY];

    default: {
      return LOCATIONS[LOCATION_NAMES.CITY];
    }
  }
};
