import { getPotionByTier } from "../../../constants/items";
import { DUNGEONS, ECONOMIC_TYPES } from "../../../entities";
import { POTION_TYPES } from "../../../entities/consumables";
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

      // FIXME: логика генерации оружия или брони - 50% на 50% или броня или оружие, шанс прока второго или 3 тира в зависимости от тира игры
      // const chanceToSpawnWeapon = getRandom();
      // let item;
      // if (chanceToSpawnWeapon < 50) {
      // item = generateWeapon(stateCopy.player.tier);
      // } else {
      // item = generateArmor(stateCopy.player.tier);
      // }
      // newInventory.push(item);

      newMemoizedInventory = newInventory.map((item) => memoizeItem(item));
    }

    stateCopy.player.consumables =
      newConsumables ?? stateCopy.player.consumables;
    stateCopy.inventory = newInventory ?? stateCopy.inventory;
    stateCopy.player.inventory_memoized =
      newMemoizedInventory ?? stateCopy.player.inventory_memoized;

    return stateCopy;
  });
};
