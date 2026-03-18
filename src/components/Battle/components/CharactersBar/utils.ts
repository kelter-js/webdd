import { CLASSES } from "../../../../entities/characterClasses";

import sniper from "../../../../assets/avatars/sniper.png";
import medic from "../../../../assets/avatars/medic.png";
import skeleton from "../../../../assets/avatars/dead.png";
import tank from "../../../../assets/avatars/tank.png";
import { Battle, Statistics } from "../../../../types/gameState";
import { getRandom } from "../../../../utils";
import { calculateCritDamage } from "../../../../stores/constants";

export const getUnitAvatarSrc = (unitType: CLASSES, isDead: boolean) => {
  if (isDead) {
    return skeleton;
  }

  switch (unitType) {
    case CLASSES.SNIPER: {
      return sniper;
    }

    case CLASSES.MEDIC: {
      return medic;
    }

    case CLASSES.TANK: {
      return tank;
    }

    default: {
      return skeleton;
    }
  }
};

export const calculateDamage = (
  battleModel: Battle,
  statistics: Record<string, Statistics>,
  source: string,
  target: string,
) => {
  const isTargetEvading = getRandom(1, 100);
  const targetEnemy = battleModel.enemy.party.find(
    (enemy) => enemy.id === target,
  );
  const sourcePlayer = statistics[source];

  if (!targetEnemy || !sourcePlayer) {
    return {
      model: battleModel,
      isEvaded: false,
      isCritical: false,
      damage: null,
    };
  }

  if (isTargetEvading < targetEnemy.evasionChance) {
    return {
      model: battleModel,
      isEvaded: true,
      isCritical: false,
      damage: null,
    };
  }
  const battleModelCopy = { ...battleModel };

  const characterCritChance = Math.min(sourcePlayer.critChance, 90);

  const isCrit = getRandom(1, 100) < characterCritChance;

  let damage = getRandom(sourcePlayer.minAttack, sourcePlayer.maxAttack);

  if (isCrit) {
    damage = Math.round(calculateCritDamage(damage, sourcePlayer.critStrike));
  }

  //FIXME: нужна доработка по текущим перкам

  // здесь же навешиваем эффекты, проводим доп вычисления, установка hasTurn: false в другом месте - снаружи, после анимаций
  battleModelCopy.enemy = {
    ...battleModelCopy.enemy,
    party: battleModelCopy.enemy.party.map((enemy) => {
      return enemy.id === target
        ? { ...enemy, hp: Math.max(enemy.hp - damage, 0) }
        : enemy;
    }),
  };

  if (sourcePlayer.vampire) {
    battleModelCopy.player = {
      ...battleModelCopy.player,
      party: battleModelCopy.player.party.map((player) => {
        return player.name === source
          ? {
              ...player,
              currentHealth: Math.min(
                player.currentHealth +
                  Math.round(damage * (sourcePlayer.vampire! / 100)),
                sourcePlayer.maxHealth,
              ),
            }
          : player;
      }),
    };
  }

  return {
    model: battleModelCopy,
    isEvaded: false,
    isCritical: isCrit,
    damage,
  };
};
