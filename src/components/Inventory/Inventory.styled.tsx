import { Stack, styled } from "@mui/material";

export const CharacterCellContainer = styled(Stack, {
  shouldForwardProp: (prop) =>
    prop !== "canDrop" && prop !== "isDragging" && prop !== "item",
})<{ canDrop: boolean; isDragging: boolean; item: boolean }>(
  ({ canDrop, isDragging, item }) => ({
    position: "relative",
    height: 100,
    width: 150,
    flexGrow: 1,
    opacity: canDrop ? 0.8 : isDragging ? 0 : !item ? 0.3 : 1,
    cursor: "pointer",
  }),
);

export const CharacterCellFrame = styled("img")(() => ({
  width: "191px",
  height: "140px",
  position: "relative",
  left: "-21px",
  top: "-30px",
}));

export const CharacterAvatar = styled("img")(() => ({
  width: "110px",
  height: "110px",
  position: "absolute",
  top: 13,
  left: 242,
}));

export const NamePattern = styled("img")(() => ({
  position: "relative",
  top: 275,
  left: 0,
  width: "100%",
  height: "135px",
  zIndex: 5,
}));

export const InventoryCellContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isDragging",
})<{ isDragging: boolean }>(({ isDragging }) => ({
  border: `${isDragging ? "5px" : "1px"} solid ${
    isDragging ? "gold" : "transparent"
  }`,
  height: 190,
  width: 185,
  flexGrow: 0,
  opacity: isDragging ? 0 : 1,
  cursor: "pointer",
}));

export const ItemContainer = styled(Stack)(() => ({
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
}));

export const MainInventoryContainer = styled("div")(() => ({
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}));

export const DroppableArea = styled(Stack)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(8, 5, 2, 0.85)",
  backdropFilter: "blur(2px)",
  border: "2px solid rgba(100, 60, 35, 0.8)",
  boxShadow:
    "inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px rgba(180, 60, 30, 0.3)",
  zIndex: 9999999999999999,

  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at 30% 40%, rgba(70, 30, 15, 0.4), transparent)",
    pointerEvents: "none",
  },

  "&::after": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E")`,
    backgroundRepeat: "repeat",
    opacity: 0.25,
    pointerEvents: "none",
  },

  animation: "pulseDark 0.8s ease-in-out infinite alternate",
  "@keyframes pulseDark": {
    "0%": {
      boxShadow:
        "inset 0 0 20px rgba(0, 0, 0, 0.9), 0 0 10px rgba(120, 50, 30, 0.3)",
      borderColor: "rgba(100, 60, 35, 0.7)",
    },
    "100%": {
      boxShadow:
        "inset 0 0 25px rgba(0, 0, 0, 1), 0 0 20px rgba(180, 70, 40, 0.6)",
      borderColor: "rgba(160, 80, 45, 0.9)",
    },
  },
}));

export const InventoryContainer = styled("div")`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 64px);
  height: 100%;

  margin: 0 32px;
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const CharactersView = styled("div")`
  display: flex;
  gap: 32px;
  padding: 0 32px;
  padding-top: 16px;
`;

export const CharacterGear = styled("div")(() => ({
  position: "relative",
  width: "35%",
  height: 400,
  border: "2px solid black",
}));
