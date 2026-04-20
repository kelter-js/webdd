import { RESOURCES } from "../../../entities/resources";
import { StoreSet } from "./types";

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
    }

    return stateCopy;
  });
};
