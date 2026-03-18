import { useEffect, useMemo, useState } from "react";
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
import { ShootingEffect } from "./components/ShootingEffect";
import { GEAR_SLOTS } from "../../entities/gear";
import { Battle } from "../../types/gameState";
import { getBattleBackground } from "./utils";

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

export const BattleContainer = () => {
  const [showDices, setShowDices] = useState(false);

  const { isFading, selectedEnemy } = useAppState();
  const {
    isDiceRequiredRoll,
    turnOffDices,
    player: { battle, party, currentTier, location },
    updateBattle,
    killEnemy,
    gear,
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

  useEffect(() => {
    setTimeout(() => setDamage(125), 2000);
  }, []);

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
  console.log("ифее", battle?.turn);

  // usePlayerControl управляет и какой ходит сейчас игрок и какой противник
  // когда ходит игрок - сначала высчитывается эффект - другой хук будет обновлять состояние battle.player.effect[имя_игрока].hasTriggered - после срабатывания эффекта меняет на true
  // после игрок получает доступ к управлению персонажем - ходит, вычисляется новая модель боя, устанавливается через setTimeout(newModel, 200); - здесь мы отняли патроны из магазина,
  // отнимаем хп у врага, устанавливаем на него нужные эффекты
  // устанавливаем локальные состояния- крит ли это, сколько урона и проигрываем анимацию isShooting
  // в конце анимации floating damage у врага в коллбэке мы должны сделать следующее onAnimationEnd
  // этот коллбэк делает

  const {
    selectedPlayer,
    setSelectedPlayer,
    handleSelectNextPlayer,
    currentEnemy,
    handleSelectNextEnemy,
  } = usePlayerControl();

  const magSizesMap = useMemo(() => {
    if (!gear) {
      return Object.fromEntries(party.map((item) => [item.name, 1]));
    }

    return Object.fromEntries(
      Object.entries(gear).map(([key, value]) => [
        key,
        value.find((item) => item.type === GEAR_SLOTS.WEAPON)?.magSize || 1,
      ]),
    );
  }, [gear, party]);

  // const onTurnEnd = () => {
  //   setDamage(0);
  //   setTarget(null);

  //   if (battle?.turn === TURN_STATES.PLAYER_TURN) {
  //     setShooting(false);
  //     const newBattleModel: Battle = {
  //       ...battle,
  //       player: {
  //         ...battle.player,
  //         effects: {
  //           [selectedPlayer?.name]: {
  //             ...battle.player.effects[selectedPlayer?.name],
  //             hasTriggered: false,
  //           },
  //         },
  //         party: battle.player.party.map((player) =>
  //           player.name === selectedPlayer?.name
  //             ? {
  //                 ...player,
  //                 hasTurn: false,
  //                 currentAmountOfRounds: Math.max(
  //                   0,
  //                   (player.currentAmountOfRounds || 0) -
  //                     magSizesMap[selectedPlayer.name] || 1,
  //                 ),
  //               }
  //             : player,
  //         ),
  //       },
  //     };
  //     setNewBattleModel(newBattleModel);
  //     handleSelectNextPlayer(newBattleModel.player.party);
  //   } else {
  //     const newBattleModel: Battle = {
  //       ...battle,
  //       enemy: {
  //         ...battle.enemy,
  //         effects: {
  //           [currentEnemy?.id]: {
  //             ...battle.enemy.effects[currentEnemy?.id],
  //             hasTriggered: false,
  //           },
  //         },
  //         party: battle.enemy.party.map((creature) =>
  //           creature.id === currentEnemy?.id
  //             ? {
  //                 ...creature,
  //                 hasTurn: false,
  //               }
  //             : creature,
  //         ),
  //       },
  //     };
  //     setNewBattleModel(newBattleModel);
  //     handleSelectNextEnemy(newBattleModel.enemy.party);
  //   }
  // };

  // когда буду писать логику нанесения урона и в принципе действия игрока - нужно учесть что нужны флаг - критический ли урон
  // а также чтобы у нас коллбэк действий возвращал кол-во урона для его отображения

  // ЧЕРЕЗ СЛУШАТЕЛИ смотрим на нажатие A - ATTACK или клик по противнику - в утиль функцию передаем текущую модель боя
  // утиль функция генерирует новую модель и ее устанавливаем через updateBattle - мы сразу в новой модели генерируем новое сообщение боя,
  // отнимает хп у врага, патроны из магазина у игрока, развешивает статус эффекты, проигрываем анимации

  const [isShooting, setShooting] = useState(false);
  const [damage, setDamage] = useState(0);
  const [isCritical, setCritical] = useState(false);
  const [target, setTarget] = useState<number | null>(null);

  const resetShooting = () => setShooting(false);

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

  const currentBackground = useMemo(
    () => getBattleBackground(location?.dungeonLevel || currentTier),
    [location?.dungeonLevel, currentTier],
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
      <img src={currentBackground} className="map-image" />

      <BattleLog />

      <CharactersBar
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        damageTargetIndex={target}
        selectedNextPlayer={handleSelectNextPlayer}
        damageReceived={
          battle?.turn === TURN_STATES.ENEMY_TURN && damage ? damage : null
        }
        damageTarget={battle?.player.party[0].name ?? null}
      />

      {(battle?.enemy?.party || ["test", "test", "test"])?.map(
        (item, index, self) => (
          <Enemy
            key={index}
            damage={damage}
            isCritical
            index={index}
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

      {isShooting && (
        <ShootingEffect
          sourceId={selectedPlayer?.name || ""}
          targetId={`enemy-${selectedEnemy}`}
          onComplete={resetShooting}
          // shots={selectedPlayer?.name ? magSizesMap[selectedPlayer?.name] : 1}
          shots={10}
        />
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
