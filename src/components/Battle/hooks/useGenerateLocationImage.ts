import { useGameState } from "../../../stores/GameState/GameState";
// мок массива
// import {массивАссетовСПутями} from './'
import { getRandom } from "../../../utils";

export const useGenerateLocationImage = () => {
  // Здесь смотрим на тир и исходя из тира генерим изображение из массива выбирая рандомные
  // нужно расширить модель игрока,  храня в ней тир
  // там же в battle хранить индекс сгенеренного задница
  const {
    player: { battle },
  } = useGameState();

  if (battle) {
    // if (battle.index) {
    // return ARRAY[BATTLE.INDEX]
    // }
    // const newIndex = getRandom(0, ARRAY.length - 1);
    // setBackgroundIndex(newIndex);
    // return ARRAY[newIndex]
  }

  return "";
};
