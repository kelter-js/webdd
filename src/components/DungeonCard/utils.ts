import { DUNGEONS } from "../../entities";
import quest from "../../assets/dungeon/quest.png";
import story from "../../assets/dungeon/story.png";

export const getDungeonDataByType = (type: DUNGEONS) => {
  if (type === DUNGEONS.CLOSE_PORTAL) {
    return {
      src: quest,
      title: "Закрытие портала",
      description:
        "У нас внеочередной наплыв искажений памяти. Портал где-то совсем рядом открылся, я это и по головным болям ощущаю и по количеству пропадающих припасов. Проверь подземелья, а я тебе отсыплю чего-нибудь.",
    };
  }

  if (type === DUNGEONS.CATCH_GOBLIN) {
    return {
      src: quest,
      title: "Поимка гоблина",
      description:
        "У нас тут завёлся один... наглый вредитель, который постоянно крадёт вещи и пытается заблокировать данные о [вырезано]. Поймай этого чудака, пожалуйста?.. Потом делай что хочешь с ним.",
    };
  }

  if (type === DUNGEONS.FIND) {
    return {
      src: quest,
      title: "Поиск предмета",
      description:
        "Я тут намедни делал вылазку и кажется... Потерял фамильный меч. Я помню примерно место, но смелости у меня с последней экспедиции как-то поубавилось. Может быть вы смогли бы помочь мне с этим?",
    };
  }

  return {
    src: story,
    title: "Сюжет",
    description: "Узнаем, что же ждёт дальше...",
  };
};
