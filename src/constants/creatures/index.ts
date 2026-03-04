import { ENEMIES } from "../../entities";
import { AI_CATEGORIES } from "../../entities/ai";
import { ALMANAC_ENEMIES_GENERIC_TYPES } from "../../entities/enemies";

import spider from "../../assets/enemies/first_tier/spider.png";
import torso from "../../assets/enemies/first_tier/torso.png";
import watcher from "../../assets/enemies/first_tier/watcher.png";
import spirit from "../../assets/enemies/first_tier/spirit.png";
import bird from "../../assets/enemies/first_tier/bird.png";
import sinIcon from "../../assets/enemies/first_tier/sin-icon.png";
import soldier from "../../assets/enemies/second_tier/soldier.png";
import firefighter from "../../assets/enemies/second_tier/firefighter.png";

// Здесь будут хардкод объектов противников - все объекты и их объединения в массивах
// также здесь

// Поступаем также как с предметами - дублируем модели для улучшенных противников - есть overAllTier, а есть просто tier

// у 3 тира существ особая логика атаки будет - вешают доты
// у 2 тира и 3 тира локаций у существ появляется шанс уклониться
// у 3 тира локаций существ есть шанс атаковать дважды

// 1 минибосс накладывает минус броню
// 2 минибосс и минус броня и отравление на всех на весь бой
// 3 минибосс и минус броня и отравление ожог и запрет на использование способностей

// 1 босс - минус броня и повышенный шанс промаха
// 2 босс накладывает эффект требующий перезарядки после каждого выстрела, фокусит хила
// 3 босс режет макс хп на 15%, увеличивает шанс промаха по себе, рандомно вешает на всех бомбы, которые
// взрываются через несколько ходов взрываются и отнимают ход у персонажа на котором была бомба

export const CREATURE_TO_IMG_MAP = {
  [ENEMIES.SPIDER_TIER_1]: spider,
  [ENEMIES.SPIDER_TIER_2]: spider,
  [ENEMIES.SPIDER_TIER_3]: spider,

  [ENEMIES.TORSO_TIER_1]: torso,
  [ENEMIES.TORSO_TIER_2]: torso,
  [ENEMIES.TORSO_TIER_3]: torso,

  [ENEMIES.WATCHER_TIER_1]: watcher,
  [ENEMIES.WATCHER_TIER_2]: watcher,
  [ENEMIES.WATCHER_TIER_3]: watcher,

  [ENEMIES.SPIRIT_TIER_1]: spirit,
  [ENEMIES.SPIRIT_TIER_2]: spirit,
  [ENEMIES.SPIRIT_TIER_3]: spirit,

  [ENEMIES.BIRD_TIER_1]: bird,
  [ENEMIES.BIRD_TIER_2]: bird,
  [ENEMIES.BIRD_TIER_3]: bird,

  [ENEMIES.SIN_ICON_TIER_1]: sinIcon,

  [ENEMIES.SOLDIER_TIER_1]: soldier,
  [ENEMIES.SOLDIER_TIER_2]: soldier,
  [ENEMIES.SOLDIER_TIER_3]: soldier,

  [ENEMIES.FIREFIGHTER_TIER_1]: firefighter,
  [ENEMIES.FIREFIGHTER_TIER_2]: firefighter,
  [ENEMIES.FIREFIGHTER_TIER_3]: firefighter,
};

