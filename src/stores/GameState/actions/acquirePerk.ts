import { PERK_DATA_BY_CLASSES } from "../../../constants/perks";
import { PERK_ID_DATA } from "../../../types/gameState";
import { rebuildDerivedState } from "../../../utils/rebuildDerivedState";
import { calculateStatistics } from "../../utils";

import { StoreSet } from "./types";
// FIXME типизация
export const acquirePerk =
  (set: StoreSet) => (perkToAddId: PERK_ID_DATA, characterName: string) => {
    set((state) => {
      const stateCopy = {
        ...state,
        player: {
          ...state.player,
          party: state.player.party.map((partyMember) => {
            const model = {
              ...partyMember,
              perksList: [...partyMember.perksList],
            };

            if (partyMember.name === characterName) {
              const classPerksData =
                PERK_DATA_BY_CLASSES[partyMember.characterClass];

              const perksAsListData = [
                ...classPerksData.fifthTier,
                ...classPerksData.firstTier,
                ...classPerksData.fourthTier,
                ...classPerksData.secondTier,
                ...classPerksData.thirdTier,
              ];

              const perkData = perksAsListData.find(
                (perk) => perk.id === perkToAddId,
              );

              if (perkData) {
                model.perksList.push({
                  id: perkData.id,
                  isAbility: perkData?.isAbility,
                });
              }
            }

            return model;
          }),
        },
      };

      if (!stateCopy.statistics) {
        stateCopy.statistics = {};
      }

      stateCopy.player.party.forEach((character) => {
        const characterGear = stateCopy.gear
          ? stateCopy.gear[character.name]
          : [];

        stateCopy.statistics![character.name] = calculateStatistics(
          character,
          characterGear,
        );
      });

      return stateCopy;
    });
  };
