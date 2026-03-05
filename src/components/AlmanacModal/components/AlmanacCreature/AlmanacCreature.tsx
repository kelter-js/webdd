import { FC } from "react";
import { AlmanacCreatureProps } from "./types";
import { Container } from "./AlmanacCreature.styled";
import { Stack, Typography } from "@mui/material";

export const AlmanacCreature: FC<AlmanacCreatureProps> = ({
  description,
  src,
  index,
}) => (
  <Container index={index}>
    <img alt="Изображение противника" src={src} />

    <Typography
      fontFamily="inherit"
      variant="body1"
      sx={{
        backgroundColor: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(8px)",
        position: "absolute",
        bottom: "-32px",
        width: "83%",
        color: "black",
        left: index === 0 ? "95px" : "unset",
        right: index === 0 ? "unset" : "111px",
      }}
    >
      {description}
    </Typography>
  </Container>
);
