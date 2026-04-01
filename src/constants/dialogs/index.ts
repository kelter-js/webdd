import { DialogueTree } from "../../types/dialogue";
import blacksmith from "../../assets/npc/smith.png";
import questDesk from "../../assets/npc/quest_desk.png";
import potionTrader from "../../assets/npc/potion-trader.png";
import accountant from "../../assets/npc/accountant.png";
import crazyTrader from "../../assets/npc/crazy_trader.png";
import ghost from "../../assets/npc/ghost.png";
import priest from "../../assets/npc/priest.png";
import tutor from "../../assets/npc/tutor.png";
import starcounter from "../../assets/npc/starcounter.png";
import watchmen from "../../assets/npc/watchmen.png";
import mergedMass from "../../assets/npc/merged_mass.png";
import shooter from "../../assets/npc/shooter.png";
import { BUILDING_NAMES, LEGENDARY_ARMOR_PRICE } from "..";
import { DIALOGUE_FLAGS, DIALOGUE_IDS } from "../../entities/dialogues";

export const FINAL_FAIL_TEXT_SHOOTING =
  "Это было смешно. Ещё раз попробуете или с вас хватит позора?";
export const FINAL_FULL_FAIL_TEXT_SHOOTING =
  "Проваливай, посмешище! Надеюсь больше не увидимся. Титул мой!";
export const FINAL_TEXT_SHOOTING =
  "Хахах... Ладно, давай... может оставим это между нами?.. Забери на выбор любую пушку у меня и оставим титул при мне?..";

export const LEAVE_OPTION_SHOOTING = {
  text: "[покинуть]",
  nextNode: "end",
  id: DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_SHOOTER,
};
export const FINAL_DEFAULT_OPTIONS_SHOOTING = [
  LEAVE_OPTION_SHOOTING,
  {
    text: "[попробовать ещё раз]",
    nextNode: "shootingEnd",
    id: DIALOGUE_IDS.SHOOTING_START_GAME,
  },
];

export const SUCCESS_OPTIONS_SHOOTING = [
  LEAVE_OPTION_SHOOTING,
  {
    text: "[получить легендарный дробовик]",
    nextNode: "end",
    id: DIALOGUE_IDS.SHOOTING_RECEIVE_SHOTGUN,
  },
  {
    text: "[получить легендарную снайперскую винтовку]",
    nextNode: "end",
    id: DIALOGUE_IDS.SHOOTING_RECEIVE_SNIPER_RIFLE,
  },
  {
    text: "[получить легендарный пистолет-пулемёт]",
    nextNode: "end",
    id: DIALOGUE_IDS.SHOOTING_RECEIVE_SMG,
  },
];

export const shootingDialog: DialogueTree = {
  id: BUILDING_NAMES.SHOOTING,
  src: shooter,
  name: "Опытный стрелок",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "Вот мы и встретились! А я за вами давно следую... Много шороху навели, все только о вас и говорят. Но ведь все знают, что в отличии от дешевок вроде вас, ИСТИННЫЙ мастер стрельбы - я, а не всякая чушь новоприбывшая, и я это сегодня докажу. Давай состязаться! Настреляешь 10 тарелок - и уступлю титул. А? Только три попытки...",
      options: [
        {
          text: "Да, почему бы и нет, люблю помериться мастерством",
          nextNode: "participate",
          id: DIALOGUE_IDS.INITIATE_SHOOTING_GAME,
        },
        {
          text: "Эээ... оставь его себе. Времени нет. [покинуть]",
          nextNode: "end",
          id: DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_SHOOTER,
        },
      ],
    },

    participate: {
      text: "Готов? Буду подкидывать тарелки, твоя задача попасть. Десять тарелок. Ну, начнем?.. Раз, два, три - погнали!",
      options: [
        {
          text: "[начать игру]",
          nextNode: "shootingEnd",
          id: DIALOGUE_IDS.SHOOTING_START_GAME,
        },
      ],
    },

    shootingEnd: {
      text: FINAL_FAIL_TEXT_SHOOTING,
      options: FINAL_DEFAULT_OPTIONS_SHOOTING,
    },
  },
};

