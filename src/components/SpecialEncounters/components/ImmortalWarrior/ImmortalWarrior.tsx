import { useGetDialogue } from "../../../../hooks";
import { useAppState, useGameState } from "../../../../stores";
import { Dialogue } from "../../../Dialogue";
import { ShootingRange } from "../../../Minigames";

export const ImmortalWarrior = () => {
  const {} = useGameState();
  const { isDialogueOpen } = useAppState();

  const dialogTree = useGetDialogue(isDialogueOpen);
  return (
    <div>
      <img alt="задник для локации" />
      {dialogTree && <Dialogue dialogueTree={dialogTree} />}
    </div>
  );
};
