import { POTION_TYPES } from "../../../entities/consumables";
import { JUNK_TYPES } from "../../../entities/junk";
import { PotionsReceivedData } from "../../../types/gameState";
import { memoizeItem } from "../../../utils/memoizeItem";
import { StoreSet } from "./types";

const DEFAULT_BAG_SIZE = 8;
// FIXME типизация
export const resetBattle = (set: StoreSet) => () => {
  set((state) => {
    const copyState = {
      ...state,
      inventory: state.inventory || [],
      player: { ...state.player },
    };

    const battle = copyState.player.battle;
    copyState.player.battle = null;

    const playersBattleModel = battle?.player?.party;
    const reward = battle?.reward;

    if (playersBattleModel) {
      copyState.player.party = copyState.player.party.map((player) => {
        const copyPlayer = { ...player };

        const battlePlayerModel = playersBattleModel.find(
          (battlePlayer) => battlePlayer.name === copyPlayer.name,
        );

        if (battlePlayerModel) {
          // обновляем в основной модели хп - берем у модели, которая вышла из боя
          copyPlayer.currentHealth = battlePlayerModel.currentHealth;

          // добавляем полученный опыт
          if (reward?.experience && reward?.experience[copyPlayer.name]) {
            copyPlayer.experience += reward?.experience[copyPlayer.name];
          }
        }

        return copyPlayer;
      });
    }

    if (reward?.items) {
      copyState.inventory.push(...reward.items);
      copyState.player.inventory_memoized = copyState.inventory.map((item) =>
        memoizeItem(item),
      );
    }

    if (reward?.money) {
      copyState.player.gold += reward.money;
    }

    // если сумка уже полная - ничего не делаем, мы это обработаем снаружи в модалке наград - дадим выбрать нужные ресурсы
    if (
      reward?.resources &&
      copyState.player.resources.length + reward?.resources.length <=
        DEFAULT_BAG_SIZE * copyState.player.resourcesBagLevel
    ) {
      copyState.player.resources.push(...reward.resources);
    }

    if (reward?.junk) {
      const junkMap = Object.fromEntries(copyState.player.junk);

      reward.junk.forEach((incomeJunk) => {
        junkMap[incomeJunk] = junkMap[incomeJunk]
          ? String(Number(junkMap[incomeJunk]) + 1)
          : "1";
      });

      copyState.player.junk = Object.entries(junkMap) as [JUNK_TYPES, string][];
    }

    if (reward?.potions) {
      const potionsMap = Object.fromEntries(copyState.player.consumables);

      reward.potions.forEach((potion) => {
        potionsMap[potion.type] = potionsMap[potion.type]
          ? String(Number(potionsMap[potion.type]) + potion.amount)
          : String(potion.amount);
      });

      copyState.player.consumables = Object.entries(potionsMap) as [
        POTION_TYPES,
        string,
      ][];
    }

    return copyState;
  });
};
