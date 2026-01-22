import { FC } from "react";
import { RenderedFragmentProps } from "./types";
import { Fragment } from "../../Enemy.styled";

export const RenderedFragment: FC<RenderedFragmentProps> = ({
  data,
  imgSrc,
  animated,
  onAnimationEnd,
}) => (
  <Fragment
    dx={data.dx}
    dy={data.dy}
    imgSrc={imgSrc}
    animated={animated}
    onAnimationEnd={onAnimationEnd}
    style={{
      left: `${data.left}px`,
      top: `${data.top}px`,
      backgroundPosition: data.backgroundPosition,
    }}
  />
);
