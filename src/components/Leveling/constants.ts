import critChance from "../../assets/perks/sniper/crit.png";
import critStrike from "../../assets/perks/sniper/crit_strike.png";
import critChanceV2 from "../../assets/perks/sniper/crit_v2.png";
import critStrikeV2 from "../../assets/perks/sniper/crit_strike_v3.png";

import shocker from "../../assets/perks/sniper/shocker.png";
import lifeStealer from "../../assets/perks/sniper/life_stealer.png";

import damageInspiration from "../../assets/perks/sniper/damage_inspiration.png";
import ricochette from "../../assets/perks/sniper/ricochette.png";

import instakill from "../../assets/perks/sniper/instakill.png";
import breacher from "../../assets/perks/sniper/breacher.png";

import health from "../../assets/perks/tank/health.png";
import dodge from "../../assets/perks/tank/dodge.png";

import inspiration from "../../assets/perks/tank/inspiration.png";
import vampire from "../../assets/perks/tank/vampire.png";

import healthV2 from "../../assets/perks/tank/health_v2.png";
import dodgeV2 from "../../assets/perks/tank/dodge_v2.png";

import crusher from "../../assets/perks/tank/crusher.png";
import recklessness from "../../assets/perks/tank/recklessness.png";

import lastStand from "../../assets/perks/tank/last_stand.png";
import scarless from "../../assets/perks/tank/scarless.png";

import damage from "../../assets/perks/medic/damage.png";
import endurance from "../../assets/perks/medic/endurance.png";

import bleed from "../../assets/perks/medic/bleed.png";
import heal from "../../assets/perks/medic/heal.png";

import damageV2 from "../../assets/perks/medic/damage_v2.png";
import enduranceV2 from "../../assets/perks/medic/endurance_v2.png";

import cursed from "../../assets/perks/medic/cursed.png";
import weakSpotter from "../../assets/perks/medic/weak_spotter.png";

import healAll from "../../assets/perks/medic/heal_all.png";
import fortification from "../../assets/perks/medic/fortification.png";

import { SNIPER_PERKS, TANK_PERKS, MEDIC_PERKS } from "../../constants/perks";
import { CLASSES } from "../../entities/characterClasses";
import { PERK_ID_DATA } from "../../types/gameState";

export const SNIPER_CLASS_PERKS_IMG = {
  [SNIPER_PERKS.CRITICAL_CHANCE]: critChance,
  [SNIPER_PERKS.CRITICAL_STRIKE]: critStrike,

  [SNIPER_PERKS.SHOCKER]: shocker,
  [SNIPER_PERKS.LIFE_STEALER]: lifeStealer,

  [SNIPER_PERKS.CRITICAL_CHANCE_V2]: critChanceV2,
  [SNIPER_PERKS.CRITICAL_STRIKE_V2]: critStrikeV2,

  [SNIPER_PERKS.DAMAGE_INSPIRATION]: damageInspiration,
  [SNIPER_PERKS.RICOCHETTE]: ricochette,

  [SNIPER_PERKS.INSTAKILL]: instakill,
  [SNIPER_PERKS.BREACHER]: breacher,
} as const;

export const TANK_CLASS_PERKS_IMG = {
  [TANK_PERKS.HEALTH]: health,
  [TANK_PERKS.DODGE]: dodge,

  [TANK_PERKS.INSPIRATION]: inspiration,
  [TANK_PERKS.VAMPIRE]: vampire,

  [TANK_PERKS.HEALTH_V2]: healthV2,
  [TANK_PERKS.DODGE_V2]: dodgeV2,

  [TANK_PERKS.CRUSHER]: crusher,
  [TANK_PERKS.RECKLESSNESS]: recklessness,

  [TANK_PERKS.LAST_STAND]: lastStand,
  [TANK_PERKS.SCARLESS]: scarless,
} as const;

export const MEDIC_CLASS_PERKS_IMG = {
  [MEDIC_PERKS.INCREASE_DAMAGE]: damage,
  [MEDIC_PERKS.INCREASE_HEALTH]: endurance,

  [MEDIC_PERKS.BLEED]: bleed,
  [MEDIC_PERKS.HEAL]: heal,

  [MEDIC_PERKS.INCREASE_DAMAGE_V2]: damageV2,
  [MEDIC_PERKS.INCREASE_HEALTH_V2]: enduranceV2,

  [MEDIC_PERKS.CURSED_ATTACK]: cursed,
  [MEDIC_PERKS.WEAK_SPOTTER]: weakSpotter,

  [MEDIC_PERKS.HEAL_ALL]: healAll,
  [MEDIC_PERKS.FORTIFICATION]: fortification,
} as const;

export const getImgSrcByClass = (
  characterClass: CLASSES,
  perkId: PERK_ID_DATA,
) => {
  switch (characterClass) {
    case CLASSES.TANK: {
      return TANK_CLASS_PERKS_IMG[perkId as TANK_PERKS];
    }

    case CLASSES.MEDIC: {
      return MEDIC_CLASS_PERKS_IMG[perkId as MEDIC_PERKS];
    }

    case CLASSES.SNIPER: {
      return SNIPER_CLASS_PERKS_IMG[perkId as SNIPER_PERKS];
    }

    default: {
      return SNIPER_CLASS_PERKS_IMG[perkId as SNIPER_PERKS];
    }
  }
};
