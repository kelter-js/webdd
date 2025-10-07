import { CatchGoblinIcon, ClosePortalIcon, FindItemIcon } from "../../common";

import { DUNGEONS } from "../../entities";

export const getQuestInfo = (questType?: DUNGEONS) => {
  if (questType === DUNGEONS.CLOSE_PORTAL) {
    return { icon: <ClosePortalIcon />, title: "Закрытие портала" };
  }

  if (questType === DUNGEONS.CATCH_GOBLIN) {
    return { icon: <CatchGoblinIcon />, title: "Поимка гоблина" };
  }

  if (questType === DUNGEONS.FIND) {
    return { icon: <FindItemIcon />, title: "Поиск предмета" };
  }

  return { icon: <FindItemIcon />, title: "Поиск предмета" };
};
