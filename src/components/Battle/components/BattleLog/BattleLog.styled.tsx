import { styled } from "@mui/material";

export const LogsContainer = styled("div")`
  position: fixed;
  bottom: 166px;
  left: 32px;
  width: 30vw;
  height: 200px;
  overflow: hidden;
  z-index: 1;
  padding: 24px 52px;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;

export const MessagesContainer = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100%;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: auto;
  overflow-x: hidden;

  scroll-behavior: smooth;
`;
