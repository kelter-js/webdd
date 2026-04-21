import { Stack, styled } from "@mui/material";

export const Container = styled(Stack)(({ theme: { spacing } }) => ({
  gap: spacing(0.5),
  backgroundColor: "rgba(30, 20, 10, 0.50)",
  border: "1px solid rgba(192, 160, 128, 0.3)",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: spacing(1),
  minWidth: "120px",
  maxWidth: "450px",
}));
