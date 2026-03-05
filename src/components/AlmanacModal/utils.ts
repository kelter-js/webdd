import { FLAGS } from "../../constants";
import { CREATURE_TO_IMG_MAP } from "../../constants/creatures";
import {
  FIRST_TIER_ALMANAC_ENEMIES_LIST,
  SECOND_TIER_ALMANAC_ENEMIES_LIST,
  THIRD_TIER_ALMANAC_ENEMIES_LIST,
  ALMANAC_ENEMIES_GENERIC_TYPES,
  ENEMIES,
} from "../../entities/enemies";
import { GameStateData } from "../../types/gameState";

import torso from "../../assets/enemies/closed/first_tier/torso-clean.png";
import spider from "../../assets/enemies/closed/first_tier/spider-clean.png";
import watcher from "../../assets/enemies/closed/first_tier/watcher-clean.png";
import spirit from "../../assets/enemies/closed/first_tier/spirit-clean.png";
import soldier from "../../assets/enemies/closed/second_tier/soldier-clean.png";
import firefighter from "../../assets/enemies/closed/second_tier/firefighter-clean.png";
import sneaker from "../../assets/enemies/closed/second_tier/sneaker-clean.png";
import lost from "../../assets/enemies/closed/second_tier/lost-clean.png";
import allSeeing from "../../assets/enemies/closed/third_tier/all-seeing-clean.png";
import knight from "../../assets/enemies/closed/third_tier/knight-clean.png";
import actress from "../../assets/enemies/closed/third_tier/actress-clean.png";
import singer from "../../assets/enemies/closed/third_tier/singer-clean.png";

const FIRST_TIER_CREATURES_COUNTER = 20;
const SECOND_TIER_CREATURES_COUNTER = 15;
const THIRD_TIER_CREATURES_COUNTER = 10;

