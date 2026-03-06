import { FC, useMemo, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

import {
  AbilityGrid,
  CharacterContainer,
  CharacterName,
  StatItem,
} from "./Leveling.styled";
import { CharacterCardProps } from "./types";
import { useGameState } from "../../stores";
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
import { PERK_ID_DATA } from "../../types/gameState";
import { PerkList } from "./components/PerkList";

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
    console.log("we fire?");
    acquirePerk(perkId, name);
  };

  const [activeAbility, setActiveAbility] = useState<null | number>(null);

  const handleAbilityClick = (index: number) => {
    setActiveAbility(index);
    setTimeout(() => setActiveAbility(null), 1000);
  };

  const hasSparePoints = points > 0;

  const perks = PERK_DATA_BY_CLASSES[characterClass];
  const characterSelectedPerksList = useMemo(
    () => perksList.map((item) => item.id),
    [perksList],
  );

  return (
    <CharacterContainer>
      <motion.div
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <CharacterName variant="h2">{name}</CharacterName>

        <Typography
          variant="h6"
          sx={{
            color: "#a08060",
            textAlign: "center",
            mb: 2,
            textDecoration: "underline",
            textUnderlineOffset: "6px",
          }}
        >
          Способности
        </Typography>

        <AbilityGrid>
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
        </AbilityGrid>

        {/* Блок характеристик */}
        <Stack mt="auto">
          <Typography
            variant="h6"
            sx={{
              color: "#a08060",
              textAlign: "center",
              mt: 2,
              mb: hasSparePoints ? 0 : 2,
              textDecoration: "underline",
              textUnderlineOffset: "6px",
            }}
          >
            Характеристики
          </Typography>

          {hasSparePoints && (
            <Typography
              variant="h6"
              sx={{
                color: "#a08060",
                textAlign: "center",
                mt: 1,
                mb: 2,
              }}
            >
              Свободных очков: {points}
            </Typography>
          )}

          <Stack spacing={1}>
            <StatItem
              hasSparePoints={hasSparePoints}
              onClick={handleIncreaseEndurance}
            >
              <Typography className="stat-name">Выносливость:</Typography>

              <motion.div
                className="stat-value"
                animate={{
                  color: ["#e0b050", "#ff0000", "#e0b050"],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.8 }}
              >
                {endurance}
              </motion.div>

              {hasSparePoints && (
                <Typography
                  fontSize={50}
                  fontFamily="inherit"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "-3px",
                    right: "-5px",
                    minWidth: 40,
                    width: 40,
                    height: 40,
                    padding: 0,
                    textAlign: "center",
                    userSelect: "none",
                  }}
                >
                  +
                </Typography>
              )}
            </StatItem>

            <StatItem
              hasSparePoints={hasSparePoints}
              onClick={handleIncreaseAccuracy}
            >
              <Typography className="stat-name">Точность:</Typography>

              <motion.div
                className="stat-value"
                animate={{
                  color: ["#e0b050", "#ff0000", "#e0b050"],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.8 }}
              >
                {accuracy}
              </motion.div>

              {hasSparePoints && (
                <Typography
                  fontSize={50}
                  fontFamily="inherit"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "-3px",
                    right: "-5px",
                    minWidth: 40,
                    width: 40,
                    height: 40,
                    padding: 0,
                    textAlign: "center",
                    userSelect: "none",
                  }}
                >
                  +
                </Typography>
              )}
            </StatItem>

            <StatItem
              hasSparePoints={hasSparePoints}
              onClick={handleIncreaseAgility}
            >
              <Typography className="stat-name">Ловкость:</Typography>

              <motion.div
                className="stat-value"
                animate={{
                  color: ["#e0b050", "#ff0000", "#e0b050"],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.8 }}
              >
                {agility}
              </motion.div>

              {hasSparePoints && (
                <Typography
                  fontSize={50}
                  fontFamily="inherit"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "-3px",
                    right: "-5px",
                    minWidth: 40,
                    width: 40,
                    height: 40,
                    padding: 0,
                    textAlign: "center",

                    userSelect: "none",
                  }}
                >
                  +
                </Typography>
              )}
            </StatItem>
          </Stack>
        </Stack>
      </motion.div>
    </CharacterContainer>
  );
};
