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
import sneaker from "../../assets/enemies/second_tier/sneaker.png";
import lost from "../../assets/enemies/second_tier/lost_one.png";
import inventor from "../../assets/enemies/second_tier/inventor.png";
import general from "../../assets/enemies/second_tier/general.png";
import allSeeing from "../../assets/enemies/third_tier/all_seeing.png";
import knight from "../../assets/enemies/third_tier/knight.png";
import actress from "../../assets/enemies/third_tier/actress.png";
import singer from "../../assets/enemies/third_tier/singer.png";
import ballerine from "../../assets/enemies/third_tier/ballerina_boss.png";
import mergedMass from "../../assets/enemies/third_tier/mergemass.png";
import { Creature } from "../../types/gameState";
import { getRandom } from "../../utils";

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

  [ENEMIES.SNEAKER_TIER_1]: sneaker,
  [ENEMIES.SNEAKER_TIER_2]: sneaker,
  [ENEMIES.SNEAKER_TIER_3]: sneaker,

  [ENEMIES.LOST_TIER_1]: lost,
  [ENEMIES.LOST_TIER_2]: lost,
  [ENEMIES.LOST_TIER_3]: lost,

  [ENEMIES.INVENTOR_TIER_1]: inventor,
  [ENEMIES.INVENTOR_TIER_2]: inventor,
  [ENEMIES.INVENTOR_TIER_3]: inventor,

  [ENEMIES.GENERAL_TIER_1]: general,

  [ENEMIES.ALL_SEEING_TIER_1]: allSeeing,
  [ENEMIES.ALL_SEEING_TIER_2]: allSeeing,
  [ENEMIES.ALL_SEEING_TIER_3]: allSeeing,

  [ENEMIES.KNIGHT_TIER_1]: knight,
  [ENEMIES.KNIGHT_TIER_2]: knight,
  [ENEMIES.KNIGHT_TIER_3]: knight,

  [ENEMIES.ACTRESS_TIER_1]: actress,
  [ENEMIES.ACTRESS_TIER_2]: actress,
  [ENEMIES.ACTRESS_TIER_3]: actress,

  [ENEMIES.SINGER_TIER_1]: singer,
  [ENEMIES.SINGER_TIER_2]: singer,
  [ENEMIES.SINGER_TIER_3]: singer,

  [ENEMIES.BALLERINE_TIER_1]: ballerine,
  [ENEMIES.BALLERINE_TIER_2]: ballerine,
  [ENEMIES.BALLERINE_TIER_3]: ballerine,

  [ENEMIES.MERGED_MASS_TIER_1]: mergedMass,
};

const TEMPLATE_TARGET = "target";
const TEMPLATE_DAMAGE = "damage";

