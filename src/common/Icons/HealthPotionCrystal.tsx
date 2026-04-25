import LargePotion from "../../assets/potions/large-potion.svg";

export const HealthPotionCrystal = ({ size = 40 }: { size?: number }) => (
  <img src={LargePotion} style={{ height: size, width: size }} />
);
