import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import encounter from "../../assets/hospital_encounter.png";
import { CharactersBar } from "./components/CharactersBar";
import { BattleLog } from "./components/BattleLog";

import { Enemy } from "./components/Enemy";
import { useAppState, useGameState } from "../../stores";
import { DiceRollModal } from "../../common";
import { TURN_STATES } from "../../entities";

export const Battle = () => {
  const [showDices, setShowDices] = useState(false);
  const { isFading } = useAppState();
  const {
    isDiceRequiredRoll,
    turnOffDices,
    player: { battle },
  } = useGameState();

  useEffect(() => {
    if (!isFading && isDiceRequiredRoll) {
      setShowDices(true);
      turnOffDices();
      setTimeout(() => {
        setShowDices(false);
      }, 2000);
    }
  }, [isFading]);

  // useEffect(() => {
  //   if (battle.enemy.currentHealth <= 0) {
  //     // логика конца боя
  //   }
  // }, [battle.enemy.currentHealth]);

  // useEffect(() => {
  //   if (battle.turn === TURN_STATES.ENEMY_TURN) {
  //     const runAi = async () => {
  //       const logic = getAiPackageByCreatureId(battle.enemy.id);
  //       const { isGameOver, model } = await logic(battle);
  //       // установка модели, проверка конца боя
  //        меняем ход на ход игрока
  //     };
  //     runAi();
  //   }
  // }, [battle.turn]);

  return (
    <Stack
      position="relative"
      sx={{
        "& img": {
          width: "calc(100vw - var(--scrollbar-width, 0px))",
          height: "100vh",
        },
      }}
    >
      <img src={encounter} className="map-image" />
      <BattleLog />
      <CharactersBar />
      <Enemy />

      {showDices && (
        <DiceRollModal
          turnOwner={`Первым ходит: ${
            battle?.turn === TURN_STATES.ENEMY_TURN ? "Противник" : "Игрок"
          }`}
        />
      )}
    </Stack>
  );
};
