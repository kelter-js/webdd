import { Box, LinearProgress, styled, Typography } from "@mui/material";

export const LoadingContainer = styled(Box)(
  ({ theme: { spacing, shadows } }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#1b1b1b",
    border: "2px solid #5c1a1a",
    padding: spacing(4),
    textAlign: "center",
    borderRadius: 2,
    boxShadow: shadows[24],
  })
);

export const LoaderText = styled(Typography)(() => ({
  color: "#f1c40f",
  fontFamily: "'Cinzel', serif",
  marginBottom: 2,
  textShadow: "2px 2px 4px #000000",
}));

export const Progress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: "#3a3a3a",

  "& .MuiLinearProgress-bar": {
    backgroundColor: "#f1c40f",
  },
}));

export const ProgressText = styled(Typography)(() => ({
  color: "#f1c40f",
  marginTop: 1,
  textShadow: "1px 1px 2px #000000",
}));