const SPIDER_MESSAGES = [
  `Паук наносит ${TEMPLATE_DAMAGE} урона ${TEMPLATE_TARGET}, нервно перебирая передними конечностями.`,
  `${TEMPLATE_TARGET} ощущает как бронепластины сжимаются под хелицерами Паука, причиняя ${TEMPLATE_DAMAGE} урона`,
  `Молниеносный удар передними лапами Паука наносит ${TEMPLATE_DAMAGE} урона, ${TEMPLATE_TARGET} сгибается пополам, но всё ещё держится, череп Паука зловеще стучит зубами.`,
];
const TORSO_MESSAGES = [
  `Торс замахивается топором и наносит удар. Скользящее попадание наносит ${TEMPLATE_DAMAGE}, ${TEMPLATE_TARGET} хватается за рану. Торс чистит топор о свою же одежду.`,
  `Торс в прыжке, держась за топор обеими руками наносит страшное попадание по ${TEMPLATE_TARGET}, нанося ${TEMPLATE_DAMAGE}, это будет долго заживать.`,
  `Размахивая топором вокруг себя, Торс выпускает топор в направлении ${TEMPLATE_TARGET} и попадает, причиняя ${TEMPLATE_DAMAGE} урона, затем резким движением вытаскивая топор из тела.`,
];
const WATCHER_MESSAGES = [
  `Наблюдатель коротким движением руки вонзает нож в ${TEMPLATE_TARGET}, причиняя ${TEMPLATE_DAMAGE}, вы готовы поклясться что улыбка на его лице стала шире`,
  `Выпадая телом вперед и держа нож обеими руками Наблюдатель наносит ${TEMPLATE_DAMAGE} ${TEMPLATE_TARGET}, отпрыгивая назад`,
  `Проводя тупой стороной ножа у горла и тыкая пальцем в ${TEMPLATE_TARGET}, Наблюдатель смертоносную атаку в ${TEMPLATE_DAMAGE}, рану придётся зашивать.`,
];
const SPIRIT_MESSAGES = [
  `Дух обрушивает целую серию тяжёлых ударов цепью, нанося ${TEMPLATE_DAMAGE} по ${TEMPLATE_TARGET}, оглашая пространство заливистым смехом`,
  `Обматывает цепь вокруг шеи ${TEMPLATE_TARGET}, резким движением причиняя ${TEMPLATE_DAMAGE}, выглядит болезненно.`,
  `Дух мечется из стороны в сторону, раскручивая цепь, наконец резко нанося точечный удар в ${TEMPLATE_TARGET}, причиняя ${TEMPLATE_DAMAGE} урона`,
];
const BIRD_MESSAGES = [
  `Птица Смерти наотмашь бьёт крылом по ${TEMPLATE_TARGET} карая на ${TEMPLATE_DAMAGE}, вы подозреваете наличие внутренних кровотечений.`,
  `Птица Смерти взмывает вверх и пикирует на ${TEMPLATE_TARGET}, нанося ${TEMPLATE_DAMAGE}.`,
  `Птица Смерти прицельно клюёт ${TEMPLATE_TARGET} причиняя немыслимые страдания в размере ${TEMPLATE_DAMAGE} урона`,
];
const SIN_ICON_MESSAGES = [
  `Икона Грехопадения выпускает шипы в ${TEMPLATE_TARGET}, причиняя ${TEMPLATE_DAMAGE}, вы с трудом извлекаете их из себя`,
  `${TEMPLATE_TARGET} получает ужасную рваную рану в груди в размере ${TEMPLATE_DAMAGE} урона от руки Иконы Грехопадения`,
  `Икона Грехопадения хватает ${TEMPLATE_TARGET} и пытается задушить, но в последний момент вырываетесь, получив ${TEMPLATE_DAMAGE} урона`,
];
const SOLDIER_MESSAGES = [
  `Солдат попаравляет закипевшее ПНЦ, ощутив боль он наносит ногтями удар в шею ${TEMPLATE_TARGET}, ощутимо нанося ${TEMPLATE_DAMAGE}`,
  `${TEMPLATE_DAMAGE} урона получает ${TEMPLATE_TARGET} от сильного удара в печень за авторством Солдата`,
  `Солдат взгрызается в руку ${TEMPLATE_TARGET} почти до самых сухожилий, вы вырываетесь, ощущая ${TEMPLATE_DAMAGE}, проверяя можете ли шевелить пальцами`,
];

