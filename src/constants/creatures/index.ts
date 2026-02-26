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
    baseModel: { hp: 15, maxHp: 15, minDmg: 1, maxDmg: 3, xp: 50 },
  },
  [ENEMIES.SPIDER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 25, maxHp: 25, minDmg: 2, maxDmg: 4, xp: 70 },
  },
  [ENEMIES.SPIDER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 35, maxHp: 35, minDmg: 3, maxDmg: 5, xp: 100 },
  },

  [ENEMIES.TORSO_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 40, maxHp: 40, minDmg: 3, maxDmg: 5, xp: 120 },
  },
  [ENEMIES.TORSO_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 55, maxHp: 55, minDmg: 4, maxDmg: 7, xp: 150 },
  },
  [ENEMIES.TORSO_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 70, maxHp: 70, minDmg: 5, maxDmg: 9, xp: 180 },
  },

  [ENEMIES.WATCHER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 75, maxHp: 75, minDmg: 5, maxDmg: 8, xp: 200 },
  },
  [ENEMIES.WATCHER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 100, maxHp: 100, minDmg: 6, maxDmg: 10, xp: 240 },
  },
  [ENEMIES.WATCHER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 130, maxHp: 130, minDmg: 8, maxDmg: 12, xp: 300 },
  },
  [ENEMIES.SPIRIT_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 110, maxHp: 110, minDmg: 6, maxDmg: 9, xp: 350 },
  },
  [ENEMIES.SPIRIT_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 140, maxHp: 140, minDmg: 8, maxDmg: 12, xp: 420 },
  },
  [ENEMIES.SPIRIT_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.DEFAULT,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 180, maxHp: 180, minDmg: 10, maxDmg: 15, xp: 500 },
  },
  [ENEMIES.BIRD_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 250, maxHp: 250, minDmg: 12, maxDmg: 18, xp: 800 },
  },
  [ENEMIES.BIRD_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 350, maxHp: 350, minDmg: 15, maxDmg: 22, xp: 1000 },
  },
  [ENEMIES.BIRD_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.MINIBOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 450, maxHp: 450, minDmg: 18, maxDmg: 28, xp: 1300 },
  },
  [ENEMIES.SIN_ICON_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.BOSS_TIER_1,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 750, maxHp: 750, minDmg: 20, maxDmg: 32, xp: 2500 },
  },

  [ENEMIES.SOLDIER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 80, maxHp: 80, minDmg: 7, maxDmg: 12, xp: 200 },
  },
  [ENEMIES.SOLDIER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 100, maxHp: 100, minDmg: 9, maxDmg: 15, xp: 250 },
  },
  [ENEMIES.SOLDIER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 130, maxHp: 130, minDmg: 11, maxDmg: 18, xp: 300 },
  },
  [ENEMIES.FIREFIGHTER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 150, maxHp: 150, minDmg: 10, maxDmg: 16, xp: 350 },
  },
  [ENEMIES.FIREFIGHTER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 180, maxHp: 180, minDmg: 12, maxDmg: 20, xp: 400 },
  },
  [ENEMIES.FIREFIGHTER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 220, maxHp: 220, minDmg: 15, maxDmg: 25, xp: 480 },
  },
  [ENEMIES.SNEAKER_TIER_1]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 280, maxHp: 280, minDmg: 13, maxDmg: 22, xp: 600 },
  },
  [ENEMIES.SNEAKER_TIER_2]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 350, maxHp: 350, minDmg: 17, maxDmg: 28, xp: 750 },
  },
  [ENEMIES.SNEAKER_TIER_3]: {
    // здесь айди типа aiPackage использовать для обозначения какой тип ai использовать в бою
    // aiPackage: AI_CATEGORIES.DEFAULT,

    // mock
    aiPackage: AI_CATEGORIES.TIER_2,
    pictureSrc: "",
    audioSrc: "",

    // другие данные по типу хп и прочего
    baseModel: { hp: 450, maxHp: 450, minDmg: 22, maxDmg: 35, xp: 900 },
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
  ENEMIES.BALLERINE_TIER_1,
  ENEMIES.BALLERINE_TIER_2,
];

export const THIRD_TIER_QUEST_MINIBOSS = ENEMIES.BALLERINE_TIER_3;

export const THIRD_TIER_BOSS = ENEMIES.MERGED_MASS_TIER_1;

export const STORY_BOSSES_LIST = [
  ENEMIES.SIN_ICON_TIER_1,
  ENEMIES.GENERAL_TIER_1,
  ENEMIES.MERGED_MASS_TIER_1,
];

export const ALL_CREATURES_LIST = [];

// Пожарник, человек в противогазе, человек с прикипевшим ПНВ, человек с вывернутыми ребрами наружу, со спины два костянных крыла, череп оскаленный, кожа натянута везде, всё в тело пробито гвоздями, в руках держит разбитый и поломанный автомат
// Балерина с длинными клинками и в фате, рыцарь с ореолом каменным, через щели шлема сочится кровь,

// каждая конечность заканчивается шипом,  тело максимально бледное, невысокое, на голове диадема из разноцветных перьев, вокруг тела праздничные ленты, на лице яркая губная помада

//минибоссы: птица с двумя клинками, профессор , человек - вместо лица просто сплошное пустое место, без глаз, бровей и губ, в руках две электрические дубинки и лабораторный халат,
// третий минибосс - сросшиеся актеры, посетители, певцы, с двумя деформированными длинными костяными копьями руками, ног вообще не видно, в массе перемешаны тела, лиц больше, чем должно быть,
// они в разных местах расположены, искажены болью, масками, разноцветными нарядами праздничными с кровопоттеками

// боссы - первый акт готов, нужно думать про оставшиеся два
// - максимально бледный цвет кожи, черное платье,  вскрытые сухожия, один greatsword костяной, в ней самой в животе и руках торчат
// проткнутые клинки, всё в красных разводах похожил на кровь, лицо скрыто за белой маской, лишь видно гримасу боли и грязные зубы
// второй -  генерал  приделавший себе чьи-то руки вместо ног, вокруг шеи ожерелье из пальцев, к лицу прикипел противогаз, одна рука длиннее другой,
// в груди большое кол-во пулевых отверстий.
