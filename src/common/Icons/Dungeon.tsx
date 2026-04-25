import dungeonIcon from "../../assets/icons/dungeon.svg";

export const Dungeon = ({ size = 20 }: { size?: number }) => (
  <img src={dungeonIcon} style={{ height: size, width: size }} />
);
