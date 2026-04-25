import { Typography, styled, Stack } from "@mui/material";

export const Container = styled(Stack)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 8px;
  background-color: var(--black);
  z-index: 9999999999999999;
`;

export const Text = styled(Typography)(() => ({
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
}));
