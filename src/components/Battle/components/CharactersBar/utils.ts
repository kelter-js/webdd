import { CLASSES } from "../../../../entities/characterClasses";

import sniper from "../../../../assets/avatars/sniper.png";
import medic from "../../../../assets/avatars/medic.png";
import skeleton from "../../../../assets/avatars/dead.png";
import tank from "../../../../assets/avatars/tank.png";

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
