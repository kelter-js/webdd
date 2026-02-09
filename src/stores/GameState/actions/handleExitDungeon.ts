import { v4 } from "uuid";
import { BNTI_TIER_1 } from "../../../constants/armor";
import { GLOCK_17_TIER_1 } from "../../../constants/guns";
import { GALVION_TIER_1, HELMETS_TIER_1 } from "../../../constants/helmets";
import { getPotionByTier } from "../../../constants/items";
import { DUNGEONS, ECONOMIC_TYPES } from "../../../entities";
import { POTION_TYPES } from "../../../entities/consumables";
import { generatePotionsList } from "../../../utils/generatePotionsToBuy";
import {
  generateGenericItemInCurrentPool,
  generateStoreItems,
} from "../../../utils/generateStoreItems";
import { getItemPrice } from "../../../utils/getItemPrice";
import { memoizeItem } from "../../../utils/memoizeItem";
import { MIN_ENCOUNTER_CHANCE } from "../../constants";
import { StoreSet } from "./types";

const MIN_AMOUNT_OF_DAILY_POTIONS = 2;
const MIN_AMOUNT_OF_DAILY_GOLD = 1500;

export const handleExitDungeon = (set: StoreSet) => () => {
  set((state) => {
    const stateCopy = {
      ...state,
      player: { ...state.player },
    };

    let newConsumables = null;
    let newInventory = null;
    let newMemoizedInventory = null;

    if (stateCopy.player.location) {
      stateCopy.player.location.encounterChance = MIN_ENCOUNTER_CHANCE;
      stateCopy.player.location.specialEncounter = undefined;
    }

    if (stateCopy.player.location?.type === DUNGEONS.STORY) {
      stateCopy.player.playStatistics.dungeonCounter += 1;
    }

    if (stateCopy.player.economic === ECONOMIC_TYPES.ALCHEMISTRY) {
      // FIXME: по мере дополнения систем инвентаря - допилить
      newConsumables = [...stateCopy.player.consumables];
      // FIXME определиться с фиксированным вознаграждением и названиями эликсиров, заменить стринги на енамы
      // проверяем, есть ли у игрока вообще уже такие зелья
      const currentTierElixir = getPotionByTier(stateCopy.player.currentTier);

      const elixirIndex = newConsumables.findIndex(
        (item) => item[0] === currentTierElixir,
      );

      if (elixirIndex !== -1) {
        // если зелья есть - увеличиваем их кол-во
        // второе значение массива - кол-во, обращаемся по индексу [1] -
        // обновляем количество
        const [name, count] = newConsumables[elixirIndex];
        newConsumables[elixirIndex] = [
          name,
          String(Number(count ?? 0) + MIN_AMOUNT_OF_DAILY_POTIONS),
        ];
      } else {
        // если нет - устанавливаем их
        newConsumables.push([
          currentTierElixir,
          String(MIN_AMOUNT_OF_DAILY_POTIONS),
        ]);
      }
    }

    if (stateCopy.player.economic === ECONOMIC_TYPES.FISHING) {
      // FIXME определиться с фиксированным вознаграждением в виде голды и привести к балансу
      stateCopy.player.gold += MIN_AMOUNT_OF_DAILY_GOLD;
    }

    if (stateCopy.player.economic === ECONOMIC_TYPES.WEAPONRY) {
      newInventory = stateCopy.inventory ? [...stateCopy.inventory] : [];

      const newItem = generateGenericItemInCurrentPool(
        stateCopy.player.currentTier,
      );

      console.log("newItem", newItem);
      console.log("newInventory", newInventory);

      newInventory.push(newItem);

      newMemoizedInventory = newInventory.map((item) => memoizeItem(item));
    }

    stateCopy.player.consumables =
      newConsumables ?? stateCopy.player.consumables;
    stateCopy.inventory = newInventory ?? stateCopy.inventory;
    stateCopy.player.inventory_memoized =
      newMemoizedInventory ?? stateCopy.player.inventory_memoized;

    // при выходе из подземелья обновляем ассортимент зелий
    stateCopy.player.potionsToBuy = generatePotionsList(
      stateCopy.player.currentTier,
    );

    // при выходе из подземелья обновляем ассортимент предметов
    const itemsToBuy = generateStoreItems(stateCopy.player.currentTier);
    console.log("itemsToBuy in state", itemsToBuy);

    stateCopy.sell_inventory = itemsToBuy.map((item) => {
      const itemPrice = getItemPrice(item, stateCopy.player.currentTier);
      return { ...item, price: itemPrice };
    });

    stateCopy.player.itemsToBuy = itemsToBuy.map((item) => memoizeItem(item));

    console.log("stateCopy", stateCopy);

    // MOCK
    const names = stateCopy.player.party.map((item) => item.name);
    names.forEach((name) => {
      stateCopy.player.gear_memoized[name] = [
        GALVION_TIER_1,
        BNTI_TIER_1,
        GLOCK_17_TIER_1,
      ].map((item) => memoizeItem({ ...item, gearId: v4() }));

      if (!stateCopy.gear) {
        stateCopy.gear = {};
      }

      stateCopy.gear[name] = [
        { ...GALVION_TIER_1, gearId: v4() },
        { ...BNTI_TIER_1, gearId: v4() },
        { ...GLOCK_17_TIER_1, gearId: v4() },
      ];
    });

    return stateCopy;
  });
};
