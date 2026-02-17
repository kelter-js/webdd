import { ENEMIES } from "../../entities";
import { AI_CATEGORIES } from "../../entities/ai";

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

export const FIRST_TIER_CREATURES = {
  [ENEMIES.SPIDER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 50, currentHp: 50, minDmg: 2, maxDmg: 4, xp: 100 },
  },
  [ENEMIES.SPIDER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 70, currentHp: 70, minDmg: 3, maxDmg: 6, xp: 115 },
  },
  [ENEMIES.SPIDER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 90, currentHp: 90, minDmg: 4, maxDmg: 8, xp: 130 },
  },

  [ENEMIES.TORSO_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 100, currentHp: 100, minDmg: 4, maxDmg: 8, xp: 150 },
  },
  [ENEMIES.TORSO_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 140, currentHp: 140, minDmg: 6, maxDmg: 10, xp: 170 },
  },
  [ENEMIES.TORSO_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 180, currentHp: 180, minDmg: 8, maxDmg: 12, xp: 200 },
  },

  [ENEMIES.WATCHER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
  },
  [ENEMIES.WATCHER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
  },
  [ENEMIES.WATCHER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
  },
  [ENEMIES.SPIRIT_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
  },
  [ENEMIES.SPIRIT_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
  },
  [ENEMIES.SPIRIT_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
  },
  [ENEMIES.BIRD_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
  },
  [ENEMIES.BIRD_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
  },
  [ENEMIES.BIRD_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
  },
  [ENEMIES.SIN_ICON_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.BOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: {},
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

export const FIRST_TIER_QUEST_MINIBOSS = ENEMIES.BIRD_TIER_3;

export const FIRST_TIER_BOSS = ENEMIES.SIN_ICON_TIER_1;

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

export const SECOND_TIER_QUEST_MINIBOSS = ENEMIES.INVENTOR_TIER_3;

export const SECOND_TIER_BOSS = ENEMIES.GENERAL_TIER_1;

export const THIRD_TIER_CREATURES_LIST = [];

export const THIRD_TIER_MINIBOSS_LIST = [
  ENEMIES.MERGED_MASS_TIER_1,
  ENEMIES.MERGED_MASS_TIER_2,
];

export const THIRD_TIER_QUEST_MINIBOSS = ENEMIES.MERGED_MASS_TIER_3;

export const STORY_BOSSES_LIST = [
  ENEMIES.SIN_ICON_TIER_1,
  ENEMIES.GENERAL_TIER_1,
];

export const ALL_CREATURES_LIST = [];

// Пожарник, человек в противогазе, человек с прикипевшим ПНВ, человек с вывернутыми ребрами наружу, со спины два костянных крыла, череп оскаленный, кожа натянута везде, всё в тело пробито гвоздями, в руках держит разбитый и поломанный автомат
// Балерина с длинными клинками и в фате, актер с содранным лицом и наточенной рукой костью копьем, рыцарь с ореолом каменным, через щели шлема сочится кровь,
//  многоликий с вросшими руками - одна нога длинне другой и вся в шипах

//минибоссы: птица с двумя клинками, профессор , человек - вместо лица просто сплошное пустое место, без глаз, бровей и губ, в руках две электрические дубинки и лабораторный халат,
// третий минибосс - сросшиеся актеры, посетители, певцы, с двумя деформированными длинными костяными копьями руками, ног вообще не видно, в массе перемешаны тела, лиц больше, чем должно быть,
// они в разных местах расположены, искажены болью, масками, разноцветными нарядами праздничными с кровопоттеками

// боссы - первый акт готов, нужно думать про оставшиеся два
//  третий -  танцовщица - максимально бледный цвет кожи,  вскрытые сухожия, два клинка из костей, в ней самой в животе и руках торчат
// проткнутые клинки, лицо скрыто за белой маской, лишь видно улыбку из грязных зубов
// второй -  генерал  приделавший себе чьи-то руки вместо ног, вокруг шеи ожерелье из пальцев, к лицу прикипел противогаз, одна рука длиннее другой,
// в груди большое кол-во пулевых отверстий.
