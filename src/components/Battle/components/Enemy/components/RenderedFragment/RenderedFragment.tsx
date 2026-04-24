import { FC } from "react";

import { RenderedFragmentProps } from "./types";
import { Fragment } from "../../Enemy.styled";

export const RenderedFragment: FC<RenderedFragmentProps> = ({
  data: { dx, dy, left, top, backgroundPosition },
  imgSrc,
  animated,
  onAnimationComplete,
  isBoss,
}) => (
  <Fragment
    isBoss={isBoss}
    dx={dx}
    dy={dy}
    imgSrc={imgSrc}
    animated={animated}
    onAnimationEnd={onAnimationComplete}
    style={{
      left: `${left}px`,
      top: `${top}px`,
      backgroundPosition: backgroundPosition,
    }}
  />
);
