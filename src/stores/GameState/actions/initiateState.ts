import { dememoizeItem } from "../../../utils/dememoizeItem";
import { generatePotionsList } from "../../../utils/generatePotionsToBuy";
import { calculateStatistics } from "../../utils";
import { StoreSet } from "./types";

export const initiateState = (set: StoreSet) => () =>
  set((state) => {
    const stateCopy = { ...state, player: { ...state.player } };
    stateCopy.statistics = {};
    stateCopy.abilities = {};
    stateCopy.gear = {};
    stateCopy.effects = {};
    stateCopy.inventory =
      stateCopy.player.inventory_memoized?.map((item) => dememoizeItem(item)) ||
      [];

    Object.entries(stateCopy.player?.gear_memoized || {}).forEach(
      ([character, gearItems]) => {
        if (stateCopy.gear) {
          stateCopy.gear[character] = gearItems.map((item) =>
            dememoizeItem(item),
          );
        }
      },
    );

    if (!stateCopy.player.potionsToBuy) {
      stateCopy.player.potionsToBuy = generatePotionsList(
        stateCopy.player.currentTier,
      );
    }

    // MOCK
    // здесь же нужно проинициализировать интентарь покупок если он пуст

    // инициализируем хар-ки
    state.player.party.forEach((player) => {
      stateCopy.statistics![player.name] = calculateStatistics(player);

      player.perksList.forEach((perk) => {
        if (perk.isAbility) {
          // нужна утиль функция возвращающая модель Ability, она имеет тип, внутри стейта будет функция useAbility,
          //  ей передается тип и она в зависимости от него делает что-то
          // stateCopy.abilities![player.name] = createAbility(perk);
        }
      });
    });

    return {
      ...stateCopy,
      player: { ...stateCopy.player },
      statistics: { ...(stateCopy.statistics || {}) },
      gear: { ...(stateCopy.gear || {}) },
      abilities: { ...(stateCopy.abilities || {}) },
    };
  });
