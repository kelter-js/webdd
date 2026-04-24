import {
  FIRST_TIER_DUNGEONS_AMOUNT,
  SECOND_TIER_DUNGEONS_AMOUNT,
  THIRD_TIER_DUNGEONS_AMOUNT,
} from "../../constants";
import { DUNGEONS, ECONOMIC_TYPES } from "../../entities";
import { Icons } from "../../common";

export const getQuestInfo = (questType?: DUNGEONS) => {
  if (questType === DUNGEONS.CLOSE_PORTAL) {
    return { icon: <Icons.ClosePortalIcon />, title: "Закрытие портала" };
  }

  if (questType === DUNGEONS.CATCH_GOBLIN) {
    return { icon: <Icons.CatchGoblinIcon />, title: "Поимка гоблина" };
  }

  if (questType === DUNGEONS.FIND) {
    return { icon: <Icons.FindItemIcon />, title: "Поиск предмета" };
  }

  return { icon: <Icons.FindItemIcon />, title: "Поиск предмета" };
};

export const getEconomicInfo = (economicType: ECONOMIC_TYPES | null) => {
  if (economicType === ECONOMIC_TYPES.FISHING) {
    return "Рыболовство даёт вам ежедневный денежный прирост";
  }

  if (economicType === ECONOMIC_TYPES.ALCHEMISTRY) {
    return "Алхимия даёт вам ежедневную порцию зелий";
  }

  if (economicType === ECONOMIC_TYPES.WEAPONRY) {
    return "Оружейное дело даёт вам ежедневный бонус в виде брони или оружия";
  }

  return "";
};

export const getDungeonCounterByTier = (currentTier: number) => {
  if (currentTier === 1) {
    return FIRST_TIER_DUNGEONS_AMOUNT;
  }

  if (currentTier === 2) {
    return SECOND_TIER_DUNGEONS_AMOUNT;
  }

  return THIRD_TIER_DUNGEONS_AMOUNT;
};
