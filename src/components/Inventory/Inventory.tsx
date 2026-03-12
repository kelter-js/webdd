import { Stack } from "@mui/material";
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as S from "./Inventory.styled";
import { MIN_AMOUNT_OF_ITEMS_PER_ROW } from "./constants";
import { InventoryCell } from "./InventoryCell";

import { CharacterCell } from "./CharacterCell";
import { Fragment, useMemo } from "react";

import { InventoryContainer } from "./InventoryContainer";
import character from "../../assets/static/character_bg.png";
import { GEAR_SLOTS } from "../../entities/gear";
import { useGameState } from "../../stores";
import { CharacterGear } from "./components/CharacterGear";

export const Inventory = () => {
  const {
    player: { party },
  } = useGameState();

  return (
    <DndProvider backend={HTML5Backend}>
      <Stack width="calc(100vw - var(--scrollbar-width))" height="100vh">
        <S.CharactersView>
          {party.map((character) => (
            <CharacterGear
              key={character.name}
              name={character.name}
              currentHealth={character.currentHealth}
              characterClass={character.characterClass}
            />
          ))}
        </S.CharactersView>

        <InventoryContainer />
      </Stack>
    </DndProvider>
  );
};
