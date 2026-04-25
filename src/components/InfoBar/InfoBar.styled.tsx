import { styled, Box, Typography } from "@mui/material";

export const Container = styled(Box)(() => ({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const VolumeContainer = styled(Box)(() => ({
  position: "absolute",
  top: "40px",
  left: "50%",
  paddingTop: "55px",
  transform: "translateX(-50%)",
  height: "210px",
  zIndex: 9999,
  backgroundColor: "rgba(0,0,0,0.1)",
  padding: "10px 5px",
  borderRadius: "20px",
}));

export const ModalContent = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: "20px",
  gap: theme.spacing(2),
  backgroundColor: "rgba(30, 20, 10, 0.50)",
  border: "1px solid rgba(192, 160, 128, 0.3)",
  boxShadow: theme.shadows[5],
  borderRadius: 4,
  backgroundImage: `linear-gradient(
    rgba(30, 20, 10, 0.15),
    rgba(50, 30, 15, 0.15)
  )`,
  backdropFilter: "blur(2px)",
  WebkitBackdropFilter: "blur(2px)",
  color: "#e0c0a0",
  zIndex: 999999999999999999,
}));

export const StatContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
}));

export const BarStatusText = styled(Typography)(() => ({
  fontFamily: "inherit",
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
}));
