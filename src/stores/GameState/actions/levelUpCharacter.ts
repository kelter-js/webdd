import { StoreSet } from "./types";

const DEFAULT_POINTS_AMOUNT_PER_LEVEL = 3;

export const levelUpCharacter =
  (set: StoreSet) => (characterName: string, amountOfExp: number) => {
    set((state) => ({
      ...state,
      player: {
        ...state.player,
        party: state.player.party.map((character) => {
          if (character.name === characterName) {
            const { experience, points, level } = character;

            return {
              ...character,
              experience: experience - amountOfExp,
              points: points + DEFAULT_POINTS_AMOUNT_PER_LEVEL,
              level: level + 1,
            };
          }

          return { ...character };
        }),
      },
    }));
  };
