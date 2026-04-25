export interface ScreenFadeProps {
  isVisible: boolean;
  duration?: number;
  color?: string;
  onFadeComplete?: VoidFunction;
}

export interface FadeContainerProps {
  color: string;
  isVisible: boolean;
}
