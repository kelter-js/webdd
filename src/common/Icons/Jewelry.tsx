import jewelryIcon from "../../assets/resources/jewelry.svg";

export const Jewelry = ({ size = 80 }: { size?: number }) => (
  <img src={jewelryIcon} style={{ height: size, width: size }} />
);
