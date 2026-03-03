import { ENEMIES } from "../../entities";
import { AI_CATEGORIES } from "../../entities/ai";
import { ALMANAC_ENEMIES_GENERIC_TYPES } from "../../entities/enemies";

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
      maxHp: 15,
      minDmg: 1,
      maxDmg: 3,
      xp: 50,
      evasionChance: 5,
      type: ENEMIES.SPIDER_TIER_1,
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
      maxHp: 25,
      minDmg: 2,
      maxDmg: 4,
      xp: 70,
      evasionChance: 5,
      type: ENEMIES.SPIDER_TIER_2,
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
      maxHp: 35,
      minDmg: 3,
      maxDmg: 5,
      xp: 100,
      evasionChance: 5,
      type: ENEMIES.SPIDER_TIER_3,
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
      maxHp: 40,
      minDmg: 3,
      maxDmg: 5,
      xp: 120,
      evasionChance: 5,
      type: ENEMIES.TORSO_TIER_1,
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
      maxHp: 55,
      minDmg: 4,
      maxDmg: 7,
      xp: 150,
      evasionChance: 5,
      type: ENEMIES.TORSO_TIER_2,
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
      maxHp: 70,
      minDmg: 5,
      maxDmg: 9,
      xp: 180,
      evasionChance: 5,
      type: ENEMIES.TORSO_TIER_3,
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
      maxHp: 75,
      minDmg: 5,
      maxDmg: 8,
      xp: 200,
      evasionChance: 5,
      type: ENEMIES.WATCHER_TIER_1,
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
      maxHp: 100,
      minDmg: 6,
      maxDmg: 10,
      xp: 240,
      evasionChance: 5,
      type: ENEMIES.WATCHER_TIER_2,
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
      maxHp: 130,
      minDmg: 8,
      maxDmg: 12,
      xp: 300,
      evasionChance: 5,
      type: ENEMIES.WATCHER_TIER_3,
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
      maxHp: 110,
      minDmg: 6,
      maxDmg: 9,
      xp: 350,
      evasionChance: 5,
      type: ENEMIES.SPIRIT_TIER_1,
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
      maxHp: 140,
      minDmg: 8,
      maxDmg: 12,
      xp: 420,
      evasionChance: 5,
      type: ENEMIES.SPIRIT_TIER_2,
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
      maxHp: 180,
      minDmg: 10,
      maxDmg: 15,
      xp: 500,
      evasionChance: 5,
      type: ENEMIES.SPIRIT_TIER_3,
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
      maxHp: 250,
      minDmg: 12,
      maxDmg: 18,
      xp: 800,
      evasionChance: 5,
      type: ENEMIES.BIRD_TIER_1,
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
      maxHp: 350,
      minDmg: 15,
      maxDmg: 22,
      xp: 1000,
      evasionChance: 5,
      type: ENEMIES.BIRD_TIER_2,
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
      maxHp: 450,
      minDmg: 18,
      maxDmg: 28,
      xp: 1300,
      evasionChance: 5,
      type: ENEMIES.BIRD_TIER_3,
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
      maxHp: 750,
      minDmg: 20,
      maxDmg: 32,
      xp: 2500,
      evasionChance: 5,
      type: ENEMIES.SIN_ICON_TIER_1,
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
      maxHp: 80,
      minDmg: 7,
      maxDmg: 12,
      xp: 200,
      evasionChance: 10,
      type: ENEMIES.SOLDIER_TIER_1,
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
      maxHp: 100,
      minDmg: 9,
      maxDmg: 15,
      xp: 250,
      evasionChance: 10,
      type: ENEMIES.SOLDIER_TIER_2,
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
      maxHp: 130,
      minDmg: 11,
      maxDmg: 18,
      xp: 300,
      evasionChance: 10,
      type: ENEMIES.SOLDIER_TIER_3,
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
      maxHp: 150,
      minDmg: 10,
      maxDmg: 16,
      xp: 350,
      evasionChance: 10,
      type: ENEMIES.FIREFIGHTER_TIER_1,
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
      maxHp: 180,
      minDmg: 12,
      maxDmg: 20,
      xp: 400,
      evasionChance: 10,
      type: ENEMIES.FIREFIGHTER_TIER_2,
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
      maxHp: 220,
      minDmg: 15,
      maxDmg: 25,
      xp: 480,
      evasionChance: 10,
      type: ENEMIES.FIREFIGHTER_TIER_3,
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
      maxHp: 280,
      minDmg: 13,
      maxDmg: 22,
      xp: 600,
      evasionChance: 10,
      type: ENEMIES.SNEAKER_TIER_1,
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
      maxHp: 350,
      minDmg: 17,
      maxDmg: 28,
      xp: 750,
      evasionChance: 10,
      type: ENEMIES.SNEAKER_TIER_2,
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
      maxHp: 450,
      minDmg: 22,
      maxDmg: 35,
      xp: 900,
      evasionChance: 10,
      type: ENEMIES.SNEAKER_TIER_3,
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
      maxHp: 400,
      minDmg: 18,
      maxDmg: 28,
      xp: 900,
      evasionChance: 10,
      type: ENEMIES.LOST_TIER_1,
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
      maxHp: 500,
      minDmg: 22,
      maxDmg: 35,
      xp: 1100,
      evasionChance: 10,
      type: ENEMIES.LOST_TIER_2,
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
      maxHp: 650,
      minDmg: 28,
      maxDmg: 42,
      xp: 1350,
      evasionChance: 10,
      type: ENEMIES.LOST_TIER_3,
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
      maxHp: 650,
      minDmg: 25,
      maxDmg: 40,
      xp: 1500,
      evasionChance: 10,
      type: ENEMIES.INVENTOR_TIER_1,
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
      maxHp: 850,
      minDmg: 32,
      maxDmg: 50,
      xp: 1800,
      evasionChance: 10,
      type: ENEMIES.INVENTOR_TIER_2,
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
      maxHp: 1100,
      minDmg: 40,
      maxDmg: 65,
      xp: 2200,
      evasionChance: 10,
      type: ENEMIES.INVENTOR_TIER_3,
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
      maxHp: 1800,
      minDmg: 50,
      maxDmg: 80,
      xp: 4000,
      evasionChance: 10,
      type: ENEMIES.GENERAL_TIER_1,
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
      maxHp: 250,
      minDmg: 18,
      maxDmg: 28,
      xp: 500,
      evasionChance: 15,
      type: ENEMIES.ALL_SEEING_TIER_1,
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
      maxHp: 320,
      minDmg: 22,
      maxDmg: 35,
      xp: 650,
      evasionChance: 15,
      type: ENEMIES.ALL_SEEING_TIER_2,
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
      maxHp: 400,
      minDmg: 28,
      maxDmg: 42,
      xp: 800,
      evasionChance: 15,
      type: ENEMIES.ALL_SEEING_TIER_3,
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
      maxHp: 400,
      minDmg: 25,
      maxDmg: 45,
      xp: 850,
      evasionChance: 15,
      type: ENEMIES.KNIGHT_TIER_1,
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
      maxHp: 500,
      minDmg: 35,
      maxDmg: 55,
      xp: 1000,
      evasionChance: 15,
      type: ENEMIES.KNIGHT_TIER_2,
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
      maxHp: 650,
      minDmg: 45,
      maxDmg: 70,
      xp: 1200,
      evasionChance: 15,
      type: ENEMIES.KNIGHT_TIER_3,
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
      maxHp: 700,
      minDmg: 30,
      maxDmg: 50,
      xp: 1500,
      evasionChance: 15,
      type: ENEMIES.ACTRESS_TIER_1,
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
      maxHp: 900,
      minDmg: 40,
      maxDmg: 65,
      xp: 1800,
      evasionChance: 15,
      type: ENEMIES.ACTRESS_TIER_2,
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
      maxHp: 1200,
      minDmg: 55,
      maxDmg: 85,
      xp: 2200,
      evasionChance: 15,
      type: ENEMIES.ACTRESS_TIER_3,
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
      maxHp: 1000,
      minDmg: 45,
      maxDmg: 75,
      xp: 2500,
      evasionChance: 15,
      type: ENEMIES.SINGER_TIER_1,
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
      maxHp: 1300,
      minDmg: 60,
      maxDmg: 95,
      xp: 3000,
      evasionChance: 15,
      type: ENEMIES.SINGER_TIER_2,
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
      maxHp: 1700,
      minDmg: 75,
      maxDmg: 120,
      xp: 3600,
      evasionChance: 15,
      type: ENEMIES.SINGER_TIER_3,
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
      maxHp: 1800,
      minDmg: 60,
      maxDmg: 100,
      xp: 5000,
      evasionChance: 15,
      type: ENEMIES.BALLERINE_TIER_1,
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
      maxHp: 2400,
      minDmg: 80,
      maxDmg: 130,
      xp: 6500,
      evasionChance: 15,
      type: ENEMIES.BALLERINE_TIER_2,
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
      maxHp: 3200,
      minDmg: 110,
      maxDmg: 180,
      xp: 8000,
      evasionChance: 15,
      type: ENEMIES.BALLERINE_TIER_3,
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
      maxHp: 5000,
      minDmg: 130,
      maxDmg: 220,
      xp: 15000,
      evasionChance: 15,
      type: ENEMIES.MERGED_MASS_TIER_1,
      subType: null,
    },
  },
};

