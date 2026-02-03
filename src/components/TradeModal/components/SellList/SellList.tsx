import { useGameState } from "../../../../stores";
import emptySlot from "../../assets/static/empty_slot.png";

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
