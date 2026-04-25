import { SLIDERS } from "../../entities/sliders";
import { SlideData } from "../../types";

export interface StorySlideProps {
  slides: SlideData[];
  sliderId: SLIDERS;
}
