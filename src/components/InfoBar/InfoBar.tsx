import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { createPortal } from "react-dom";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import {
  getDungeonCounterByTier,
  getEconomicInfo,
  getQuestInfo,
} from "./utils";
import {
  getResourceIcon,
  getPotionIcon,
  getPotionDescriptionByType,
} from "../../utils";

import { ExclamationBlink } from "../../common/ExclamationBlink";
import { useCharacterState } from "./hooks/useCharacterState";
import { useGetResourceState } from "./useGetResourceState";
import { DEFAULT_VOLUME_ADJUST_DELAY } from "./constants";
import { RESOURCES } from "../../entities/resources";
import { DEFAULT_BAG_SIZE } from "../../constants";
import { Icons, Tooltip } from "../../common";
import { useGameState } from "../../stores";
import bagIcon from "../../assets/minigame/bag.png";
import { StyledSlider } from "../../common/styled.index";
import * as S from "./InfoBar.styled";

export const InfoBar = () => {
  const {
    player: {
      gold,
      torches,
      quest,
      consumables,
      economic,
      volume: storageVolume,
      resourcesBagLevel,
      resources,
      playStatistics,
      currentTier,
    },
    toggleCharacterPanel,
    setVolume: setVolumeInStorage,
  } = useGameState();

  const currentBagMaxSize = DEFAULT_BAG_SIZE * resourcesBagLevel;

  const [isVolumeVisible, setVolumeVisible] = useState(false);

  const [volume, setVolume] = useState<number | number[]>(storageVolume);

  useEffect(() => {
    const timerId = setTimeout(
      () => setVolumeInStorage(Array.isArray(volume) ? volume[0] : volume),
      DEFAULT_VOLUME_ADJUST_DELAY,
    );

    return () => clearTimeout(timerId);
  }, [volume]);

  const handleVolumeVisible = () => setVolumeVisible(true);
  const handleVolumeHide = () => setVolumeVisible(false);

  const { title, icon } = getQuestInfo(quest?.type);

  const { ore, treasures, soul } = useGetResourceState();

  const {
    charactersWithPointsToSpend,
    deadCharacter,
    aliveCharacters,
    expStatistics,
  } = useCharacterState();

  return createPortal(
    <S.ModalContent>
      <S.Container
        onMouseEnter={handleVolumeVisible}
        onMouseLeave={handleVolumeHide}
      >
        <VolumeUpIcon />

        {isVolumeVisible && (
          <S.VolumeContainer>
            <StyledSlider
              orientation="vertical"
              value={volume}
              min={1}
              max={100}
              onChange={(_, val) => setVolume(val)}
              valueLabelDisplay="auto"
              sx={{ height: "100%" }}
            />
          </S.VolumeContainer>
        )}
      </S.Container>

      <S.StatContainer>
        <Tooltip title="Продвижение по сюжету...">
          <Stack alignItems="center" direction="row" gap={1}>
            {playStatistics?.dungeonCounter} /
            {getDungeonCounterByTier(currentTier)}
            <Icons.Dungeon size={40} />
          </Stack>
        </Tooltip>
      </S.StatContainer>

      {expStatistics.map(({ exp, name }) => (
        <S.StatContainer key={name}>
          <Tooltip title={`Текущий опыт ${name}`}>
            <Stack alignItems="center" direction="row" gap={1}>
              <S.BarStatusText
                letterSpacing="1px"
                fontFamily="inherit"
                fontSize={20}
              >
                EXP
              </S.BarStatusText>

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
