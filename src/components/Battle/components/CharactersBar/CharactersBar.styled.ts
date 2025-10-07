import { styled } from "@mui/material";

export const Container = styled("div")`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: calc(100vw - var(--scrollbar-width, 0px));
  background: orange;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const AvatarsContainer = styled("div")`
  display: flex;
  gap: 20px;
`;

export const Avatar = styled("div")`
  height: 120px;
  width: 450px;
  border: 1px solid white;
`;

export const CharacterControls = styled("div")`
  position: absolute;
  left: 50px;
  top: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const BattleControls = styled("div")`
  position: absolute;
  right: 50px;
  top: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
