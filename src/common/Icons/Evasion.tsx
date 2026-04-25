import evasionIcon from "../../assets/icons/evasion.png";

export const Evasion = ({ size = 20 }: { size?: number }) => (
  <img src={evasionIcon} style={{ height: size, width: size }} />
);
