import {
  Select,
  Slider,
  Typography,
  sliderClasses,
  styled,
} from "@mui/material";

export const Text = styled(Typography)(({ theme: { spacing } }) => ({
  width: "100%",
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",
  fontFamily: "inherit",
}));

export const QuestCardText = styled(Typography)(({ theme: { spacing } }) => ({
  width: "100%",
  color: "black",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  fontSize: "20px",
  fontFamily: "inherit",
  textAlign: "center",
}));

export const StyledSlider = styled(Slider)(({ theme }) => ({
  color: "#c0a080", // Основной цвет в стиле тултипа

  // Стили для вертикальной ориентации
  "&.MuiSlider-vertical": {
    width: 20,

    // Стили для трека (активная часть)
    [`& .${sliderClasses.track}`]: {
      backgroundColor: "rgba(192, 160, 128, 0.7)",
      border: "none",
      width: 6,
      borderRadius: 3,
      left: "50%",
      transform: "translateX(-50%)",
    },

    // Стили для неактивной части (rail)
    [`& .${sliderClasses.rail}`]: {
      backgroundColor: "rgba(192, 160, 128, 0.2)",
      width: 6,
      borderRadius: 3,
      left: "50%",
      transform: "translateX(-50%)",
    },

    // Стили для ползунка (thumb)
    [`& .${sliderClasses.thumb}`]: {
      height: 15,
      width: 15,
      backgroundColor: "rgba(30, 20, 10, 0.9)",
      border: "2px solid #c0a080",
      boxShadow: theme.shadows[5],
      left: "50%",
      transform: "translateX(-50%) !important",
      "&:hover": {
        boxShadow: theme.shadows[10],
        backgroundColor: "rgba(50, 35, 20, 0.9)",
      },
      "&.Mui-focusVisible": {
        boxShadow: `0 0 0 8px rgba(192, 160, 128, 0.16)`,
      },
      "&.Mui-active": {
        boxShadow: `0 0 0 12px rgba(192, 160, 128, 0.16)`,
      },
    },

    // Стили для меток
    [`& .${sliderClasses.mark}`]: {
      backgroundColor: "#c0a080",
      width: 8,
      height: 1,
      borderRadius: 0,
      opacity: 0.5,
      left: "50%",
      transform: "translateX(-50%)",
    },

    // Стили для активных меток
    [`& .${sliderClasses.markActive}`]: {
      opacity: 1,
      backgroundColor: "#e0c0a0",
      width: 10,
      height: 2,
    },

    // Стили для подписей меток
    [`& .${sliderClasses.markLabel}`]: {
      color: "#e0c0a0",
      fontFamily: "Cormorant Unicase",
      fontSize: "0.8rem",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      left: "auto",
      right: 25,
      transform: "translateY(-50%)",
      whiteSpace: "nowrap",
    },

    // Стили для отображаемого значения
    [`& .${sliderClasses.valueLabel}`]: {
      left: "auto",
      right: 35,
      transform: "translateY(-50%)",

      // Сам лейбл значения
      [`& .${sliderClasses.valueLabelLabel}`]: {
        backgroundColor: "rgba(30, 20, 10, 0.9)",
        color: "#e0c0a0",
        border: "1px solid #c0a080",
        boxShadow: theme.shadows[10],
        fontFamily: "Cormorant Unicase",
        textTransform: "uppercase",
        borderRadius: 4,
        fontSize: "0.8rem",
        padding: "2px 8px",
        letterSpacing: "0.5px",
      },

      // Стрелка стилизуется через псевдоэлемент самого valueLabel
      "&::before": {
        content: '""',
        position: "absolute",
        width: 10,
        height: 10,
        backgroundColor: "rgba(30, 20, 10, 0.9)",
        border: "1px solid #c0a080",
        borderLeftColor: "transparent",
        borderBottomColor: "transparent",
        right: -5,
        top: "50%",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: -1,
      },
    },
  },
}));

export const StyledSelect = styled(Select)(() => ({
  backgroundColor: "rgba(30, 20, 10, 0.9)",
  color: "#e0c0a0",
  border: "1px solid #c0a080",
  fontFamily: "Cormorant Unicase",
  textTransform: "uppercase",
  borderRadius: 4,
  fontSize: "0.9rem",
  letterSpacing: "0.5px",

  "& .MuiSelect-icon": {
    color: "#e0c0a0",
  },

  "&:hover": {
    borderColor: "#e0c0a0",
  },

  "&.Mui-focused": {
    borderColor: "#e0c0a0",
  },
}));

export const MainButtonText = styled(Typography)(({ theme: { spacing } }) => ({
  width: "100%",
  color: "#c08040",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: spacing(1),
  borderBottom: "1px solid #5a3020",
  borderTop: "1px solid #5a3020",
  fontFamily: "inherit",
}));