export const ENEMY_DESCRIPTIONS_LOCKED = {
  // 1 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.SPIDER]:
    "Жо ъих цор физябхцнн, дюыи ыи щищтфкеныно цыыи чгвсфзт ффгяз кхфжгфф я ягюыхвх цхнхш, ыиы же щфя шхщрх [яынспхнх] жсфтягс хсяфе я щжтгытяцсисс япьтсщшесяи, цхкхшрфчсс шх щцищ щцтх цхнхшрхюыхьшхц цтфжфжтя?.. Псрящи щишх, цющсфищ х ыфями фтсщаятфк шхщрщх хф щврящ хусхгишх рып чщфсщатящишхк.",
  [ALMANAC_ENEMIES_GENERIC_TYPES.TORSO]:
    "Эхл щткгжх щи щипжртф щьеыо х фхл, гхфж жсряшб цци флхх фиш, вхф зхцхы щлпю щи фхр юи грфгфжшхцфыи, фхф я гт, щи эыэяши? Пффциф стртфсря шхщс щипя. Пдя хкшитцт в фхл яыи яшхк цяжи фхфюхызяфб щцхф щгищкцфитщя, жтпе ювжрны щсщхнящусмще ще чхыртщяфцт ффзигщхцир. Э эххл цящи штяых щс пяхтя сттвхфб щ щврявхл щхшяцхшяя цфххх щипци.",
  [ALMANAC_ENEMIES_GENERIC_TYPES.WATCHER]:
    "Ржшхвжф [яынспхнх] фцфифще ящтс щ физитщи цщсця шх фзящи, щ щипщфхлхл цфлряи я дтл [яынспхнх]. Отяжхохтщатя цщхшхшт рцфщхтян фяхо цхлхфб ц гхящрт [яынспхнх] я тшт щали, я ялищт ффз [яынспхнх] ифцифытцфит тгх щ щцитл щипефя",
  [ALMANAC_ENEMIES_GENERIC_TYPES.SPIRIT]:
    "У лияхшл сяятирир щи цвё щщтяя щципыцишяя щищб ффз я щи ряпжяфхцб хдзишх лишияя, втл они ецсетхще, сяйь хжхт езщх - яш цфетсищят цялцхрямящиф фдщяя ощижхл жфши я лфщфця, цряцхшх шхщцсхишяя я цфжтцишяхщия. Бфо щ физял щщфгятсящхл яцщвщтяф лищиышх, и щи лябявтщзя.",

  // 2 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.SOLDIER]:
    "Илишх ффз [фсттфигхффтх] цящил щцтяш щтщвжтршхк. Ттщилб фшя цвищыжтшв дтфжяфб цф яидятяшфхл тгх щипяфя, дип ктщия я кщия, щи кшея щфтяя, ц кхящфиш щипффилх дхжщтямяш, фвгящия цфщтяжщяк фищщ щтзящяфб [фсттфигхффтх]. Цтижщфицпеюы щипбитшио щцищштщб ццящр фиижтшия дтициля щицяфиля",
  [ALMANAC_ENEMIES_GENERIC_TYPES.FIREFIGHTER]:
    "В фжшв яп щтяил [фсттфигхффтх] [фсттфигхффтх] шивхище цфыик. [фсттфигхффтх] сяйь чжжтл щцищще, дряыжхе цф дтщхтщившыл ктяяжтфил [фсттфигхффтх] фкцихтщилм црилтщил, ц кхящфиш щцищяфилмшх цвххщи, я фхшжх [фсттфигхффтх] цщсфихяр тгх, щ ффцхтл ц ттфиш. Цив я ифцифытцфит тгх щ щипяфя.",
  [ALMANAC_ENEMIES_GENERIC_TYPES.SNEAKER]:
    "Вт цсиле [фсттфигхффтх] [фсттфигхффтх] вищхф япжтяярхщб я цфжйвтциря щиж [фсттфигхффтх]. [фсттфигхффтх] цившт щипхжярще ц щфщффешяя щфтщщщи я фзяжти щтжкхртц яря щи фвтиб щряефщиш рфпытщйск, и фикзи яшхшх сфжи ктпщил фф щцтяш [фсттфигхффтх], [фсттфигхффтх] дтя щи щфтятяти я фф хижжхшх фзяжти сяйь цряцхшх",
  [ALMANAC_ENEMIES_GENERIC_TYPES.LOST]:
    "Ющря цфщри щцтяфя щврящ хусхгишх щи щипфжяр щфятя, щт црялсщил фш цтицририрще ц эфт. Г кижжвл шхцял ряффтл цтялсшя цщё щярыштя щижфижялие я фисяеще, фисяе щилхцт щипе.",

  // 3 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.ALL_SEEING]:
    "Вт цсиле щтртжтщхя [рщиртиш] цфщри шикффттяп фтяяйищтцяк двяфпидтящищб дфецрефбще ц [рщиртиш], шт [рщиртиш] цщёт щицшт цфтяяфирище вхтди цщтяшвфб ши щцтя [рщиртиш]. [рщиртиш] кипиртще вхф яи шял щидяжищиф, вхф тгх яявд, я ялищт ффз [рщиртиш] цящил лищишик щтщффшир [рщиртиш]",
  [ALMANAC_ENEMIES_GENERIC_TYPES.ACTRESS]:
    "Гт црялсщил [рщиртиш] шикффттяв гищхря щипяфя цифиря, щифири ящщипиря, сяйи ящкихрярящб я щфщхярящб, я яшхшжх жтптжяря жт [рщиртиш] сяйь ц фикхл цящи. Щтигищ лирф вхф шищфляшитя фд тт двифл кфищтяя, ляляки я щцтщфдшфщфел к икфтящктл ятти.",
  [ALMANAC_ENEMIES_GENERIC_TYPES.SINGER]:
    "[рщиртиш] щяктжх щифтдт щи щцрякирищ липяктл, я щипфжяр [рщиртиш] лищфхл щре щиртиф щи щре кижжтгх цяжи ящкгщщфци, щфэфтлв я ффшфишят тгх к [рщиртиш] двяф тфтяцфхтряшлил. Оши сяйь щфщхяря дищхяя, щи щипи?? [рщиртиш], ффдяжиши цтяле в [рщиртиш] ц щьтщщил, щи жиле [рщиртиш] кик липшт жтржх рюдяцифбще [рщиртиш].",
  [ALMANAC_ENEMIES_GENERIC_TYPES.KNIGHT]:
    "Пвжвщя тщё щипхшкхл [рщиртиш] дтяцтяя щи цтижщфицряшят, щит фш щцящил смихите ц щцижшхцикхцтя жтщдхлия, я лиритшкхшх [рщиртиш] фик цщхвифряр тгх фдщип я жтщдхля, [рщиртиш] жвлил вхф щлтитт цфтятщхя щ цфпсщщхтл щитип щцтя яжииры дящффхя, итщхшфщря я ффцишя.",
};

