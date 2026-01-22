import attackIcon from "../../assets/icons/sword.svg";

export const Attack = ({ size = 20 }: { size?: number }) => (
  <img src={attackIcon} style={{ height: size, width: size }} />
);
