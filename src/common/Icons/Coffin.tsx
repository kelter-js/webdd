import coffinIcon from "../../assets/icons/coffin.svg";

export const CoffinIcon = ({ size = 40 }: { size?: number }) => (
  <img src={coffinIcon} style={{ height: size, width: size }} />
);
