export interface ScreenFadeProps {
  isVisible: boolean; // Управление видимостью извне
  duration?: number; // Длительность анимации в ms
  color?: string; // Цвет фона
  onFadeComplete?: () => void; // Колбэк по завершении анимации
  timeout?: { enter: number; exit: number };
}

export interface FadeContainerProps {
  color: string;
  isVisible: boolean;
}
