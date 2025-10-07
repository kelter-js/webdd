import { styled, Box, Button, Typography } from "@mui/material";

export const Avatar = styled("img")`
  position: absolute;
  display: block;
  width: 150px;
  height: 150px;
  left: 0;
  top: -75px;
  z-index: 999;
`;

export const DialogueModal = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 100,
  left: "50%",
  transform: "translateX(-50%)",
  width: "90vw",
  maxWidth: 800,
  minHeight: 150,
  maxHeight: 500,

  backgroundColor: "#1a0a0a",
  border: "3px solid #5a3020",
  boxShadow: `
    0 -5px 15px rgba(0, 0, 0, 0.7),
    inset 0 0 10px #3a1a10
  `,

  color: "#e0c4a0",
  fontFamily: "inherit",
  padding: theme.spacing(3),
  paddingLeft: 150,
  zIndex: theme.zIndex.modal,
}));

export const SpeakerName = styled(Typography)({
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "0.5rem",
  borderBottom: "1px solid #5a3020",
  fontFamily: "inherit",
});

export const DialogueText = styled(Typography)({
  fontFamily: "Cormorant Unicase",
  textShadow: "1px 1px 1px #000",
  margin: 0,
});

export const SmoothText = styled(DialogueText)({
  transition: "opacity 0.3s, text-shadow 0.2s",
  "& span": {
    opacity: 0,
    animation: "fadeIn 0.1s forwards",
    animationDelay: "calc(0.05s * var(--char-index))",
  },
});

export const ContinueButton = styled(Button)({
  backgroundColor: "#5a3020",
  color: "#e0c4a0",
  border: "1px solid #3a1a10",
  padding: "0.3rem 1rem",
  "&:hover": {
    backgroundColor: "#7a4030",
  },

  textTransform: "none",
  borderRadius: 0,
});
