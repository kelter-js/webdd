import { useMemo } from "react";
import {
  FIRST_TIER_CREATURES_LIST,
  SECOND_TIER_CREATURES_LIST,
  THIRD_TIER_CREATURES_LIST,
} from "../../../constants/creatures";
import { useGameState } from "../../../stores";

export const useGetEnemiesData = () => {
  const {
    // player: { playStatistics, currentTier },
  } = useGameState();

  // тут в зависимости от тира помещаем вычисления в useMemo - выбираем массив хардкод значений, дополняем описания и добавляем данных по кол-ву убитых - если 10 есть
  // то выводим данные и фулл изображение - нужно делать мок изображения, которые только силует показывают
};
