import { FC, useMemo } from "react";
import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

import {
  FIRST_PERK_LEVEL_REQUIREMENT,
  SECOND_PERK_LEVEL_REQUIREMENT,
  THIRD_PERK_LEVEL_REQUIREMENT,
  FOURTH_PERK_LEVEL_REQUIREMENT,
  FIFTH_PERK_LEVEL_REQUIREMENT,
  FIRST_TIER_PERKS,
  SECOND_TIER_PERKS,
  THIRD_TIER_PERKS,
  FOURTH_TIER_PERKS,
  FIFTH_TIER_PERKS,
  PERK_DATA_BY_CLASSES,
} from "../../constants/perks";
import {
  ANIMATION_CONTAINER_STYLES,
  STAT_ANIMATE_CONFIG,
  STAT_TRANSITION_CONFIG,
} from "./constants";
import { PERK_ID_DATA } from "../../types/gameState";
import { PerkList } from "./components/PerkList";
import { CharacterCardProps } from "./types";
import { useGameState } from "../../stores";
import * as S from "./Leveling.styled";

export const CharacterCard: FC<CharacterCardProps> = ({
  name,
  endurance,
  accuracy,
  agility,
  points,
  characterClass,
  perksList,
  level,
}) => {
  const { increaseAccuracy, increaseAgility, increaseEndurance, acquirePerk } =
    useGameState();

  const handleIncreaseAccuracy = () => {
    if (points) {
      increaseAccuracy(name);
    }
  };

  const handleIncreaseAgility = () => {
    if (points) {
      increaseAgility(name);
    }
  };

  const handleIncreaseEndurance = () => {
    if (points) {
      increaseEndurance(name);
    }
  };

  const handleAcquirePerk = (perkId: PERK_ID_DATA) => {
    acquirePerk(perkId, name);
  };

  const hasSparePoints = points > 0;

  const perks = PERK_DATA_BY_CLASSES[characterClass];
  const characterSelectedPerksList = useMemo(
    () => perksList.map((item) => item.id),
    [perksList],
  );

  return (
    <S.CharacterContainer>
      <motion.div
        style={ANIMATION_CONTAINER_STYLES}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={STAT_TRANSITION_CONFIG}
      >
        <S.CharacterName variant="h2">{name}</S.CharacterName>

        <S.AbilitiesTitle mb={2} variant="h6">
          Способности
        </S.AbilitiesTitle>

        <S.AbilityGrid>
          <PerkList
            perksList={perks.firstTier}
            onSelect={handleAcquirePerk}
            selectedPerksList={characterSelectedPerksList}
            canAcquirePerk={
              level >= FIRST_PERK_LEVEL_REQUIREMENT &&
              !characterSelectedPerksList.some((perk) =>
                FIRST_TIER_PERKS.includes(perk),
              )
            }
            characterClass={characterClass}
          />

          <PerkList
            perksList={perks.secondTier}
            onSelect={handleAcquirePerk}
            selectedPerksList={characterSelectedPerksList}
            canAcquirePerk={
              level >= SECOND_PERK_LEVEL_REQUIREMENT &&
              !characterSelectedPerksList.some((perk) =>
                SECOND_TIER_PERKS.includes(perk),
              )
            }
            characterClass={characterClass}
          />

          <PerkList
            perksList={perks.thirdTier}
            onSelect={handleAcquirePerk}
            selectedPerksList={characterSelectedPerksList}
            canAcquirePerk={
              level >= THIRD_PERK_LEVEL_REQUIREMENT &&
              !characterSelectedPerksList.some((perk) =>
                THIRD_TIER_PERKS.includes(perk),
              )
            }
            characterClass={characterClass}
          />

          <PerkList
            perksList={perks.fourthTier}
            onSelect={handleAcquirePerk}
            selectedPerksList={characterSelectedPerksList}
            canAcquirePerk={
              level >= FOURTH_PERK_LEVEL_REQUIREMENT &&
              !characterSelectedPerksList.some((perk) =>
                FOURTH_TIER_PERKS.includes(perk),
              )
            }
            characterClass={characterClass}
          />

          <PerkList
            perksList={perks.fifthTier}
            onSelect={handleAcquirePerk}
            selectedPerksList={characterSelectedPerksList}
            canAcquirePerk={
              level >= FIFTH_PERK_LEVEL_REQUIREMENT &&
              !characterSelectedPerksList.some((perk) =>
                FIFTH_TIER_PERKS.includes(perk),
              )
            }
            characterClass={characterClass}
          />
        </S.AbilityGrid>

        <Stack mt="auto">
          <S.AbilitiesTitle variant="h6" mt={2} mb={hasSparePoints ? 0 : 2}>
            Характеристики
          </S.AbilitiesTitle>

          {hasSparePoints && (
            <S.SparePointsText variant="h6">
              Свободных очков: {points}
            </S.SparePointsText>
          )}

          <Stack spacing={1}>
            <S.StatItem
              hasSparePoints={hasSparePoints}
              onClick={handleIncreaseEndurance}
            >
              <Typography className="stat-name">Выносливость:</Typography>

              <motion.div
                className="stat-value"
                animate={STAT_ANIMATE_CONFIG}
                transition={STAT_TRANSITION_CONFIG}
              >
                {endurance}
              </motion.div>

              {hasSparePoints && <S.AddPoint>+</S.AddPoint>}
            </S.StatItem>

            <S.StatItem
              hasSparePoints={hasSparePoints}
              onClick={handleIncreaseAccuracy}
            >
              <Typography className="stat-name">Точность:</Typography>

              <motion.div
                className="stat-value"
                animate={STAT_ANIMATE_CONFIG}
                transition={STAT_TRANSITION_CONFIG}
              >
                {accuracy}
              </motion.div>

              {hasSparePoints && <S.AddPoint>+</S.AddPoint>}
            </S.StatItem>

            <S.StatItem
              hasSparePoints={hasSparePoints}
              onClick={handleIncreaseAgility}
            >
              <Typography className="stat-name">Ловкость:</Typography>

              <motion.div
                className="stat-value"
                animate={STAT_ANIMATE_CONFIG}
                transition={STAT_TRANSITION_CONFIG}
              >
                {agility}
              </motion.div>

              {hasSparePoints && <S.AddPoint>+</S.AddPoint>}
            </S.StatItem>
          </Stack>
        </Stack>
      </motion.div>
    </S.CharacterContainer>
  );
};
