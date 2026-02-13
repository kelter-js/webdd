import { StoreSet } from "./types";

const DEFAULT_POINTS_AMOUNT_PER_LEVEL = 3;

export const levelUpCharacter =
  (set: StoreSet) => (characterName: string, amountOfExp: number) => {
    set((state) => {
      const stateCopy = {
        ...state,
        player: { ...state.player },
      };

      stateCopy.player.party = stateCopy.player.party.map((character) => {
        const characterCopy = { ...character };

        if (characterCopy.name === characterName) {
          characterCopy.experience = characterCopy.experience - amountOfExp;
          characterCopy.points += DEFAULT_POINTS_AMOUNT_PER_LEVEL;
          characterCopy.level += 1;
        }

        return characterCopy;
      });

      return stateCopy;
    });
  };
