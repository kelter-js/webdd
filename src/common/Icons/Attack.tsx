import attackIcon from "../../assets/icons/sword.png";

export const Attack = ({ size = 20 }: { size?: number }) => (
  <img src={attackIcon} style={{ height: size, width: size }} />
);
