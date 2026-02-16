import { RESOURCES } from "../../../entities/resources";
import { StoreSet } from "./types";
// import { FLAGS } from "../../../constants";
// FIXME типизация
export const giveResources = (set: StoreSet) => (resourceToGive: RESOURCES) => {
  set((state) => {
    const stateCopy = { ...state, player: { ...state.player } };

    const resourceItem = stateCopy.player.resources.filter(
      (item) => item === resourceToGive,
    );

    if (resourceItem) {
      const collectedResource = stateCopy.player.collected.find(
        (item) => item[0] === resourceToGive,
      );

      if (collectedResource) {
        stateCopy.player.collected = stateCopy.player.collected.map((item) =>
          item[0] === resourceToGive
            ? [item[0], String(Number(item[1]) + Number(resourceItem.length))]
            : item,
        );
      } else {
        stateCopy.player.collected.push([
          resourceToGive,
          String(resourceItem.length),
        ]);
      }

      stateCopy.player.resources = stateCopy.player.resources.filter(
        (resource) => resource !== resourceToGive,
      );

      // Вот здесь должна быть логика реакции на накопленные ресурсы
      // нужна логика вычисления-  в зависимости от типа р есурса - сколько его нужно накопить
      // и устанавливать флаг - сначала флаг что МЫ МОЖЕМ поолучить вещь
      // и в диалоге устанавливать на получение что мы ПОЛУЧИЛИ вещь
      // УДАЛЯТЬ СТАРЫЙ ФЛАГ ЧТО МОЖЕМ ПОЛУЧИТЬ - ЗАМЕНЯЯ ЕГО НА ФЛАГ ЧТО МЫ ПОЛУЧИЛИ уже вещь
      // mock
      // if (collectedResourceCounter) {
      // stateCopy.player.flags.push(FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_1);
      // }
    }

    return stateCopy;
  });
};
