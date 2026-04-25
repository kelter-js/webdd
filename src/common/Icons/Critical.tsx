import criticalIcon from "../../assets/icons/critical.png";

export const Critical = ({ size = 20 }: { size?: number }) => (
  <img src={criticalIcon} style={{ height: size, width: size }} />
);
