import { CLASSES } from "../../../../entities/characterClasses";

import damager from "../../../../assets/avatars/sniper.png";
import healer from "../../../../assets/avatars/medic.png";
import skeleton from "../../../../assets/avatars/dead.png";
import tank from "../../../../assets/avatars/tank.png";

export const getUnitAvatarSrc = (unitType: CLASSES, isDead: boolean) => {
  if (isDead) {
    return skeleton;
  }

  switch (unitType) {
    case CLASSES.DAMAGER: {
      return damager;
    }

    case CLASSES.HEALER: {
      return healer;
    }

    case CLASSES.TANK: {
      return tank;
    }

    default: {
      return skeleton;
    }
  }
};
