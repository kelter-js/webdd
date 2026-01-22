import MediumPotion from "../../assets/potions/medium-potion.svg";

export const HealthPotionBulbous = ({ size = 40 }: { size?: number }) => (
  <img src={MediumPotion} style={{ height: size, width: size }} />
);