export const FIRST_TIER_CREATURES_LIST = [
  ENEMIES.SPIDER_TIER_1,
  ENEMIES.SPIDER_TIER_2,
  ENEMIES.SPIDER_TIER_3,

  ENEMIES.TORSO_TIER_1,
  ENEMIES.TORSO_TIER_2,
  ENEMIES.TORSO_TIER_3,

  ENEMIES.WATCHER_TIER_1,
  ENEMIES.WATCHER_TIER_2,
  ENEMIES.WATCHER_TIER_3,

  ENEMIES.SPIRIT_TIER_1,
  ENEMIES.SPIRIT_TIER_2,
  ENEMIES.SPIRIT_TIER_3,
];

export const FIRST_TIER_MINIBOSS_LIST = [
  ENEMIES.BIRD_TIER_1,
  ENEMIES.BIRD_TIER_2,
];

export const FIRST_TIER_QUEST_MINIBOSS = CREATURES[ENEMIES.BIRD_TIER_3];

export const FIRST_TIER_BOSS = CREATURES[ENEMIES.SIN_ICON_TIER_1];

export const SECOND_TIER_CREATURES_LIST = [
  ENEMIES.SOLDIER_TIER_1,
  ENEMIES.SOLDIER_TIER_2,
  ENEMIES.SOLDIER_TIER_3,

  ENEMIES.FIREFIGHTER_TIER_1,
  ENEMIES.FIREFIGHTER_TIER_2,
  ENEMIES.FIREFIGHTER_TIER_3,

  ENEMIES.SNEAKER_TIER_1,
  ENEMIES.SNEAKER_TIER_2,
  ENEMIES.SNEAKER_TIER_3,

  ENEMIES.LOST_TIER_1,
  ENEMIES.LOST_TIER_2,
  ENEMIES.LOST_TIER_3,
];

