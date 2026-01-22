import { Battle } from "../../../types/gameState";
import { getRandom, wait } from "../../../utils";
import { chooseRandomTargetDefault } from "./utils";

const MIN_HEALTH_PERCENTAGE_TO_HEAL = 35;

// export const goblinAI = (battle: Battle) =>
//   defaultCreatureBattleAi(battle, {
//     chooseTarget: chooseRandomTargetDefault,
//   });

// export const vampireAI = (battle: Battle) =>
//   defaultCreatureBattleAi(battle, {
//     calculateDamage: (enemy, target) => {
//       const dmg = getRandom(enemy.minAttack, enemy.maxAttack);
//       enemy.health = Math.min(
//         enemy.maxHealth,
//         enemy.health + Math.round(dmg * 0.3)
//       );
//       return dmg;
//     },
//   });

// потом используем так
// const calculateDamage = overrides?.calculateDamage ?? ((e, t) => getRandom(e.minAttack, e.maxAttack));

export const defaultCreatureBattleAi = async (battle: Battle) => {
  // создаем задержку перед ходом для проигрывания анимаций
  await wait();
  const { enemy, player } = battle;

  const aliveParty = player.party.filter((p) => p.currentHealth > 0);
  if (aliveParty.length === 0) {
    return { isGameOver: true, model: battle };
  }

  const target = chooseRandomTargetDefault(aliveParty);

  // FIXME - тут добавим ещё одну задержку, после выбора таргета - это нужно делать на внешнем уровне после калькуляции хода
  // выделяем иконку персонажа и только потом наносим урон

  // FIXME - на будущее тут нужна ф-ия калькуляции урона исходя из модели противника
  // const damage = calculateDamage(enemy, target);
  const damage = getRandom(enemy.minAttack, enemy.maxAttack);

  // FIXME
  // Возможно добавляем какой-то эффект или хилим себя
  // if (
  //   enemy.health <
  //   Math.round((enemy.maxHealth / 100) * MIN_HEALTH_PERCENTAGE_TO_HEAL)
  // ) {
  // логика хила противника - если он ещё может это делать
  // }

  // FIXME: тут нужна калькуляция шанса того, что по персонажу не прошёл дамаг

  const updatedParty = player.party.map((char) =>
    char.name === target.name
      ? { ...char, currentHealth: Math.max(0, char.currentHealth - damage) }
      : char
  );

  const aliveAfterBattle = player.party.filter((p) => p.currentHealth > 0);

  if (aliveAfterBattle.length === 0) {
    return { isGameOver: true, model: battle };
  }

  return {
    isGameOver: false,
    // FIXME: модель может обновляться иначе, могут быть увеличены ХП у врага, он может себя баффнуть
    // Как только определится логика с бафами и хилом - так и обновится модель возвращаемая из функции
    target: target.name,
    model: { ...battle, player: { ...battle.player, party: updatedParty } },
  };
};
