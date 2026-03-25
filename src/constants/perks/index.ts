import { CLASSES } from "../../entities/characterClasses";
import { PerkData } from "../../types";

export enum TANK_PERKS {
  // 1 тир перков
  HEALTH = "HEALTH",
  DODGE = "DODGE",

  // 2 тир перков
  INSPIRATION = "INSPIRATION",
  VAMPIRE = "VAMPIRE",

  // 3 тир перков
  HEALTH_V2 = "HEALTH_V2",
  DODGE_V2 = "DODGE_V2",

  // 4 тир перков
  CRUSHER = "CRUSHER",
  RECKLESSNESS = "RECKLESSNESS",

  // 5 тир перков
  LAST_STAND = "LAST_STAND",
  SCARLESS = "SCARLESS",
}

export const TANK_PERKS_DESCRIPTIONS = {
  [TANK_PERKS.HEALTH]: "Увеличение здоровья на 10%",
  [TANK_PERKS.DODGE]: "Шанс увернуться от атаки 10%",

  [TANK_PERKS.INSPIRATION]: "10% шанс на повторный ход",
  [TANK_PERKS.VAMPIRE]:
    "25% шанс восстановить здоровье после атаки на половину нанесенного урона",

  [TANK_PERKS.HEALTH_V2]: "Увеличение здоровья на 15%",
  [TANK_PERKS.DODGE_V2]: "Шанс увернуться от атаки 15%",

  [TANK_PERKS.CRUSHER]: "15% Шанс оглушить противника атакой",
  [TANK_PERKS.RECKLESSNESS]:
    "10% шанс совершить фронтальную атаку, которая нанесет урон всем врагам на поле",

  [TANK_PERKS.LAST_STAND]:
    "Активная способность: снижает весь получаемый урон на 15% на следующие два раунда.",
  [TANK_PERKS.SCARLESS]:
    "Пассивная способность: c 10% шансом ваши атаки вызовут эффект лечения вас и ваших сопартийцев на половину от значения нанесенного урона",
} as const;

export const TANK_PERKS_DATA: Record<string, PerkData[]> = {
  firstTier: [
    {
      id: TANK_PERKS.HEALTH,
      description: TANK_PERKS_DESCRIPTIONS[TANK_PERKS.HEALTH],
    },
    {
      id: TANK_PERKS.DODGE,
      description: TANK_PERKS_DESCRIPTIONS[TANK_PERKS.DODGE],
    },
  ],
  secondTier: [
    {
      id: TANK_PERKS.INSPIRATION,
      description: TANK_PERKS_DESCRIPTIONS[TANK_PERKS.INSPIRATION],
    },
    {
      id: TANK_PERKS.VAMPIRE,
      description: TANK_PERKS_DESCRIPTIONS[TANK_PERKS.VAMPIRE],
    },
  ],
  thirdTier: [
    {
      id: TANK_PERKS.HEALTH_V2,
      description: TANK_PERKS_DESCRIPTIONS[TANK_PERKS.HEALTH_V2],
    },
    {
      id: TANK_PERKS.DODGE_V2,
      description: TANK_PERKS_DESCRIPTIONS[TANK_PERKS.DODGE_V2],
    },
  ],
  fourthTier: [
    {
      id: TANK_PERKS.CRUSHER,
      description: TANK_PERKS_DESCRIPTIONS[TANK_PERKS.CRUSHER],
    },
    {
      id: TANK_PERKS.RECKLESSNESS,
      description: TANK_PERKS_DESCRIPTIONS[TANK_PERKS.RECKLESSNESS],
    },
  ],
  fifthTier: [
    {
      id: TANK_PERKS.LAST_STAND,
      description: TANK_PERKS_DESCRIPTIONS[TANK_PERKS.LAST_STAND],
      isAbility: true,
    },
    {
      id: TANK_PERKS.SCARLESS,
      description: TANK_PERKS_DESCRIPTIONS[TANK_PERKS.SCARLESS],
    },
  ],
} as const;

