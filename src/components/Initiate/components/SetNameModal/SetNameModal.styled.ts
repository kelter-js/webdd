import { Box, styled, Modal, Typography, Button } from "@mui/material";

export const CharacterClassButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ isSelected }) => ({
  border: isSelected ? "2px solid #c0a080" : "unset",
}));

export const ModalContent = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 500,
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #c0a080",
  boxShadow: theme.shadows[10],
  padding: theme.spacing(3),
  paddingTop: theme.spacing(2),
  borderRadius: 4,
  backgroundImage: `linear-gradient(
    rgba(30, 20, 10, 0.9),
    rgba(50, 30, 15, 0.9)
  )`,
  color: "#e0c0a0",
}));

export const ModalContainer = styled(Modal)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(2px)",

  "& .MuiFormHelperText-root": {
    color: "red",
    fontFamily: "Cormorant Unicase",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

export const StartGameText = styled(Typography)(({ theme: { spacing } }) => ({
  width: "100%",
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",
  borderTop: "1px solid #5a3020",
  fontFamily: "inherit",
}));

export const ClassDescription = styled(StartGameText)(() => ({
  borderBottom: "none",
  borderTop: "none",
  fontSize: "18px",
  textAlign: "center",
}));
