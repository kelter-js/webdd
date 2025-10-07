import { useState } from "react";
import { Stack, Typography, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import {
  AbilityGrid,
  AbilityIcon,
  CharacterContainer,
  CharacterName,
  StatItem,
} from "./Leveling.styled";

export const CharacterCard = ({ character }: any) => {
  const [activeAbility, setActiveAbility] = useState<null | number>(null);

  const handleAbilityClick = (index: number) => {
    setActiveAbility(index);
    setTimeout(() => setActiveAbility(null), 1000);
  };

  return (
    <CharacterContainer>
      <motion.div
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <CharacterName variant="h2">{character.name}</CharacterName>

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
          {character.abilities.map((ability: any, index: number) => (
            <Tooltip
              key={index}
              title={ability.description}
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
                onClick={() => handleAbilityClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  activeAbility === index
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
              >
                <img
                  src={ability.icon}
                  alt={ability.name}
                  onError={(e) => {
                    // e.target?.src = "fallback-icon.svg";
                  }}
                />
              </AbilityIcon>
            </Tooltip>
          ))}
        </AbilityGrid>

        {/* Блок характеристик */}
        <Stack mt="auto ">
          <Typography
            variant="h6"
            sx={{
              color: "#a08060",
              textAlign: "center",
              mt: 3,
              mb: 2,
              textDecoration: "underline",
              textUnderlineOffset: "6px",
            }}
          >
            Характеристики
          </Typography>

          <Stack spacing={1}>
            {Object.entries(character.stats).map(([key, value]: any) => (
              <StatItem key={key}>
                <Typography className="stat-name">{key}:</Typography>
                <motion.div
                  className="stat-value"
                  animate={
                    character.prevStats && character.prevStats[key] !== value
                      ? {
                          color: ["#e0b050", "#ff0000", "#e0b050"],
                          scale: [1, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.8 }}
                >
                  {value}
                </motion.div>
              </StatItem>
            ))}
          </Stack>
        </Stack>
      </motion.div>
    </CharacterContainer>
  );
};
