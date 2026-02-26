import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import encounter from "../../assets/hospital_encounter.png";
import { CharactersBar } from "./components/CharactersBar";
import { BattleLog } from "./components/BattleLog";

import { Enemy } from "./components/Enemy";
import { useAppState, useGameState } from "../../stores";
import { DiceRollModal, TurnIndicator } from "../../common";
import { TURN_STATES } from "../../entities";
import { usePlayerTurnIsOver } from "./hooks/usePlayerTurnIsOver";
import { usePlayerControl } from "./hooks/usePlayerControl";
import { useHandleBattleEnd } from "./hooks/useHandleBattleEnd";
import { wait } from "../../utils";

const getLayoutCoordinates = (enemiesAmount: number) => {
  switch (enemiesAmount) {
    case 3: {
      return ["25%", "50%", "75%"];
    }

    case 2: {
      return ["35%", "65%"];
    }

    case 1: {
      return ["50%"];
    }

    default: {
      return ["50%"];
    }
  }
};

export const Battle = () => {
  const [showDices, setShowDices] = useState(false);

  const { isFading, selectedEnemy } = useAppState();
  const {
    isDiceRequiredRoll,
    turnOffDices,
    player: { battle },
    updateBattle,
    killEnemy,
  } = useGameState();

  const [attackingEnemyId, setAttackingEnemyId] = useState<number | null>(null);

  useEffect(() => {
    if (!isFading && isDiceRequiredRoll) {
      setShowDices(true);
      turnOffDices();
      const fakeTimerId1 = setTimeout(() => {
        setShowDices(false);
      }, 1500);

      return () => {
        clearTimeout(fakeTimerId1);
      };
    }
  }, [isFading]);

  useHandleBattleEnd();

  // MOCK
  // useEffect(() => {
  //   const setDamage = async (index: number) => {
  //     setAttackingEnemyId(index);
  //     await wait(300);
  //     setTarget(index);
  //     await wait(500);
  //     setTarget(null);
  //   };

  //   const fakeTimerId1 = setTimeout(() => {
  //     killEnemy();
  //     setDamage(0);
  //   }, 5000);

  //   const fakeTimerId2 = setTimeout(() => {
  //     killEnemy();
  //     setDamage(1);
  //   }, 9000);

  //   const fakeTimerId3 = setTimeout(() => {
  //     killEnemy();
  //     setDamage(2);
  //   }, 13000);

  //   return () => {
  //     clearTimeout(fakeTimerId1);
  //     clearTimeout(fakeTimerId2);
  //     clearTimeout(fakeTimerId3);
  //   };
  // }, []);

  const handleAttackEnd = () => setAttackingEnemyId(null);

  // useEffect(() => {
  //   if (battle.turn === TURN_STATES.ENEMY_TURN) {
  //     const runAi = async () => {
  //       const logic = getAiPackageByCreatureId(battle.enemy.id);
  //      нужно возвращать нанесенный дамаг чтобы отображать на экране его
  //       const { isGameOver, model, damage, target } = await logic(battle);
  //       // установка модели, проверка конца боя
  //        меняем ход на ход игрока
  //        устанавливаем в локальные состояния урон и таргет - передаем в Character bar - отыгрывает анмиации и сбрасывает состояния
  //     };
  //     runAi();
  //   }
  // }, [battle.turn]);

  // отслеживаем ходы игрока - переключает на ход противника
  const nextTurn = usePlayerTurnIsOver(showDices || isDiceRequiredRoll);
  console.log("showDices", showDices || isDiceRequiredRoll);
  console.log("nextTurn", nextTurn);
  const { selectedPlayer, setSelectedPlayer, handleSelectNextPlayer } =
    usePlayerControl();

  // когда буду писать логику нанесения урона и в принципе действия игрока - нужно учесть что нужны флаг - критический ли урон
  // а также чтобы у нас коллбэк действий возвращал кол-во урона для его отображения

  // ЧЕРЕЗ СЛУШАТЕЛИ смотрим на нажатие A - ATTACK или клик по противнику - в утиль функцию передаем текущую модель боя
  // утиль функция генерирует новую модель и ее устанавливаем через updateBattle - мы сразу в новой модели генерируем новое сообщение боя,
  // отнимает хп у врага, патроны из магазина у игрока, развешивает статус эффекты, проигрываем анимации

  const [damage, setDamage] = useState(0);
  const [target, setTarget] = useState<number | null>(null);

  const resetTarget = () => setTarget(null);
  const resetDamage = () => setDamage(0);

  useEffect(() => {
    const fakeTimerId1 = setTimeout(() => {
      setDamage(125);
    }, 5000);

    return () => {
      clearTimeout(fakeTimerId1);
    };
  }, []);

  const handleClearDamage = () => setDamage(0);

  // const enemyLayout = getLayoutCoordinates(battle?.enemy?.party?.length || 0);
  // mock
  const enemyLayout = getLayoutCoordinates(
    battle?.enemy?.party?.length || ["test", "test", "test"].length,
  );

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

      <CharactersBar
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        damageTargetIndex={target}
        selectedNextPlayer={handleSelectNextPlayer}
      />

      {(battle?.enemy?.party || ["test", "test", "test"])?.map(
        (item, index, self) => (
          <Enemy
            key={index}
            damage={damage}
            isCritical
            onDamageAnimationEnd={handleClearDamage}
            layout={enemyLayout[index]}
            isAttacking={index === attackingEnemyId}
            onAttackEnd={handleAttackEnd}
            isSelected={
              battle?.turn === TURN_STATES.PLAYER_TURN &&
              index === selectedEnemy &&
              self.length > 1
            }
          />
        ),
      )}

      {!showDices && (
        <TurnIndicator
          show={nextTurn !== null}
          text={
            nextTurn === TURN_STATES.ENEMY_TURN
              ? "Ход Противника"
              : "Ход Игрока"
          }
        />
      )}

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
