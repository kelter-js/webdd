import { DUNGEONS } from "../../entities";
import quest from "../../assets/dungeon/quest.png";
import story from "../../assets/dungeon/story.png";

export const getDungeonDataByType = (type: DUNGEONS) => {
  if (type === DUNGEONS.CLOSE_PORTAL) {
    return {
      src: quest,
      title: "Закрытие портала",
      description: "Как же надоел этот портал, закрой его немедля!",
    };
  }

  if (type === DUNGEONS.CATCH_GOBLIN) {
    return {
      src: quest,
      title: "Поимка гоблина",
      description: "Как же надоел этот гоблин, поймай его немедля!",
    };
  }

  if (type === DUNGEONS.FIND) {
    return {
      src: quest,
      title: "Поиск предмета",
      description: "Любимая фамильная вещь пропала, найди ее !",
    };
  }

  return {
    src: story,
    title: "Сюжет",
    description: "Узнаем, что же ждёт дальше...",
  };
};
