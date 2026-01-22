import { Dialogues } from "../../types/dialogue";
import blacksmith from "../../assets/npc/smith.png";
import questDesk from "../../assets/npc/quest_desk.png";
import potionTrader from "../../assets/npc/potion-trader.png";
import accountant from "../../assets/npc/accountant.png";
import priest from "../../assets/npc/priest.png";
import starcounter from "../../assets/npc/starcounter.png";
import watchmen from "../../assets/npc/watchmen.png";
import { BUILDING_NAMES } from "..";
import { DIALOGUE_FLAGS, DIALOGUE_IDS } from "../../entities/dialogues";

export const smithDialog: Dialogues = {
  intro_npc: {
    id: "intro_npc",
    src: blacksmith,
    name: "The Blacksmith",
    startNode: "welcome",
    nodes: {
      welcome: {
        text: "Добро пожаловать в Темнолесье...",
        options: [
          { text: "Кто ты?", nextNode: "who_are_you" },
          { text: "Что здесь происходит?", nextNode: "what_happened" },
          {
            text: "[открыть лавку]",
            nextNode: "end",
            id: DIALOGUE_IDS.SMITH_TRADE,
          },
        ],
      },
      who_are_you: {
        text: "Я страж этих руин. Много лет... [пауза] Но это неважно.",
        options: [{ text: "[Уйти]", nextNode: "end" }],
      },
      what_happened: {
        text: "Тьма поглотила этот край... [пауза] Вы должны сражаться.",
        options: [{ text: "[Уйти]", nextNode: "end" }],
      },
      end: {
        text: "Удачи, путник...",

        options: [],
      },
    },
  },
};

export const questDeskDialog: Dialogues = {
  intro_npc: {
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
  },
};

export const priestDialog: Dialogues = {
  intro_npc: {
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
        ],
        flags: [DIALOGUE_FLAGS.PRIEST_WELCOME],
      },
      greetings: {
        text: "Всё ещё ищешь ответы?.. Я вот тоже в поисках.",
        options: [
          { text: "И всё же... кто ты?", nextNode: "who_are_you" },
          {
            text: "Мне нужна твоя помощь... [вылечиться]",
            nextNode: "heal",
          },
        ],
      },

      who_are_you: {
        text: "Какая-то часть моей личности погибла. Мы все здесь также как и ты - помним только начиная... От этого места [окидывает местность взглядом]. Я - жрец времени. Я лечу людей по мере сил, подбадриваю их, иногда убиваю время в библиотеке, жадно поглощая книги, в надежде найти ответ на вопрос что это за место, и как я здесь оказался. Вся моя жизнь как будто в сумрачной дымке.",
        options: [{ text: "[Уйти]", nextNode: "end" }],
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
  },
};

export const starCounterDialog: Dialogues = {
  intro_npc: {
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
  },
};

export const citadelDialog: Dialogues = {
  intro_npc: {
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
  },
};

export const tavernDialog: Dialogues = {
  intro_npc: {
    id: BUILDING_NAMES.TAVERN,
    src: potionTrader,
    name: "Potion Trader",
    startNode: "welcome",
    nodes: {
      welcome: {
        text: "Чего вылупился? Все рушится, реагентов нет, торговля не идёт, война постоянная. Зелья я продаю, когда есть что продавать конечно.",
        options: [
          { text: "Почему перебои с реагентами?", nextNode: "reagents" },
          {
            text: "Покажи что есть в наличии",
            nextNode: "reagents",
            id: DIALOGUE_IDS.TAVERN_BUY,
          },
        ],
      },

      alreadyWelcomed: {
        text: "Что вас интересует?..",
        options: [
          {
            text: "Покажи что есть в наличии",
            nextNode: "end",
            id: DIALOGUE_IDS.TAVERN_BUY,
          },
          { text: "Ничего.", nextNode: "end" },
        ],
      },

      reagents: {
        text: "Ты оглох? Говорю война идёт, а всякие искатели приключений прохлаждаются всё. Некому искать травы, да и части тварей никто не таскает...",
        options: [
          {
            text: "Какие части тел тебя интересуют?",
            nextNode: "bodyParts",
          },
        ],
        flags: [DIALOGUE_FLAGS.BODY_PARTS],
      },

      bodyParts: {
        text: "",
        options: [
          {
            text: "[Перейти к покупке]",
            nextNode: "end",
            id: DIALOGUE_IDS.TAVERN_BUY,
          },
        ],
      },
    },
  },
};

export const DEFAULT_TAVERN_WELCOME_OPTIONS = [
  { text: "Почему перебои с реагентами?", nextNode: "reagents" },
  {
    text: "Покажи что есть в наличии",
    nextNode: "reagents",
    id: DIALOGUE_IDS.TAVERN_BUY,
  },
  {
    text: "Какие ещё услуги я могу получить у тебя?",
    nextNode: "services",
    id: DIALOGUE_IDS.IMPROVE_BAG_INTRO,
  },
];

export const watchmenDialog: Dialogues = {
  intro_npc: {
    id: BUILDING_NAMES.SHOP,
    src: watchmen,
    name: "Торговец экипировки",
    startNode: "welcome",
    nodes: {
      welcome: {
        text: "Чего вылупился? Все рушится, реагентов нет, торговля не идёт, война постоянная. Зелья я продаю, когда есть что продавать конечно.",
        options: DEFAULT_TAVERN_WELCOME_OPTIONS,
      },

      alreadyWelcomed: {
        text: "Что вас интересует?..",
        options: [
          {
            text: "Покажи что есть в наличии",
            nextNode: "end",
            id: DIALOGUE_IDS.WATCHMEN_BUY,
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

      reagents: {
        text: "Ты оглох? Говорю война идёт, а всякие искатели приключений прохлаждаются всё. Некому искать травы, да и части тварей никто не таскает...",
        options: [
          {
            text: "Какие части тел тебя интересуют?",
            nextNode: "bodyParts",
          },
        ],
        flags: [DIALOGUE_FLAGS.BODY_PARTS],
      },

      bodyParts: {
        text: "",
        options: [
          {
            text: "[Перейти к покупке]",
            nextNode: "end",
            id: DIALOGUE_IDS.WATCHMEN_BUY,
          },
        ],
      },
    },
  },
};

export const resetDialogs = () => {
  smithDialog.intro_npc.startNode = "welcome";
  priestDialog.intro_npc.startNode = "welcome";
  starCounterDialog.intro_npc.startNode = "welcome";
  citadelDialog.intro_npc.startNode = "welcome";
  tavernDialog.intro_npc.startNode = "welcome";
  watchmenDialog.intro_npc.startNode = "welcome";
  watchmenDialog.intro_npc.nodes.welcome.options =
    DEFAULT_TAVERN_WELCOME_OPTIONS;
};
