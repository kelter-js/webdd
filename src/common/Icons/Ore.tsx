import oreIcon from "../../assets/resources/ore.svg";

export const Ore = ({ size = 80 }: { size?: number }) => (
  <img src={oreIcon} style={{ height: size, width: size }} />
);
