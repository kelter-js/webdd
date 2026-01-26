import { useGameState } from "../../../../stores";

export const SellList = () => {
  const { inventory } = useGameState();

  return (
    <div>
      {(inventory || []).map((item) => (
        <div></div>
      ))}
    </div>
  );
};
