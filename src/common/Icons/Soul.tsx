import soulIcon from "../../assets/resources/soul.svg";

export const Soul = ({ size = 80 }: { size?: number }) => (
  <img src={soulIcon} style={{ height: size, width: size }} />
);
