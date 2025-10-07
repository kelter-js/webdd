export interface FragmentProps {
  dx: string;
  dy: string;
  animated: boolean;
  imgSrc: string;
}

export interface FragmentData {
  key: string;
  left: number;
  top: number;
  backgroundPosition: string;
  dx: string;
  dy: string;
}

export interface RenderedFragmentProps {
  data: FragmentData;
  imgSrc: string;
  animated: boolean;
  onAnimationEnd: () => void;
}

export interface EnemyProps {
  isDead: boolean;
}
