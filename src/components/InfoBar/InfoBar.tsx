import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Icons, Tooltip } from "../../common";
import { useGameState } from "../../stores";
import {
  getDungeonCounterByTier,
  getEconomicInfo,
  getQuestInfo,
} from "./utils";
import * as S from "./InfoBar.styled";
import { createPortal } from "react-dom";
import { ExclamationBlink } from "../../common/ExclamationBlink";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { StyledSlider } from "../../common/styled.index";
import { useGetResourceState } from "./useGetResourceState";
import {
  getResourceIcon,
  getPotionIcon,
  getPotionDescriptionByType,
} from "../../utils";
import { RESOURCES } from "../../entities/resources";
import { DEFAULT_BAG_SIZE } from "../../constants";
import bagIcon from "../../assets/minigame/bag.png";
import { DEFAULT_EXP_BY_CLASS_MAP } from "../../stores/constants";
import { expForLevel } from "../../hooks/useWatchCharacterLevels";

export const InfoBar = () => {
  const {
    player: {
      gold,
      torches,
      quest,
      consumables,
      party,
      economic,
      volume: storageVolume,
      resourcesBagLevel,
      resources,
      playStatistics,
      currentTier,
    },
    statistics,
    toggleCharacterPanel,
    setVolume: setVolumeInStorage,
  } = useGameState();

  const currentBagMaxSize = DEFAULT_BAG_SIZE * resourcesBagLevel;

  const [isVolumeVisible, setVolumeVisible] = useState(false);

  const [volume, setVolume] = useState<number | number[]>(storageVolume);

  useEffect(() => {
    const timerId = setTimeout(
      () => setVolumeInStorage(Array.isArray(volume) ? volume[0] : volume),
      900,
    );

    return () => clearTimeout(timerId);
  }, [volume]);

  const handleVolumeVisible = () => setVolumeVisible(true);
  const handleVolumeHide = () => setVolumeVisible(false);

  const { title, icon } = getQuestInfo(quest?.type);
  const [player1, player2, player3] = party;

  const { ore, treasures, soul } = useGetResourceState();

  const { charactersWithPointsToSpend, deadCharacter, aliveCharacters } =
    useMemo(() => {
      return party.reduce<{
        charactersWithPointsToSpend: string[];
        deadCharacter: string[];
        aliveCharacters: { currentHp: number; maxHp: number; name: string }[];
      }>(
        (acc, character) => {
          if (character.points) {
            acc.charactersWithPointsToSpend.push(character.name);
          }

          if (character.currentHealth <= 0) {
            acc.deadCharacter.push(character.name);
          } else {
            const maxHp =
              statistics && statistics[character?.name]
                ? statistics[character?.name]?.maxHealth
                : null;

            if (maxHp) {
              acc.aliveCharacters.push({
                currentHp: character.currentHealth,
                maxHp,
                name: character.name,
              });
            }
          }

          return acc;
        },
        {
          charactersWithPointsToSpend: [],
          deadCharacter: [],
          aliveCharacters: [],
        },
      );
    }, [
      player1?.points,
      player2?.points,
      player3?.points,
      player1?.currentHealth,
      player2?.currentHealth,
      player3?.currentHealth,
      statistics,
    ]);

  const playersExp = useMemo(() => {
    return party.map((player) => {
      const characterDefaultExpAmount =
        DEFAULT_EXP_BY_CLASS_MAP[player.characterClass];
      const expForNextLevel = expForLevel(
        player.level,
        characterDefaultExpAmount,
      );

      return {
        exp: `${player.experience}/${expForNextLevel}`,
        name: player.name,
      };
    });
  }, [player1, player2, player3]);

  return createPortal(
    <S.ModalContent>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onMouseEnter={handleVolumeVisible}
        onMouseLeave={handleVolumeHide}
      >
        <VolumeUpIcon />

        {isVolumeVisible && (
          <Box
            sx={{
              position: "absolute",
              top: "40px", // Регулируйте отступ под ваши нужды
              left: "50%",
              paddingTop: "55px",
              transform: "translateX(-50%)",
              height: "210px", // Фиксированная высота для слайдера
              zIndex: 9999, // Чтобы слайдер был поверх других элементов
              backgroundColor: "rgba(0,0,0,0.1)", // Для отладки, можно убрать
              padding: "10px 5px",
              borderRadius: "20px",
            }}
          >
            <StyledSlider
              orientation="vertical"
              value={volume}
              min={1}
              max={100}
              onChange={(_, val) => setVolume(val)}
              valueLabelDisplay="auto" // или "on" если хотите всегда показывать значение
              sx={{ height: "100%" }}
            />
          </Box>
        )}
      </Box>

      <S.StatContainer>
        <Tooltip title="Продвижение по сюжету...">
          <Stack alignItems="center" direction="row" gap={1}>
            {playStatistics?.dungeonCounter} /
            {getDungeonCounterByTier(currentTier)}
            <Icons.Dungeon size={40} />
          </Stack>
        </Tooltip>
      </S.StatContainer>

      {playersExp.map(({ exp, name }) => (
        <S.StatContainer key={name}>
          <Tooltip title={`Текущий опыт ${name}`}>
            <Stack alignItems="center" direction="row" gap={1}>
              <Typography
                sx={{
                  color: "#c08040",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
                fontFamily="inherit"
                fontSize={20}
              >
                EXP
              </Typography>
              <Typography fontSize={20} fontFamily="inherit">
                {exp}
              </Typography>
            </Stack>
          </Tooltip>
        </S.StatContainer>
      ))}

      <S.StatContainer>
        <Tooltip title="Занято ячеек ресурсов">
          <Stack alignItems="center" direction="row">
            {resources.length} / {currentBagMaxSize}
            <img src={bagIcon} style={{ width: 35, height: 35 }} />
          </Stack>
        </Tooltip>
      </S.StatContainer>

      {aliveCharacters.map((character) => (
        <S.StatContainer key={character.name}>
          <Tooltip title={`Здоровье ${character.name}`}>
            <Stack alignItems="center" direction="row">
              {character.currentHp} / {character.maxHp}
              <Icons.Health size={40} />
            </Stack>
          </Tooltip>
        </S.StatContainer>
      ))}

      {consumables?.map((consumable) => {
        const [potionType, amount] = consumable;

        return (
          <S.StatContainer key={potionType}>
            <Tooltip title={getPotionDescriptionByType(potionType)}>
              <Stack alignItems="center" direction="row">
                {amount}
                {getPotionIcon(potionType)}
              </Stack>
            </Tooltip>
          </S.StatContainer>
        );
      })}

      {(!consumables || !consumables?.length) && (
        <S.StatContainer>
          <Tooltip title="Отсутствуют зелья в инвентаре">
            <Stack alignItems="center" direction="row">
              <ExclamationBlink />
            </Stack>
          </Tooltip>
        </S.StatContainer>
      )}

      {ore && (
        <S.StatContainer>
          <Tooltip title="Собрано руды">
            <Stack alignItems="center" direction="row">
              {ore?.collected} / {ore?.required}
              {getResourceIcon(RESOURCES.ORE, 35)}
            </Stack>
          </Tooltip>
        </S.StatContainer>
      )}

      {soul && (
        <S.StatContainer>
          <Tooltip title="Собрано частей тел">
            <Stack alignItems="center" direction="row">
              {soul?.collected} / {soul?.required}
              {getResourceIcon(RESOURCES.PARTS, 35)}
            </Stack>
          </Tooltip>
        </S.StatContainer>
      )}

      {treasures && (
        <S.StatContainer>
          <Tooltip title="Собрано сокровищ">
            <Stack alignItems="center" direction="row">
              {treasures?.collected} / {treasures?.required}
              {getResourceIcon(RESOURCES.OLD_WORLD_TREASURES, 35)}
            </Stack>
          </Tooltip>
        </S.StatContainer>
      )}

      {economic && (
        <S.StatContainer>
          <Tooltip title={getEconomicInfo(economic)}>
            <Stack alignItems="center" direction="row">
              <Icons.EconomyOrnament />
            </Stack>
          </Tooltip>
        </S.StatContainer>
      )}

      {Boolean(charactersWithPointsToSpend.length) &&
        charactersWithPointsToSpend.map((item) => (
          <Tooltip title={`${item} имеет нераспределенные очки`} key={item}>
            <S.StatContainer onClick={toggleCharacterPanel}>
              <Icons.LeveledUpCharacter />
            </S.StatContainer>
          </Tooltip>
        ))}

      {Boolean(deadCharacter.length) &&
        deadCharacter.map((character) => (
          <Tooltip
            title={`${character} погиб. Стоит посетить целителя.`}
            key={character}
          >
            <Stack>
              <Icons.CoffinIcon />
            </Stack>
          </Tooltip>
        ))}

      <S.StatContainer>
        <Tooltip title="Факела">
          <Stack alignItems="center" direction="row">
            {torches} <Icons.TorchIcon />
          </Stack>
        </Tooltip>
      </S.StatContainer>

      <S.StatContainer>
        <Tooltip title="Золото">
          <Stack alignItems="center" direction="row">
            {gold}
            <Icons.GoldIcon />
          </Stack>
        </Tooltip>
      </S.StatContainer>

      {quest && (
        <S.StatContainer>
          <S.BarStatusText>{title}</S.BarStatusText>
          {icon}
        </S.StatContainer>
      )}
    </S.ModalContent>,
    document.getElementById("root")!,
  );
};
