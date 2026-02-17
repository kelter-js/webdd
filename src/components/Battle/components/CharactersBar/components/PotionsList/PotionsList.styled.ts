import { Menu, styled, menuClasses, MenuItem, Button } from "@mui/material";

export const StyledMenu = styled(Menu)(({ theme }) => ({
  [`& .${menuClasses.paper}`]: {
    backgroundColor: "rgba(30, 20, 10, 0.95)",
    color: "#e0c0a0",
    border: "1px solid #c0a080",
    boxShadow: theme.shadows[10],
    borderRadius: 4,
    marginBottom: theme.spacing(1),
    minWidth: 200,
    backdropFilter: "blur(2px)",
  },
  [`& .${menuClasses.list}`]: {
    padding: theme.spacing(0.5, 0),
  },
}));

// Стилизованный MenuItem
export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: "Cormorant Unicase",
  textTransform: "uppercase",
  fontSize: "0.9rem",
  letterSpacing: "0.5px",
  color: "#e0c0a0",
  padding: theme.spacing(1, 2),

  "&:hover": {
    backgroundColor: "rgba(192, 160, 128, 0.2)",
    color: "#ffd700",
  },

  "&.Mui-selected": {
    backgroundColor: "rgba(192, 160, 128, 0.3)",
    color: "#ffd700",

    "&:hover": {
      backgroundColor: "rgba(192, 160, 128, 0.4)",
    },
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: "Cormorant Unicase",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  border: "1px solid #c0a080",
  color: "#e0c0a0",
  backgroundColor: "rgba(30, 20, 10, 0.9)",
  padding: theme.spacing(1, 2),

  "&:hover": {
    backgroundColor: "rgba(30, 20, 10, 0.95)",
    border: "1px solid #ffd700",
    color: "#ffd700",
  },
}));
