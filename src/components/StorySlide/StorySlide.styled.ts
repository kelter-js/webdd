import { Box, Paper, styled } from "@mui/material";

export const Container = styled(Box)(() => ({
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black",
  zIndex: 9999,
}));

export const SlideTextContainer = styled(Box)(({ theme: { spacing } }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  padding: spacing(3),
  boxSizing: "border-box",
}));

export const TextHolder = styled(Paper)(({ theme: { spacing } }) => ({
  padding: spacing(2),
  borderRadius: 3,
  backgroundColor: "rgba(0,0,0,0.6)",
  color: "white",
}));
