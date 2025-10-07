import { LOCATION_COORDS } from "../../types/location";

export interface ImageMapHighlightProps {
  onOpen: (building: string, index?: number) => void;
  isDialogueOpen: boolean;
  coords: LOCATION_COORDS[];
  mapImage: string;
}
