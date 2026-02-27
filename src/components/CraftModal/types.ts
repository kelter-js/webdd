import { SxProps } from "@mui/material";
import { PropsWithChildren } from "react";

export interface HoldProgressButtonProps extends PropsWithChildren {
  onComplete: VoidFunction;
  duration?: number;
  sx?: SxProps;
  disabled: boolean;
}
