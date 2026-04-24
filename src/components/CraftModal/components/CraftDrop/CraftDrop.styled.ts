import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme: { spacing } }) => ({
  width: 350,
  padding: spacing(2),
  borderRadius: 2,
  background: "#1e1e1e",
  border: "2px solid #555",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
  display: "flex",
  flexDirection: "column",
  gap: spacing(1),
}));

export const ReceiptResultIcon = styled("img")(() => ({
  width: 64,
  height: 64,
  alignSelf: "center",
  objectFit: "contain",
}));
