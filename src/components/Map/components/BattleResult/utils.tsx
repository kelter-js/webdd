import { Icons } from "../../../../common";
import { GEAR_SLOTS } from "../../../../entities/gear";
import { GUN_TYPES } from "../../../../entities/guns";

export const getGearIcon = (gear: GEAR_SLOTS, gunType?: GUN_TYPES) => {
  if (gear === GEAR_SLOTS.WEAPON) {
    switch (gunType) {
      case GUN_TYPES.ASSAULT_RIFLE:
        return <Icons.AssaultRifle />;
      case GUN_TYPES.MACHINE_GUN:
        return <Icons.MachineGun />;
      case GUN_TYPES.PISTOL:
        return <Icons.Pistol />;
      case GUN_TYPES.SHOTGUN:
        return <Icons.Shotgun />;
      case GUN_TYPES.SMG:
        return <Icons.Submachine />;
      case GUN_TYPES.SNIPER_RIFLE:
        return <Icons.SniperRifle />;
      default:
        return <Icons.SniperRifle />;
    }
  } else {
    switch (gear) {
      case GEAR_SLOTS.ARMOR:
        return <Icons.Armor />;
      case GEAR_SLOTS.HELMET:
        return <Icons.Helmet />;
      case GEAR_SLOTS.ARTIFACT:
        return <Icons.Artifact />;
      default:
        return <Icons.Artifact />;
    }
  }
};