export const CREATURES = {
  [ENEMIES.SPIDER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 15,
      maxHP: 15,
      minDmg: 1,
      maxDmg: 3,
      exp: 50,
      evasionChance: 5,
      type: ENEMIES.SPIDER_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SPIDER,
    },
  },
  [ENEMIES.SPIDER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 25,
      maxHP: 25,
      minDmg: 2,
      maxDmg: 4,
      exp: 70,
      evasionChance: 5,
      type: ENEMIES.SPIDER_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SPIDER,
    },
  },
  [ENEMIES.SPIDER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 35,
      maxHP: 35,
      minDmg: 3,
      maxDmg: 5,
      exp: 100,
      evasionChance: 5,
      type: ENEMIES.SPIDER_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SPIDER,
    },
  },

  [ENEMIES.TORSO_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 40,
      maxHP: 40,
      minDmg: 3,
      maxDmg: 5,
      exp: 120,
      evasionChance: 5,
      type: ENEMIES.TORSO_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.TORSO,
    },
  },
  [ENEMIES.TORSO_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 55,
      maxHP: 55,
      minDmg: 4,
      maxDmg: 7,
      exp: 150,
      evasionChance: 5,
      type: ENEMIES.TORSO_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.TORSO,
    },
  },
  [ENEMIES.TORSO_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 70,
      maxHP: 70,
      minDmg: 5,
      maxDmg: 9,
      exp: 180,
      evasionChance: 5,
      type: ENEMIES.TORSO_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.TORSO,
    },
  },

  [ENEMIES.WATCHER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 75,
      maxHP: 75,
      minDmg: 5,
      maxDmg: 8,
      exp: 200,
      evasionChance: 5,
      type: ENEMIES.WATCHER_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.WATCHER,
    },
  },
  [ENEMIES.WATCHER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 100,
      maxHP: 100,
      minDmg: 6,
      maxDmg: 10,
      exp: 240,
      evasionChance: 5,
      type: ENEMIES.WATCHER_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.WATCHER,
    },
  },
  [ENEMIES.WATCHER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 130,
      maxHP: 130,
      minDmg: 8,
      maxDmg: 12,
      exp: 300,
      evasionChance: 5,
      type: ENEMIES.WATCHER_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.WATCHER,
    },
  },

  [ENEMIES.SPIRIT_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 110,
      maxHP: 110,
      minDmg: 6,
      maxDmg: 9,
      exp: 350,
      evasionChance: 5,
      type: ENEMIES.SPIRIT_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SPIRIT,
    },
  },
  [ENEMIES.SPIRIT_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 140,
      maxHP: 140,
      minDmg: 8,
      maxDmg: 12,
      exp: 420,
      evasionChance: 5,
      type: ENEMIES.SPIRIT_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SPIRIT,
    },
  },
  [ENEMIES.SPIRIT_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 180,
      maxHP: 180,
      minDmg: 10,
      maxDmg: 15,
      exp: 500,
      evasionChance: 5,
      type: ENEMIES.SPIRIT_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SPIRIT,
    },
  },

  [ENEMIES.BIRD_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 250,
      maxHP: 250,
      minDmg: 12,
      maxDmg: 18,
      exp: 800,
      evasionChance: 5,
      type: ENEMIES.BIRD_TIER_1,
      isEnhanced: true,
      subType: null,
    },
  },
  [ENEMIES.BIRD_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 350,
      maxHP: 350,
      minDmg: 15,
      maxDmg: 22,
      exp: 1000,
      evasionChance: 5,
      type: ENEMIES.BIRD_TIER_2,
      isEnhanced: true,
      subType: null,
    },
  },
  [ENEMIES.BIRD_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 450,
      maxHP: 450,
      minDmg: 18,
      maxDmg: 28,
      exp: 1300,
      evasionChance: 5,
      type: ENEMIES.BIRD_TIER_3,
      isEnhanced: true,
      subType: null,
    },
  },

  [ENEMIES.SIN_ICON_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.BOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 750,
      maxHP: 750,
      minDmg: 20,
      maxDmg: 32,
      exp: 2500,
      evasionChance: 5,
      type: ENEMIES.SIN_ICON_TIER_1,
      isEnhanced: true,
      subType: null,
    },
  },

  [ENEMIES.SOLDIER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 80,
      maxHP: 80,
      minDmg: 7,
      maxDmg: 12,
      exp: 200,
      evasionChance: 10,
      type: ENEMIES.SOLDIER_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SOLDIER,
    },
  },
  [ENEMIES.SOLDIER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 100,
      maxHP: 100,
      minDmg: 9,
      maxDmg: 15,
      exp: 250,
      evasionChance: 10,
      type: ENEMIES.SOLDIER_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SOLDIER,
    },
  },
  [ENEMIES.SOLDIER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 130,
      maxHP: 130,
      minDmg: 11,
      maxDmg: 18,
      exp: 300,
      evasionChance: 10,
      type: ENEMIES.SOLDIER_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SOLDIER,
    },
  },

  [ENEMIES.FIREFIGHTER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 150,
      maxHP: 150,
      minDmg: 10,
      maxDmg: 16,
      exp: 350,
      evasionChance: 10,
      type: ENEMIES.FIREFIGHTER_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.FIREFIGHTER,
    },
  },
  [ENEMIES.FIREFIGHTER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 180,
      maxHP: 180,
      minDmg: 12,
      maxDmg: 20,
      exp: 400,
      evasionChance: 10,
      type: ENEMIES.FIREFIGHTER_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.FIREFIGHTER,
    },
  },
  [ENEMIES.FIREFIGHTER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 220,
      maxHP: 220,
      minDmg: 15,
      maxDmg: 25,
      exp: 480,
      evasionChance: 10,
      type: ENEMIES.FIREFIGHTER_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.FIREFIGHTER,
    },
  },
  [ENEMIES.SNEAKER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 280,
      maxHP: 280,
      minDmg: 13,
      maxDmg: 22,
      exp: 600,
      evasionChance: 10,
      type: ENEMIES.SNEAKER_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SNEAKER,
    },
  },
  [ENEMIES.SNEAKER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 350,
      maxHP: 350,
      minDmg: 17,
      maxDmg: 28,
      exp: 750,
      evasionChance: 10,
      type: ENEMIES.SNEAKER_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SNEAKER,
    },
  },
  [ENEMIES.SNEAKER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 450,
      maxHP: 450,
      minDmg: 22,
      maxDmg: 35,
      exp: 900,
      evasionChance: 10,
      type: ENEMIES.SNEAKER_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SNEAKER,
    },
  },

  [ENEMIES.LOST_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 400,
      maxHP: 400,
      minDmg: 18,
      maxDmg: 28,
      exp: 900,
      evasionChance: 10,
      type: ENEMIES.LOST_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.LOST,
    },
  },

  [ENEMIES.LOST_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 500,
      maxHP: 500,
      minDmg: 22,
      maxDmg: 35,
      exp: 1100,
      evasionChance: 10,
      type: ENEMIES.LOST_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.LOST,
    },
  },

  [ENEMIES.LOST_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 650,
      maxHP: 650,
      minDmg: 28,
      maxDmg: 42,
      exp: 1350,
      evasionChance: 10,
      type: ENEMIES.LOST_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.LOST,
    },
  },

  [ENEMIES.INVENTOR_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 650,
      maxHP: 650,
      minDmg: 25,
      maxDmg: 40,
      exp: 1500,
      evasionChance: 10,
      type: ENEMIES.INVENTOR_TIER_1,
      isEnhanced: true,
      subType: null,
    },
  },

  [ENEMIES.INVENTOR_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 850,
      maxHP: 850,
      minDmg: 32,
      maxDmg: 50,
      exp: 1800,
      evasionChance: 10,
      type: ENEMIES.INVENTOR_TIER_2,
      isEnhanced: true,
      subType: null,
    },
  },

  [ENEMIES.INVENTOR_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 1100,
      maxHP: 1100,
      minDmg: 40,
      maxDmg: 65,
      exp: 2200,
      evasionChance: 10,
      type: ENEMIES.INVENTOR_TIER_3,
      isEnhanced: true,
      subType: null,
    },
  },

  [ENEMIES.GENERAL_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.BOSS_TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 1800,
      maxHP: 1800,
      minDmg: 50,
      maxDmg: 80,
      exp: 4000,
      evasionChance: 10,
      type: ENEMIES.GENERAL_TIER_1,
      isEnhanced: true,
      subType: null,
    },
  },

  [ENEMIES.ALL_SEEING_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 250,
      maxHP: 250,
      minDmg: 18,
      maxDmg: 28,
      exp: 500,
      evasionChance: 15,
      type: ENEMIES.ALL_SEEING_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.ALL_SEEING,
    },
  },
  [ENEMIES.ALL_SEEING_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 320,
      maxHP: 320,
      minDmg: 22,
      maxDmg: 35,
      exp: 650,
      evasionChance: 15,
      type: ENEMIES.ALL_SEEING_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.ALL_SEEING,
    },
  },
  [ENEMIES.ALL_SEEING_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 400,
      maxHP: 400,
      minDmg: 28,
      maxDmg: 42,
      exp: 800,
      evasionChance: 15,
      type: ENEMIES.ALL_SEEING_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.ALL_SEEING,
    },
  },
  [ENEMIES.KNIGHT_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 400,
      maxHP: 400,
      minDmg: 25,
      maxDmg: 45,
      exp: 850,
      evasionChance: 15,
      type: ENEMIES.KNIGHT_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.KNIGHT,
    },
  },
  [ENEMIES.KNIGHT_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 500,
      maxHP: 500,
      minDmg: 35,
      maxDmg: 55,
      exp: 1000,
      evasionChance: 15,
      type: ENEMIES.KNIGHT_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.KNIGHT,
    },
  },
  [ENEMIES.KNIGHT_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 650,
      maxHP: 650,
      minDmg: 45,
      maxDmg: 70,
      exp: 1200,
      evasionChance: 15,
      type: ENEMIES.KNIGHT_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.KNIGHT,
    },
  },
  [ENEMIES.ACTRESS_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 700,
      maxHP: 700,
      minDmg: 30,
      maxDmg: 50,
      exp: 1500,
      evasionChance: 15,
      type: ENEMIES.ACTRESS_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.ACTRESS,
    },
  },
  [ENEMIES.ACTRESS_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 900,
      maxHP: 900,
      minDmg: 40,
      maxDmg: 65,
      exp: 1800,
      evasionChance: 15,
      type: ENEMIES.ACTRESS_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.ACTRESS,
    },
  },
  [ENEMIES.ACTRESS_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 1200,
      maxHP: 1200,
      minDmg: 55,
      maxDmg: 85,
      exp: 2200,
      evasionChance: 15,
      type: ENEMIES.ACTRESS_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.ACTRESS,
    },
  },
  [ENEMIES.SINGER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 1000,
      maxHP: 1000,
      minDmg: 45,
      maxDmg: 75,
      exp: 2500,
      evasionChance: 15,
      type: ENEMIES.SINGER_TIER_1,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SINGER,
    },
  },
  [ENEMIES.SINGER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 1300,
      maxHP: 1300,
      minDmg: 60,
      maxDmg: 95,
      exp: 3000,
      evasionChance: 15,
      type: ENEMIES.SINGER_TIER_2,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SINGER,
    },
  },
  [ENEMIES.SINGER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 1700,
      maxHP: 1700,
      minDmg: 75,
      maxDmg: 120,
      exp: 3600,
      evasionChance: 15,
      type: ENEMIES.SINGER_TIER_3,
      isEnhanced: false,
      subType: ALMANAC_ENEMIES_GENERIC_TYPES.SINGER,
    },
  },
  [ENEMIES.BALLERINE_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 1800,
      maxHP: 1800,
      minDmg: 60,
      maxDmg: 100,
      exp: 5000,
      evasionChance: 15,
      type: ENEMIES.BALLERINE_TIER_1,
      isEnhanced: true,
      subType: null,
    },
  },
  [ENEMIES.BALLERINE_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 2400,
      maxHP: 2400,
      minDmg: 80,
      maxDmg: 130,
      exp: 6500,
      evasionChance: 15,
      type: ENEMIES.BALLERINE_TIER_2,
      isEnhanced: true,
      subType: null,
    },
  },
  [ENEMIES.BALLERINE_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 3200,
      maxHP: 3200,
      minDmg: 110,
      maxDmg: 180,
      exp: 8000,
      evasionChance: 15,
      type: ENEMIES.BALLERINE_TIER_3,
      isEnhanced: true,
      subType: null,
    },
  },
  [ENEMIES.MERGED_MASS_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.BOSS_TIER_3,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {
      hp: 5000,
      maxHP: 5000,
      minDmg: 130,
      maxDmg: 220,
      exp: 15000,
      evasionChance: 15,
      type: ENEMIES.MERGED_MASS_TIER_1,
      isEnhanced: true,
      subType: null,
    },
  },
};

