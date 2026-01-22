import { RESOURCES } from "../../../entities/resources";
import { StoreSet } from "./types";
// FIXME типизация
export const addResource =
  (set: StoreSet) => (resourceToAdd: RESOURCES, amount: number) => {
    set((state) => {
      const stateCopy = { ...state, player: { ...state.player } };

      const resourceItem = stateCopy.player.resources.find(
        (item) => item[0] === resourceToAdd
      );

      if (resourceItem) {
        stateCopy.player.resources = stateCopy.player.resources.map((item) =>
          item[0] === resourceToAdd
            ? [item[0], String(Number(item[1]) + amount)]
            : item
        );
      } else {
        stateCopy.player.resources.push([resourceToAdd, String(amount)]);
      }

      return stateCopy;
    });
  };
