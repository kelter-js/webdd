import { DIALOGUE_FLAGS } from "../../../entities/dialogues";
import { StoreSet } from "./types";

const CAMERA_PRICE = 5000;

export const buyCamera = (set: StoreSet) => () => {
  set((state) => {
    const {
      player: { gold, dialogFlags },
    } = state;

    return {
      ...state,
      player: {
        ...state.player,
        hasCamera: true,
        gold: gold - CAMERA_PRICE,
        dialogFlags: [...dialogFlags, DIALOGUE_FLAGS.CAMERA],
      },
    };
  });
};
