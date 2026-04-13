import { Stack, Typography } from "@mui/material";
import character from "../../../../assets/static/character_bg.png";
import namePattern from "../../../../assets/static/inventory_name.png";
import * as S from "../../Inventory.styled";
import { CharacterCell } from "../../CharacterCell";
import { GEAR_SLOTS } from "../../../../entities/gear";
import { FC } from "react";
import { CharacterGearProps } from "./types";
import { useGameState } from "../../../../stores";
import { CLASS_DESCRIPTIONS } from "../../../../constants/characters";
import { Icons, Tooltip } from "../../../../common";
import { getUnitAvatarSrc } from "../../../Battle/components/CharactersBar/utils";

export const CharacterGear: FC<CharacterGearProps> = ({
  name,
  characterClass,
  currentHealth,
}) => {
  const { gear, statistics } = useGameState();

  const characterGear = gear ? gear[name] : null;
  const characterStatistics = statistics ? statistics[name] : null;
  console.log("characterGear", characterGear);
  console.log("name", name);
  console.log("gear", gear);
  console.log("characterStatistics", characterStatistics);

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

      <Stack position="absolute" zIndex="5" left="45px" top="30px">
        <CharacterCell
          type={GEAR_SLOTS.HELMET}
          item={equippedHelmet}
          characterClass={characterClass}
          name={name}
        />
      </Stack>

      <Stack position="absolute" zIndex="5" left="388px" top="30px">
        <CharacterCell
          type={GEAR_SLOTS.ARMOR}
          item={equippedArmor}
          characterClass={characterClass}
          name={name}
        />
      </Stack>

      <img
        style={{
          width: "110px",
          height: "110px",
          position: "absolute",
          top: 13,
          left: 242,
        }}
        src={getUnitAvatarSrc(characterClass, currentHealth <= 0)}
      />

      <img
        src={namePattern}
        style={{
          position: "relative",
          top: 275,
          left: 0,
          width: "100%",
          height: "135px",
          zIndex: 5,
        }}
      />

      <Stack position="absolute" zIndex="5" left="45px" bottom="-4px" gap={2}>
        <Typography fontFamily="inherit" variant="h4" color="#c08040">
          {name} ({CLASS_DESCRIPTIONS[characterClass]})
        </Typography>
      </Stack>

      {characterStatistics && (
        <Stack
          position="absolute"
          zIndex="5"
          left="52px"
          bottom="32px"
          gap={2}
          p={1}
          width="calc(100% - 104px)"
        >
          <Stack direction="row" gap={2} justifyContent="center">
            <Tooltip title="Урон">
              <Stack direction="column" gap={0.5} alignItems="center">
                <Icons.Attack size={40} />
                <Typography fontFamily="inherit">
                  {`${characterStatistics?.minAttack ?? 12} - ${characterStatistics?.maxAttack ?? 15}`}
                </Typography>
              </Stack>
            </Tooltip>

            <Tooltip title="Защита">
              <Stack direction="column" gap={0.5} alignItems="center">
                <Icons.Defense size={40} />
                <Typography fontFamily="inherit">
                  {characterStatistics?.defense || 8}
                </Typography>
              </Stack>
            </Tooltip>

            <Tooltip title="Здоровье">
              <Stack direction="column" gap={0.5} alignItems="center">
                <Icons.Health size={40} />
                <Typography fontFamily="inherit">
                  {`${currentHealth ?? 150}/${characterStatistics?.maxHealth ?? 150}`}
                </Typography>
              </Stack>
            </Tooltip>

            <Tooltip title="Уклонение">
              <Stack direction="column" gap={0.5} alignItems="center">
                <Icons.Evasion size={40} />
                <Typography fontFamily="inherit">
                  {characterStatistics.evasionChance}
                </Typography>
              </Stack>
            </Tooltip>

            <Tooltip title="Крит. Шанс">
              <Stack direction="column" gap={0.5} alignItems="center">
                <Icons.Critical size={40} />
                <Typography fontFamily="inherit">
                  {characterStatistics.critChance}
                </Typography>
              </Stack>
            </Tooltip>
          </Stack>
        </Stack>
      )}

      <Stack position="absolute" zIndex="5" left="52px" top="180px">
        <CharacterCell
          type={GEAR_SLOTS.ARTIFACT}
          item={equippedArtifact}
          characterClass={characterClass}
          name={name}
        />
      </Stack>

      <Stack position="absolute" zIndex="5" left="388px" top="180px">
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
