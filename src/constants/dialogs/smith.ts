import { Dialogues } from "../../types/dialogue";
import blacksmith from "../../assets/npc/smith.png";
import questDesk from "../../assets/npc/quest_desk.png";
import accountant from "../../assets/npc/accountant.png";
import priest from "../../assets/npc/priest.png";
import { BUILDING_NAMES } from "..";
import { DIALOGUE_FLAGS } from "../../entities/dialogues";

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
