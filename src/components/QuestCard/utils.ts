import { DUNGEONS } from "../../entities";
import portal from "../../assets/quests/portal.png";
import goblin from "../../assets/quests/goblin.png";
import find from "../../assets/quests/find.png";

export const getQuestDataByType = (type: DUNGEONS) => {
  if (type === DUNGEONS.CLOSE_PORTAL) {
    return {
      src: portal,
      title: "Закрытие портала",
      description: "Как же надоел этот портал, закрой его немедля!",
      reward: ["exp", "gold", "items"],
    };
  }

  if (type === DUNGEONS.CATCH_GOBLIN) {
    return {
      src: goblin,
      title: "Поимка гоблина",
      description: "Как же надоел этот гоблин, поймай его немедля!",
      reward: ["exp", "gold"],
    };
  }

  if (type === DUNGEONS.FIND) {
    return {
      src: find,
      title: "Поиск предмета",
      description: "Любимая фамильная вещь пропала, найди ее !",
      reward: ["exp", "gold", "items"],
    };
  }

  return {
    src: find,
    title: "Поиск предмета",
    description: "Любимая фамильная вещь пропала, найди ее !",
    reward: ["exp", "gold", "items"],
  };
};
