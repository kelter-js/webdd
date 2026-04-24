import { PropsWithChildren } from "react";
import { SxProps } from "@mui/material";

export interface HoldProgressButtonProps extends PropsWithChildren {
  onComplete: VoidFunction;
  duration?: number;
  sx?: SxProps;
  disabled: boolean;
}
