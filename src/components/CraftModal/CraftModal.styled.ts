import { Typography, styled, Stack } from "@mui/material";

export const CraftButton = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "disabled",
})<{ disabled: boolean }>(({ theme: { spacing }, disabled }) => ({
  pointerEvents: disabled ? "none" : "all",
  opacity: disabled ? 0.3 : 1,
  width: "100%",
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",
  borderTop: "1px solid #5a3020",
  fontFamily: "inherit",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.2s ease",
  textAlign: "center",
  fontSize: 25,
  zIndex: 1,

  "&:active": {
    transform: "scale(0.98)",
  },
}));

export const CraftBackgroundImg = styled("img")(() => ({
  position: "absolute",
  width: 815,
  height: 630,
  top: "-22px",
}));

export const ReceiptImageContainer = styled(Stack)(() => ({
  border: "1px solid #5a3020",
  position: "absolute",

  height: "107px",
  width: "151px",
}));

export const ReceiptResultImageContainer = styled(Stack)(() => ({
  border: "1px solid #5a3020",
  position: "absolute",
  right: "265px",
  top: "326px",
  height: "180px",
  width: "290px",
}));

export const RequiredResourcesText = styled(Typography)(
  ({ theme: { spacing } }) => ({
    position: "absolute",
    bottom: "90px",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: spacing(1),
  }),
);
