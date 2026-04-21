import { SnackbarProps, Snackbar, Alert, styled } from "@mui/material";

export const StyledSnackbar = styled(
  ({ className, ...props }: SnackbarProps) => (
    <Snackbar {...props} classes={{ root: className }} />
  ),
)(({ theme }) => ({
  [`& .MuiSnackbarContent-root`]: {
    backgroundColor: "rgba(30, 20, 10, 0.9)",
    color: "#e0c0a0",
    border: "1px solid #c0a080",
    boxShadow: theme.shadows[10],
    fontFamily: "Cormorant Unicase",
    textTransform: "uppercase",
    borderRadius: 4,
    fontSize: "0.9rem",
    letterSpacing: "0.5px",
    padding: "6px 16px",
  },
  [`& .MuiSnackbarContent-message`]: {
    padding: "8px 0",
  },
  [`& .MuiSnackbarContent-action`]: {
    color: "#e0c0a0",
    marginLeft: theme.spacing(2),
    "& button": {
      color: "#c0a080",
      "&:hover": {
        color: "#e0c0a0",
        backgroundColor: "rgba(192, 160, 128, 0.1)",
      },
    },
  },
}));

// Стилизованный Alert для использования внутри Snackbar
export const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: "rgba(30, 20, 10, 0.9)",
  color: "#e0c0a0",
  border: "1px solid #c0a080",
  boxShadow: theme.shadows[10],
  fontFamily: "Cormorant Unicase",
  textTransform: "uppercase",
  borderRadius: 4,
  fontSize: "0.9rem",
  letterSpacing: "0.5px",
  "& .MuiAlert-icon": {
    display: "none",
  },
  "& .MuiAlert-message": {
    padding: "6px 0",
  },
  "& .MuiAlert-action": {
    paddingTop: 0,
    color: "#c0a080",
    alignItems: "center",
  },
}));