export const smithDialog: DialogueTree = {
  id: "intro_npc",
  src: blacksmith,
  name: "The Blacksmith",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "Добро пожаловать в Безвременье...",
      options: [
        { text: "Кто ты?", nextNode: "who_are_you" },
        { text: "Можно воспользоваться твоей кузней?", nextNode: "use_smith" },
        { text: "[Уйти]", nextNode: "end" },
      ],
      flags: [DIALOGUE_FLAGS.SMITH_WELCOMED],
    },

    alreadyWelcomed: {
      text: "Снова ты?.. Ну привет-привет.",
      options: [
        {
          text: "[открыть меню кузницы]",
          nextNode: "end",
          id: DIALOGUE_IDS.OPEN_SMITH,
        },
        {
          text: "[сдать руду]",
          nextNode: "end",
          id: DIALOGUE_IDS.RELEASE_ORE,
        },
        { text: "Да я так, поздороваться... [уйти]", nextNode: "end" },
      ],
    },

    receiveSmithArtifactFirstTier: {
      text: "Ты как раз насобирал нужную сумму, дай мне несколько минут... так, да... Есть! Держи, возможно найдёшь этому применение! Порадовал старика, а руки-то помнят! Приноси ещё руду - и я тебе ее улучшу.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
        },
      ],
    },
    receiveSmithArtifactSecondTier: {
      text: "В этот раз на меня нашло вдохновение, я там чуточку подрихтовал, юстировочку провел... Должно быть получше. Приноси ещё руду и я ещё чего-нибудь придумаю.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
        },
      ],
    },
    receiveSmithArtifactThirdTier: {
      text: "Думаю, это пик моего мастерства. Держи, руду можешь приносить - я ее с радостью куплю, буду ставить на поток свою работу, лучше уже точно не смогу тебе сделать, боюсь что просто сломаю эту вещь.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
        },
      ],
    },

    who_are_you: {
      text: "Филип, кузнец. По-крайней мере... что-то подсказывало мне, что я имею отношение к кузнечному делу... Или к обработке горных пород. Всё отрывками, как картинки перед глазами, до сих пор до конца не помню, кем я был.",
      options: [
        {
          text: "Горнодоб... Обработка горных пород? Это же далеко не одно и то же, что и кузнечное дело.",
          nextNode: "ore",
        },
      ],
    },
    ore: {
      text: "Возможно. Я даже не уверен в том, что меня зовут Филип, а ты такие вещи спрашиваешь. Сам-то о себе много помнишь?.. Вот то-то же. Давай так, если тебе будет попадаться какая руда, ты мне ее приноси, может у меня руки вспомнят старое дело, а я тебе сделаю что-нибудь из этой руды, как насобираешь приличное количество. А может и себя я лучше смогу вспомнить...",
      options: [
        {
          text: "Если мне что-то попадётся, я тебе помогу.",
          nextNode: "end",
        },
      ],
    },

    use_smith: {
      text: "У меня как раз есть свободное окно, не особо много заказов, можешь воспользоваться кузней",
      options: [
        {
          text: "[открыть меню кузницы]",
          nextNode: "end",
          id: DIALOGUE_IDS.OPEN_SMITH,
        },
        { text: "[Уйти]", nextNode: "end" },
      ],
    },

    end: {
      text: "Удачи, путник...",

      options: [],
    },
  },
};

export const questDeskDialog: DialogueTree = {
  id: BUILDING_NAMES.QUEST_DESK,
  src: questDesk,
  name: "Quest Desk",
  startNode: "end",
  nodes: {
    end: {
      text: "Мне нужно закончить предыдущую работу...",
      options: [{ text: "[Уйти]", nextNode: "end" }],
    },
  },
};

export const tutorDialog: DialogueTree = {
  id: BUILDING_NAMES.TUTOR,
  src: tutor,
  name: "Гид",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "Привет-привет. По глазам, ммм... Нет, по внешнему виду-то тоже вижу что не здешние. Бесплатно могу рассказать что тут да как у нас устроено. Хватит глаза такие делать, устанешь удивляться тут.",
      options: [
        { text: "[Далее]", nextNode: "tier_1_tip_1" },
        {
          text: "[отказаться]",
          nextNode: "end",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_1,
        },
      ],
    },
    tier_1_tip_1: {
      text: "Имя своё я не помню, много путешествую, знакомиться поэтому не будем, может и не понадобиться мне ваши имена знать. Осмотритесь вокруг, познакомьтесь со всеми, составьте план действий.",
      options: [
        { text: "[Далее]", nextNode: "tier_1_tip_2" },
        {
          text: "[отказаться]",
          nextNode: "end",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_1,
        },
      ],
    },
    tier_1_tip_2: {
      text: "Золота-то у вас поди совсем немного, но прикупите зелья в лавке и факелы пополните на всякий случай, сколько хватит. Есть кузнец у нас тут ещё, кхм, да...",
      options: [
        { text: "[Далее]", nextNode: "tier_1_tip_3" },
        {
          text: "[отказаться]",
          nextNode: "end",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_1,
        },
      ],
    },
    tier_1_tip_3: {
      text: "В центре города обычно стоит доска с объявлениями, ребятам что-то бывает нужно - посматривайте, можно подзаработать так. В общем-то, у нас тут у всех цель одна - выжить и возможно даже покинуть это злосчастное место, так что местным на руку если вы дольше проживете. Заглядывайте в ратушу - вам чем смогут - помогут, выберут стратегию развития так сказать.",
      options: [
        { text: "[Далее]", nextNode: "tier_1_tip_4" },
        {
          text: "[отказаться]",
          nextNode: "end",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_1,
        },
      ],
    },
    tier_1_tip_4: {
      text: "В каждом из нас есть частичка Знания. Никто не знает по какому принципу это получилось, но каждый кто здесь оказался отрывками и расплывчато знает ключ к выходу отсюда. Несколько лет уже пытаемся собрать всё воедино. Пока что нам понятно одно - в Глубинах сознания есть выход. Звучит пафосно, но это лишь название цикла подземелий, откуда все наши проблемы возникают.",
      options: [
        {
          text: "[Далее]",
          nextNode: "tier_1_tip_5",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_1,
        },
      ],
    },
    tier_1_tip_5: {
      text: "Твоя задача... Нет, ты должен... А ладно, мы хотели бы все попросить вас помочь нам в поиске выхода отсюда. Чтобы вы совершили некоторое количество вылазок в подземелья, где-то там есть информация... или кто-то, кто обладает знанием, что даст нам ключ к выходу. Пожалуйста",
      options: [
        {
          text: "[Далее]",
          nextNode: "tier_1_tip_6",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_1,
        },
      ],
    },
    tier_1_tip_6: {
      text: "Врач бесплатно подлечит, если будет что сшивать от вас, в остальном - пообщайтесь, сами всё увидите. Ну, не буду время зря тратить, глядишь, ещё свидемся. Ни пуха ни пера!",
      options: [
        {
          text: "[откланяться]",
          nextNode: "end",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_1,
        },
      ],
    },

    welcome_tier_2: {
      text: "Я не знаю что произошло, но после того как вы ушли в подземелье прошёл целый месяц! Никто не ожидал вас увидеть живыми, но внезапно... всё изменилось вокруг. Мы как будто просто совершили скачок и оказались в другом месте, с другими зданиями и окружением, просто как будто... скопировали и вставили. Чтобы вы там не сделали - это было правильным решением. Мы локализовали новый Очаг знания, и организовали небольшой совет... [он делает тяжелый вдох, после долгой речи]",
      options: [
        {
          text: "[Далее]",
          nextNode: "tier_2_tip_1",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_2,
        },
      ],
    },

    tier_2_tip_1: {
      text: "Так... я, пастырь и ещё несколько ветеранов собрались, организовали совет, занимаемся анализом тех данных, которые вам удалось разблокировать путем побед в подземельях, странно, но это и в правду имеет некоторую связь, мне кажется мы знаем кто за этим всем стоит. Мы точно в симуляции находимся, и не ясно кем мы были в обычной жизни, но шанс вернуться в прошлую жизнь ещё есть, у Создателя есть слабое место, нужно лишь время. Продолжай в том же духе!",
      options: [
        {
          text: "[откланяться]",
          nextNode: "end",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_2,
        },
      ],
    },

    welcome_tier_3: {
      text: "Ох, снова! Это снова произошло! Последний блок памяти разблокирован! Мы точно знаем где сердце, и...как видишь реальность снова перестроилась. Нужно продолжать поиски, но уже не за знанием, каждое продвижение вперед будет давать более точные координаты Сердца. Если мы сможем его разрушить - нас, по идее... отпустит?.. Не знаю. Что-то произойдёт, но что - покажет будущее.",
      options: [
        {
          text: "То есть мы должны разрушить сердце чтобы получить... что-то? Очень здравый... план. Надёжный, я бы даже сказал.",
          nextNode: "tier_3_tip_1",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_3,
        },
      ],
    },

    tier_3_tip_1: {
      text: "Поймите, никто кроме вас  не сможет с этим справиться, вы единственные кто смог так далеко зайти! Да и другого выхода у нас нет, мы всё прошерстили, в памяти нет других упоминаний, есть лишь одна лазейка, уязвимое место, нулевой день. Желаю вам удачи и, надеюсь, увидимся уже в реальном мире.",
      options: [
        {
          text: "[откланяться]",
          nextNode: "end",
          id: DIALOGUE_IDS.STOP_TUTOR_TIER_3,
        },
      ],
    },
  },
};

