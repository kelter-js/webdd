import { ENEMIES } from "../../entities";
import { AI_CATEGORIES } from "../../entities/ai";

// Здесь будут хардкод объектов противников - все объекты и их объединения в массивах
// также здесь

export const FIRST_TIER_CREATURES = {
  [ENEMIES.SPIDER]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: "",
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
  },
};

export const FIRST_TIER_CREATURES_LIST = [ENEMIES.SPIDER];
export const SECOND_TIER_CREATURES_LIST = [];
export const THIRD_TIER_CREATURES_LIST = [];

export const ALL_CREATURES_LIST = [];
