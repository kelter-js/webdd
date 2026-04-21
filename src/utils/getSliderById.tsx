import {
  ACT_1_SLIDERS,
  ACT_2_SLIDERS,
  ACT_3_SLIDERS,
  INTRO_SLIDERS,
} from "../constants/slides";
import { SLIDERS } from "../entities/sliders";

export const getSliderById = (id: SLIDERS | null) => {
  switch (id) {
    case SLIDERS.INTRO:
      return INTRO_SLIDERS;

    case SLIDERS.FIRST_ACT:
      return ACT_1_SLIDERS;

    case SLIDERS.SECOND_ACT:
      return ACT_2_SLIDERS;

    case SLIDERS.FINAL_ACT:
      return ACT_3_SLIDERS;

    default:
      return INTRO_SLIDERS;
  }
};
