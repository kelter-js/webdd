import { Stack } from "@mui/material";
import { CharacterCard } from "./Leveling";

// mock
const sampleCharacter = {
  name: "Крестоносец",
  stats: {
    Здоровье: 24,
    Гутаперчивость: 12,
    Рефлексы: 8,
  },
  abilities: [
    {
      name: "Сокрушение",
      icon: "/icons/smite.png",
      description: "Наносит 150% урона игнорируя 30% защиты",
    },
    {
      name: "Сокрушение",
      icon: "/icons/smite.png",
      description: "Наносит 150% урона игнорируя 30% защиты",
    },
    {
      name: "Сокрушение",
      icon: "/icons/smite.png",
      description: "Наносит 150% урона игнорируя 30% защиты",
    },
    {
      name: "Сокрушение",
      icon: "/icons/smite.png",
      description: "Наносит 150% урона игнорируя 30% защиты",
    },
    {
      name: "Сокрушение",
      icon: "/icons/smite.png",
      description: "Наносит 150% урона игнорируя 30% защиты",
    },
    {
      name: "Сокрушение",
      icon: "/icons/smite.png",
      description: "Наносит 150% урона игнорируя 30% защиты",
    },
    {
      name: "Сокрушение",
      icon: "/icons/smite.png",
      description: "Наносит 150% урона игнорируя 30% защиты",
    },
    {
      name: "Сокрушение",
      icon: "/icons/smite.png",
      description: "Наносит 150% урона игнорируя 30% защиты",
    },
    {
      name: "Сокрушение",
      icon: "/icons/smite.png",
      description: "Наносит 150% урона игнорируя 30% защиты",
    },
    {
      name: "Сокрушение",
      icon: "/icons/smite.png",
      description: "Наносит 150% урона игнорируя 30% защиты",
    },
  ],
};

export const LevelingMock = () => {
  return (
    <Stack gap={3} direction="row" width="100vw" justifyContent="center">
      <CharacterCard character={sampleCharacter} />

      <CharacterCard character={sampleCharacter} />

      <CharacterCard character={sampleCharacter} />
    </Stack>
  );
};