const FIREFIGHTER_MESSAGES = [
  `Пожарник бьёт с разворота топором в пластины ${TEMPLATE_TARGET} нанося заброневую травму в размере ${TEMPLATE_DAMAGE} урона`,
  `Осуществляя обманное движение, Пожарник бьёт рукояткой в зубы ${TEMPLATE_TARGET}, приправляя ударом кулака, нанося ${TEMPLATE_DAMAGE} урона`,
  `Серия несколько ударов обрушивается на ${TEMPLATE_TARGET} ввиде ${TEMPLATE_DAMAGE} урона, это явно веселит пожарника, он делает неприличный жест в вашу сторону`,
];
const SNEAKER_MESSAGES = [
  `Скрытень покидает поле зрения, после чего набрасывается неожиданно на ${TEMPLATE_TARGET}, серия ударов отнимает ${TEMPLATE_DAMAGE} жизни`,
  `Точно брошенный нож вонзается в ${TEMPLATE_TARGET}, нанося тому ${TEMPLATE_DAMAGE} урона, Скрытень исполняет незамысловатый и странный танец радости`,
  `${TEMPLATE_TARGET} ощущает на себе ${TEMPLATE_DAMAGE} урона вследствие серии точечных ударов между бронепластин от Скрытня, он плюёт в вас.`,
];
const LOST_MESSAGES = [
  `Потерянный пытается произвести серию выстрелов, но понимает что оружие бесполезно, обрушивая сильный и тупой удар прикладом по голове ${TEMPLATE_TARGET}, причиняя тому ${TEMPLATE_DAMAGE} урона`,
  `Потерянный снаряжает последний завалявшийся патрон в карман в оружие, делая прицельный выстрел в ${TEMPLATE_TARGET}, нанося ${TEMPLATE_DAMAGE} урона, ввиду отсутствия рукоятки, такая стрельба ему явно даётся с трудом`,
  `Подрываясь вперед Потерянный наносит удар головой ${TEMPLATE_TARGET} нанося ${TEMPLATE_DAMAGE} урона, он беззвучно смеется`,
];
const INVENTOR_MESSAGES = [
  `Изобратетель бьёт электрошокерами ${TEMPLATE_TARGET} нанося ${TEMPLATE_DAMAGE}, вы чувствуете запах своих обгоревших волос и кожи`,
  `${TEMPLATE_TARGET} почти что зажаривают до смерти, но ему удается вырваться, ощутив на себе ${TEMPLATE_DAMAGE} урона`,
  `- ТЕСТОВЫМ СУБЪЕКТАМ ПРИГОТОВИТЬСЯ! ${TEMPLATE_TARGET} пытается выбить электрошокеры, но получает высоковольтный заряд в шею, почти теряя осознание, пережив ${TEMPLATE_DAMAGE} урона`,
];
const GENERAL_MESSAGES = [
  `- Вы у меня научитесь родину любить! Генерал бьёт когтями наотмашь по ${TEMPLATE_TARGET}, нанося тому ${TEMPLATE_DAMAGE} урона, орошая пол кровью`,
  `Поправляя фуражку, Генерал придерживает одной рукой, а второй пытается пробить бронепластину ${TEMPLATE_TARGET}, выписывая ему ${TEMPLATE_DAMAGE} урона`,
  `Генерал наносит апперкот ${TEMPLATE_TARGET}, заставив того потерять несколько зубов и ощутить ${TEMPLATE_DAMAGE} урона`,
];
const ALL_SEEING_MESSAGES = [
  `Всевидящий моргает разными глазами в рассинхроне, заставляя ${TEMPLATE_TARGET} вспомнить что-то из детства, заставив испытать головную боль, заодно и ${TEMPLATE_DAMAGE} урона`,
  `Оглушающий визг оглашает комнату, заставляя ${TEMPLATE_TARGET} испытать ${TEMPLATE_DAMAGE} урона, Всевидящий демонстрирует шикарную улыбку, вместе с поразительной способностью раскрывать пасть от уха до уха.`,
  `${TEMPLATE_TARGET} ощущает ${TEMPLATE_DAMAGE} урона от Всевидящего, последний явно залез в его голову и дёргает за не самые приятные ниточки`,
];
const KNIGHT_MESSAGES = [
  `Рыцарь ударяет мечом плашмя по голове ${TEMPLATE_TARGET}, удостаивая того ${TEMPLATE_DAMAGE} единицами урона`,
  `Осуществляя разворот вокруг своей оси и ведомый тяжестью меча, Рыцарь наносит страшный удар ${TEMPLATE_TARGET}, нанося тому ${TEMPLATE_DAMAGE} урона. Вам вероятно нужно к доктору, или хотя бы прилечь, чтобы не потерять сознание`,
  `${TEMPLATE_TARGET} получает ${TEMPLATE_DAMAGE} урона от рыцаря. Он хрустит шеей готовясь нанести следующий удар, явно входя во вкус.`,
];
const ACTRESS_MESSAGES = [
  `Актриса совершает пируэт пронзая меч в, похоже что не сильно жизненноважные органы ${TEMPLATE_TARGET}, причиняя тому ${TEMPLATE_DAMAGE} урона`,
  `${TEMPLATE_TARGET} получает воздушный поцелуй от актрисы, а следом и серию истерических ударов наотмашь мечом, заставив его ощутить ${TEMPLATE_DAMAGE} урона`,
  `Актриса дурманит разум ${TEMPLATE_TARGET}, заставляя его вступить в танец с нею, чуть не лишившись обеих рук, но потеряв приличное количество крови от ее удара мечом, пережив внеочередные ${TEMPLATE_DAMAGE} урона`,
];
const SINGER_MESSAGES = [
  `Солистка прыгает на грудь ${TEMPLATE_TARGET}, осуществляя серию ударов руками-шипами, вызывая обильное кровотечение, и нанося ${TEMPLATE_DAMAGE} урона`,
  `${TEMPLATE_TARGET} зажимает руками уши, кровь идёт через его пальцы и из глаз от оглушающих возгласов Солистки, заставляя его испытать ${TEMPLATE_DAMAGE} урона`,
  `Солистка осуществляет подножку и пытается подрезать сухожилия у ${TEMPLATE_TARGET}, но тот лишь отделывается кровотечениями и ощущает на себе ${TEMPLATE_DAMAGE} урона`,
];
const BALLERINE_MESSAGES = [
  `Балерина исполняет танец, выпуская в ${TEMPLATE_TARGET} ряд ножей, нанося ${TEMPLATE_DAMAGE} урона`,
  `${TEMPLATE_TARGET} получает удар мечом в бронепластины, заставляющий внутренности скрутиться, испытывая ${TEMPLATE_DAMAGE} урона`,
  `Балерина заставляет ${TEMPLATE_TARGET} впасть в транс, наблюдая за ее представлением, потеряв бдительность, Балерина наносит ему целый ряд ударов, причиняя ${TEMPLATE_DAMAGE} урона`,
];
const MERGED_MASS_MESSAGES = [
  `Масса воспоминаний навевает печальные мысли в ${TEMPLATE_TARGET}, причиняя ему ${TEMPLATE_DAMAGE} урона`,
  `${TEMPLATE_TARGET} падает без сознания, спустя несколько попыток ему удается встать, но уже получив ${TEMPLATE_DAMAGE} урона`,
  `${TEMPLATE_TARGET} ощущает будто его голова вот-вот взорвётся, из глаз его течет кровь, он старательно убирает руки от своего же оружия в приступах агонии, боль отступает, оставив лишь ${TEMPLATE_DAMAGE} урона`,
];