export enum SNIPER_PERKS {
  // 1 тир перков
  CRITICAL_CHANCE = "CRITICAL_CHANCE",
  CRITICAL_STRIKE = "CRITICAL_STRIKE",

  // 2 тир перков
  SHOCKER = "SHOCKER",
  LIFE_STEALER = "LIFE_STEALER",

  // 3 тир перков
  CRITICAL_CHANCE_V2 = "CRITICAL_CHANCE_V2",
  CRITICAL_STRIKE_V2 = "CRITICAL_STRIKE_V2",

  // 4 тир перков
  DAMAGE_INSPIRATION = "DAMAGE_INSPIRATION",
  RICOCHETTE = "RICOCHETTE",

  // 5 тир перков
  INSTAKILL = "INSTAKILL",
  BREACHER = "BREACHER",
}

export const SNIPER_PERKS_DESCRIPTIONS = {
  [SNIPER_PERKS.CRITICAL_CHANCE]: "Увеличение шанса критического урона 10%",
  [SNIPER_PERKS.CRITICAL_STRIKE]: "Увеличение силы критического удара 5%",

  [SNIPER_PERKS.SHOCKER]:
    "Небольшой шанс, что ваша атака заставит врага пропустить ход",
  [SNIPER_PERKS.LIFE_STEALER]:
    "Небольшой шанс, что ваша атака восстановит ваше здоровье",

  [SNIPER_PERKS.CRITICAL_CHANCE_V2]: "Увеличение шанса критического урона 15%",
  [SNIPER_PERKS.CRITICAL_STRIKE_V2]: "Увеличение силы критического удара 10%",

  [SNIPER_PERKS.DAMAGE_INSPIRATION]:
    "Небольшой шанс, что ваша атака вдохновит союзников, и в следующие три хода они дополнительно нанесут +5% урона",
  [SNIPER_PERKS.RICOCHETTE]:
    "Небольшой шанс, что ваша атака может вызвать рикошет и нанести половину основного урона другим врагам",

  [SNIPER_PERKS.INSTAKILL]:
    "Активная: с 25% шансом следующая атака убьет врага с одного удара - перезарядка два хода (не действует на боссов)",
  [SNIPER_PERKS.BREACHER]:
    "Пассивная: ваша атака имеет шанс уменьшить сопротивление врага, тем самым все атаки по противнику получат прибавку равную 5% здоровья противника на два хода",
} as const;

export const SNIPER_PERKS_DATA: Record<string, PerkData[]> = {
  firstTier: [
    {
      id: SNIPER_PERKS.CRITICAL_CHANCE,
      description: SNIPER_PERKS_DESCRIPTIONS[SNIPER_PERKS.CRITICAL_CHANCE],
    },
    {
      id: SNIPER_PERKS.CRITICAL_STRIKE,
      description: SNIPER_PERKS_DESCRIPTIONS[SNIPER_PERKS.CRITICAL_STRIKE],
    },
  ],
  secondTier: [
    {
      id: SNIPER_PERKS.SHOCKER,
      description: SNIPER_PERKS_DESCRIPTIONS[SNIPER_PERKS.SHOCKER],
    },
    {
      id: SNIPER_PERKS.LIFE_STEALER,
      description: SNIPER_PERKS_DESCRIPTIONS[SNIPER_PERKS.LIFE_STEALER],
    },
  ],
  thirdTier: [
    {
      id: SNIPER_PERKS.CRITICAL_CHANCE_V2,
      description: SNIPER_PERKS_DESCRIPTIONS[SNIPER_PERKS.CRITICAL_CHANCE_V2],
    },
    {
      id: SNIPER_PERKS.CRITICAL_STRIKE_V2,
      description: SNIPER_PERKS_DESCRIPTIONS[SNIPER_PERKS.CRITICAL_STRIKE_V2],
    },
  ],
  fourthTier: [
    {
      id: SNIPER_PERKS.DAMAGE_INSPIRATION,
      description: SNIPER_PERKS_DESCRIPTIONS[SNIPER_PERKS.DAMAGE_INSPIRATION],
    },
    {
      id: SNIPER_PERKS.RICOCHETTE,
      description: SNIPER_PERKS_DESCRIPTIONS[SNIPER_PERKS.RICOCHETTE],
    },
  ],
  fifthTier: [
    {
      id: SNIPER_PERKS.INSTAKILL,
      description: SNIPER_PERKS_DESCRIPTIONS[SNIPER_PERKS.INSTAKILL],
      isAbility: true,
    },
    {
      id: SNIPER_PERKS.BREACHER,
      description: SNIPER_PERKS_DESCRIPTIONS[SNIPER_PERKS.BREACHER],
    },
  ],
} as const;

