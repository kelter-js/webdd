import { useEffect } from "react";
import { useGetDialogue } from "../../../../hooks";
import { useAppState } from "../../../../stores";
import { Dialogue } from "../../../Dialogue";
import { BUILDING_NAMES } from "../../../../constants";
import crazyTraderBg from "../../../../assets/static/special_encounters/crazy_trader.png";

export const CrazyTrader = () => {
  useEffect(() => {
    setDialogueOpen(BUILDING_NAMES.CRAZY_TRADER);
  }, []);

  const { isDialogueOpen, setDialogueOpen } = useAppState();

  const dialogTree = useGetDialogue(isDialogueOpen);

  return (
    <div>
      <img alt="задник для локации" src={crazyTraderBg} />

      {dialogTree && <Dialogue dialogueTree={dialogTree} />}
    </div>
  );
};