export const FIRST_TIER_CREATURES_LIST = [
  CREATURES[ENEMIES.SPIDER_TIER_1],
  CREATURES[ENEMIES.SPIDER_TIER_2],
  CREATURES[ENEMIES.SPIDER_TIER_3],

  CREATURES[ENEMIES.TORSO_TIER_1],
  CREATURES[ENEMIES.TORSO_TIER_2],
  CREATURES[ENEMIES.TORSO_TIER_3],

  CREATURES[ENEMIES.WATCHER_TIER_1],
  CREATURES[ENEMIES.WATCHER_TIER_2],
  CREATURES[ENEMIES.WATCHER_TIER_3],

  CREATURES[ENEMIES.SPIRIT_TIER_1],
  CREATURES[ENEMIES.SPIRIT_TIER_2],
  CREATURES[ENEMIES.SPIRIT_TIER_3],
];

export const FIRST_TIER_MINIBOSS_LIST = [
  CREATURES[ENEMIES.BIRD_TIER_1],
  CREATURES[ENEMIES.BIRD_TIER_2],
];

export const FIRST_TIER_QUEST_MINIBOSS = CREATURES[ENEMIES.BIRD_TIER_3];

export const FIRST_TIER_BOSS = CREATURES[ENEMIES.SIN_ICON_TIER_1];

