import { dememoizeItem } from "../../../utils/dememoizeItem";
import { generatePotionsList } from "../../../utils/generatePotionsToBuy";
import { generateStoreItems } from "../../../utils/generateStoreItems";
import { getItemPrice } from "../../../utils/getItemPrice";
import { memoizeItem } from "../../../utils/memoizeItem";
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
    if (!stateCopy.player.itemsToBuy) {
      // const itemsToBuy = generateStoreItems(stateCopy.player.currentTier);
      const itemsToBuy = generateStoreItems(3);
      console.log("itemsToBuy in state", itemsToBuy);

      stateCopy.sell_inventory = itemsToBuy.map((item) => {
        const itemPrice = getItemPrice(item, stateCopy.player.currentTier);
        return { ...item, price: itemPrice };
      });

      stateCopy.player.itemsToBuy = itemsToBuy.map((item) => memoizeItem(item));
    } else {
      stateCopy.sell_inventory = stateCopy.player.itemsToBuy.map((item) => {
        const dememeoizedItem = dememoizeItem(item);
        const itemPrice = getItemPrice(
          dememeoizedItem,
          stateCopy.player.currentTier,
        );
        return { ...dememeoizedItem, price: itemPrice };
      });
    }

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
