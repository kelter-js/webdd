import { StoreSet } from "./types";
export const sellItem = (set: StoreSet) => (itemId: string) => {
  set((state) => {
    const itemData = state.inventory?.find((item) => item.gearId === itemId);

    if (!itemData) return state;

    const { gold, inventory_memoized } = state.player;

    return {
      ...state,
      player: {
        ...state.player,
        gold: gold + itemData.price,
        inventory_memoized: inventory_memoized.filter(
          ([_, gearId]) => gearId !== itemId,
        ),
      },
      inventory: (state.inventory || []).filter(
        (item) => item.gearId !== itemId,
      ),
    };
  });
};
