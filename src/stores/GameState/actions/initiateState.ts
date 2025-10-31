import { calculateStatistics } from "../../utils";
import { StoreSet } from "./types";

export const initiateState = (set: StoreSet) => () =>
  set((state) => {
    const stateCopy = { ...state };
    stateCopy.statistics = {};
    stateCopy.abilities = {};
    stateCopy.gear = {};
    stateCopy.effects = {};

    // инициализируем хар-ки
    state.player.party.forEach((player) => {
      stateCopy.statistics![player.name] = calculateStatistics(player);

      player.perksList.forEach((perk) => {
        if (perk.isAbility) {
          // нужна утиль функция возвращающая модель Ability, она имеет тип, внутри стейта будет функция useAbility,
          //  ей передается тип и она в зависимости от него делает что-то
          // stateCopy.abilities![player.name] = createAbility(perk);
        }
      });
    });

    // if (stateCopy.player.gear_memoized && !state.gear) {
    //   // здесь вызываем функцию, которая сначала парсит строку на объект с данными
    //   const parsedGear = parseGear(stateCopy.player.gear_memoized);
    //   if (parsedGear) {
    //     // затем мы должны вызывать мап функцию, которая из строки сформирует нужные объекты с уже заполненными данными, иконкой, эффектами, статами
    //     parsedGear.forEach((gear) => {
    //       // ф-ия возвращает поле characterName и массив вещей, с уже заполненными полями
    //       const { characterName, ...rest } = generateGear(gear);

    // const currentCharacterStats = stateCopy.statistics[characterName];
    //       rest.forEach((equipment) => {
    //     if ( equipment.type === "ARTIFACT") {
    //        const {effectName, effectValue} = getEffectFromGear(equipment);
    //        state.effects[effectName] = effectValue;
    //     }

    //         if (equipment.type === "WEAPON") {
    //           // из экипировки вычисляем урон и прибавляем к значениям, которые высчитали из хар-ик
    //           currentCharacterStats.minAttack += equipment.minAttack;
    //           currentCharacterStats.maxAttack += equipment.maxAttack;
    //         }
    //         if (equipment.type === "ARMOR") {
    //           // из экипировки вычисляем броню и устанавливаем
    //           currentCharacterStats.defense = equipment.armor;
    //         }
    // const { statName, statValue } = getStatsFromItem(equipment);
    //           currentCharacterStats[statName] += statValue;
    //       });
    //       stateCopy.gear![characterName] = rest;
    //     });
    //   }
    // }

    console.log("so we fire too?");
    return {
      ...state,
      statistics: { ...(stateCopy.statistics || {}) },
      gear: { ...(stateCopy.gear || {}) },
      abilities: { ...(stateCopy.abilities || {}) },
    };
  });
