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

export const Inventory = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Stack width="calc(100vw - var(--scrollbar-width))" height="100vh">
        <S.CharactersView>
          <S.CharacterGear>
            <img
              src={character}
              height="100%"
              width="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
            />

            <Stack position="absolute" zIndex="5" left="220px" top="25px">
              <CharacterCell
                type={GEAR_SLOTS.HELMET}
                id="item-123-helmet"
                index={123}
              />
            </Stack>
            <Stack position="absolute" zIndex="5" left="220px" top="135px">
              <CharacterCell
                type={GEAR_SLOTS.ARMOR}
                id="item-123-armor"
                index={123}
              />
            </Stack>
            <Stack position="absolute" zIndex="5" left="52px" top="135px">
              <CharacterCell
                type={GEAR_SLOTS.ARTIFACT}
                id="item-123-artifact"
                index={123}
              />
            </Stack>
            <Stack position="absolute" zIndex="5" left="388px" top="135px">
              <CharacterCell
                type={GEAR_SLOTS.WEAPON}
                id="item-123-weapon"
                index={123}
              />
            </Stack>
          </S.CharacterGear>
          <S.CharacterGear>
            <img
              src={character}
              height="100%"
              width="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
            <Stack position="absolute" zIndex="5" left="220px" top="25px">
              <CharacterCell
                type={GEAR_SLOTS.HELMET}
                id="item-456-helmet"
                index={456}
              />
            </Stack>
            <Stack position="absolute" zIndex="5" left="220px" top="135px">
              <CharacterCell
                type={GEAR_SLOTS.ARMOR}
                id="item-456-armor"
                index={456}
              />
            </Stack>
            <Stack position="absolute" zIndex="5" left="52px" top="135px">
              <CharacterCell
                type={GEAR_SLOTS.ARTIFACT}
                id="item-456-artifact"
                index={456}
              />
            </Stack>
            <Stack position="absolute" zIndex="5" left="388px" top="135px">
              <CharacterCell
                type={GEAR_SLOTS.WEAPON}
                id="item-456-weapon"
                index={456}
              />
            </Stack>
          </S.CharacterGear>
          <S.CharacterGear>
            <img
              src={character}
              height="100%"
              width="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
            <Stack position="absolute" zIndex="5" left="220px" top="25px">
              <CharacterCell
                type={GEAR_SLOTS.HELMET}
                id="item-789-helmet"
                index={789}
              />
            </Stack>
            <Stack position="absolute" zIndex="5" left="220px" top="135px">
              <CharacterCell
                type={GEAR_SLOTS.ARMOR}
                id="item-789-armor"
                index={789}
              />
            </Stack>
            <Stack position="absolute" zIndex="5" left="52px" top="135px">
              <CharacterCell
                type={GEAR_SLOTS.ARTIFACT}
                id="item-789-artifact"
                index={789}
              />
            </Stack>
            <Stack position="absolute" zIndex="5" left="388px" top="135px">
              <CharacterCell
                type={GEAR_SLOTS.WEAPON}
                id="item-789-weapon"
                index={789}
              />
            </Stack>
          </S.CharacterGear>
        </S.CharactersView>
        <InventoryContainer />
      </Stack>
    </DndProvider>
  );
};
