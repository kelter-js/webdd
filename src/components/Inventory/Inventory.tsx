import { Stack } from "@mui/material";
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as S from "./Inventory.styled";
import { MIN_AMOUNT_OF_ITEMS_PER_ROW } from "./constants";
import { InventoryCell } from "./InventoryCell";

import { CharacterCell } from "./CharacterCell";
import { Fragment, useMemo } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { InventoryContainer } from "./InventoryContainer";

export const Inventory = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Stack width="calc(100vw - var(--scrollbar-width))" height="100vh">
        <S.CharactersView>
          <S.CharacterGear>
            <CharacterCell type="item" id="item-123" index={123} />
          </S.CharacterGear>
          <S.CharacterGear>
            <CharacterCell type="item" id="item-456" index={456} />
          </S.CharacterGear>
          <S.CharacterGear>
            <CharacterCell type="item" id="item-789" index={789} />
          </S.CharacterGear>
        </S.CharactersView>
        <InventoryContainer />
      </Stack>
    </DndProvider>
  );
};
