import { Typography, styled } from "@mui/material";

export const Text = styled(Typography)(({ theme: { spacing } }) => ({
  width: "100%",
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",
  fontFamily: "inherit",
}));

export const QuestCardText = styled(Typography)(({ theme: { spacing } }) => ({
  width: "100%",
  color: "black",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  fontSize: "20px",
  fontFamily: "inherit",
  textAlign: "center",
}));