export const ENEMY_DESCRIPTIONS = {
  // 1 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.SPIDER]:
    "До сих пор неизвестно, были ли действительно чем-то вызваны такие мутации у обычных пауков, или же это просто [вырезано] детские страхи и разыгравшееся воображение, породившее на свет этих паукообразных созданий?.. Тем не менее, встреча с этими образчиками ничего не сулит хорошего для путешественников.",
  [ALMANAC_ENEMIES_GENERIC_TYPES.TORSO]:
    "Вам никогда не приходила в голову мысль о том, куда делись все тела тех, кто попал сюда по той же случайности, что и вы, но не выжили? Ответ буквально перед вами. Они обречены в том или ином виде продолжить своё путешествение, даже будучи неполноценными на количество конечностей. В этом мире никто не может умереть в привычном понимании этого слова.",
  [ALMANAC_ENEMIES_GENERIC_TYPES.WATCHER]:
    "Однажды [вырезано] остался один в вечернее время на улице, в незнакомом районе и без [вырезано]. Сердобольный прохожий предложил свою помощь в поиске [вырезано] и его дома, и именно так [вырезано] завпечатлел его в своей памяти",
  [ALMANAC_ENEMIES_GENERIC_TYPES.SPIRIT]:
    "У местных жителей за всё время пребывания здесь так и не сложилось общего мнения, кем они являются, лишь одно ясно - их появление символизирует общий упадок духа и морали, плохого настроения и подавленности. Бой с таким противником иссушает морально, а не физически.",

  // 2 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.SOLDIER]:
    "Именно так [отредактировано] видел своих сослуживцев. Теперь они вынуждены бродить по лабиринтам его памяти, без конца и края, не зная покоя, в поисках случайно забредших, отбирая последний шанс покинуть [отредактировано]. Представляют серьезную опасность ввиду владения боевыми навыками",
  [ALMANAC_ENEMIES_GENERIC_TYPES.FIREFIGHTER]:
    "В одну из ночей [отредактировано] [отредактировано] начался пожар. [отредактировано] лишь чудом спасся, блуждая по бесконечным коридорам [отредактировано] охваченным пламенем, в поисках спасительного выхода, и тогда [отредактировано] встретил его, с топором в руках. Так и завпечатлев его в памяти.",
  [ALMANAC_ENEMIES_GENERIC_TYPES.SNEAKER]:
    "Во время [отредактировано] [отредактировано] часто издевались и подшучивали над [отредактировано]. [отредактировано] вечно находился в состоянии стресса и ожидая подколов или не очень приятных розыгрышей, а также иного рода козней от своих [отредактировано], [отредактировано] был на стороже и от каждого ожидал лишь плохого",
  [ALMANAC_ENEMIES_GENERIC_TYPES.LOST]:
    "Если после смерти путешественник не находил покоя, со временем он превращался в это. С каждым новым витком времени всё сильнее деградируя и теряясь, теряя самого себя.",

  // 3 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.ALL_SEEING]:
    "Во время молодости [удалено] после некоторых проишествий было запрещено появляться в [удалено], но [удалено] всё равно тайком пробирался чтобы взглянуть на свою [удалено]. [удалено] казалось что за ним наблюдают, что его ищут, и именно так [удалено] видел местный персонал [удалено]",
  [ALMANAC_ENEMIES_GENERIC_TYPES.ACTRESS]:
    "Со временем [удалено] некоторые участки памяти ветшали, цвета испарялись, лица искажались и портились, и иногда доходили до [удалено] лишь в таком виде. Сейчас мало что напоминает об ее былой красоте, мимике и способностях к актерской игре.",
  [ALMANAC_ENEMIES_GENERIC_TYPES.SINGER]:
    "[удалено] никогда особо не увлекался музыкой, и находил [удалено] местом для далеко не для каждого вида искусства, поэтому и отношение его к [удалено] было отрицательным. Они лишь портили партии, где игра?? [удалено], отбирая время у [удалено] в пьессах, не давая [удалено] как можно дольше любоваться [удалено].",
  [ALMANAC_ENEMIES_GENERIC_TYPES.KNIGHT]:
    "Будучи ещё ребенком [удалено] привели на представление, где он увидел рыцаря в средневековых доспехах, и маленького [удалено] так впечатлил его образ и доспехи, [удалено] думал что сможет пронести с возрастом через свою жизнь эти идеалы чистоты, честности и отваги.",
};

