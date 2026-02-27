import { DialogueTree } from "../../types/dialogue";
import blacksmith from "../../assets/npc/smith.png";
import questDesk from "../../assets/npc/quest_desk.png";
import potionTrader from "../../assets/npc/potion-trader.png";
import accountant from "../../assets/npc/accountant.png";
import priest from "../../assets/npc/priest.png";
import starcounter from "../../assets/npc/starcounter.png";
import watchmen from "../../assets/npc/watchmen.png";
import { BUILDING_NAMES } from "..";
import { DIALOGUE_FLAGS, DIALOGUE_IDS } from "../../entities/dialogues";

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
          // тут нужно реальное айди получения 1 тира артефакта
          // id: DIALOGUE_IDS.RELEASE_ORE,
        },
      ],
    },
    receiveSmithArtifactSecondTier: {
      text: "В этот раз на меня нашло вдохновение, я там чуточку подрихтовал, юстировочку провел... Должно быть получше. Приноси ещё руду и я ещё чего-нибудь придумаю.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
          // тут нужно реальное айди получения 2 тира артефакта
          // id: DIALOGUE_IDS.RELEASE_ORE,
        },
      ],
    },
    receiveSmithArtifactThirdTier: {
      text: "Думаю, это пик моего мастерства. Держи, руду можешь приносить - я ее с радостью куплю, буду ставить на поток свою работу, лучше уже точно не смогу тебе сделать, боюсь что просто сломаю эту вещь.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
          // тут нужно реальное айди получения 3 тира артефакта
          // id: DIALOGUE_IDS.RELEASE_ORE,
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
          // тут нужно реальное айди получения 1 тира артефакта
          // id: DIALOGUE_IDS.RELEASE_ORE,
        },
      ],
    },
    receivePriestArtifactSecondTier: {
      text: "Моя коллекция значительно выросла - значит пришло время и тебе воздать должное. Я придумал как можно улучшить этот артефакт. [он забирает его на несколько минут, после передает обратно]. Мне нравится результат моей работы, надеюсь ты тоже оценишь. Жду ещё пополнение в мою коллекцию.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
          // тут нужно реальное айди получения 2 тира артефакта
          // id: DIALOGUE_IDS.RELEASE_ORE,
        },
      ],
    },
    receivePriestArtifactThirdTier: {
      text: "Ты только посмотри... разве она не идеальна?.. Да я теперь любого на ярмарке уделаю собирателя, даже Дункана из соседней... А не важно. Спасибо тебе. Ты можешь продолжать носить вещи, возможно когда-нибудь перепрофилируюсь и открою свою лавку... И буду продавать излишки. Я смог улучшить твой артефакт ещё раз, прими этот подарок от всего сердца, ты мне очень помог.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
          // тут нужно реальное айди получения 3 тира артефакта
          // id: DIALOGUE_IDS.RELEASE_ORE,
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
          flags: [DIALOGUE_FLAGS.HEAL],
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
      flags: [DIALOGUE_FLAGS.HEAL],
    },
    end: {
      text: "Удачи, путник...",

      options: [],
    },
  },
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
      options: [
        {
          text: "[открыть альманах]",
          nextNode: "end",
          id: DIALOGUE_IDS.ALMANAC,
        },
        {
          text: "[Уйти]",
          nextNode: "end",
        },
      ],
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
      text: "О, искатели приключений, добро пожаловать в наш штаб. Здесь мы пытаемся наладить более-менее цивилизованную жизнь...",
      options: [
        { text: "Кто ты?", nextNode: "who_are_you" },
        { text: "Что здесь происходит?", nextNode: "economic_direction" },
      ],
    },
    who_are_you: {
      text: "Я Алкедон, нечто среднее между мером, бригадиром, нянькой и бухгалтером. Отвечаю за экономическое направление.",
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
          // тут нужно реальное айди получения 1 тира артефакта
          // id: DIALOGUE_IDS.RELEASE_ORE,
        },
      ],
    },
    receiveAlchemistryArtifactSecondTier: {
      text: "Десять... двадцать, так, здесь плюс 300%... а, молодец, продолжай в том же духе. Вот тебе и обновочка, караван проходил из других воспоминаний - подсказали за пару зелий как улучшить можно артефакт твой. Сейчас будет как новенький... Держи.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
          // тут нужно реальное айди получения 2 тира артефакта
          // id: DIALOGUE_IDS.RELEASE_ORE,
        },
      ],
    },
    receiveAlchemistryArtifactThirdTier: {
      text: "Было время на изучение некоторой... литературы. Не буду долго тянуть, ты ведь почти мой партнер по бизнесу, вот тебе ещё одно улучшение. Скажу прямо - скидок не жди, это последнее чем я могу тебе помочь, но лохмотья эти мутантов неси - буду за деньги брать у тебя, на том и сойдёмся. Ну всё, не благодари, дверь вон там.",
      options: [
        {
          text: "Спасибо, мне это точно поможет",
          nextNode: "end",
          // тут нужно реальное айди получения 3 тира артефакта
          // id: DIALOGUE_IDS.RELEASE_ORE,
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

export const resetDialogs = () => {
  smithDialog.startNode = "welcome";
  const smithReleaseOption = smithDialog.nodes.alreadyWelcomed.options.find(
    (option) => option.id === DIALOGUE_IDS.RELEASE_ORE,
  );

  if (smithReleaseOption) {
    smithReleaseOption.nextNode = "end";
  }

  const tavernReleaseOption = tavernDialog.nodes.alreadyWelcomed.options.find(
    (option) => option.id === DIALOGUE_IDS.RELEASE_PARTS,
  );

  if (tavernReleaseOption) {
    tavernReleaseOption.nextNode = "end";
  }

  const priestReleaseOption = priestDialog.nodes.alreadyWelcomed.options.find(
    (option) => option.id === DIALOGUE_IDS.RELEASE_TREASURES,
  );

  if (priestReleaseOption) {
    priestReleaseOption.nextNode = "end";
  }

  priestDialog.startNode = "welcome";
  starCounterDialog.startNode = "welcome";
  citadelDialog.startNode = "welcome";
  tavernDialog.startNode = "welcome";
  traderDialog.startNode = "welcome";
  traderDialog.nodes.welcome.options = DEFAULT_TAVERN_WELCOME_OPTIONS;
};
