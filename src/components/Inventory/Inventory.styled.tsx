import { styled } from "@mui/material";

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

export const CharacterGear = styled("div")(({ theme }) => ({
  position: "relative",
  width: "35%",
  height: 400,
  border: "2px solid black",
}));
