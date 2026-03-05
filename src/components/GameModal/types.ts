import { ReactNode } from "react";

export interface GameModalProps {
  onClose?: VoidFunction;
  children: ReactNode;
  width?: string;
  height?: string;
  withoutPadding?: boolean;
  withoutScrolls?: boolean;
}