export const SECOND_TIER_CREATURES_LIST = [
  CREATURES[ENEMIES.SOLDIER_TIER_1],
  CREATURES[ENEMIES.SOLDIER_TIER_2],
  CREATURES[ENEMIES.SOLDIER_TIER_3],

  CREATURES[ENEMIES.FIREFIGHTER_TIER_1],
  CREATURES[ENEMIES.FIREFIGHTER_TIER_2],
  CREATURES[ENEMIES.FIREFIGHTER_TIER_3],

  CREATURES[ENEMIES.SNEAKER_TIER_1],
  CREATURES[ENEMIES.SNEAKER_TIER_2],
  CREATURES[ENEMIES.SNEAKER_TIER_3],

  CREATURES[ENEMIES.LOST_TIER_1],
  CREATURES[ENEMIES.LOST_TIER_2],
  CREATURES[ENEMIES.LOST_TIER_3],
];

export const SECOND_TIER_MINIBOSS_LIST = [
  CREATURES[ENEMIES.INVENTOR_TIER_1],
  CREATURES[ENEMIES.INVENTOR_TIER_2],
];

export const SECOND_TIER_QUEST_MINIBOSS = CREATURES[ENEMIES.INVENTOR_TIER_3];

// MOCK
export const SECOND_TIER_BOSS = CREATURES[ENEMIES.GENERAL_TIER_1];

