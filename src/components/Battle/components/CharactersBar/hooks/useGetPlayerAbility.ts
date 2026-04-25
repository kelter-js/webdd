import { useMemo } from "react";

import {
  ABILITY_PERKS,
  MEDIC_PERKS,
  MEDIC_PERKS_DATA,
  SNIPER_PERKS,
  SNIPER_PERKS_DATA,
  TANK_PERKS,
  TANK_PERKS_DATA,
} from "../../../../../constants/perks";
import { BattleCharacterModel } from "../../../../../types/gameState";
import { CLASSES } from "../../../../../entities/characterClasses";
import { EFFECTS } from "../../../../../entities/effects";
import { useGameState } from "../../../../../stores";

export const useGetPlayerAbility = (
  selectedPlayer: BattleCharacterModel | undefined,
) => {
  const {
    player: { battle },
  } = useGameState();

  const playerAbility = useMemo(() => {
    if (!selectedPlayer) return null;

    const abilities = selectedPlayer?.perksList.filter(
      (perk) => perk.isAbility,
    );

    if (abilities.length === 0) return null;

    const descriptorList = (
      selectedPlayer?.characterClass === CLASSES.MEDIC
        ? MEDIC_PERKS_DATA
        : selectedPlayer?.characterClass === CLASSES.SNIPER
          ? SNIPER_PERKS_DATA
          : TANK_PERKS_DATA
    ).fifthTier;

    const ability = descriptorList.find((perk) =>
      ABILITY_PERKS.includes(perk.id),
    );

    if (!ability) return null;

    const effectsList = battle?.player.effects[selectedPlayer.name].list;

    const { id } = ability;

    const isPerkDisabled =
      (id === TANK_PERKS.LAST_STAND &&
        !effectsList?.find(
          (effect) => effect.type === EFFECTS.LAST_STAND_FATIGUE,
        )) ||
      (id === MEDIC_PERKS.HEAL_ALL &&
        !effectsList?.find(
          (effect) =>
            effect.type === EFFECTS.HEAL_ALL_FATIGUE ||
            effect.type === EFFECTS.HEAL_IMMUNE,
        )) ||
      (id === SNIPER_PERKS.INSTAKILL &&
        !effectsList?.find(
          (effect) => effect.type === EFFECTS.INSTA_KILL_FATIGUE,
        ));

    return {
      ...ability,
      isDisabled: isPerkDisabled,
    };
  }, [selectedPlayer, battle?.player.effects]);

  return playerAbility;
};
