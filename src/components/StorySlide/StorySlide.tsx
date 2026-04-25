import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Typography } from "@mui/material";

import { SLIDE_ANIMATION_STYLES } from "./constants";
import { SLIDERS } from "../../entities/sliders";
import { useGameState } from "../../stores";
import { StorySlideProps } from "./types";
import { FLAGS } from "../../constants";
import { Container, SlideTextContainer, TextHolder } from "./StorySlide.styled";

export const StorySlide: FC<StorySlideProps> = ({ slides, sliderId }) => {
  const [index, setIndex] = useState(0);

  const { setSliders, updateFlags } = useGameState();

  const handleNext = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      if (sliderId === SLIDERS.INTRO) {
        updateFlags(FLAGS.INTRO_SHOWED);
      }

      setSliders(null);
    }
  };

  const current = slides[index];

  return (
    <Container onClick={handleNext}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            ...SLIDE_ANIMATION_STYLES,
            backgroundImage: `url(${current.image})`,
          }}
        />
      </AnimatePresence>

      <SlideTextContainer>
        <TextHolder elevation={6}>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem" }}
            component="div"
          >
            {current.text}
          </Typography>
        </TextHolder>
      </SlideTextContainer>
    </Container>
  );
};
