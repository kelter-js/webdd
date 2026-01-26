import { styled } from "@mui/material";

export const Container = styled("div")`
  position: relative;
`;

export const BackgroundFiller = styled("img")`
  position: absolute;
  top: 43px;
  left: 0;
  filter: brightness(0.5) blur(2px);
  height: 601px;
  width: 100%;
`;
