import { getRandom } from "./getRandom";

const DEFAULT_NAME_PRESETS = [
  "Александр",
  "Лукас",
  "Владислав",
  "Маттео",
  "Станислав",
  "Оливер",
  "Богдан",
  "Лео",
  "Мирослав",
  "Генри",
  "Ярослав",
  "Луи",
  "Казимир",
  "Ноа",
  "Радомир",
  "Финн",
  "Святослав",
  "Элиас",
  "Зоран",
  "Артур",
  "Борис",
  "Габриэль",
  "Вячеслав",
  "Себастьян",
  "Мечислав",
  "Тео",
  "Всеволод",
  "Лука",
  "Мартин",
  "Хьюго",
];

export const getRandomName = () => {
  const randomIndex = getRandom(0, DEFAULT_NAME_PRESETS.length - 1);
  return DEFAULT_NAME_PRESETS[randomIndex];
};
