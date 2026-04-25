import { GEAR_SLOTS } from "../entities/gear";
import { Icons } from "../common";

export const getIconByType = (type: GEAR_SLOTS) => {
  if (type === GEAR_SLOTS.WEAPON) {
    return <Icons.Attack />;
  }

  if (type === GEAR_SLOTS.ARTIFACT) {
    return <>Описание:</>;
  }

  return <Icons.Defense />;
};