export const priestDialog: DialogueTree = {
  id: BUILDING_NAMES.MEDICAL_STATION,
  src: priest,
  name: "Жрец времени",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "О, ещё один потеряшка. Вопросы 'Кто вы такие', 'Где я' и прочее можешь не задавать. Мы сами на это не можем ответить. Просто оказались здесь.",
      options: [
        {
          text: "И всё же... кто ты?",
          nextNode: "who_are_you",
        },
        {
          text: "Мне нужна твоя помощь... [вылечиться]",
          nextNode: "heal",
          id: DIALOGUE_IDS.HEAL,
        },
        {
          text: "На входе вывеска что продаёте самодельные факела. Можно мне парочку?..",
          nextNode: "end",
          id: DIALOGUE_IDS.BUY_TORCHES,
        },
      ],
      flags: [DIALOGUE_FLAGS.PRIEST_WELCOME],
    },

    alreadyWelcomed: {
      text: "Всё ещё ищешь ответы?.. Я вот тоже в поисках.",
      options: [
        {
          text: "[сдать сокровища старого мира]",
          nextNode: "end",
          id: DIALOGUE_IDS.RELEASE_TREASURES,
        },
        {
          text: "Мне нужна твоя помощь... [вылечиться]",
          nextNode: "heal",
          id: DIALOGUE_IDS.HEAL,
        },
        {
          text: "[купить факела]",
          nextNode: "end",
          id: DIALOGUE_IDS.BUY_TORCHES,
        },
        {
          text: "[выйти]",
          nextNode: "end",
        },
      ],
    },

    receivePriestArtifactFirstTier: {
      text: "Спасибо что выполнил мою маленькую просьбу, мне немного легче на душе. Долго платежом красен, поэтому я тоже сложа руки не сидел, и есть презент для тебя. Используй артефакт с умом, и... Предложение всё ещё в силе, приноси и я улучшу его. Дай предаться ностальгии, покинь прошу.",
      options: [
        {
          text: "Спасибо, любитель старины",
          nextNode: "end",
        },
      ],
    },
    receivePriestArtifactSecondTier: {
      text: "Моя коллекция значительно выросла - значит пришло время и тебе воздать должное. Я придумал как можно улучшить этот артефакт. [он забирает его на несколько минут, после передает обратно]. Мне нравится результат моей работы, надеюсь ты тоже оценишь. Жду ещё пополнение в мою коллекцию.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
        },
      ],
    },
    receivePriestArtifactThirdTier: {
      text: "Ты только посмотри... разве она не идеальна?.. Да я теперь любого на ярмарке уделаю собирателя, даже Дункана из соседней... А не важно. Спасибо тебе. Ты можешь продолжать носить вещи, возможно когда-нибудь перепрофилируюсь и открою свою лавку... И буду продавать излишки. Я смог улучшить твой артефакт ещё раз, прими этот подарок от всего сердца, ты мне очень помог.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
        },
      ],
    },

    who_are_you: {
      text: "Местные нарекли меня фанатиком, потому что я немного переборщил с речами, когда я сюда попал... Не помню когда, у меня было стойкое ощущение нереальности происходящего, будто мы в симуляции, когда я пытаюсь себя вспомнить начинает дико болеть голова, будто кто-то мешает вспомнить что-то важное...",
      options: [
        { text: "Может я как-то могу тебе помочь?..", nextNode: "help" },
      ],
    },

    help: {
      text: "Сомневаюсь что ты мне можешь чем-либо помочь. Хотя... есть у меня жуткая ностальгия по каким-то временам, в которых жил... или они как-то связаны со мной. Если в странствиях будешь находить что-нибудь из старого мира... Я с радостью приму это у тебя. В целом заходи, скучно здесь, хотя бы медицинские навыки на тебе буду оттачивать.",
      options: [
        {
          text: "Вылечи мою группу",
          nextNode: "end",
          id: DIALOGUE_IDS.HEAL,
        },
        {
          text: "Загляну, как соберу что-нибудь",
          nextNode: "end",
        },
      ],
    },
    // Здесь рандомную генерацию фраз
    heal: {
      text: "Ого... Давно не видел столько крови.",
      options: [{ text: "[Уйти]", nextNode: "end" }],
    },
    end: {
      text: "Удачи, путник...",

      options: [],
    },
  },
};

