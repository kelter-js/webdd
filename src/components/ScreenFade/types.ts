export interface ScreenFadeProps {
  isVisible: boolean;
  duration?: number;
  color?: string;
  onFadeComplete?: () => void;
}

export interface FadeContainerProps {
  color: string;
  isVisible: boolean;
}
