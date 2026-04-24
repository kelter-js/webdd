import { styled, Box, Button } from "@mui/material";

export const ControlsContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 50,
  right: 0,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const MovementButton = styled(Button)(() => ({
  position: "absolute",
  top: 17,
  zIndex: 500,

  "&:active": {
    boxShadow: "none",
  },

  "& .MuiTouchRipple-root": {
    display: "none",
  },
}));

export const ChapterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isCurrentPageHeader",
})<{ isCurrentPageHeader: boolean }>(({ isCurrentPageHeader }) => ({
  minWidth: "50px",
  width: "50px",
  height: "50px",
  background: isCurrentPageHeader ? "#1a0a0a" : "",
  border: `4px solid rgba(192, 160, 128, ${isCurrentPageHeader ? "0.8" : "0.3"})`,
  fontFamily: "inherit",
}));
