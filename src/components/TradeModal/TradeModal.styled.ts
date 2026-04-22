import { styled, Button } from "@mui/material";

export const TabsContainer = styled("div")(({ theme: { spacing } }) => ({
  position: "absolute",
  top: "30px",
  left: "50%",
  transform: "translate(-50%, 0)",
  display: "flex",
  gap: spacing(1),
}));

export const SellJunkButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "cantSellJunk",
})<{ cantSellJunk: boolean }>(({ cantSellJunk }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  zIndex: 9,
  opacity: cantSellJunk ? 0.3 : 1,
}));