const DEFAULT_ALMANAC_OPTIONS = [
  {
    text: "[открыть альманах]",
    nextNode: "end",
    id: DIALOGUE_IDS.ALMANAC,
  },
  {
    text: "[Уйти]",
    nextNode: "end",
  },
];

export const ACQUIRE_ALMANAC_ARTIFACT_OPTION = {
  text: "[получить артефакт]",
  nextNode: "congratulations",
  id: DIALOGUE_IDS.ACQUIRE_ALMANAC_ARTIFACT,
};

export const starCounterDialog: DialogueTree = {
  id: BUILDING_NAMES.TOWER,
  src: starcounter,
  name: "Наблюдающий звезды",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "Тебе тоже нравятся звезды? Присмотрись, небо такое красивое. Ты ведь здесь для этого?",
      options: [
        {
          text: "Вообще-то это был визит вежливости... Кто ты?",
          nextNode: "who_are_you",
        },
        {
          text: "[Уйти]",
          nextNode: "end",
        },
      ],
    },

    congratulations: {
      text: "Поздравляю! Вот и финишная черта, ты заполнил весь альмонах! Конечно, есть существа более редкие, я не стал их описывать только потому, что сам я их не встречал, и в моей личной истории их не существует, так что оставь свои личные кошмары при себе. Это мой подарок, когда-то я сам этим артефактом пользовался, но теперь нет в этом необходимости.",
      options: [
        {
          text: "Спасибо тебе! [покинуть здание]",
          nextNode: "end",
        },
      ],
    },

    who_are_you: {
      text: "Местные зовут меня звездочетом. Наблюдающий звезды - мне больше идёт. Трудно ответить на твой вопрос, знаю что раньше любил делать фотографии. А ты чем любил заниматься?",
      options: [{ text: "[рассказать о себе]", nextNode: "about_me" }],
    },

    about_me: {
      text: "Приятно познакомиться. Мы могли бы заключить сделку, в следующий раз как заглянешься ко мне, я закончу изготавливать фотоаппарат. За скромное денежное вознаграждение я могу его продать тебе. Наделаешь хороших снимков, а я тебе за это смогу изготавливать артефакты для повышения твоих шансов выживания в нашем мире, как тебе идея?",
      options: [
        { text: "Звучит интересно", nextNode: "end" },
        { text: "Давай как-нибудь в другой раз?..", nextNode: "end" },
      ],
      flags: [DIALOGUE_FLAGS.PHOTO],
    },

    buy_camera: {
      text: "Я как раз закончил с фотоаппаратом. В какие-нибудь жалкие... 5000 золотых монет я тебе продам его. Что скажешь?",
      options: [
        {
          text: "[Купить камеру - отдать 5000 золотых]",
          nextNode: "bought_camera",
          id: DIALOGUE_IDS.BUY_CAMERA,
        },
        {
          text: "Мне пока не по карману такие удовольствия",
          nextNode: "end",
        },
      ],
    },

    bought_camera: {
      text: "Хорошее вложение! Теперь ты мне сможешь наделать снимков, и я для будущих путников смогу составить альманах, чтобы они имели представление о том, что их ждет в нашем мире. Когда ты соберешь достаточно снимков, я тебе смогу создать артефакт [после победы над противниками появится возможность делать их фотографии]",
      options: [
        {
          text: "[Покинуть башню]",
          nextNode: "end",
        },
      ],
      flags: [DIALOGUE_FLAGS.PHOTO],
    },

    almanac: {
      text: "Хочешь посмотреть на плод нашего совместного труда, помощник?",
      options: DEFAULT_ALMANAC_OPTIONS,
    },

    end: {
      text: "Удачи, путник...",
      options: [],
    },
  },
};

