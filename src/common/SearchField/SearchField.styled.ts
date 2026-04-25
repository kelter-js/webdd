import { styled, TextField, TextFieldProps } from "@mui/material";

export const SearchFieldStyled = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "hasNoAttemptsLeft",
})<{ hasNoAttemptsLeft?: boolean } & TextFieldProps>(
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
        borderColor: hasNoAttemptsLeft ? "#c08040" : "red",
      },

      "&.Mui-focused fieldset": {
        borderColor: hasNoAttemptsLeft ? "#c08040" : "red",
        borderWidth: 2,
      },
    },
  }),
);
