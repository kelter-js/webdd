import { PERK_DATA_BY_CLASSES } from "../../../constants/perks";
import { PERK_ID_DATA } from "../../../types/gameState";
import { StoreSet } from "./types";
// FIXME типизация
export const acquirePerk =
  (set: StoreSet) => (perkToAddId: PERK_ID_DATA, characterName: string) => {
    set((state) => {
      const stateCopy = {
        ...state,
        player: {
          ...state.player,
          party: state.player.party.map((partyMember) => ({
            ...partyMember,
            perksList: [...partyMember.perksList],
          })),
        },
      };

      const character = stateCopy.player.party.find(
        (partyMember) => partyMember.name === characterName,
      );

      if (character) {
        const classPerksData = PERK_DATA_BY_CLASSES[character.characterClass];
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
          character.perksList.push({
            id: perkData.id,
            isAbility: perkData?.isAbility,
          });
        }
      }

      return stateCopy;
    });
  };
