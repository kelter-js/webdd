import { useEffect } from "react";
import { BUILDING_NAMES } from "../../../../constants";
import { useGetDialogue } from "../../../../hooks";
import { useAppState } from "../../../../stores";
import { Dialogue } from "../../../Dialogue";
import ghostBg from "../../../../assets/static/special_encounters/ghost.png";

export const Widow = () => {
  useEffect(() => {
    setDialogueOpen(BUILDING_NAMES.GHOST);
  }, []);

  const { isDialogueOpen, setDialogueOpen } = useAppState();

  const dialogTree = useGetDialogue(isDialogueOpen);

  return (
    <div>
      <img alt="задник для локации" src={ghostBg} />

      {dialogTree && <Dialogue dialogueTree={dialogTree} />}
    </div>
  );
};
