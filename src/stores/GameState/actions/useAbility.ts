import { HP_PER_ENDURANCE_POINT } from "../../constants";
import { StoreSet } from "./types";

export const useAbility =
  (set: StoreSet) => (characterName: string, abilityId: string) =>
    set((state) => {
      // нужна утиль функция возвращающая модель абилки
      // const abilityData = getAbilityDataById(abilityId);
      const character = state.player.party.find(
        (player) => player.name === characterName
      );
      // в зависимости от AbilityData - вешаем дебафф на противника, хилимся, наносим урон противнику и т.д.
      return state;
    });