export const citadelDialog: DialogueTree = {
  id: BUILDING_NAMES.CITADEL,
  src: accountant,
  name: "Accountant",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "О, искатели приключений, добро пожаловать в наш штаб. Здесь мы пытаемся наладить более-менее цивилизованную жизнь... Нам сказали уже про тебя. Мы можем предложить скромную, но всё-таки помощь.",
      options: [
        { text: "Кто ты?", nextNode: "who_are_you" },
        { text: "Что здесь происходит?", nextNode: "economic_direction" },
      ],
    },
    who_are_you: {
      text: "Я Алкедон, нечто среднее между мэром, бригадиром, нянькой и бухгалтером. Отвечаю за всё и вся. У нас тут периодически разные излишки образуются, можем периодами кое-чем делиться.",
      options: [
        {
          text: "Экономическое направление?",
          nextNode: "economic_direction",
        },
      ],
    },

    economic_direction: {
      text: "Здесь мы отвечаем за экономическую стратегию, хотите ознакомиться подробнее? Взаимовыгодное сотрудничество, так сказать...",
      options: [
        { text: "[Перейти к распределению ресурсов]", nextNode: "end" },
      ],
      flags: [DIALOGUE_FLAGS.ECONOMIC_INTRO],
    },
  },
};

const SECOND_QUESTION_OPTIONS = [
  {
    text: "То есть, вот такой скачек по сложности? 2+2 и теперь это?",
    nextNode: "correct_question_3",
    id: DIALOGUE_IDS.GHOST_CORRECT_ANSWER,
  },

  {
    text: "IV",
    nextNode: "correct_question_3",
    id: DIALOGUE_IDS.GHOST_CORRECT_ANSWER,
  },
  {
    text: "I",
    nextNode: "correct_question_3",
    id: DIALOGUE_IDS.GHOST_CORRECT_ANSWER,
  },
  {
    text: "II",
    nextNode: "correct_question_3",
    id: DIALOGUE_IDS.GHOST_CORRECT_ANSWER,
  },
];
const FOURTH_QUESTION_OPTIONS = [
  {
    text: "Два колеса",
    nextNode: "incorrect_question_5",
    id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
  },

  {
    text: "Три колеса",
    nextNode: "incorrect_question_5",
    id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
  },
  {
    text: "Это же полный идиотизм... Сколько колёс у машины? Смотря какая машина. Два, три, четыре, есть машины без колес - на гусеницах. Да и ты ведь призрак, да и в вашем мире нет машин. Зачем тебе вообще эта информация?",
    nextNode: "correct_question_5",
    id: DIALOGUE_IDS.GHOST_CORRECT_ANSWER,
  },
  {
    text: "Одно колесо",
    nextNode: "incorrect_question_5",
    id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
  },
];
const FIFTH_QUESTION_OPTIONS = [
  {
    text: "Острие",
    nextNode: "incorrect_question_6",
    id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
  },

  {
    text: "Дол",
    nextNode: "incorrect_question_6",
    id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
  },
  {
    text: "Навершие",
    nextNode: "incorrect_question_6",
    id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
  },
  {
    text: "Рукоять",
    nextNode: "correct_question_6",
    id: DIALOGUE_IDS.GHOST_CORRECT_ANSWER,
  },
];

const FINAL_OPTIONS = [
  {
    text: "[проверить результаты]",
    nextNode: "final",
    id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
  },
];

export const FINAL_FAIL_TEXT =
  "Ну что же вы так?.. Даже на артефакт не отгадали, скучные! Попробуем ещё раз?";
export const FINAL_FULL_FAIL_TEXT =
  "Мне надоело! Вы абсолютно глупы! Покиньте мою обитель пока не разорвала вас!";
export const FINAL_TEXT =
  "Отлично! Выбирай награду по вкусу - но помни, только одну вещь могу отдать, смотря на сколько вопросов ответил";
export const REWARD_ARTIFACT_OPTION = {
  text: "[получить артефакт]",
  nextNode: "end",
  id: DIALOGUE_IDS.GHOST_RECEIVE_ARTIFACT,
};
export const REWARD_HELMET_OPTION = {
  text: "[получить легендарный шлем]",
  nextNode: "end",
  id: DIALOGUE_IDS.GHOST_RECEIVE_HELMET,
};
export const LEAVE_OPTION = {
  text: "[покинуть]",
  nextNode: "end",
  id: DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_GHOST,
};
export const FINAL_DEFAULT_OPTIONS = [
  LEAVE_OPTION,
  {
    text: "[попробовать ещё раз]",
    nextNode: "game_started",
    id: DIALOGUE_IDS.GHOST_RESET_GAME,
  },
];

