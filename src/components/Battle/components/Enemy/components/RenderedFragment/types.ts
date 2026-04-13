import { FragmentData } from "../../types";

export interface RenderedFragmentProps {
  data: FragmentData;
  imgSrc: string;
  animated: boolean;
  isBoss: boolean;
  onAnimationComplete: VoidFunction;
}
