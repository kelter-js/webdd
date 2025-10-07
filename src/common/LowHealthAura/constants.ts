export const LOW_HEALTH_INITIAL_SETTINGS = { opacity: 0 };
export const LOW_HEALTH_STYLES = {
  width: "100%",
  height: "100%",
  background:
    "radial-gradient(circle, rgba(0,0,0,0) 70%, rgba(255,0,0,0.6) 100%)",
};
export const LOW_HEALTH_TRANSITION = {
  duration: 2,
  repeat: Infinity,
  ease: "easeInOut",
};
export const LOW_HEALTH_ANIMATE = {
  opacity: [0.4, 0.7, 0.4],
  scale: [1, 1.05, 1],
};
