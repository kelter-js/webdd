import healthIcon from "../../assets/icons/heart-rate.png";

export const Health = ({ size = 20 }: { size?: number }) => (
  <img src={healthIcon} style={{ height: size, width: size }} />
);
