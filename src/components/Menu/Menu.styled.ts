import { Box, styled, Modal, Typography } from "@mui/material";

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

export const ModalWindow = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(2px)",
});

export const MenuButtonText = styled(Typography)(({ theme: { spacing } }) => ({
  width: "100%",
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",
  fontFamily: "Cormorant Unicase",
}));
