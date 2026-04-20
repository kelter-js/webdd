import { useState, ChangeEvent } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Stack } from "@mui/material";

import { CharacterGear } from "./components/CharacterGear";
import { InventoryContainer } from "./InventoryContainer";
import { useGameState } from "../../stores";

import { SORT_TYPES_BY_TIER, SORT_TYPES_BY_UPGRADE } from "./types";
import { CLASSES } from "../../entities/characterClasses";

import { SortContainer } from "./components/SortContainer/SortContainer";
import * as S from "./Inventory.styled";

export const Inventory = () => {
  const [search, setSearch] = useState("");
  const [upgradeTier, setUpgradeTier] = useState<null | SORT_TYPES_BY_UPGRADE>(
    null,
  );
  const [tier, setTier] = useState<null | SORT_TYPES_BY_TIER>(null);
  const [classFilter, setClassFilter] = useState<null | CLASSES>(null);

  const handleChangeTier = (value: SORT_TYPES_BY_TIER) => {
    setTier(value === tier ? null : value);
  };

  const handleChangeClassFilter = (value: CLASSES) => {
    setClassFilter(value === classFilter ? null : value);
  };

  const handleChangeUpgradeTier = (value: SORT_TYPES_BY_UPGRADE) => {
    setUpgradeTier(upgradeTier === value ? null : value);
  };

  const handleUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const {
    player: { party },
  } = useGameState();

  return (
    <DndProvider backend={HTML5Backend}>
      <Stack
        width="calc(100vw - var(--scrollbar-width))"
        height="100vh"
        gap={1}
      >
        <S.CharactersView>
          {party.map(({ name, currentHealth, characterClass }) => (
            <CharacterGear
              key={name}
              name={name}
              currentHealth={currentHealth}
              characterClass={characterClass}
            />
          ))}
        </S.CharactersView>

        <SortContainer
          onUpdateSearch={handleUpdateSearch}
          currentClass={classFilter}
          currentTier={tier}
          currentUpgradeTier={upgradeTier}
          search={search}
          onChangeTier={handleChangeTier}
          onChangeClass={handleChangeClassFilter}
          onChangeUpgradeTier={handleChangeUpgradeTier}
        />

        <InventoryContainer
          searchTerm={search}
          tier={tier}
          upgradeTier={upgradeTier}
          classFilter={classFilter}
        />
      </Stack>
    </DndProvider>
  );
};