export const SECOND_TIER_MINIBOSS_LIST = [
  ENEMIES.INVENTOR_TIER_1,
  ENEMIES.INVENTOR_TIER_2,
];

export const SECOND_TIER_QUEST_MINIBOSS = CREATURES[ENEMIES.INVENTOR_TIER_3];

// MOCK
export const SECOND_TIER_BOSS = CREATURES[ENEMIES.GENERAL_TIER_1];

export const THIRD_TIER_CREATURES_LIST = [
  ENEMIES.ALL_SEEING_TIER_1,
  ENEMIES.ALL_SEEING_TIER_2,
  ENEMIES.ALL_SEEING_TIER_3,

  ENEMIES.KNIGHT_TIER_1,
  ENEMIES.KNIGHT_TIER_2,
  ENEMIES.KNIGHT_TIER_3,

  ENEMIES.ACTRESS_TIER_1,
  ENEMIES.ACTRESS_TIER_2,
  ENEMIES.ACTRESS_TIER_3,

  ENEMIES.SINGER_TIER_1,
  ENEMIES.SINGER_TIER_2,
  ENEMIES.SINGER_TIER_3,
];

export const THIRD_TIER_MINIBOSS_LIST = [
  ENEMIES.BALLERINE_TIER_1,
  ENEMIES.BALLERINE_TIER_2,
];

export const THIRD_TIER_QUEST_MINIBOSS = CREATURES[ENEMIES.BALLERINE_TIER_3];

export const THIRD_TIER_BOSS = CREATURES[ENEMIES.MERGED_MASS_TIER_1];

export const STORY_BOSSES_LIST = [
  ENEMIES.SIN_ICON_TIER_1,
  ENEMIES.GENERAL_TIER_1,
  ENEMIES.MERGED_MASS_TIER_1,
];

export const ALL_CREATURES_LIST = [];
