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

export const getRandomName = (characterName: string) => {
  const otherNames = DEFAULT_NAME_PRESETS.filter(
    (name) => name !== characterName,
  );

  const shuffled = otherNames.sort(() => Math.random() - 0.5);

  return [shuffled[0], shuffled[1]];
};
