import bleedEffect from "../assets/effects/battle/bleed.png";
import brokeEffect from "../assets/effects/battle/broke.png";
import fireEffect from "../assets/effects/battle/fire.png";
import healEffect from "../assets/effects/battle/heal.png";
import healAllFatigueEffect from "../assets/effects/battle/heal_all_fatigue.png";
import healFatigueEffect from "../assets/effects/battle/heal_fatigue.png";
import healImmuneEffect from "../assets/effects/battle/heal_immune.png";
import inspireEffect from "../assets/effects/battle/inspire.png";
import instaKillFatigue from "../assets/effects/battle/insta_kill_fatigue.png";
import lastStandEffect from "../assets/effects/battle/last_stand.png";
import lastStandFatigueEffect from "../assets/effects/battle/last_stand_fatigue.png";
import stunEffect from "../assets/effects/battle/stun.png";
import weaknessEffect from "../assets/effects/battle/weakness.png";

export enum EFFECTS {
  // 15% хп
  BLEED = "BLEED",
  // пропуск хода
  STUN = "STUN",
  // 10% хп
  FIRE = "FIRE",
  // режет 10% урона
  WEAKNESS = "WEAKNESS",
  // не может похилиться
  HEAL_IMMUNE = "HEAL_IMMUNE",
  // противник вешает на себя на два хода
  HEAL = "HEAL",
  // доп 5% входящего урона от макс хп
  BROKE = "BROKE",
  // доп 5% урона
  INSPIRED = "INSPIRED",
  // кд на возможность захилить себя
  HEAL_FATIGUE = "HEAL_FATIGUE",

  // абилки
  INSTA_KILL_FATIGUE = "INSTA_KILL_FATIGUE",
  INSTA_KILL = "INSTA_KILL",

  HEAL_ALL = "HEAL_ALL",
  HEAL_ALL_FATIGUE = "HEAL_ALL_FATIGUE",

  LAST_STAND = "LAST_STAND",
  LAST_STAND_FATIGUE = "LAST_STAND_FATIGUE",
}

export const EFFECTS_ICONS = {
  [EFFECTS.BLEED]: bleedEffect,
  [EFFECTS.STUN]: stunEffect,
  [EFFECTS.FIRE]: fireEffect,
  [EFFECTS.WEAKNESS]: weaknessEffect,
  [EFFECTS.HEAL_IMMUNE]: healImmuneEffect,
  [EFFECTS.HEAL]: healEffect,
  [EFFECTS.BROKE]: brokeEffect,
  [EFFECTS.INSPIRED]: inspireEffect,
  [EFFECTS.HEAL_FATIGUE]: healFatigueEffect,
  [EFFECTS.INSTA_KILL_FATIGUE]: instaKillFatigue,
  [EFFECTS.INSTA_KILL]: instaKillFatigue,
  [EFFECTS.HEAL_ALL]: healAllFatigueEffect,
  [EFFECTS.HEAL_ALL_FATIGUE]: healAllFatigueEffect,
  [EFFECTS.LAST_STAND]: lastStandEffect,
  [EFFECTS.LAST_STAND_FATIGUE]: lastStandFatigueEffect,
};

export const EFFECTS_DESCRIPTIONS = {
  [EFFECTS.BLEED]: "Кровотечение",
  [EFFECTS.STUN]: "Оглушение",
  [EFFECTS.FIRE]: "Горение",
  [EFFECTS.WEAKNESS]: "Слабость",
  [EFFECTS.HEAL_IMMUNE]: "Иммунитет к лечению",
  [EFFECTS.HEAL]: "Лечение",
  [EFFECTS.BROKE]: "Беззащитность",
  [EFFECTS.INSPIRED]: "Вдохновение",
  // кд на вызов абилки хилки себя на 3 хода
  [EFFECTS.HEAL_FATIGUE]: "Слабость после лечения",
  [EFFECTS.INSTA_KILL_FATIGUE]: "Восстановление инстакилла",
  [EFFECTS.INSTA_KILL]: "Инстакилл",
  [EFFECTS.HEAL_ALL]: "Общее лечение",
  [EFFECTS.HEAL_ALL_FATIGUE]: "Восстановление Вдохновения",
  [EFFECTS.LAST_STAND]: "Ни шагу назад!",
  [EFFECTS.LAST_STAND_FATIGUE]: "Восстановление Ни шагу назад!",
};
