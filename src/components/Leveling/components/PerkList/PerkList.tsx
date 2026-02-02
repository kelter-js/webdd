import { FC } from "react";
import { PerkListProps } from "./types";
import { Tooltip } from "../../../../common";
import { AbilityIcon } from "../../Leveling.styled";
import { getImgSrcByClass } from "../../constants";

export const PerkList: FC<PerkListProps> = ({
  perksList,
  selectedPerksList,
  canAcquirePerk,
  onSelect,
  characterClass,
}) => {
  console.log("perksList", perksList);
  console.log("canAcquirePerk", canAcquirePerk);

  return perksList.map(({ id, description }, index) => {
    const isPerkSelected = selectedPerksList.includes(id);
    console.log("isPerkSelected", isPerkSelected);
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
          onClick={() => {
            if (canAcquirePerk) {
              onSelect(id);
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={
            isPerkSelected
              ? {
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0px rgba(160, 80, 80, 0)",
                    "0 0 20px rgba(255, 0, 0, 0.8)",
                    "0 0 0px rgba(160, 80, 80, 0)",
                  ],
                }
              : {}
          }
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