export const CREATURE_DIALOGUES: Record<ENEMIES, string[]> = {
  [ENEMIES.SPIDER_TIER_1]: SPIDER_MESSAGES,
  [ENEMIES.SPIDER_TIER_2]: SPIDER_MESSAGES,
  [ENEMIES.SPIDER_TIER_3]: SPIDER_MESSAGES,

  [ENEMIES.TORSO_TIER_1]: TORSO_MESSAGES,
  [ENEMIES.TORSO_TIER_2]: TORSO_MESSAGES,
  [ENEMIES.TORSO_TIER_3]: TORSO_MESSAGES,

  [ENEMIES.WATCHER_TIER_1]: WATCHER_MESSAGES,
  [ENEMIES.WATCHER_TIER_2]: WATCHER_MESSAGES,
  [ENEMIES.WATCHER_TIER_3]: WATCHER_MESSAGES,

  [ENEMIES.SPIRIT_TIER_1]: SPIRIT_MESSAGES,
  [ENEMIES.SPIRIT_TIER_2]: SPIRIT_MESSAGES,
  [ENEMIES.SPIRIT_TIER_3]: SPIRIT_MESSAGES,

  [ENEMIES.BIRD_TIER_1]: BIRD_MESSAGES,
  [ENEMIES.BIRD_TIER_2]: BIRD_MESSAGES,
  [ENEMIES.BIRD_TIER_3]: BIRD_MESSAGES,

  [ENEMIES.SIN_ICON_TIER_1]: SIN_ICON_MESSAGES,

  [ENEMIES.SOLDIER_TIER_1]: SOLDIER_MESSAGES,
  [ENEMIES.SOLDIER_TIER_2]: SOLDIER_MESSAGES,
  [ENEMIES.SOLDIER_TIER_3]: SOLDIER_MESSAGES,

  [ENEMIES.FIREFIGHTER_TIER_1]: FIREFIGHTER_MESSAGES,
  [ENEMIES.FIREFIGHTER_TIER_2]: FIREFIGHTER_MESSAGES,
  [ENEMIES.FIREFIGHTER_TIER_3]: FIREFIGHTER_MESSAGES,

  [ENEMIES.SNEAKER_TIER_1]: SNEAKER_MESSAGES,
  [ENEMIES.SNEAKER_TIER_2]: SNEAKER_MESSAGES,
  [ENEMIES.SNEAKER_TIER_3]: SNEAKER_MESSAGES,

  [ENEMIES.LOST_TIER_1]: LOST_MESSAGES,
  [ENEMIES.LOST_TIER_2]: LOST_MESSAGES,
  [ENEMIES.LOST_TIER_3]: LOST_MESSAGES,

  [ENEMIES.INVENTOR_TIER_1]: INVENTOR_MESSAGES,
  [ENEMIES.INVENTOR_TIER_2]: INVENTOR_MESSAGES,
  [ENEMIES.INVENTOR_TIER_3]: INVENTOR_MESSAGES,

  [ENEMIES.GENERAL_TIER_1]: GENERAL_MESSAGES,

  [ENEMIES.ALL_SEEING_TIER_1]: ALL_SEEING_MESSAGES,
  [ENEMIES.ALL_SEEING_TIER_2]: ALL_SEEING_MESSAGES,
  [ENEMIES.ALL_SEEING_TIER_3]: ALL_SEEING_MESSAGES,

  [ENEMIES.KNIGHT_TIER_1]: KNIGHT_MESSAGES,
  [ENEMIES.KNIGHT_TIER_2]: KNIGHT_MESSAGES,
  [ENEMIES.KNIGHT_TIER_3]: KNIGHT_MESSAGES,

  [ENEMIES.ACTRESS_TIER_1]: ACTRESS_MESSAGES,
  [ENEMIES.ACTRESS_TIER_2]: ACTRESS_MESSAGES,
  [ENEMIES.ACTRESS_TIER_3]: ACTRESS_MESSAGES,

  [ENEMIES.SINGER_TIER_1]: SINGER_MESSAGES,
  [ENEMIES.SINGER_TIER_2]: SINGER_MESSAGES,
  [ENEMIES.SINGER_TIER_3]: SINGER_MESSAGES,

  [ENEMIES.BALLERINE_TIER_1]: BALLERINE_MESSAGES,
  [ENEMIES.BALLERINE_TIER_2]: BALLERINE_MESSAGES,
  [ENEMIES.BALLERINE_TIER_3]: BALLERINE_MESSAGES,

  [ENEMIES.MERGED_MASS_TIER_1]: MERGED_MASS_MESSAGES,
};

