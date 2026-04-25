export const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "rgba(30, 20, 10, 0.95)",
      color: "#e0c0a0",
      border: "1px solid #c0a080",
      fontFamily: "Cormorant Unicase",
      textTransform: "uppercase",
      letterSpacing: "0.5px",

      "& .MuiMenuItem-root": {
        fontSize: "0.9rem",

        "&:hover": {
          backgroundColor: "rgba(192,160,128,0.2)",
        },

        "&.Mui-selected": {
          backgroundColor: "rgba(192,160,128,0.3)",
        },
      },
    },
  },
};

export const DEFAULT_DIFFICULTIES = [
  { id: 1, value: "легко" },
  { id: 2, value: "средний" },
  { id: 3, value: "сложный" },
];
