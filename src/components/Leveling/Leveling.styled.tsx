import { Typography, Paper, keyframes, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

// Grid для навыков (чтобы заполнить пространство)
export const AbilitiesGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // 2 колонки
  gap: "12px",
  marginTop: "16px",
});

// =============================================
// 1. АНИМАЦИИ (все используются в компоненте)
// =============================================
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const candleFlicker = keyframes`
  0%, 100% { opacity: 0.7; box-shadow: 0 0 5px #a05050; }
  50% { opacity: 1; box-shadow: 0 0 15px #ff0000; }
`;

export const abilityPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const bloodDrip = keyframes`
  0% { background-position: 0 -10px; }
  100% { background-position: 0 10px; }
`;

// =============================================
// 2. СТИЛИЗОВАННЫЕ КОМПОНЕНТЫ
// =============================================
export const CharacterContainer = styled(Paper)({
  position: "relative",
  width: "350px",
  minHeight: "600px",
  padding: "24px",
  backgroundColor: "#1a0a0a",
  color: "#e0d0b8",
  border: "6px solid #3a1a1a",
  borderRadius: "4px",
  fontFamily: '"Old English Text MT", "Times New Roman", serif',
  boxShadow: `
    inset 0 0 15px #000,
    0 0 20px rgba(150, 50, 50, 0.8)`,
  animation: `${fadeIn} 0.8s ease-out`,
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, transparent, #a05050, transparent)",
    animation: `${candleFlicker} 3s infinite alternate`,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "20%",
    right: "20%",
    height: "15px",
    background: `
      linear-gradient(
        to bottom,
        transparent,
        rgba(80, 0, 0, 0.3) 20%,
        transparent
      ),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 Q25,5 50,10 T100,10' stroke='%23500000' fill='none'/%3E%3C/svg%3E")`,
    backgroundSize: "100% 10px",
    animation: `${bloodDrip} 8s linear infinite`,
  },
});

export const CharacterName = styled(Typography)({
  fontSize: "1.8rem",
  fontWeight: "bold",
  textAlign: "center",
  textShadow: "2px 2px 4px #000",
  marginBottom: "16px",
  paddingBottom: "12px",
  borderBottom: "3px solid #5a2a2a",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-3px",
    left: "25%",
    right: "25%",
    height: "1px",
    background: "linear-gradient(90deg, transparent, #e0b050, transparent)",
  },
});

export const AbilityGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "16px",
  margin: "24px 0",
});

export const AbilityIcon = styled(motion.div)({
  width: "80px",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2a1a1a",
  border: "3px solid #5a3a3a",
  borderRadius: "4px",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    borderColor: "#a05050",
    boxShadow: "0 0 15px rgba(160, 80, 80, 0.7)",
    animation: `${abilityPulse} 1s infinite`,
  },
  "& img": {
    width: "70%",
    height: "70%",
    objectFit: "contain",
    filter: "drop-shadow(0 0 4px rgba(0,0,0,0.5))",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(45deg, transparent 60%, rgba(160, 80, 80, 0.3))",
  },
});

export const StatItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 12px",
  backgroundColor: "rgba(40, 20, 20, 0.5)",
  borderLeft: "3px solid #5a2a2a",
  marginBottom: "8px",
  "& .stat-name": {
    color: "#c0a080",
    fontSize: "1.1rem",
  },
  "& .stat-value": {
    color: "#e0b050",
    fontWeight: "bold",
    fontSize: "1.2rem",
    textShadow: "0 0 5px rgba(224, 176, 80, 0.5)",
  },
  "&:hover": {
    backgroundColor: "rgba(80, 40, 40, 0.3)",
    borderLeftColor: "#a05050",
  },
});