export const ENEMY_IMAGES = {
  // 1 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.TORSO]: {
    locked: torso,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.TORSO_TIER_1],
  },

  [ALMANAC_ENEMIES_GENERIC_TYPES.SPIDER]: {
    locked: spider,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.SPIDER_TIER_1],
  },

  [ALMANAC_ENEMIES_GENERIC_TYPES.WATCHER]: {
    locked: watcher,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.WATCHER_TIER_1],
  },

  [ALMANAC_ENEMIES_GENERIC_TYPES.SPIRIT]: {
    locked: spirit,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.SPIRIT_TIER_1],
  },

  // 2 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.SOLDIER]: {
    locked: soldier,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.SOLDIER_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.FIREFIGHTER]: {
    locked: firefighter,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.FIREFIGHTER_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.SNEAKER]: {
    locked: sneaker,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.SNEAKER_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.LOST]: {
    locked: lost,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.LOST_TIER_1],
  },

  // 3 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.ALL_SEEING]: {
    locked: allSeeing,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.ALL_SEEING_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.KNIGHT]: {
    locked: knight,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.KNIGHT_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.ACTRESS]: {
    locked: actress,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.ACTRESS_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.SINGER]: {
    locked: singer,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.SINGER_TIER_1],
  },
};

export const getEnemiesByTier = (currentTier: number) => {
  if (currentTier === 1) {
    return FIRST_TIER_ALMANAC_ENEMIES_LIST;
  }

  if (currentTier === 2) {
    return SECOND_TIER_ALMANAC_ENEMIES_LIST;
  }

  return THIRD_TIER_ALMANAC_ENEMIES_LIST;
};

const ENEMY_TIER_REQUIREMENTS: Record<ALMANAC_ENEMIES_GENERIC_TYPES, number> = {
  // Tier 1
  ...Object.fromEntries(
    FIRST_TIER_ALMANAC_ENEMIES_LIST.map((type) => [
      type,
      FIRST_TIER_CREATURES_COUNTER,
    ]),
  ),
  // Tier 2
  ...Object.fromEntries(
    SECOND_TIER_ALMANAC_ENEMIES_LIST.map((type) => [
      type,
      SECOND_TIER_CREATURES_COUNTER,
    ]),
  ),
  // Tier 3
  ...Object.fromEntries(
    THIRD_TIER_ALMANAC_ENEMIES_LIST.map((type) => [
      type,
      THIRD_TIER_CREATURES_COUNTER,
    ]),
  ),
} as any;

export const isEnemyUnlocked = (
  player: GameStateData,
  enemyType: ALMANAC_ENEMIES_GENERIC_TYPES,
) => {
  const required = ENEMY_TIER_REQUIREMENTS[enemyType];

  if (required === undefined) return false;

  return (player.playStatistics.kills[enemyType] || 0) >= required;
};

export const isEveryEnemyUnlocked = (player: GameStateData) => {
  if (player.flags.includes(FLAGS.CHAOS_CHALICE_REVEICED)) {
    return false;
  }

  const enemyTypes = Object.values(ALMANAC_ENEMIES_GENERIC_TYPES);

  return enemyTypes.every((type) => isEnemyUnlocked(player, type));
};
