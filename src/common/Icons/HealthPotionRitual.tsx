import ExtraLargePotion from "../../assets/potions/extra-large-potion.svg";

export const HealthPotionRitual = ({ size = 40 }: { size?: number }) => (
  <img src={ExtraLargePotion} style={{ height: size, width: size }} />
);
