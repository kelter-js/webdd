import { styled, Typography } from "@mui/material";

export const Container = styled("div", {
  shouldForwardProp: (prop) => prop !== "index",
})<{ index: number }>(({ theme: { spacing }, index }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: spacing(4),
  width: "580px",
  left: index === 0 ? "10px" : "unset",
  right: index === 0 ? "unset" : "-10px",
  top: "0px",

  "& img": {
    width: "408px",
    height: "612px",
    marginRight: spacing(index === 0 ? 0 : 10),
    marginLeft: spacing(index === 0 ? 10 : 0),
  },
}));

export const CreatureDescription = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isFirstOne",
})<{ isFirstOne: boolean }>(({ isFirstOne }) => ({
  fontFamily: "inherit",
  backgroundColor: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(8px)",
  position: "absolute",
  bottom: "-32px",
  width: "83%",
  color: "black",
  left: isFirstOne ? "95px" : "unset",
  right: isFirstOne ? "unset" : "111px",
}));
