import { styled, keyframes, Modal } from "@mui/material";

const sparkle = keyframes`
  0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg);}
  50% { opacity: 1; transform: scale(1.2) rotate(15deg);}
`;

export const StyledModal = styled(Modal)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(4px) brightness(0.7)",
}));

export const ModalInner = styled("div", {
  shouldForwardProp: (prop) => prop !== "height" && prop !== "height",
})<{ withoutPadding?: boolean }>(({ withoutPadding }) => ({
  flex: 1,
  width: "100%",
  height: "100%",
  padding: withoutPadding ? "0px" : "24px",
  borderRadius: "8px",
  background: `linear-gradient(
    rgba(25, 15, 10, 0.95),
    rgba(50, 35, 20, 0.95)
  )`,
  color: "#e0c0a0",
  fontFamily: "Cormorant Unicase, serif",
  overflowY: "auto",
  boxShadow: "inset 0 0 10px rgba(0,0,0,0.6)",
}));

export const Sparkles = styled("div")({
  position: "absolute",
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "radial-gradient(circle, #ffd580, transparent 70%)",
  animation: `${sparkle} 1.2s infinite ease-in-out`,
});

export const ModalContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "height" && prop !== "height",
})<{ width: string; height: string }>(({ width, height }) => ({
  width: width,
  maxWidth: "1200px",
  height: height,
  maxHeight: "85%",
  display: "flex",
}));

export const ModalBorder = styled("div")(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderRadius: "12px",
  padding: "6px",
  background: `linear-gradient(135deg, #2a1f18, #1a0f0a)`,
  border: "4px solid transparent",
  boxShadow: `
    0 0 25px rgba(0,0,0,0.8),
    inset 0 0 15px rgba(0,0,0,0.7),
    0 0 15px rgba(80,50,30,0.5)
  `,
  "&::before": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: "14px",
    background: "linear-gradient(135deg, #3a2a1f, #1e1410, #4a3222)",
    zIndex: -1,
    filter: "blur(4px)",
    opacity: 0.7,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: "14px",
    border: "2px dashed rgba(200,160,128,0.4)",
    pointerEvents: "none",
  },
}));
