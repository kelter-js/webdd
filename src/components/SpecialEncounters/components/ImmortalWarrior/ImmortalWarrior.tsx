import { useEffect } from "react";

import { useAppState, useGameState } from "../../../../stores";
import { BUILDING_NAMES } from "../../../../constants";
import { useGetDialogue } from "../../../../hooks";
import { ShootingRange } from "../../../Minigames";
import { Dialogue } from "../../../Dialogue";
import shootingBg from "../../../../assets/static/special_encounters/shooting.png";

export const ImmortalWarrior = () => {
  useEffect(() => {
    setDialogueOpen(BUILDING_NAMES.SHOOTING);
  }, []);

  const { updateSpecialEncounter } = useGameState();
  const {
    isDialogueOpen,
    setDialogueOpen,
    toggleShootingGame,
    isShootingGameEnabled,
  } = useAppState();

  const dialogTree = useGetDialogue(isDialogueOpen);

  const handleWin = () => {
    updateSpecialEncounter({ isSuccessful: true, node: "shootingEnd" });
    setDialogueOpen(BUILDING_NAMES.SHOOTING);
    toggleShootingGame();
  };

  const handleFail = () => {
    updateSpecialEncounter({ node: "shootingEnd" });
    setDialogueOpen(BUILDING_NAMES.SHOOTING);
    toggleShootingGame();
  };

  return (
    <div>
      <img src={shootingBg} alt="задник для локации" />

      {dialogTree && <Dialogue dialogueTree={dialogTree} />}

      {isShootingGameEnabled && (
        <ShootingRange onFail={handleFail} onWin={handleWin} />
      )}
    </div>
  );
};