export const ghostDialog: DialogueTree = {
  id: BUILDING_NAMES.GHOST,
  src: ghost,
  name: "Призрак",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "О, привет, путешественники. Присаживайтесь, у меня здесь немного грязно, но не обращайте внимания, люди здесь редко бывают, надеюсь вам понравится. Так что привело вас сюда, красавчики, золото? Слава? Ответы на вопросы?",
      options: [
        {
          text: "[Так, мы пожалуй пойдём, знаешь, спасибо конечно за щедрое предложение]",
          nextNode: "end",
          id: DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_GHOST,
        },
        {
          text: "У нас здесь свои цели. То, что вокруг, твоих рук дело?",
          nextNode: "what_did_you_do",
        },
      ],
    },
    what_did_you_do: {
      text: "А, вы про них?.. Скажем так, они сами проявили недюжий интерес и поплатились за него. Сыграем в игру?.. Дам пять попыток. Ответишь правильно на большую часть вопросов дам артефакт. Если на все - то даже... [она указывает на какой-то из трупов], дам вот например его шлем. Просто скучно здесь немного, развлекаюсь как могу, и как видите вполне успешно.",
      options: [
        {
          text: "[Так, мы пожалуй пойдём, знаешь, спасибо конечно за щедрое предложение]",
          nextNode: "end",
          id: DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_GHOST,
        },
        {
          text: "А давай и сыграем!",
          nextNode: "game_started",
          id: DIALOGUE_IDS.START_GHOST_GAME,
        },
      ],
    },

    game_started: {
      text: "Начинаем... 2+2?",
      options: [
        {
          text: "Ты издеваешься? Какой 2+2?",
          nextNode: "incorrect_question_2",
          id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
        },
        {
          text: "4",
          nextNode: "correct_question_2",
          id: DIALOGUE_IDS.GHOST_CORRECT_ANSWER,
        },
        {
          text: "5",
          nextNode: "incorrect_question_2",
          id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
        },
        {
          text: "3",
          nextNode: "incorrect_question_2",
          id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
        },
      ],
    },

    incorrect_question_2: {
      text: "Если это и был ответ, то вы ошиблись. Следующий вопрос: Чему равна валентность стронция?",
      options: SECOND_QUESTION_OPTIONS,
    },

    correct_question_2: {
      text: "А по вам и не скажешь, лица интеллектом не обезображены. Двигаемся дальше: Чему равна валентность стронция?",
      options: SECOND_QUESTION_OPTIONS,
    },

    correct_question_3: {
      text: "Хм... да и сама в общем-то забыла, поэтому зачтем так. Следующий: Кузнец, который большой такой, всё ещё носит шляпу?..",
      options: [
        {
          text: "Нет",
          nextNode: "correct_question_4",
          id: DIALOGUE_IDS.GHOST_CORRECT_ANSWER,
        },
        {
          text: "Да что за вопросы-то такие?..",
          nextNode: "incorrect_question_4",
          id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
        },
        {
          text: "Да",
          nextNode: "incorrect_question_4",
          id: DIALOGUE_IDS.GHOST_INCORRECT_ANSWER,
        },
      ],
    },
    incorrect_question_4: {
      text: "А ведь я его частенько вижу... Не носит он шляпы. Следующий: сколько колёс у машины?",
      options: FOURTH_QUESTION_OPTIONS,
    },
    correct_question_4: {
      text: "А ты внимательный... Следующий вопрос: сколько колёс у машины?",
      options: FOURTH_QUESTION_OPTIONS,
    },

    incorrect_question_5: {
      text: "А я думаю - что у машины 8 колёс и не засчитываю ответ. Следующий вопрос: как называется та часть меча, за которую держатся?..",
      options: FIFTH_QUESTION_OPTIONS,
    },
    correct_question_5: {
      text: "Ведь и правда, вопрос некорректный... так и быть, зачту корректным ответом. Следующий вопрос: как называется та часть меча, за которую держатся?..",
      options: FIFTH_QUESTION_OPTIONS,
    },

    correct_question_6: {
      text: "Ответ верный, а вы старомодны, раз даже на это знаете ответ. Сверимся с результатами?",
      options: FINAL_OPTIONS,
    },
    incorrect_question_6: {
      text: "Даже интересно как ты тут выжил... Ах да, у вас же новомодное огнестрельное. В любом случае, ответ некорректный. Сверимся с результатами?",
      options: FINAL_OPTIONS,
    },

    final: {
      text: FINAL_TEXT,
      options: [
        LEAVE_OPTION,
        {
          text: "[попробовать ещё раз]",
          nextNode: "game_started",
          id: DIALOGUE_IDS.GHOST_RESET_GAME,
        },
      ],
    },
  },
};

export const crazyTraderDialog: DialogueTree = {
  id: BUILDING_NAMES.CRAZY_TRADER,
  src: crazyTrader,
  name: "Безумный торговец",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "Тише, Пигель, Тише, кто-то идёт... А, путники! Рад поприветствовать вас на ежегодной распродаже рук! Ну как... не только рук, быт старого мира, дохлые крысы и сверчки, ну посмотрите только! Да что я говорю, вы сами взгляните только!",
      options: [
        {
          text: "Эм... И тебе не хворать! А может есть что-нибудь, более толковое?",
          nextNode: "who_are_you",
        },
        {
          text: "[молча пройти мимо]",
          nextNode: "end",
          id: DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_TRADER,
        },
      ],
    },

    who_are_you: {
      text: "Толковое? А я думал в вас есть искра, что вы человек искусства. А тут судя по всему только простолюдины и обитают, снобы... Да, Пигель? [У вас складывается ощущение, что он разговаривает с чьей-то оторванной рукой на столе]",
      options: [
        {
          text: "Простолюдины? Оглянись, ты хоть понимаешь где ты вообще?..",
          nextNode: "elaborate",
        },
        {
          text: "[Оставить его одного]",
          nextNode: "end",
          id: DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_TRADER,
        },
      ],
    },

    elaborate: {
      text: `Я - прекрасно осведомлен, чего не скажешь о вас. Толковое, это значится, только пушки да... Кхм, броня? Я знаете ли совершенно против насилия! [Его передергивает, он искоса смотрит на руку, и переводит взгляд на вас]. Броня, дааа... есть. НО будет дорого! И я не уличный торгаш, никаких попыток мне тут выторговать подешевле! ${LEGENDARY_ARMOR_PRICE} золотых и эта чудесная броня ваша! Чуток отмыть от крови и как новая...`,
      options: [
        {
          text: `Скряга... [купить броню - отдать ${LEGENDARY_ARMOR_PRICE} золотых]`,
          nextNode: "end",
          id: DIALOGUE_IDS.BUY_LEGENDARY_ARMOR,
        },
        {
          text: "Да ты с ума сошёл? Оставь ее себе, больной...",
          nextNode: "end",
          id: DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_TRADER,
        },
      ],
    },
  },
};

