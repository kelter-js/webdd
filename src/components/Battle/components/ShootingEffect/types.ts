export type Point = {
  x: number;
  y: number;
};

export type Projectile = {
  id: number;
  from: Point;
  to: Point;
  delay: number;
};

export type ProjectileLayerProps = {
  sourceId: string;
  targetId: string;
  shots?: number;
  duration?: number;
  onComplete?: VoidFunction;
};
