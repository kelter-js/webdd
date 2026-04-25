import { styled } from "@mui/material";

export const ItemIconContainer = styled("img", {
  shouldForwardProp: (prop) => prop !== "height" && prop !== "width",
})<{ width?: string; height?: string }>(
  ({ width = "100%", height = "100%" }) => ({
    width,
    height,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    objectFit: "contain",
  }),
);
