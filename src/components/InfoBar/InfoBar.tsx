import { TorchIcon, GoldIcon } from "../../common";
import { useGameState } from "../../stores";
import { getEconomicInfo, getQuestInfo } from "./utils";
import { BarStatusText, ModalContent, StatContainer } from "./InfoBar.styled";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import { LeveledUpCharacter } from "../../common/Icons/LeveledUpCharacter";
import { Tooltip } from "../../common/Tooltip";
import { EconomyOrnament } from "../../common/Icons/EconomicBranch";

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
  }, [player1.points, player2.points, player3.points]);

  return (
    <ModalContent>
      <StatContainer>
        <Tooltip title={getEconomicInfo(economic)}>
          <Stack alignItems="center" direction="row">
            <EconomyOrnament />
          </Stack>
        </Tooltip>
      </StatContainer>

      {Boolean(charactersWithPointsToSpend.length) &&
        charactersWithPointsToSpend.map((item) => (
          <Tooltip title={`${item} имеет нераспределенные очки`} key={item}>
            <StatContainer onClick={toggleCharacterPanel}>
              <LeveledUpCharacter />
            </StatContainer>
          </Tooltip>
        ))}

      <StatContainer>
        <Tooltip title="Факела">
          <Stack alignItems="center" direction="row">
            {torches} <TorchIcon />
          </Stack>
        </Tooltip>
      </StatContainer>

      <StatContainer>
        <Tooltip title="Золото">
          <Stack alignItems="center" direction="row">
            {gold}
            <GoldIcon />
          </Stack>
        </Tooltip>
      </StatContainer>

      {quest && (
        <StatContainer>
          <BarStatusText>{title}</BarStatusText>
          {icon}
        </StatContainer>
      )}
      {/* пока под вопросом как выводить список consumables */}
      {/* <StatContainer></StatContainer> */}
    </ModalContent>
  );
};
