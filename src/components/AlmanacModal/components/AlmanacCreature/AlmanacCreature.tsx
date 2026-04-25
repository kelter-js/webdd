import { FC } from "react";

import { AlmanacCreatureProps } from "./types";
import { Container, CreatureDescription } from "./AlmanacCreature.styled";

export const AlmanacCreature: FC<AlmanacCreatureProps> = ({
  description,
  src,
  index,
}) => (
  <Container index={index}>
    <img alt="Изображение противника" src={src} />

    <CreatureDescription isFirstOne={index === 0} variant="body1">
      {description}
    </CreatureDescription>
  </Container>
);
