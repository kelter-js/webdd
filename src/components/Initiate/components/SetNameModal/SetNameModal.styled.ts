import { Box, styled, TextField, Modal, Typography } from "@mui/material";

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

export const NameField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "hasNoAttemptsLeft",
})<{ hasNoAttemptsLeft: boolean }>(
  ({ theme: { spacing }, hasNoAttemptsLeft }) => ({
    marginBottom: spacing(1),
    fontFamily: "Cormorant Unicase",
    color: "#c08040",
    fontWeight: "bold",
    textTransform: "uppercase",

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: hasNoAttemptsLeft ? "#c08040" : "red",
      },

      "&:hover fieldset": {
        borderColor: "#c08040",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#c08040",
        borderWidth: 2,
      },
    },
  })
);

export const StartGameText = styled(Typography)(({ theme: { spacing } }) => ({
  width: "100%",
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",
  fontFamily: "Cormorant Unicase",
}));
