import { SPECIAL_ENCOUNTERS } from "../../../../entities/specialEncounters";
import { ImmortalWarrior } from "../ImmortalWarrior";
import { useGameState } from "../../../../stores";
import { CrazyTrader } from "../CrazyTrader";
import { Widow } from "../Widow";

export const SpecialEncounterContainer = () => {
  const {
    player: { location },
  } = useGameState();

  return (
    <div>
      {location?.specialEncounter === SPECIAL_ENCOUNTERS.GHOST && <Widow />}

      {location?.specialEncounter === SPECIAL_ENCOUNTERS.TRADER && (
        <CrazyTrader />
      )}

      {location?.specialEncounter === SPECIAL_ENCOUNTERS.SHOOTING && (
        <ImmortalWarrior />
      )}
    </div>
  );
};
