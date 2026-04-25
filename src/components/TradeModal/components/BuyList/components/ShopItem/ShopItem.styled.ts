import { styled } from "@mui/material";

export const ShopItemContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "top" && prop !== "left" && prop !== "isEmptySlot",
})<{ top: number; left: number; isEmptySlot: boolean }>(
  ({ top, left, isEmptySlot }) => ({
    position: "absolute",
    top,
    left,
    width: 183,
    height: 183,
    opacity: isEmptySlot ? 0.6 : 1,
    cursor: "pointer",
  }),
);
