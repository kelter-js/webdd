import { styled } from "@mui/material";

export const TabsContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "30px",
  left: "50%",
  transform: "translate(-50%, 0)",
  display: "flex",
  gap: "8px",
}));
