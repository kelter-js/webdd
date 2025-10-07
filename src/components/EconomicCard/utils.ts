import { ECONOMIC_TYPES } from "../../entities";
import alchemistry from "../../assets/economic/alchemistry.png";
import weaponry from "../../assets/economic/weaponry.png";
import fish from "../../assets/economic/fish.png";

export const getEconomicBranchDataByType = (type: ECONOMIC_TYPES) => {
  // тут нужна логика - в зависимости от тира возвращать разное название, но суть та же

  if (type === ECONOMIC_TYPES.ALCHEMISTRY) {
    return {
      src: alchemistry,
      title: "Алхимия",
      description:
        "Алхимики будут стараться для вас изготовить несколько зелий раз в день (1 день - 1 подземелье)",
      reward: ["potions"],
    };
  }

  if (type === ECONOMIC_TYPES.WEAPONRY) {
    return {
      src: weaponry,
      title: "Оружейники",
      description:
        "Оружейники будут раз в день поставлять для вас оружие или броню (1 день - 1 подземелье)",
      reward: ["weapons", "armors"],
    };
  }

  if (type === ECONOMIC_TYPES.FISHING) {
    return {
      src: fish,
      title: "Рыбная ловля",
      description:
        "Вы будете получать золото от городских продаж рыбы раз в день (1 день - 1 подземелье)",
      reward: ["gold"],
    };
  }

  return {
    src: fish,
    title: "Рыбная ловля",
    description:
      "Вы будете получать золото от городских продаж рыбы раз в день (1 день - 1 подземелье)",
    reward: ["gold"],
  };
};
