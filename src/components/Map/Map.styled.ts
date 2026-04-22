import { Box, Button, Stack, styled } from "@mui/material";

import { COBBLESTONE_TEXTURE } from "./constants";

export const MainContainer = styled("div")(() => ({
  padding: 20,
  maxWidth: 600,
  margin: "0 auto",
  position: "fixed",
  right: "20px",
  top: "20px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  flexDirection: "column",
}));

export const BackgroundMap = styled("img")(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: -1,
}));

export const ControlsContainer = styled(Stack)(({ theme: { spacing } }) => ({
  flexDirection: "row",
  gap: spacing(1),
  alignItems: "center",
  marginBottom: spacing(2),
  justifyContent: "space-between",
}));

export const LeaveDungeonButton = styled("button")(() => ({
  fontSize: 18,
  padding: "10px 20px",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: 5,
}));

export const MovementsContainer = styled("div")(() => ({
  position: "fixed",
  bottom: "0",
  left: "50%",
  transform: "translate(-50%, 0)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  marginBottom: 20,
  width: "100px",
}));

export const MovementButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "canMove",
})<{
  canMove: boolean;
}>(({ canMove }) => ({
  fontSize: 18,
  backgroundColor: canMove ? "#4ade80" : "#64748b",
  color: "white",
  padding: 0,
  minWidth: "40px !important",
  width: "40px",
  height: "40px",
}));

export const GuideButtonContainer = styled(Box)(({ theme: { spacing } }) => ({
  backgroundColor: "rgb(51, 65, 85)",
  color: "white",
  borderRadius: "50%",
  display: "inline-flex",
  padding: spacing(1),
  cursor: "pointer",
}));

export const Rooms = styled("div", {
  shouldForwardProp: (prop) => prop !== "columns" && prop !== "rows",
})<{
  columns: number;
  rows: number;
}>(({ rows, columns }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${columns}, 64px)`,
  gridTemplateRows: `repeat(${rows}, 64px)`,
  position: "relative",
  zIndex: 2,
}));

export const RoomContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "gridColumn" && prop !== "gridRow",
})<{
  gridColumn: number;
  gridRow: number;
}>(({ gridRow, gridColumn }) => ({
  gridColumn,
  gridRow,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const DungeonContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "width" && prop !== "height",
})<{
  width: number;
  height: number;
}>(({ width, height }) => ({
  position: "relative",
  width,
  height,
  marginBottom: 16,
  backgroundColor: "#111827",
  marginTop: 20,
  boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
}));

export const MapContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "bgColor" &&
    prop !== "isCurrent" &&
    prop !== "color" &&
    prop !== "isDeadEndRoom",
})<{
  bgColor: string;
  color: string;
  isCurrent: boolean;
  isDeadEndRoom: boolean;
}>(({ color, isCurrent, bgColor, isDeadEndRoom }) => ({
  width: 60,
  height: 60,
  backgroundColor: bgColor,
  border: isCurrent ? "3px solid #fbbf24" : "none",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  color,
  position: "relative",
  zIndex: 2,
  boxShadow: isDeadEndRoom ? "inset 0 0 10px rgba(245,158,11,0.5)" : "none",
}));

export const Wall = styled("div")(() => ({
  position: "absolute",
  backgroundImage: COBBLESTONE_TEXTURE,
  backgroundSize: "8px 8px",
  backgroundColor: "#222",
  zIndex: 3,
}));

export const DirectionUpWall = styled(Wall)(() => ({
  top: 0,
  left: 0,
  right: 0,
  height: 8,
  boxShadow: "inset 0 0 5px rgba(0,0,0,0.5), 1px 1px 2px rgba(0,0,0,0.3)",
  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
}));

export const DirectionRightWall = styled(Wall)(() => ({
  top: 0,
  right: 0,
  bottom: 0,
  width: 8,
  boxShadow: "inset 2px 0 3px rgba(0,0,0,0.5)",
}));

export const DirectionDownWall = styled(Wall)(() => ({
  bottom: 0,
  left: 0,
  right: 0,
  height: 6,
  boxShadow: "inset 0 0 5px rgba(0,0,0,0.5), 1px 1px 2px rgba(0,0,0,0.3)",
  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
}));

export const DirectionLeftWall = styled(Wall)(() => ({
  top: 0,
  left: 0,
  bottom: 0,
  width: 6,
  boxShadow: "inset 0 0 5px rgba(0,0,0,0.5), 1px 1px 2px rgba(0,0,0,0.3)",
  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
}));