export const tavernDialog: DialogueTree = {
  id: BUILDING_NAMES.TAVERN,
  src: potionTrader,
  name: "Potion Trader",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "Чего вылупился? Все рушится, реагентов нет, торговля не идёт, то засуха и не растёт ничего, то некого послать за сырьем. Зелья я продаю, когда есть что продавать конечно.",
      options: [{ text: "Почему перебои с реагентами?", nextNode: "reagents" }],
    },

    alreadyWelcomed: {
      text: "Что вас интересует?..",
      options: [
        {
          text: "Покажи что есть в наличии",
          nextNode: "end",
          id: DIALOGUE_IDS.TAVERN_BUY,
        },
        {
          text: "[сдать части тел]",
          nextNode: "end",
          id: DIALOGUE_IDS.RELEASE_PARTS,
        },
        { text: "Ничего.", nextNode: "end" },
      ],
    },

    receiveAlchemistryArtifactFirstTier: {
      text: "Что волком смотришь?.. Не забыл я о своем слове, держи, поможет тебе артефакт, завалялся у меня, от прошлой партии остался, оставили в займы на зелья - да не вернулись, вероятно и не пригодится им уже, да голову не забывай использовать. Сотрудничество не кончается на этом, приноси ещё, улучшу тебе приблуду эту.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
        },
      ],
    },
    receiveAlchemistryArtifactSecondTier: {
      text: "Десять... двадцать, так, здесь плюс 300%... а, молодец, продолжай в том же духе. Вот тебе и обновочка, караван проходил из других воспоминаний - подсказали за пару зелий как улучшить можно артефакт твой. Сейчас будет как новенький... Держи.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
        },
      ],
    },
    receiveAlchemistryArtifactThirdTier: {
      text: "Было время на изучение некоторой... литературы. Не буду долго тянуть, ты ведь почти мой партнер по бизнесу, вот тебе ещё одно улучшение. Скажу прямо - скидок не жди, это последнее чем я могу тебе помочь, но лохмотья эти мутантов неси - буду за деньги брать у тебя, на том и сойдёмся. Ну всё, не благодари, дверь вон там.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
        },
      ],
    },

    reagents: {
      text: "Ты оглох? Говорю перебои с сырьем, всё в мире знаешь ли лишено постоянства, а всякие искатели приключений прохлаждаются всё и докучают людям. Некому искать травы, да и на зверье не охотятся, то некому, то жизнь охотника коротка...",
      options: [
        {
          text: "Какие части тел тебя интересуют?",
          nextNode: "bodyParts",
        },
      ],
      flags: [DIALOGUE_FLAGS.BODY_PARTS],
    },

    bodyParts: {
      text: "Неси всё - без сопливых разберемся, если стабильно носить будешь, может столкуемся, в обиде не оставлю. Я знаешь, тоже лицо заинтересованное в продолжительности твоей жизни",
      options: [
        {
          text: "[Перейти к покупке]",
          nextNode: "end",
          id: DIALOGUE_IDS.TAVERN_BUY,
        },
      ],
    },
  },
};

export const DEFAULT_TAVERN_WELCOME_OPTIONS = [
  {
    text: "Покажи что есть в наличии",
    nextNode: "end",
    id: DIALOGUE_IDS.TRADER_BUY,
  },
  {
    text: "Какие ещё услуги я могу получить у тебя?",
    nextNode: "services",
    id: DIALOGUE_IDS.IMPROVE_BAG_INTRO,
  },
];

export const traderDialog: DialogueTree = {
  id: BUILDING_NAMES.SHOP,
  src: watchmen,
  name: "Торговец экипировки",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "Новый покупатель! Привет... У нас тут немного бардак, но мы всегда рады посетителям.",
      options: DEFAULT_TAVERN_WELCOME_OPTIONS,
    },

    alreadyWelcomed: {
      text: "Что вас интересует?..",
      options: [
        {
          text: "Покажи что есть в наличии",
          nextNode: "end",
          id: DIALOGUE_IDS.TRADER_BUY,
        },
        { text: "Ничего.", nextNode: "end" },
      ],
    },

    services: {
      text: "Есть у меня подмастерье, бестолочь та ещё... Но на что-нибудь да сгодится. Могу отрядить его сумки тебе пошить. Чем больше аппетиты - тем сильнее раскошелиться придётся. Для начала скажем... 5000 золотых?",
      options: [
        {
          text: "[купить улучшение сумки на 8 дополнительных слотов]",
          nextNode: "end",
          id: DIALOGUE_IDS.BUY_BAG_IMPROVEMENT,
        },
        { text: "У меня нет такой суммы при себе.", nextNode: "end" },
      ],
    },
  },
};

