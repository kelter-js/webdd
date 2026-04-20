import { InputProps } from "@mui/material";

export const NAME_FIELD_LABEL_PROPS = {
  sx: {
    fontFamily: "Cormorant Unicase",
    color: "#c08040 !important",
    fontWeight: "bold",
    textTransform: "uppercase",
    "&.Mui-focused": {
      color: "#c08040",
    },
  },
};

export const NAME_FIELD_INPUT_PROPS: InputProps = {
  inputProps: {
    style: {
      fontFamily: "Cormorant Unicase",
      color: "#c08040",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  },
};
