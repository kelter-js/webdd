import { MotionStyle } from "framer-motion";

export const DEFAULT_AMOUNT_OF_SHOTS = 1;
export const DEFAULT_SHOOTING_DURATION = 0.4;
export const PROJECTILE_STYLES: MotionStyle = {
  position: "absolute",

  height: 3,
  transformOrigin: "0% 50%",
  background:
    "linear-gradient(90deg, rgba(255,200,50,1) 0%, rgba(255,200,50,0) 100%)",
  boxShadow: "0 0 6px rgba(255,200,50,0.8)",
  willChange: "transform",
};
