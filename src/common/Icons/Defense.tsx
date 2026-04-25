import defenseIcon from "../../assets/icons/shield.png";

export const Defense = ({ size = 20 }: { size?: number }) => (
  <img src={defenseIcon} style={{ height: size, width: size }} />
);