export const THIRD_TIER_CREATURES_LIST = [
  CREATURES[ENEMIES.ALL_SEEING_TIER_1],
  CREATURES[ENEMIES.ALL_SEEING_TIER_2],
  CREATURES[ENEMIES.ALL_SEEING_TIER_3],

  CREATURES[ENEMIES.KNIGHT_TIER_1],
  CREATURES[ENEMIES.KNIGHT_TIER_2],
  CREATURES[ENEMIES.KNIGHT_TIER_3],

  CREATURES[ENEMIES.ACTRESS_TIER_1],
  CREATURES[ENEMIES.ACTRESS_TIER_2],
  CREATURES[ENEMIES.ACTRESS_TIER_3],

  CREATURES[ENEMIES.SINGER_TIER_1],
  CREATURES[ENEMIES.SINGER_TIER_2],
  CREATURES[ENEMIES.SINGER_TIER_3],
];

export const THIRD_TIER_MINIBOSS_LIST = [
  CREATURES[ENEMIES.BALLERINE_TIER_1],
  CREATURES[ENEMIES.BALLERINE_TIER_2],
];

export const THIRD_TIER_QUEST_MINIBOSS = CREATURES[ENEMIES.BALLERINE_TIER_3];

export const THIRD_TIER_BOSS = CREATURES[ENEMIES.MERGED_MASS_TIER_1];

export const STORY_BOSSES_LIST = [
  ENEMIES.SIN_ICON_TIER_1,
  ENEMIES.GENERAL_TIER_1,
  ENEMIES.MERGED_MASS_TIER_1,
];

export const ALL_CREATURES_LIST = [];
