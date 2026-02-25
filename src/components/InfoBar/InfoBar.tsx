import { useEffect, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";

import { Icons, Tooltip } from "../../common";
import { useGameState } from "../../stores";
import { getEconomicInfo, getQuestInfo } from "./utils";
import * as S from "./InfoBar.styled";
import { createPortal } from "react-dom";
import { getPotionIcon } from "../../utils/getPotionIcon";
import { getPotionDescriptionByType } from "../../utils/getPotionDescriptionByType";
import { ExclamationBlink } from "../../common/ExclamationBlink/ExclamationBlink";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { StyledSlider } from "../../common/styled.index";

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
    },
    toggleCharacterPanel,
    setVolume: setVolumeInStorage,
  } = useGameState();

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

  const { charactersWithPointsToSpend, deadCharacter } = useMemo(() => {
    return party.reduce<{
      charactersWithPointsToSpend: string[];
      deadCharacter: string[];
    }>(
      (acc, character) => {
        if (character.points) {
          acc.charactersWithPointsToSpend.push(character.name);
        }

        if (character.currentHealth <= 0) {
          acc.deadCharacter.push(character.name);
        }

        return acc;
      },
      { charactersWithPointsToSpend: [], deadCharacter: [] },
    );
  }, [
    player1?.points,
    player2?.points,
    player3?.points,
    player1?.currentHealth,
    player2?.currentHealth,
    player3?.currentHealth,
  ]);

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

      {consumables?.map((consumable) => {
        const [potionType, amount] = consumable;

        return (
          <S.StatContainer>
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
      {/* пока под вопросом как выводить список consumables */}
      {/* <StatContainer></StatContainer> */}
    </S.ModalContent>,
    document.getElementById("root")!, // или document.getElementById('root')
  );

  // return (
  //   <S.ModalContent>
  //     <S.StatContainer>
  //       <Tooltip title="Малые зелья здоровья">
  //         <Stack alignItems="center" direction="row">
  //           {gold}
  //           <Icons.HealthPotionClassic />
  //         </Stack>
  //       </Tooltip>
  //     </S.StatContainer>
  //     <S.StatContainer>
  //       <Tooltip title="Средние зелья здоровья">
  //         <Stack alignItems="center" direction="row">
  //           {gold}
  //           <Icons.HealthPotionBulbous />
  //         </Stack>
  //       </Tooltip>
  //     </S.StatContainer>
  //     <S.StatContainer>
  //       <Tooltip title="Большие зелья здоровья">
  //         <Stack alignItems="center" direction="row">
  //           {gold}
  //           <Icons.HealthPotionCrystal />
  //         </Stack>
  //       </Tooltip>
  //     </S.StatContainer>
  //     <S.StatContainer>
  //       <Tooltip title="Ритуальные зелья здоровья">
  //         <Stack alignItems="center" direction="row">
  //           {gold}
  //           <Icons.HealthPotionRitual />
  //         </Stack>
  //       </Tooltip>
  //     </S.StatContainer>
  //     <S.StatContainer>
  //       <Tooltip title={getEconomicInfo(economic)}>
  //         <Stack alignItems="center" direction="row">
  //           <Icons.EconomyOrnament />
  //         </Stack>
  //       </Tooltip>
  //     </S.StatContainer>
  //     {Boolean(charactersWithPointsToSpend.length) &&
  //       charactersWithPointsToSpend.map((item) => (
  //         <Tooltip title={`${item} имеет нераспределенные очки`} key={item}>
  //           <S.StatContainer onClick={toggleCharacterPanel}>
  //             <Icons.LeveledUpCharacter />
  //           </S.StatContainer>
  //         </Tooltip>
  //       ))}
  //     <S.StatContainer>
  //       <Tooltip title="Факела">
  //         <Stack alignItems="center" direction="row">
  //           {torches} <Icons.TorchIcon />
  //         </Stack>
  //       </Tooltip>
  //     </S.StatContainer>
  //     <S.StatContainer>
  //       <Tooltip title="Золото">
  //         <Stack alignItems="center" direction="row">
  //           {gold}
  //           <Icons.GoldIcon />
  //         </Stack>
  //       </Tooltip>
  //     </S.StatContainer>
  //     {quest && (
  //       <S.StatContainer>
  //         <S.BarStatusText>{title}</S.BarStatusText>
  //         {icon}
  //       </S.StatContainer>
  //     )}
  //     {/* пока под вопросом как выводить список consumables */}
  //     {/* <StatContainer></StatContainer> */}
  //   </S.ModalContent>
  // );
};
