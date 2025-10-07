import { styled } from "@mui/material";

// REFACTORING CHECKED ✅

export const MenuIconWrapper = styled("div")(() => ({
  cursor: "pointer",
  width: "50px",
  height: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "10px",
  position: "fixed",
  top: "60px",
  left: "20px",
  zIndex: 1000,
  transition: "all 0.3s ease",

  "&.open": {
    "& > span:nth-of-type(1)": {
      transform: "translateY(14px) rotate(45deg)",
    },
    "& > span:nth-of-type(2)": {
      opacity: 0,
    },
    "& > span:nth-of-type(3)": {
      transform: "translateY(-13px) rotate(-45deg)",
    },
  },
}));

export const MenuLine = styled("span")(() => ({
  display: "block",
  width: "100%",
  height: "3px",
  backgroundColor: "var(--menu-line)",
  // Контур и тень для видимости
  boxShadow: `
    0 0 1px var(--white),
    0 0 2px var(--white),
    0 0 3px var(--menu-line-shadow)
  `,
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: "var(--menu-line-hover)",
    boxShadow: "0 0 5px var(--menu-line-hover-shadow)",
  },
}));
