import { BoxProps, TypographyProps } from "@mui/material";
import { MotionProps } from "framer-motion";

export type MotionStyledBoxProps = BoxProps & MotionProps;
export type MotionStyledTypographyProps = TypographyProps & MotionProps;
export interface GameOverScreenProps {
  isVisible: boolean;
}
