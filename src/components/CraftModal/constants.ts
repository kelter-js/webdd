import { PartialOptions } from "overlayscrollbars";

export enum TRADE_TYPES {
  BUY = "BUY",
  SELL = "SELL",
}

export const SCROLLBAR_CONFIG: PartialOptions = {
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
  width: "45%",
  height: "100%",
  border: "4px solid rgba(192, 160, 128, 0.3)",
  background: "rgba(0,0,0,0.3)",
  padding: "8px",
};
