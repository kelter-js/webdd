import { FC } from "react";
import { Button, Stack } from "@mui/material";

import { SORT_TYPES_BY_TIER, SORT_TYPES_BY_UPGRADE } from "../../types";
import { MainButtonText } from "../../../../common/styled.index";
import { CLASSES } from "../../../../entities/characterClasses";
import { SearchField } from "../../../../common/SearchField";
import { SortContainerProps } from "./types";

export const SortContainer: FC<SortContainerProps> = ({
  search,
  onUpdateSearch,
  onChangeTier,
  currentUpgradeTier,
  currentClass,
  currentTier,
  onChangeUpgradeTier,
  onChangeClass,
}) => (
  <Stack direction="row" gap={1} alignItems="center" px={4} pt={1}>
    <SearchField
      value={search}
      onChange={onUpdateSearch}
      hasNoAttemptsLeft={true}
      label="Название предмета"
      variant="outlined"
      sx={{ width: "50%", mt: 1 }}
    />

    <Stack direction="row" gap={1}>
      {Object.keys(SORT_TYPES_BY_TIER).map((sortType, index) => {
        const currentSortType = sortType as SORT_TYPES_BY_TIER;

        return (
          <Button
            key={index}
            sx={{ opacity: currentTier === sortType ? 0.5 : 1 }}
            onClick={() => onChangeTier(currentSortType)}
          >
            <MainButtonText variant="h5" whiteSpace="pre">
              {sortType === SORT_TYPES_BY_TIER.FIRST
                ? "Tier I"
                : sortType === SORT_TYPES_BY_TIER.SECOND
                  ? "Tier II"
                  : "Tier III"}
            </MainButtonText>
          </Button>
        );
      })}
    </Stack>

    <Stack direction="row" gap={1}>
      {Object.keys(SORT_TYPES_BY_UPGRADE).map((sortType, index) => {
        const currentSortType = sortType as SORT_TYPES_BY_UPGRADE;

        return (
          <Button
            key={index}
            sx={{ opacity: currentUpgradeTier === sortType ? 0.5 : 1 }}
            onClick={() => onChangeUpgradeTier(currentSortType)}
          >
            <MainButtonText variant="h5" whiteSpace="pre">
              {sortType === SORT_TYPES_BY_UPGRADE.FIRST
                ? "MK I"
                : sortType === SORT_TYPES_BY_UPGRADE.SECOND
                  ? "MK II"
                  : "MK III"}
            </MainButtonText>
          </Button>
        );
      })}
    </Stack>

    <Stack direction="row" gap={1}>
      {Object.keys(CLASSES).map((sortType, index) => {
        const currentSortType = sortType as CLASSES;

        return (
          <Button
            key={index}
            sx={{ opacity: currentClass === sortType ? 0.5 : 1 }}
            onClick={() => onChangeClass(currentSortType)}
          >
            <MainButtonText variant="h5">
              {sortType === CLASSES.MEDIC
                ? "MEDIC"
                : sortType === CLASSES.TANK
                  ? "TANK"
                  : "SNIPER"}
            </MainButtonText>
          </Button>
        );
      })}
    </Stack>
  </Stack>
);
