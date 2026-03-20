import { CLASSES } from "../../../../entities/characterClasses";

import sniper from "../../../../assets/avatars/sniper.png";
import medic from "../../../../assets/avatars/medic.png";
import skeleton from "../../../../assets/avatars/dead.png";
import tank from "../../../../assets/avatars/tank.png";
import { Battle, Statistics } from "../../../../types/gameState";
import { getRandom } from "../../../../utils";
import { calculateCritDamage } from "../../../../stores/constants";
import { SNIPER_PERKS } from "../../../../constants/perks";
import { EFFECTS } from "../../../../entities/effects";
import { DamageData } from "../../types";

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

const isSuccessRoll = (chance: number) => {
  const roll = getRandom(0, 100);
  return roll < chance;
};

export const calculateDamage = (
  battleModel: Battle,
  statistics: Record<string, Statistics>,
  source: string,
  target: string,
): { model: Battle; damageModel: DamageData[] | null } => {
  const isTargetEvading = getRandom(1, 100);
  const targetEnemy = battleModel.enemy.party.find(
    (enemy) => enemy.id === target,
  );
  const sourcePlayer = statistics[source];

  const playerData = battleModel.player.party.find(
    (player) => player.name === source,
  );

  if (!targetEnemy || !sourcePlayer || !playerData) {
    return {
      model: battleModel,
      damageModel: null,
    };
  }

  if (isTargetEvading < targetEnemy.evasionChance) {
    return {
      model: battleModel,
      damageModel: [
        {
          target,
          damage: null,
          isCritical: false,
          isEvasion: true,
        },
      ],
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

  const enemyEffectsCopy = { ...battleModel.enemy.effects };
  const playerEffectsCopy = { ...battleModel.player.effects };

  const perkIds = playerData.perksList.map(({ id }) => id);

  let vampireEffect = sourcePlayer.vampire;
  let hasRichochette = false;
  let richochetteDamage = null;

  // Обрабатываем перки снайпера
  if (playerData.characterClass === CLASSES.SNIPER) {
    if (perkIds.includes(SNIPER_PERKS.SHOCKER)) {
      // 15% шанс прока перка
      const isSuccess = isSuccessRoll(15);

      if (isSuccess) {
        enemyEffectsCopy[target].list.push({ type: EFFECTS.STUN, duration: 1 });
      }
    }

    if (perkIds.includes(SNIPER_PERKS.LIFE_STEALER)) {
      const isSuccess = isSuccessRoll(10);

      if (isSuccess) {
        vampireEffect = (vampireEffect || 0) + 10;
      }
    }

    if (perkIds.includes(SNIPER_PERKS.DAMAGE_INSPIRATION)) {
      const isSuccess = isSuccessRoll(20);

      if (isSuccess) {
        playerEffectsCopy[target].list.push({
          type: EFFECTS.INSPIRED,
          duration: 3,
        });
      }
    }

    if (perkIds.includes(SNIPER_PERKS.RICOCHETTE)) {
      const isSuccess = isSuccessRoll(10);

      if (isSuccess) {
        hasRichochette = true;
      }
    }

    if (perkIds.includes(SNIPER_PERKS.BREACHER)) {
      const isSuccess = isSuccessRoll(10);

      if (isSuccess) {
        enemyEffectsCopy[target].list.push({
          type: EFFECTS.BROKE,
          duration: 2,
        });
      }
    }
  }

  // Обрабатываем перки медика
  if (playerData.characterClass === CLASSES.MEDIC) {
  }

  // Обрабатываем перки танка
  if (playerData.characterClass === CLASSES.TANK) {
  }

  if (hasRichochette) {
    richochetteDamage = Math.round(damage / 2);
  }

  if (
    enemyEffectsCopy[target].list.find(
      (effect) => effect.type === EFFECTS.BROKE,
    )
  ) {
    damage += Math.round((targetEnemy.maxHP / 100) * 5);
  }

  // здесь же навешиваем эффекты, проводим доп вычисления, установка hasTurn: false в другом месте - снаружи, после анимаций
  battleModelCopy.enemy = {
    ...battleModelCopy.enemy,
    party: battleModelCopy.enemy.party.map((enemy) => {
      const isTarget = enemy.id === target;

      if (isTarget) {
        return { ...enemy, hp: Math.max(enemy.hp - damage, 0) };
      }

      if (richochetteDamage) {
        return { ...enemy, hp: Math.max(enemy.hp - richochetteDamage, 0) };
      }

      return enemy;
    }),
    effects: enemyEffectsCopy,
  };

  battleModelCopy.player = {
    ...battleModelCopy.player,
    party: battleModelCopy.player.party.map((player) => {
      return player.name === source
        ? {
            ...player,
            currentHealth: vampireEffect
              ? Math.min(
                  player.currentHealth +
                    Math.round(damage * (vampireEffect / 100)),
                  sourcePlayer.maxHealth,
                )
              : player.currentHealth,
            hasTurn: false,
            currentAmountOfRounds: Math.max(
              0,
              (player.currentAmountOfRounds || 0) - sourcePlayer.bulletsPerTurn,
            ),
          }
        : player;
    }),
    effects: playerEffectsCopy,
  };

  if (hasRichochette) {
    return {
      model: battleModelCopy,
      damageModel: battleModelCopy.enemy.party.map((enemy) => {
        const isSameTarget = enemy.id === target;

        return {
          target: enemy.id || null,
          damage: isSameTarget ? damage : richochetteDamage,
          isCritical: isCrit,
          isEvasion: false,
        };
      }),
    };
  }

  return {
    model: battleModelCopy,
    damageModel: [
      {
        target,
        damage,
        isCritical: isCrit,
        isEvasion: false,
      },
    ],
  };
};
