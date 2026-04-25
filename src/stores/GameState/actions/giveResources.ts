import { RESOURCES } from "../../../entities/resources";
import { StoreSet } from "./types";

export const giveResources = (set: StoreSet) => (resourceToGive: RESOURCES) => {
  set((state) => {
    let counter = 0;

    const resourcesFiltered = state.player.resources.filter((resource) => {
      if (resource === resourceToGive) {
        counter++;
      }

      return resource !== resourceToGive;
    });

    if (!counter) return state;

    const collectedResource = state.player.collected.find(
      (item) => item[0] === resourceToGive,
    );

    return {
      ...state,
      player: {
        ...state.player,
        collected: collectedResource
          ? state.player.collected.map((item) =>
              item[0] === resourceToGive
                ? [item[0], String(Number(item[1]) + Number(counter))]
                : item,
            )
          : [...state.player.collected, [resourceToGive, String(counter)]],
        resources: resourcesFiltered,
      },
    };
  });
};
