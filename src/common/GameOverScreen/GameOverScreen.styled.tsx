import { Box, styled, Typography } from "@mui/material";
import { MotionStyledBoxProps, MotionStyledTypographyProps } from "./types";

export const OverlayBlocker = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 9998,
  pointerEvents: "auto",
  cursor: "default",
}));

export const OverlayContent = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  overflow: "hidden",
}));

export const BlackHole = styled(Box)<MotionStyledBoxProps>(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "black",
  zIndex: 1,
}));

export const StaticInterference = styled(Box)<MotionStyledBoxProps>(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `
                  /* Густые горизонтальные линии */
                  repeating-linear-gradient(
                    0deg,
                    rgba(255, 255, 255, 0.05) 0px,
                    rgba(255, 255, 255, 0.05) 1px,
                    transparent 1px,
                    transparent 2px
                  ),
                  /* Вертикальные линии */
                  repeating-linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0.03) 0px,
                    rgba(255, 255, 255, 0.03) 1px,
                    transparent 1px,
                    transparent 3px
                  ),
                  /* Диагональные линии */
                  repeating-linear-gradient(
                    45deg,
                    rgba(255, 255, 255, 0.02) 0px,
                    rgba(255, 255, 255, 0.02) 2px,
                    transparent 2px,
                    transparent 4px
                  )
                `,
  backgroundSize: "100% 100%, 100% 100%, 200px 200px",
  zIndex: 2,
}));

export const MainInterferenceLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== "index",
})<MotionStyledBoxProps & { index: number }>(({ index }) => ({
  position: "absolute",
  left: 0,
  width: "100%",
  height: "1px",
  background: `linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 255, 255, ${0.3 + index * 0.1}), 
                    transparent
                  )`,
  zIndex: 3,
}));

export const SubInterferenceLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== "index",
})<MotionStyledBoxProps & { index: number }>(({ index }) => ({
  position: "absolute",
  left: 0,
  width: "100%",
  height: `${3 + index}px`,
  background: `linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 255, 255, ${0.4 - index * 0.1}), 
                    rgba(255, 255, 255, ${0.6 - index * 0.1}), 
                    transparent
                  )`,
  boxShadow: `0 0 ${8 + index * 2}px ${2 + index}px rgba(255, 255, 255, 0.3)`,
  zIndex: 3,
}));

export const MovingLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color",
})<MotionStyledBoxProps & { color: string }>(({ color }) => ({
  position: "absolute",
  left: 0,
  width: "100%",
  height: "2px",
  background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
  zIndex: 3,
}));

export const Flash = styled(Box)<MotionStyledBoxProps>(() => ({
  position: "absolute",
  left: 0,
  width: "100%",
  height: "10px",
  background: `linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 255, 255, 0.6), 
                    transparent
                  )`,
  top: `${Math.random() * 100}%`,
  zIndex: 3,
}));

export const HorizontalWave = styled(Box)<MotionStyledBoxProps>(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 4px,
                    rgba(255, 255, 255, 0.03) 4px,
                    rgba(255, 255, 255, 0.03) 5px
                  )
                `,
  zIndex: 2,
}));

export const ThinLines = styled(Box)<MotionStyledBoxProps>(() => ({
  position: "absolute",
  top: `${Math.random() * 100}%`,
  left: 0,
  width: "100%",
  height: "100%",
  background: `
                  repeating-linear-gradient(
                    0deg,
                    rgba(255, 255, 255, 0.02) 0px,
                    rgba(255, 255, 255, 0.02) 1px,
                    transparent 1px,
                    transparent 1px
                  )
                `,
  zIndex: 2,
}));

export const TwinklingOverlay = styled(Box)<MotionStyledBoxProps>(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  zIndex: 2,
}));

export const GameEndText = styled(Typography)<MotionStyledTypographyProps>(
  () => ({
    color: "white",
    fontSize: "5rem",
    fontWeight: "bold",
    textShadow: `
                    0 0 10px rgba(255, 255, 255, 0.5),
                    0 0 20px rgba(255, 255, 255, 0.3),
                    0 0 30px rgba(255, 0, 0, 0.2),
                    0 0 40px rgba(255, 0, 0, 0.1)
                  `,
    fontFamily: "inherit",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
  })
);

export const GameEndTextDuplicate = styled(
  Typography
)<MotionStyledTypographyProps>(() => ({
  color: "white",
  fontSize: "5rem",
  fontWeight: "bold",
  fontFamily: "inherit",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  textShadow: `
                    0 0 8px rgba(255, 255, 255, 0.8),
                    0 0 15px rgba(255, 0, 0, 0.4)
                  `,
  pointerEvents: "none",
}));

export const GameEndButton = styled(GameEndText)(() => ({
  position: "relative",
  zIndex: 9999,
  cursor: "pointer",
  "&:hover": {
    textShadow: `
    -2px 0 red,
    2px 0 cyan,
    0 0 2px white
  `,
    transform: "scale(1.05)",
    transition: "all 0.2s ease",
  },
}));

export const RandomLine = styled(Box)<MotionStyledBoxProps & { index: number }>(
  () => ({
    position: "absolute",
    left: `${15 + Math.random() * 70}%`,
    top: 0,
    width: `${2 + Math.random() * 4}px`,
    height: `${8 + Math.random() * 15}%`,
    background: `linear-gradient(0deg, 
        transparent, 
        rgba(255, 255, 255, ${0.15 + Math.random() * 0.25}), 
        transparent
      )`,
    zIndex: 2,
  })
);
