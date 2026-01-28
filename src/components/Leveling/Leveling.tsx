import { FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { Tooltip } from "../../common";
import {
  AbilityGrid,
  AbilityIcon,
  CharacterContainer,
  CharacterName,
  StatItem,
} from "./Leveling.styled";
import { CharacterCardProps } from "./types";
import { useGameState } from "../../stores";
import { PERK_DATA_BY_CLASSES } from "../../constants/perks";

export const CharacterCard: FC<CharacterCardProps> = ({
  name,
  endurance,
  accuracy,
  agility,
  points,
  characterClass,
}) => {
  const { increaseAccuracy, increaseAgility, increaseEndurance } =
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

  const [activeAbility, setActiveAbility] = useState<null | number>(null);

  const handleAbilityClick = (index: number) => {
    setActiveAbility(index);
    setTimeout(() => setActiveAbility(null), 1000);
  };

  const hasSparePoints = points > 0;

  const perks = PERK_DATA_BY_CLASSES[characterClass];

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
          {perks.firstTier.map((perk, index) => (
            <Tooltip
              key={perk.id}
              title={perk.description}
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#1a0a0a",
                    border: "2px solid #5a2a2a",
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
                // onClick={() => handleAbilityClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  // activeAbility === index
                  false
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
                style={{ marginLeft: index === 0 ? "60px" : 0 }}
              >
                {/* <img
                src={ability.icon}
                alt={ability.name}
                onError={(e) => {
                  // e.target?.src = "fallback-icon.svg";
                }}
              /> */}
              </AbilityIcon>
            </Tooltip>
          ))}

          {perks.secondTier.map((perk, index) => (
            <Tooltip
              key={perk.id}
              title={perk.description}
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#1a0a0a",
                    border: "2px solid #5a2a2a",
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
                // onClick={() => handleAbilityClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  // activeAbility === index
                  false
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
                style={{ marginLeft: index === 0 ? "60px" : 0 }}
              >
                {/* <img
                src={ability.icon}
                alt={ability.name}
                onError={(e) => {
                  // e.target?.src = "fallback-icon.svg";
                }}
              /> */}
              </AbilityIcon>
            </Tooltip>
          ))}

          {perks.thirdTier.map((perk, index) => (
            <Tooltip
              key={perk.id}
              title={perk.description}
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#1a0a0a",
                    border: "2px solid #5a2a2a",
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
                // onClick={() => handleAbilityClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  // activeAbility === index
                  false
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
                style={{ marginLeft: index === 0 ? "60px" : 0 }}
              >
                {/* <img
                src={ability.icon}
                alt={ability.name}
                onError={(e) => {
                  // e.target?.src = "fallback-icon.svg";
                }}
              /> */}
              </AbilityIcon>
            </Tooltip>
          ))}

          {perks.fourthTier.map((perk, index) => (
            <Tooltip
              key={perk.id}
              title={perk.description}
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#1a0a0a",
                    border: "2px solid #5a2a2a",
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
                // onClick={() => handleAbilityClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  // activeAbility === index
                  false
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
                style={{ marginLeft: index === 0 ? "60px" : 0 }}
              >
                {/* <img
                src={ability.icon}
                alt={ability.name}
                onError={(e) => {
                  // e.target?.src = "fallback-icon.svg";
                }}
              /> */}
              </AbilityIcon>
            </Tooltip>
          ))}

          {perks.fifthTier.map((perk, index) => (
            <Tooltip
              key={perk.id}
              title={perk.description}
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#1a0a0a",
                    border: "2px solid #5a2a2a",
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
                // onClick={() => handleAbilityClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  // activeAbility === index
                  false
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
                style={{ marginLeft: index === 0 ? "60px" : 0 }}
              >
                {/* <img
                src={ability.icon}
                alt={ability.name}
                onError={(e) => {
                  // e.target?.src = "fallback-icon.svg";
                }}
              /> */}
              </AbilityIcon>
            </Tooltip>
          ))}
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
