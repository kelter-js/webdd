import { Stack } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { InventoryContainer } from "./InventoryContainer";
import { useGameState } from "../../stores";
import { CharacterGear } from "./components/CharacterGear";
import * as S from "./Inventory.styled";

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
