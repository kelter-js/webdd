import { GEAR_SLOTS } from "../../entities/gear";

export const INVENTORY_ACCEPT_TYPES = [
  GEAR_SLOTS.ARMOR,
  GEAR_SLOTS.ARTIFACT,
  GEAR_SLOTS.HELMET,
  GEAR_SLOTS.WEAPON,
];

export const INVENTORY_SCROLLBAR_CONFIG = {
  overflow: {
    y: "scroll",
    x: "hidden",
  },
  scrollbars: {
    theme: "os-theme-light",
    autoHide: "scroll",
    autoHideDelay: 800,
    autoHideSuspend: false,
    clickScroll: true,
  },
};

export const SCROLLBAR_STYLES = {
  height: "100%",
  width: "100%",
  minHeight: 0,
};
