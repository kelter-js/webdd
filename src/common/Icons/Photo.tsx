import photoIcon from "../../assets/resources/frame.svg";

export const Photo = ({ size = 80 }: { size?: number }) => (
  <img src={photoIcon} style={{ height: size, width: size }} />
);
