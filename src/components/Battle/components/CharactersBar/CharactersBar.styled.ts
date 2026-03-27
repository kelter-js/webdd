import { styled } from "@mui/material";
import { motion } from "framer-motion";

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
  overflow: hidden;
`;

export const CharacterContainer = styled("div")`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background: #0d1117;
  border: 1px solid #30363d;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background:
      radial-gradient(
        circle at 30% 30%,
        rgba(88, 101, 242, 0.15) 0%,
        transparent 50%
      ),
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4"><path fill="%23202838" d="M1 3h1v1H1V3zm2-2h1v1H3V1z"/></svg>');
    opacity: 0.6;
    pointer-events: none;
  }
`;

export const Avatar = styled(motion.div, {
  shouldForwardProp: (prop) =>
    prop !== "isSelected" &&
    prop !== "isDamaged" &&
    prop !== "hasTurn" &&
    prop !== "isDead",
})<{
  isSelected: boolean;
  isDamaged?: boolean;
  hasTurn?: boolean;
  isDead?: boolean;
}>`
  position: relative;
  height: 120px;
  width: 450px;
  cursor: pointer;
  display: flex;
  gap: 16px;
  border: ${({ isSelected, isDamaged }) =>
    `5px solid ${isDamaged ? "red" : isSelected ? "green" : "white"}`};
  transition: border-color 0.2s ease;
  opacity: ${({ hasTurn, isDead }) =>
    `${isDead ? "0.3" : hasTurn ? "1" : "0.5"}`};
  overflow: hidden;
`;

export const AvatarImg = styled("img")`
  width: 110px !important;
  height: 110px !important;
`;

export const Divider = styled("div")`
  content: "";
  display: block;
  position: absolute;
  height: 70px;
  width: 15px;
  bottom: -21px;
  right: 11px;
  background: var(--black);
  opacity: 1;
  z-index: 999;
  transform: rotate(55deg);
`;

export const CharacterControls = styled("div")`
  position: absolute;
  left: 15px;
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
