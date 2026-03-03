import { Stack } from "@mui/material";
import character from "../../../../assets/static/character_bg.png";
import * as S from "../../Inventory.styled";
import { CharacterCell } from "../../CharacterCell";
import { GEAR_SLOTS } from "../../../../entities/gear";
import { FC } from "react";
import { CharacterGearProps } from "./types";
import { useGameState } from "../../../../stores";

export const CharacterGear: FC<CharacterGearProps> = ({
  name,
  characterClass,
}) => {
  const { gear } = useGameState();

  const characterGear = gear ? gear[name] : null;
  console.log("characterGear", characterGear);
  console.log("name", name);
  console.log("gear", gear);

  const equippedHelmet = characterGear
    ? characterGear.find((item) => item.type === GEAR_SLOTS.HELMET)
    : null;
  const equippedArmor = characterGear
    ? characterGear.find((item) => item.type === GEAR_SLOTS.ARMOR)
    : null;
  const equippedArtifact = characterGear
    ? characterGear.find((item) => item.type === GEAR_SLOTS.ARTIFACT)
    : null;
  const equippedWeapon = characterGear
    ? characterGear.find((item) => item.type === GEAR_SLOTS.WEAPON)
    : null;

  return (
    <S.CharacterGear>
      <img
        src={character}
        height="100%"
        width="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      />

      <Stack position="absolute" zIndex="5" left="220px" top="25px">
        <CharacterCell
          type={GEAR_SLOTS.HELMET}
          item={equippedHelmet}
          characterClass={characterClass}
          name={name}
        />
      </Stack>

      <Stack position="absolute" zIndex="5" left="220px" top="135px">
        <CharacterCell
          type={GEAR_SLOTS.ARMOR}
          item={equippedArmor}
          characterClass={characterClass}
          name={name}
        />
      </Stack>

      <Stack position="absolute" zIndex="5" left="52px" top="135px">
        <CharacterCell
          type={GEAR_SLOTS.ARTIFACT}
          item={equippedArtifact}
          characterClass={characterClass}
          name={name}
        />
      </Stack>

      <Stack position="absolute" zIndex="5" left="388px" top="135px">
        <CharacterCell
          type={GEAR_SLOTS.WEAPON}
          item={equippedWeapon}
          characterClass={characterClass}
          name={name}
        />
      </Stack>
    </S.CharacterGear>
  );
};
