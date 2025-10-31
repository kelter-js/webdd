import { Box, Button, styled, Typography } from "@mui/material";

export const ModalContent = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 500,
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #c0a080",
  boxShadow: theme.shadows[10],
  padding: theme.spacing(3),
  paddingTop: theme.spacing(2),
  borderRadius: 4,
  backgroundImage: `linear-gradient(
    rgba(30, 20, 10, 0.9),
    rgba(50, 30, 15, 0.9)
  )`,
  color: "#e0c0a0",
}));

export const ResultHeader = styled(Typography)({
  fontFamily: "'Cormorant Unicase', serif",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: "#c08040",
  borderBottom: "1px solid #5a3020",
  paddingBottom: "8px",
  letterSpacing: "1px",
});

export const RewardItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "12px 0",
  fontFamily: "'Cormorant Unicase', serif",
});

export const RewardText = styled(Typography)({
  color: "#e0c0a0",
  fontWeight: "bold",
  marginLeft: "12px",
  textTransform: "uppercase",
});

export const StyledButton = styled(Button)({
  backgroundColor: "transparent",
  width: "100%",
  padding: 0,
  "&:hover": {
    backgroundColor: "transparent",
  },
});

export const EndQuestText = styled(Typography)(({ theme: { spacing } }) => ({
  width: "100%",
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",
  fontFamily: "Cormorant Unicase",
}));