const CREATURE_NAME_MAP = {
  [ENEMIES.SPIDER_TIER_1]: "Паук",
  [ENEMIES.SPIDER_TIER_2]: "Паук",
  [ENEMIES.SPIDER_TIER_3]: "Паук",

  [ENEMIES.TORSO_TIER_1]: "Торс",
  [ENEMIES.TORSO_TIER_2]: "Торс",
  [ENEMIES.TORSO_TIER_3]: "Торс",

  [ENEMIES.WATCHER_TIER_1]: "Наблюдатель",
  [ENEMIES.WATCHER_TIER_2]: "Наблюдатель",
  [ENEMIES.WATCHER_TIER_3]: "Наблюдатель",

  [ENEMIES.SPIRIT_TIER_1]: "Дух",
  [ENEMIES.SPIRIT_TIER_2]: "Дух",
  [ENEMIES.SPIRIT_TIER_3]: "Дух",

  [ENEMIES.BIRD_TIER_1]: "Птица Смерти",
  [ENEMIES.BIRD_TIER_2]: "Птица Смерти",
  [ENEMIES.BIRD_TIER_3]: "Птица Смерти",

  [ENEMIES.SIN_ICON_TIER_1]: "Икона Грехопадения",

  [ENEMIES.SOLDIER_TIER_1]: "Солдат",
  [ENEMIES.SOLDIER_TIER_2]: "Солдат",
  [ENEMIES.SOLDIER_TIER_3]: "Солдат",

  [ENEMIES.FIREFIGHTER_TIER_1]: "Пожарный",
  [ENEMIES.FIREFIGHTER_TIER_2]: "Пожарный",
  [ENEMIES.FIREFIGHTER_TIER_3]: "Пожарный",

  [ENEMIES.SNEAKER_TIER_1]: "Скрытень",
  [ENEMIES.SNEAKER_TIER_2]: "Скрытень",
  [ENEMIES.SNEAKER_TIER_3]: "Скрытень",

  [ENEMIES.LOST_TIER_1]: "Потеряный",
  [ENEMIES.LOST_TIER_2]: "Потеряный",
  [ENEMIES.LOST_TIER_3]: "Потеряный",

  [ENEMIES.INVENTOR_TIER_1]: "Изобретатель",
  [ENEMIES.INVENTOR_TIER_2]: "Изобретатель",
  [ENEMIES.INVENTOR_TIER_3]: "Изобретатель",

  [ENEMIES.GENERAL_TIER_1]: "Генерал Затерянных войск",

  [ENEMIES.ALL_SEEING_TIER_1]: "Всевидящий",
  [ENEMIES.ALL_SEEING_TIER_2]: "Всевидящий",
  [ENEMIES.ALL_SEEING_TIER_3]: "Всевидящий",

  [ENEMIES.KNIGHT_TIER_1]: "Рыцарь без сердца",
  [ENEMIES.KNIGHT_TIER_2]: "Рыцарь без сердца",
  [ENEMIES.KNIGHT_TIER_3]: "Рыцарь без сердца",

  [ENEMIES.ACTRESS_TIER_1]: "Актриса",
  [ENEMIES.ACTRESS_TIER_2]: "Актриса",
  [ENEMIES.ACTRESS_TIER_3]: "Актриса",

  [ENEMIES.SINGER_TIER_1]: "Солистка",
  [ENEMIES.SINGER_TIER_2]: "Солистка",
  [ENEMIES.SINGER_TIER_3]: "Солистка",

  [ENEMIES.BALLERINE_TIER_1]: "Балерина",
  [ENEMIES.BALLERINE_TIER_2]: "Балерина",
  [ENEMIES.BALLERINE_TIER_3]: "Балерина",

  [ENEMIES.MERGED_MASS_TIER_1]: "Масса воспоминаний",
};

export const getEnemyPhrase = (
  target: string,
  damage: number,
  creature: ENEMIES,
  isDead: boolean,
  isEvasion: boolean,
) => {
  if (isEvasion) {
    return `${CREATURE_NAME_MAP[creature]} промахивается.`;
  }

  const dialogues = CREATURE_DIALOGUES[creature];
  let phrase = dialogues[getRandom(0, dialogues.length - 1)];

  phrase = phrase.replace(TEMPLATE_TARGET, target);
  phrase = phrase.replace(TEMPLATE_DAMAGE, String(damage));

  if (isDead) {
    phrase += ` .${target} погибает.`;
  }

  return dialogues[getRandom(0, dialogues.length - 1)];
};

export interface EnemyPrototypeData {
  aiPackage: AI_CATEGORIES;
  pictureSrc: string;
  audioSrc: string;
  baseModel: Omit<Creature, "aiPackage">;
}

export type EnemyInitialData = Record<ENEMIES, EnemyPrototypeData>;

export const CREATURES: EnemyInitialData = {
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
