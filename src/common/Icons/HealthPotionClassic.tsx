import SmallPotion from "../../assets/potions/small-potion.svg";

export const HealthPotionClassic = ({ size = 40 }: { size?: number }) => (
  <img src={SmallPotion} style={{ height: size, width: size }} />
);
