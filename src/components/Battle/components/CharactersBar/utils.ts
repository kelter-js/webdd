import { CLASSES } from "../../../../entities/characterClasses";

import sniper from "../../../../assets/avatars/sniper.png";
import medic from "../../../../assets/avatars/medic.png";
import skeleton from "../../../../assets/avatars/dead.png";
import tank from "../../../../assets/avatars/tank.png";
import {
  Battle,
  GameStateData,
  Statistics,
  StoreState,
} from "../../../../types/gameState";
import { getRandom } from "../../../../utils";
import { calculateCritDamage } from "../../../../stores/constants";
import {
  MEDIC_PERKS,
  SNIPER_PERKS,
  TANK_PERKS,
} from "../../../../constants/perks";
import { EFFECTS } from "../../../../entities/effects";
import { DamageData } from "../../types";
import { generatePlayerMessage } from "../../utils";
import { ENEMIES } from "../../../../entities";
import { POTION_TYPES } from "../../../../entities/consumables";
import { getPotionHealth } from "../../../../stores/utils";

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
  magSize: Record<string, number>,
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
      model: {
        ...battleModel,
        player: {
          ...battleModel.player,
          party: battleModel.player.party.map((player) =>
            player.name === source ? { ...player, hasTurn: false } : player,
          ),
        },
        messages: [
          ...battleModel.messages,
          {
            message: generatePlayerMessage(source, targetEnemy.type, 0, true),
            attackerName: source,
            attackerType: "Player",
          },
        ],
      },
      damageModel: [
        {
          target,
          damage: null,
          isCritical: false,
          isEvasion: true,
          shouldPlayDeathAnimation: false,
        },
      ],
    };
  }

  const battleModelCopy = {
    ...battleModel,
    enemy: { ...battleModel.enemy, effects: { ...battleModel.enemy.effects } },
    player: {
      ...battleModel.player,
      effects: { ...battleModel.player.effects },
    },
  };

  const enemyEffectsCopy = battleModelCopy.enemy.effects;
  const playerEffectsCopy = battleModelCopy.player.effects;

  if (!enemyEffectsCopy[target]) {
    enemyEffectsCopy[target] = { hasTriggered: true, list: [] };
  } else {
    enemyEffectsCopy[target].list = [...enemyEffectsCopy[target].list];
  }

  if (!playerEffectsCopy[source]) {
    playerEffectsCopy[source] = { hasTriggered: true, list: [] };
  } else {
    playerEffectsCopy[source].list = [...playerEffectsCopy[source].list];
  }

  const characterCritChance = Math.min(sourcePlayer.critChance, 90);

  const isCrit = getRandom(1, 100) < characterCritChance;

  let damage = getRandom(sourcePlayer.minAttack, sourcePlayer.maxAttack);

  if (isCrit) {
    damage = Math.round(calculateCritDamage(damage, sourcePlayer.critStrike));
  }

  //FIXME: нужна доработка по текущим перкам

  const perkIds = playerData.perksList.map(({ id }) => id);

  let vampireEffect = sourcePlayer.vampire;
  let hasRichochette = false;
  let richochetteDamage = null;
  let healAll = false;
  let healAllAmount = 0;
  let reloader = false;
  let isInspired = false;
  let restoredHP = 0;

  // Обрабатываем перки снайпера
  if (playerData.characterClass === CLASSES.SNIPER) {
    if (perkIds.includes(SNIPER_PERKS.SHOCKER)) {
      // 15% шанс прока перка
      const isSuccess = isSuccessRoll(15);

      if (isSuccess) {
        enemyEffectsCopy[target].list = [
          ...enemyEffectsCopy[target].list.filter(
            (item) => item.type !== EFFECTS.STUN,
          ),
          { type: EFFECTS.STUN, duration: 1 },
        ];
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
        Object.keys(playerEffectsCopy).forEach((key) => {
          playerEffectsCopy[key].list = [
            ...playerEffectsCopy[key].list.filter(
              (item) => item.type !== EFFECTS.INSPIRED,
            ),
            {
              type: EFFECTS.INSPIRED,
              duration: 3,
            },
          ];
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
        enemyEffectsCopy[target].list = [
          ...enemyEffectsCopy[target].list.filter(
            (item) => item.type !== EFFECTS.BROKE,
          ),
          {
            type: EFFECTS.BROKE,
            duration: 2,
          },
        ];
      }
    }
  }

  // Обрабатываем перки медика
  if (playerData.characterClass === CLASSES.MEDIC) {
    if (perkIds.includes(MEDIC_PERKS.BLEED)) {
      // 15% шанс прока перка
      const isSuccess = isSuccessRoll(15);

      if (isSuccess) {
        enemyEffectsCopy[target].list = [
          ...enemyEffectsCopy[target].list.filter(
            (item) => item.type !== EFFECTS.BLEED,
          ),
          {
            type: EFFECTS.BLEED,
            duration: 2,
          },
        ];
      }
    }

    if (perkIds.includes(MEDIC_PERKS.HEAL)) {
      // 15% шанс прока перка
      const isSuccess = isSuccessRoll(15);

      if (isSuccess) {
        healAll = true;
      }
    }

    if (perkIds.includes(MEDIC_PERKS.CURSED_ATTACK)) {
      // 10% шанс прока перка
      const isSuccess = isSuccessRoll(10);

      if (isSuccess) {
        enemyEffectsCopy[target].list = [
          ...enemyEffectsCopy[target].list.filter(
            (item) => item.type !== EFFECTS.WEAKNESS,
          ),
          {
            type: EFFECTS.WEAKNESS,
            duration: 2,
          },
        ];
      }
    }

    if (perkIds.includes(MEDIC_PERKS.RELOADER)) {
      // 20% шанс прока перка
      const isSuccess = isSuccessRoll(20);

      if (isSuccess) {
        reloader = true;
      }
    }
  }

  // Обрабатываем перки танка
  if (playerData.characterClass === CLASSES.TANK) {
    if (perkIds.includes(TANK_PERKS.INSPIRATION)) {
      // 10% шанс прока перка
      const isSuccess = isSuccessRoll(10);

      if (isSuccess) {
        isInspired = true;
      }
    }

    if (perkIds.includes(TANK_PERKS.VAMPIRE)) {
      // 10% шанс прока перка
      const isSuccess = isSuccessRoll(25);

      if (isSuccess) {
        restoredHP = Math.round(damage / 2);
      }
    }

    if (perkIds.includes(TANK_PERKS.CRUSHER)) {
      // 10% шанс прока перка
      const isSuccess = isSuccessRoll(15);

      if (isSuccess) {
        enemyEffectsCopy[target].list = [
          ...enemyEffectsCopy[target].list.filter(
            (item) => item.type !== EFFECTS.STUN,
          ),
          {
            type: EFFECTS.STUN,
            duration: 1,
          },
        ];
      }
    }

    if (perkIds.includes(TANK_PERKS.RECKLESSNESS)) {
      // 10% шанс прока перка
      const isSuccess = isSuccessRoll(10);

      if (isSuccess) {
        hasRichochette = true;
      }
    }

    if (perkIds.includes(TANK_PERKS.SCARLESS)) {
      // 10% шанс прока перка
      const isSuccess = isSuccessRoll(10);

      if (isSuccess) {
        healAll = true;
        healAllAmount = Math.round(damage / 2);
      }
    }
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

  if (
    playerEffectsCopy[source].list.find(
      (effect) => effect.type === EFFECTS.INSPIRED,
    )
  ) {
    damage += Math.round((damage / 100) * 5);
  }

  if (
    playerEffectsCopy[source].list.find(
      (effect) => effect.type === EFFECTS.INSTA_KILL,
    )
  ) {
    const isSuccess = isSuccessRoll(25);

    playerEffectsCopy[source].list.push({
      type: EFFECTS.INSTA_KILL_FATIGUE,
      duration: 2,
    });

    if (isSuccess) {
      const isTargetMainBoss =
        targetEnemy.type === ENEMIES.SIN_ICON_TIER_1 ||
        targetEnemy.type === ENEMIES.GENERAL_TIER_1 ||
        targetEnemy.type === ENEMIES.MERGED_MASS_TIER_1;

      if (isTargetMainBoss) {
        damage += Math.round((damage / 100) * 15);
      } else {
        damage = 9999;
      }
    }
  }

  let shouldPlayDeathAnimation = false;

  const initialTargetEnemy = battleModel.enemy.party.find(
    (enemy) => enemy.id === target,
  );

  battleModelCopy.enemy = {
    ...battleModelCopy.enemy,
    party: battleModelCopy.enemy.party.map((enemy) => {
      const isTarget = enemy.id === target;

      if (isTarget) {
        const newHp = Math.max(enemy.hp - damage, 0);

        const isDead = initialTargetEnemy?.hp !== 0 && newHp === 0;

        if (isDead) {
          shouldPlayDeathAnimation = true;
        }

        return { ...enemy, hp: newHp };
      }

      if (richochetteDamage && enemy.hp > 0) {
        const newHp = Math.max(enemy.hp - richochetteDamage, 0);

        return { ...enemy, hp: newHp };
      }

      return enemy;
    }),
    effects: enemyEffectsCopy,
  };

  battleModelCopy.player = {
    ...battleModelCopy.player,
    party: battleModelCopy.player.party.map((player) => {
      const healAllPercentage = healAll
        ? healAllAmount ||
          Math.round((statistics[player.name].maxHealth / 100) * 10)
        : 0;

      const playerModel = { ...player };

      if (player.name === source) {
        let health = player.currentHealth;

        if (vampireEffect) {
          health += Math.round(damage * (vampireEffect / 100));
        }

        if (healAllPercentage) {
          health += healAllPercentage;
        }

        if (restoredHP) {
          health += restoredHP;
        }

        return {
          ...player,
          currentHealth: Math.min(health, sourcePlayer.maxHealth),
          hasTurn: isInspired,
          currentAmountOfRounds: reloader
            ? magSize[player.name]
            : Math.max(
                0,
                (player.currentAmountOfRounds || 0) -
                  sourcePlayer.bulletsPerTurn,
              ),
        };
      }

      if (healAll) {
        playerModel.currentHealth = Math.min(
          statistics[player.name].maxHealth,
          player.currentHealth + healAllPercentage,
        );
      }

      if (reloader) {
        playerModel.currentAmountOfRounds = magSize[player.name];
      }

      return playerModel;
    }),
    effects: playerEffectsCopy,
  };

  battleModelCopy.messages = [
    ...battleModelCopy.messages,
    {
      message: generatePlayerMessage(source, targetEnemy.type, damage),
      attackerName: source,
      attackerType: "Player",
    },
  ];

  if (hasRichochette) {
    return {
      model: battleModelCopy,
      damageModel: battleModelCopy.enemy.party.map((enemy) => {
        const isSameTarget = enemy.id === target;
        const initialEnemyModel = battleModel.enemy.party.find(
          (initialEnemy) => initialEnemy.id === enemy.id,
        );

        const isDead = initialEnemyModel?.hp !== 0 && enemy.hp === 0;

        return {
          target: enemy.id || null,
          damage: isSameTarget ? damage : richochetteDamage,
          isCritical: isCrit,
          isEvasion: false,
          shouldPlayDeathAnimation: isDead,
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
        shouldPlayDeathAnimation,
      },
    ],
  };
};