export enum MEDIC_PERKS {
  // 1 тир перков
  INCREASE_DAMAGE = "INCREASE_DAMAGE",
  INCREASE_HEALTH = "INCREASE_HEALTH",

  // 2 тир перков
  BLEED = "BLEED",
  HEAL = "HEAL",

  // 3 тир перков
  INCREASE_DAMAGE_V2 = "INCREASE_DAMAGE_V2",
  INCREASE_HEALTH_V2 = "INCREASE_HEALTH_V2",

  // 4 тир перков
  CURSED_ATTACK = "CURSED_ATTACK",
  RELOADER = "RELOADER",

  // 5 тир перков
  HEAL_ALL = "HEAL_ALL",
  FORTIFICATION = "FORTIFICATION",
}

export const MEDIC_PERKS_DESCRIPTIONS = {
  [MEDIC_PERKS.INCREASE_DAMAGE]: "Увеличение урона на 10%",
  [MEDIC_PERKS.INCREASE_HEALTH]: "Увеличение здоровья 20%",

  [MEDIC_PERKS.BLEED]:
    "15% Шанс, что следующая атака вызовет у врага кровотечение - 5% урона за ход в течение двух ходов",
  [MEDIC_PERKS.HEAL]: "15% Шанс, что следующая атака вылечит весь отряд на 10%",

  [MEDIC_PERKS.INCREASE_DAMAGE_V2]: "Увеличение урона на 15%",
  [MEDIC_PERKS.INCREASE_HEALTH_V2]: "Увеличение здоровья 30%",

  [MEDIC_PERKS.CURSED_ATTACK]:
    "10% шанс, что атака уменьшит урон врага вдвое на следующие два раунда",
  [MEDIC_PERKS.RELOADER]:
    "20% шанс, что атака перезарядит магазины у вас и всех ваших сопартийцев",

  [MEDIC_PERKS.HEAL_ALL]:
    "Активная: лечит весь отряд на 30% здоровья - перезарядка 2 хода",
  [MEDIC_PERKS.FORTIFICATION]:
    "Пассивная: Все употребляемые командой зелья дополнительно восстанавливают 15% здоровья",
} as const;

