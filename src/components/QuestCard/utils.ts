import { DUNGEONS } from "../../entities";
import portal from "../../assets/quests/portal.png";
import goblin from "../../assets/quests/goblin.png";
import find from "../../assets/quests/find.png";

export const getQuestDataByType = (type: DUNGEONS) => {
  if (type === DUNGEONS.CLOSE_PORTAL) {
    return {
      src: portal,
      title: "Закрытие портала",
      description:
        "У нас внеочередной наплыв искажений памяти. Портал где-то совсем рядом открылся, я это и по головным болям ощущаю и по количеству пропадающих припасов. Проверь подземелья, а я тебе отсыплю чего-нибудь.",
      reward: ["exp", "gold", "items"],
    };
  }

  if (type === DUNGEONS.CATCH_GOBLIN) {
    return {
      src: goblin,
      title: "Поимка гоблина",
      description:
        "У нас тут завёлся один... наглый вредитель, который постоянно крадёт вещи и пытается заблокировать данные о [вырезано]. Поймай этого чудака, пожалуйста?.. Потом делай что хочешь с ним.",
      reward: ["exp", "gold"],
    };
  }

  if (type === DUNGEONS.FIND) {
    return {
      src: find,
      title: "Поиск предмета",
      description:
        "Я тут намедни делал вылазку и кажется... Потерял фамильный меч. Я помню примерно место, но смелости у меня с последней экспедиции как-то поубавилось. Может быть вы смогли бы помочь мне с этим?",
      reward: ["exp", "gold", "items"],
    };
  }

  return {
    src: find,
    title: "Поиск предмета",
    description: "Любимая фамильная вещь пропала, найди ее !",
    reward: ["exp", "gold", "items"],
  };
};
