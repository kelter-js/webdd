import {
  styled,
  Tooltip as MuiTooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(30, 20, 10, 0.9)",
    color: "#e0c0a0",
    border: "1px solid #c0a080",
    boxShadow: theme.shadows[10],
    fontFamily: "Cormorant Unicase",
    textTransform: "uppercase",
    borderRadius: 4,
    fontSize: "0.9rem",
    textAlign: "center",
    letterSpacing: "0.5px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgba(30, 20, 10, 0.9)",
    "&::before": {
      border: "1px solid #c0a080",
    },
  },
}));