export const MEDIC_PERKS_DATA: Record<string, PerkData[]> = {
  firstTier: [
    {
      id: MEDIC_PERKS.INCREASE_DAMAGE,
      description: MEDIC_PERKS_DESCRIPTIONS[MEDIC_PERKS.INCREASE_DAMAGE],
    },
    {
      id: MEDIC_PERKS.INCREASE_HEALTH,
      description: MEDIC_PERKS_DESCRIPTIONS[MEDIC_PERKS.INCREASE_HEALTH],
    },
  ],
  secondTier: [
    {
      id: MEDIC_PERKS.BLEED,
      description: MEDIC_PERKS_DESCRIPTIONS[MEDIC_PERKS.BLEED],
      isAbility: true,
    },
    {
      id: MEDIC_PERKS.HEAL,
      description: MEDIC_PERKS_DESCRIPTIONS[MEDIC_PERKS.HEAL],
      isAbility: true,
    },
  ],
  thirdTier: [
    {
      id: MEDIC_PERKS.INCREASE_DAMAGE_V2,
      description: MEDIC_PERKS_DESCRIPTIONS[MEDIC_PERKS.INCREASE_DAMAGE_V2],
    },
    {
      id: MEDIC_PERKS.INCREASE_HEALTH_V2,
      description: MEDIC_PERKS_DESCRIPTIONS[MEDIC_PERKS.INCREASE_HEALTH_V2],
    },
  ],
  fourthTier: [
    {
      id: MEDIC_PERKS.CURSED_ATTACK,
      description: MEDIC_PERKS_DESCRIPTIONS[MEDIC_PERKS.CURSED_ATTACK],
    },
    {
      id: MEDIC_PERKS.RELOADER,
      description: MEDIC_PERKS_DESCRIPTIONS[MEDIC_PERKS.RELOADER],
    },
  ],
  fifthTier: [
    {
      id: MEDIC_PERKS.HEAL_ALL,
      description: MEDIC_PERKS_DESCRIPTIONS[MEDIC_PERKS.HEAL_ALL],
      isAbility: true,
    },
    {
      id: MEDIC_PERKS.FORTIFICATION,
      description: MEDIC_PERKS_DESCRIPTIONS[MEDIC_PERKS.FORTIFICATION],
    },
  ],
} as const;

export const PERK_DATA_BY_CLASSES = {
  [CLASSES.MEDIC]: MEDIC_PERKS_DATA,
  [CLASSES.SNIPER]: SNIPER_PERKS_DATA,
  [CLASSES.TANK]: TANK_PERKS_DATA,
};

export const FIRST_TIER_PERKS = [
  MEDIC_PERKS.INCREASE_DAMAGE,
  MEDIC_PERKS.INCREASE_HEALTH,
  SNIPER_PERKS.CRITICAL_CHANCE,
  SNIPER_PERKS.CRITICAL_STRIKE,
  TANK_PERKS.HEALTH,
  TANK_PERKS.DODGE,
];

export const SECOND_TIER_PERKS = [
  MEDIC_PERKS.BLEED,
  MEDIC_PERKS.HEAL,
  SNIPER_PERKS.SHOCKER,
  SNIPER_PERKS.LIFE_STEALER,
  TANK_PERKS.INSPIRATION,
  TANK_PERKS.VAMPIRE,
];

export const THIRD_TIER_PERKS = [
  MEDIC_PERKS.INCREASE_DAMAGE_V2,
  MEDIC_PERKS.INCREASE_HEALTH_V2,
  SNIPER_PERKS.CRITICAL_CHANCE_V2,
  SNIPER_PERKS.CRITICAL_STRIKE_V2,
  TANK_PERKS.HEALTH_V2,
  TANK_PERKS.DODGE_V2,
];

export const FOURTH_TIER_PERKS = [
  MEDIC_PERKS.CURSED_ATTACK,
  MEDIC_PERKS.RELOADER,
  SNIPER_PERKS.DAMAGE_INSPIRATION,
  SNIPER_PERKS.RICOCHETTE,
  TANK_PERKS.CRUSHER,
  TANK_PERKS.RECKLESSNESS,
];

export const FIFTH_TIER_PERKS = [
  MEDIC_PERKS.HEAL_ALL,
  MEDIC_PERKS.FORTIFICATION,
  SNIPER_PERKS.INSTAKILL,
  SNIPER_PERKS.BREACHER,
  TANK_PERKS.LAST_STAND,
  TANK_PERKS.SCARLESS,
];

export const FIRST_PERK_LEVEL_REQUIREMENT = 3;
export const SECOND_PERK_LEVEL_REQUIREMENT = 6;
export const THIRD_PERK_LEVEL_REQUIREMENT = 9;
export const FOURTH_PERK_LEVEL_REQUIREMENT = 12;
export const FIFTH_PERK_LEVEL_REQUIREMENT = 15;
