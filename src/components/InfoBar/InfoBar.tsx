import { useMemo } from "react";
import { Stack } from "@mui/material";

import { Icons, Tooltip } from "../../common";
import { useGameState } from "../../stores";
import { getEconomicInfo, getQuestInfo } from "./utils";
import * as S from "./InfoBar.styled";
import { createPortal } from "react-dom";
import { getPotionIcon } from "../../utils/getPotionIcon";
import { getPotionDescriptionByType } from "../../utils/getPotionDescriptionByType";
import { ExclamationBlink } from "../../common/ExclamationBlink/ExclamationBlink";

export const InfoBar = () => {
  const {
    player: { gold, torches, quest, consumables, party, economic },
    toggleCharacterPanel,
  } = useGameState();

  const { title, icon } = getQuestInfo(quest?.type);
  const [player1, player2, player3] = party;

  const charactersWithPointsToSpend = useMemo(() => {
    return party.reduce<string[]>((acc, character) => {
      if (character.points) {
        acc.push(character.name);
      }

      return acc;
    }, []);
  }, [player1?.points, player2?.points, player3?.points]);

  return createPortal(
    <S.ModalContent>
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

      <S.StatContainer>
        <Tooltip title={getEconomicInfo(economic)}>
          <Stack alignItems="center" direction="row">
            <Icons.EconomyOrnament />
          </Stack>
        </Tooltip>
      </S.StatContainer>

      {Boolean(charactersWithPointsToSpend.length) &&
        charactersWithPointsToSpend.map((item) => (
          <Tooltip title={`${item} имеет нераспределенные очки`} key={item}>
            <S.StatContainer onClick={toggleCharacterPanel}>
              <Icons.LeveledUpCharacter />
            </S.StatContainer>
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
    document.getElementById("root")! // или document.getElementById('root')
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
