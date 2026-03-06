import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Paper, Typography } from "@mui/material";

import { StorySlideProps } from "./types";
import { useGameState } from "../../stores";

export const StorySlide: FC<StorySlideProps> = ({ slides }) => {
  const [index, setIndex] = useState(0);

  const { setSliders } = useGameState();

  const handleNext = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      setSliders(null);
    }
  };

  const current = slides[index];

  return (
    <Box
      onClick={handleNext}
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "black",
        zIndex: 9999,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${current.image})`,
            // backgroundSize: "100% 100%", // Изменено с "cover"
            backgroundSize: "cover", // Изменено с "cover"
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          p: 3,
          boxSizing: "border-box",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "white",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem" }}
            component="div"
          >
            {current.text}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};
