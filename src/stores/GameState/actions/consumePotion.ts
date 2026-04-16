import { MEDIC_PERKS } from "../../../constants/perks";
import { CLASSES } from "../../../entities/characterClasses";
import { POTION_TYPES } from "../../../entities/consumables";
import { Battle } from "../../../types/gameState";
import { getPotionHealth } from "../../utils";
import { StoreSet } from "./types";

export const consumePotion =
  (set: StoreSet) =>
  (characterName: string, potion: POTION_TYPES, cb: (data: Battle) => void) => {
    set((state) => {
      const battle = state.player.battle;
      if (!battle) return state;

      const stats = state.statistics?.[characterName];
      if (!stats) return state;

      const maxHealth = stats.maxHealth;
      const hasPotionEnhancementPerk = state.player.party.find(
        (player) =>
          player.characterClass === CLASSES.MEDIC &&
          player.perksList.find(
            (perk) => perk.id === MEDIC_PERKS.FORTIFICATION,
          ),
      );

      const potionPercentage =
        getPotionHealth(potion) + (hasPotionEnhancementPerk ? 15 : 0);

      const newState = {
        ...state,
        player: {
          ...state.player,
          consumables: state.player.consumables
            .map((item) =>
              item[0] === potion
                ? ([item[0], String(Number(item[1]) - 1)] as [
                    POTION_TYPES,
                    string,
                  ])
                : item,
            )
            .filter((item) => Number(item[1]) > 0),
          battle: {
            ...battle,
            player: {
              effects: {
                ...battle.player.effects,
                [characterName]: {
                  ...battle.player.effects[characterName],
                  hasTriggered: false,
                },
              },
              party: battle.player.party.map((character) => {
                if (character.name !== characterName) return character;

                const healedAmount = Math.round(
                  (maxHealth / 100) * potionPercentage,
                );

                return {
                  ...character,
                  hasTurn: false,
                  currentHealth: Math.min(
                    maxHealth,
                    character.currentHealth + healedAmount,
                  ),
                };
              }),
            },
          },
        },
      };

      cb(newState.player.battle);

      return newState;
    });
  };