export const finalDialog: DialogueTree = {
  id: BUILDING_NAMES.SHOP,
  src: mergedMass,
  name: "Дмитрий Александрович",
  startNode: "welcome",
  nodes: {
    welcome: {
      text: "Вот мы и встретились. Знаете, я догадывался что, что-то подобное могло произойти. Мерзкие, поганые, вечно сующие свой нос туда, куда не следует. Неужели я так много хотел, просто вернуть ее, побыть снова с Кларой?..",
      options: [
        {
          text: "[слушать]",
          nextNode: "next1",
        },
      ],
    },

    next1: {
      text: "Вы никого никогда не любили, если вы не в состоянии понять меня. Понять моё состояние. Вы знаете, что такое настоящая любовь?.. В вас есть хотя бы частичка эмпатии?.. Ненавижу, костьми лягу здесь и там, но не дам разрушить проект всей моей жизни, я всё отдал этому",
      options: [
        {
          text: "[слушать]",
          nextNode: "next2",
        },
      ],
    },

    next2: {
      text: "Всё потеряло краски, смысл, только реализация этой идеи подпитывала меня все эти годы. Мне противно жить и находиться среди вас, кто говорит что любит, и тут же способен ударить, объясняя это 'любовью'...",
      options: [
        {
          text: "Ты ведь безумен, ты опасен. Ты слышал себя... со стороны?.. Скорбь затмила твой взгляд, мысли запутались, ты людей погубил ради себя, ради своей мечты, боль, что ты испытал - ты в многократном размере подарил другим. Ты бешеное животное.",
          nextNode: "finalNode",
        },
      ],
    },

    finalNode: {
      text: "ХВАТИТ. Я пытался воззвать вас к голосу разума, думал вы способны на диалог, мы поймём друг друга, но видимо не судьба. В этом мире правлю я.",
      options: [
        {
          text: "[приготовиться к бою]",
          nextNode: "end",
          flags: [DIALOGUE_FLAGS.FINAL_DIALOG_ENDED],
        },
      ],
    },
  },
};

export const resetDialogs = () => {
  smithDialog.startNode = "welcome";
  const smithReleaseOption = smithDialog.nodes.alreadyWelcomed.options.find(
    (option) =>
      option.id === DIALOGUE_IDS.RELEASE_ORE ||
      option.id === DIALOGUE_IDS.RELEASE_ORE_WITH_ARTIFACT,
  );

  if (smithReleaseOption) {
    smithReleaseOption.nextNode = "end";
    smithReleaseOption.id = DIALOGUE_IDS.RELEASE_ORE;
  }

  const tavernReleaseOption = tavernDialog.nodes.alreadyWelcomed.options.find(
    (option) =>
      option.id === DIALOGUE_IDS.RELEASE_PARTS ||
      option.id === DIALOGUE_IDS.RELEASE_PARTS_WITH_ARTIFACT,
  );

  if (tavernReleaseOption) {
    tavernReleaseOption.nextNode = "end";
    tavernReleaseOption.id = DIALOGUE_IDS.RELEASE_PARTS;
  }

  const priestReleaseOption = priestDialog.nodes.alreadyWelcomed.options.find(
    (option) =>
      option.id === DIALOGUE_IDS.RELEASE_TREASURES ||
      option.id === DIALOGUE_IDS.RELEASE_TREASURES_WITH_ARTIFACT,
  );

  if (priestReleaseOption) {
    priestReleaseOption.id = DIALOGUE_IDS.RELEASE_TREASURES;
    priestReleaseOption.nextNode = "end";
  }

  priestDialog.startNode = "welcome";
  starCounterDialog.startNode = "welcome";
  starCounterDialog.nodes.almanac.options = DEFAULT_ALMANAC_OPTIONS;
  citadelDialog.startNode = "welcome";
  tavernDialog.startNode = "welcome";
  traderDialog.startNode = "welcome";
  ghostDialog.startNode = "welcome";
  traderDialog.nodes.welcome.options = DEFAULT_TAVERN_WELCOME_OPTIONS;
};

export const resetReleaseOptions = () => {
  const smithReleaseOption = smithDialog.nodes.alreadyWelcomed.options.find(
    (option) => option.id === DIALOGUE_IDS.RELEASE_ORE_WITH_ARTIFACT,
  );

  if (smithReleaseOption) {
    smithReleaseOption.id = DIALOGUE_IDS.RELEASE_ORE;
  }

  const tavernReleaseOption = tavernDialog.nodes.alreadyWelcomed.options.find(
    (option) => option.id === DIALOGUE_IDS.RELEASE_PARTS_WITH_ARTIFACT,
  );

  if (tavernReleaseOption) {
    tavernReleaseOption.id = DIALOGUE_IDS.RELEASE_PARTS;
  }

  const priestReleaseOption = priestDialog.nodes.alreadyWelcomed.options.find(
    (option) => option.id === DIALOGUE_IDS.RELEASE_TREASURES_WITH_ARTIFACT,
  );

  if (priestReleaseOption) {
    priestReleaseOption.id = DIALOGUE_IDS.RELEASE_TREASURES;
  }

  starCounterDialog.nodes.almanac.options = DEFAULT_ALMANAC_OPTIONS;
  ghostDialog.startNode = "welcome";
};
