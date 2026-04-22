import { styled, Box, Modal } from "@mui/material";

export const ModalWindow = styled(Modal)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(2px)",
}));

export const SequenceContainer = styled(Box)(({ theme: { spacing } }) => ({
  marginTop: spacing(4),
  minWidth: 320,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing(3),
  background: "transparent",
}));

export const TotalTime = styled("div")({
  position: "absolute",
  top: "15px",
  left: "10px",
  fontSize: "18px",
  color: "#d33",
});

export const Attempts = styled("div")({
  position: "absolute",
  top: "15px",
  right: "10px",
  fontSize: "18px",
  color: "#0f0",
});

export const Result = styled("div")({
  display: "none",
  marginTop: "20px",
  minHeight: "50px",
  fontSize: "18px",
});

export const SuccessAttempts = styled("div")({
  position: "absolute",
  top: "45px",
  left: "10px",
  fontSize: "18px",
  color: "#0f0",
});

export const QteContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "24px",
  padding: theme.spacing(2),
  backgroundImage: `linear-gradient(
    rgba(30, 20, 10, 0.9),
    rgba(50, 30, 15, 0.9)
  )`,
  border: "2px solid #c0a080",
  borderRadius: "4px",
  boxShadow: theme.shadows[10],
  height: "300px",
  width: "500px",
}));

export const SymbolBase = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  height: "80px",
  borderRadius: "4px",
  fontFamily: "'Cormorant Unicase', serif",
  fontWeight: "bold",
  fontSize: "2.5rem",
  color: "#e0c0a0",
  transition: "all 0.3s ease",
});

export const AdjacentSymbol = styled(SymbolBase)({
  border: "1px solid #5a3020",
  backgroundColor: "rgba(30, 20, 10, 0.5)",
  fontSize: "2rem",
  opacity: 0.7,
});

export const CurrentSymbol = styled(SymbolBase)({
  border: "2px solid #c08040",
  backgroundColor: "rgba(50, 30, 15, 0.8)",
  color: "#FFD700",
  boxShadow: "0 0 10px rgba(192, 128, 64, 0.5)",
  fontSize: "3rem",
});
