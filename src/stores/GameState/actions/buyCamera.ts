import { DIALOGUE_FLAGS } from "../../../entities/dialogues";
import { StoreSet } from "./types";

// FIXME типизация
export const buyCamera = (set: StoreSet) => () => {
  set((state) => {
    const copyState = { ...state, player: { ...state.player } };

    copyState.player.hasCamera = true;
    copyState.player.gold = copyState.player.gold - 5000;
    copyState.player.dialogFlags.push(DIALOGUE_FLAGS.CAMERA);

    return copyState;
  });
};
