import { useMemo } from "react";

import { GEAR_SLOTS } from "../../../entities/gear";
import { useGameState } from "../../../stores";

export const useMagSize = () => {
  const {
    player: { party },
    gear,
  } = useGameState();

  const magSizesMap = useMemo(() => {
    if (!gear) {
      return Object.fromEntries(
        party.map((item) => [
          item.name,
          {
            magSize: 1,
            baseId: null,
            roundsPerTurn: null,
          },
        ]),
      );
    }

    return Object.fromEntries(
      Object.entries(gear).map(([key, value]) => {
        const currentWeapon = value.find(
          (item) => item.type === GEAR_SLOTS.WEAPON,
        );

        return [
          key,
          {
            magSize: currentWeapon?.magSize || 1,
            baseId: currentWeapon?.baseId || null,
            roundsPerTurn: currentWeapon?.bulletsPerTurn || null,
          },
        ];
      }),
    );
  }, [gear, party]);

  return magSizesMap;
};
