import { DEFAULT_BAG_SIZE } from "../../../constants";
import { POTION_TYPES } from "../../../entities/consumables";
import { JUNK_TYPES } from "../../../entities/junk";
import { ROOM_TYPES } from "../../../entities/room";
import { ResourceData } from "../../../types";
import { PotionsReceivedData } from "../../../types/gameState";
import { memoizeItem } from "../../../utils/memoizeItem";
import { StoreSet } from "./types";

// FIXME типизация
export const resetBattle =
  (set: StoreSet) => (newResources: ResourceData[] | null, gold: number) => {
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
            copyPlayer.experience += reward!.experience;
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
          DEFAULT_BAG_SIZE * copyState.player.resourcesBagLevel &&
        !newResources
      ) {
        copyState.player.resources.push(...reward.resources);
      }

      if (newResources) {
        copyState.player.resources = newResources.map(
          ({ resource }) => resource,
        );
        copyState.player.gold += gold;
      }

      if (reward?.junk) {
        const junkMap = Object.fromEntries(copyState.player.junk);

        junkMap[reward.junk] = junkMap[reward.junk]
          ? String(Number(junkMap[reward.junk]) + 1)
          : "1";

        copyState.player.junk = Object.entries(junkMap) as [
          JUNK_TYPES,
          string,
        ][];
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

      if (copyState.player.hasCamera) {
        const enemyTypes = battle?.enemy.party.map((enemy) => enemy.subType);
        const newStatistics = {
          ...copyState.player.playStatistics,
          kills: { ...copyState.player.playStatistics.kills },
        };

        enemyTypes?.forEach((enemy) => {
          if (enemy) {
            newStatistics.kills[enemy] = newStatistics.kills[enemy]
              ? newStatistics.kills[enemy] + 1
              : 1;
          }
        });

        copyState.player.playStatistics = newStatistics;
      }

      const position = copyState.player.location?.position;
      const dungeon = copyState.player.location?.dungeon;

      const currentCell =
        position?.y && position?.x && dungeon && dungeon[position.y]
          ? dungeon[position.y][position.x]
          : undefined;

      if (currentCell && currentCell.type === ROOM_TYPES.ENEMY) {
        copyState.player.location!.isQuestCompleted = true;
      }

      return copyState;
    });
  };
