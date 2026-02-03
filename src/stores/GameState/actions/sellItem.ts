import { StoreSet } from "./types";
// FIXME типизация
export const sellItem = (set: StoreSet) => (itemId: string) => {
  set((state) => {
    const copyState = { ...state, player: { ...state.player } };

    const itemData = state.inventory?.find((item) => item.gearId === itemId);

    if (itemData) {
      copyState.player.gold += itemData.price;

      copyState.inventory = copyState.inventory!.filter(
        (item) => item.gearId !== itemId,
      );

      copyState.player.inventory_memoized =
        copyState.player.inventory_memoized.filter(
          ([_, gearId]) => gearId !== itemId,
        );
    }

    return copyState;
  });
};
