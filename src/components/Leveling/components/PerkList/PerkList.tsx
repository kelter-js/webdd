import { FC } from "react";

import { ABILITY_ANIMATE_CONFIG } from "./constants";
import { getImgSrcByClass } from "../../constants";
import { Tooltip } from "../../../../common";
import { PerkListProps } from "./types";
import { AbilityIcon } from "../../Leveling.styled";

export const PerkList: FC<PerkListProps> = ({
  perksList,
  selectedPerksList,
  canAcquirePerk,
  onSelect,
  characterClass,
}) => {
  return perksList.map(({ id, description }, index) => {
    const isPerkSelected = selectedPerksList.includes(id);

    const handleSelectPerk = () => {
      if (canAcquirePerk) {
        onSelect(id);
      }
    };

    return (
      <Tooltip
        key={id}
        title={description}
        placement="bottom"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "#1a0a0a",
              border: isPerkSelected ? "" : "2px solid #5a2a2a",
              fontSize: "1rem",
            },
          },
          arrow: {
            sx: {
              color: "#5a2a2a",
            },
          },
        }}
      >
        <AbilityIcon
          isSelected={isPerkSelected}
          canAcquirePerk={canAcquirePerk}
          onClick={handleSelectPerk}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isPerkSelected ? ABILITY_ANIMATE_CONFIG : undefined}
          transition={{ duration: 0.3 }}
          style={{
            marginLeft: index === 0 ? "60px" : 0,
            cursor: canAcquirePerk ? "pointer" : "unset",
            opacity: canAcquirePerk || isPerkSelected ? 1 : 0.5,
          }}
        >
          <img src={getImgSrcByClass(characterClass, id)} />
        </AbilityIcon>
      </Tooltip>
    );
  });
};
