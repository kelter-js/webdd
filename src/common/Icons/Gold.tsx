import goldIcon from "../../assets/icons/gold.svg";

export const GoldIcon = ({ size = 20 }: { size?: number }) => (
  <img src={goldIcon} style={{ height: size, width: size }} />
);
