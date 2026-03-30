import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { calculateAiDamage, getBattleBackground } from "./utils";
import { DamageData } from "./types";
import { useBattleEffectsExecutor } from "./hooks/useBattleEffectsExecutor";
import { AnimatePresence } from "framer-motion";
import { calculateDamage } from "./components/CharactersBar/utils";

const getLayoutCoordinates = (enemiesAmount?: number) => {
  console.log("enemiesAmount", enemiesAmount);

  switch (enemiesAmount) {
    case 3: {
      return ["25%", "50%", "75%"];
    }

    case 2: {
      return ["25%", "75%"];
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
  // SelectedEnemy - выбранный противник
  const { isFading, selectedEnemy } = useAppState();

  const {
    isDiceRequiredRoll,
    turnOffDices,
    player: { battle, party, currentTier, location },
    updateBattle,
    killEnemy,
    statistics,
    gear,
  } = useGameState();

  const [showDices, setShowDices] = useState(isDiceRequiredRoll);

  useHandleBattleEnd();

  const [isFirstRender, setFirstRender] = useState(true);
  const resetFirstRender = () => setFirstRender(false);

  // отслеживаем ходы игрока - переключает на ход противника
  const nextTurn = usePlayerTurnIsOver(
    showDices || isDiceRequiredRoll,
    isFirstRender,
    resetFirstRender,
  );
  console.log("showDices", showDices);
  console.log("isDiceRequiredRoll", isDiceRequiredRoll);
  console.log("nextTurn", nextTurn);
  console.log("ифее", battle?.turn);

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

  // когда буду писать логику нанесения урона и в принципе действия игрока - нужно учесть что нужны флаг - критический ли урон
  // а также чтобы у нас коллбэк действий возвращал кол-во урона для его отображения

  // ЧЕРЕЗ СЛУШАТЕЛИ смотрим на нажатие A - ATTACK или клик по противнику - в утиль функцию передаем текущую модель боя
  // утиль функция генерирует новую модель и ее устанавливаем через updateBattle - мы сразу в новой модели генерируем новое сообщение боя,
  // отнимает хп у врага, патроны из магазина у игрока, развешивает статус эффекты, проигрываем анимации
  // функцию атаки нужно делать на верхнем уровне - в этом компоненте - вычисленное состояние помещать в ref - и оттуда брать его по окончанию анимации и сбрасывать

  // флаги анимации атаки и
  const [isShooting, setShooting] = useState(false);

  // отвечает за то, что противник должен проиграть анимацию атаки
  const [attackingEnemyId, setAttackingEnemyId] = useState<string | null>(null);

  // эта модель будет замещать собой все остальные состояния кроме флагов атаки
  const [battleDamageModel, setBattleDamageModel] = useState<
    null | DamageData[]
  >(null);

  const tempBattleModel = useRef<null | Battle>(null);

  const enemyLayout = getLayoutCoordinates(battle?.enemy?.party?.length);

  const currentBackground = useMemo(
    () => getBattleBackground(location?.dungeonLevel || currentTier),
    [location?.dungeonLevel, currentTier],
  );

  const resetAnimations = () => {
    console.log("DO WE FIRE AT ALL?");
    // если это урон от эффекта
    if (tempBattleModel.current) {
      const model = tempBattleModel.current;
      console.log("DO WE FIRE AT ALL? AND WE HERE?", model);
      console.log("DO WE FIRE AT ALL? AND WE HERE?", attackingEnemyId);

      if (
        battleDamageModel &&
        battleDamageModel.length === 1 &&
        battleDamageModel[0].isEffect
      ) {
        if (battle?.turn === TURN_STATES.ENEMY_TURN) {
          handleSelectNextEnemy(model);
        } else {
          handleSelectNextPlayer(model);
        }

        setBattleDamageModel(null);

        tempBattleModel.current = null;
        return;
      }

      if (battle?.turn === TURN_STATES.ENEMY_TURN) {
        handleSelectNextEnemy(model);

        setAttackingEnemyId(null);
        tempBattleModel.current = null;
      }

      if (battle?.turn === TURN_STATES.PLAYER_TURN) {
        handleSelectNextPlayer(model);

        setShooting(false);
        tempBattleModel.current = null;
      }

      console.log("DO WE FIRE AT ALL? AND WE HERE? TOOO!");

      setBattleDamageModel(null);
    }
  };

  const isPlayerTurnAvailable =
    battle?.player?.effects[selectedPlayer?.name || ""]?.hasTriggered;

  const handlePlayerAttack = useCallback(
    (newState?: Battle) => {
      const stateSource = newState ?? battle;

      if (
        stateSource &&
        statistics &&
        selectedPlayer &&
        !isShooting &&
        stateSource?.enemy.party[selectedEnemy] &&
        isPlayerTurnAvailable
      ) {
        const { model, damageModel } = calculateDamage(
          stateSource,
          statistics,
          selectedPlayer?.name,
          stateSource?.enemy.party[selectedEnemy],
          magSizesMap[selectedPlayer?.name],
        );

        tempBattleModel.current = model;

        setBattleDamageModel(damageModel);
        setShooting(true);
      }
    },
    [
      battle,
      statistics,
      selectedPlayer,
      selectedEnemy,
      magSizesMap,
      isShooting,
      isPlayerTurnAvailable,
    ],
  );

  useEffect(() => {
    const handleKeyBindings = (event: KeyboardEvent) => {
      if (
        event.code === "KeyF" &&
        battle?.turn === TURN_STATES.PLAYER_TURN &&
        !isShooting
      ) {
        handlePlayerAttack();
      }
    };

    document.addEventListener("keydown", handleKeyBindings);

    return () => {
      document.removeEventListener("keydown", handleKeyBindings);
    };
  }, [handlePlayerAttack, battle?.turn, isShooting]);

  console.log("battleDamageModel", battleDamageModel);

  useEffect(() => {
    // если нет анимаций кубика, нет анимаций переключения хода, если ход противника, выбран противник для хода и нет анимации атаки противника - запускаем логику боя
    console.log(
      "is it is",
      !showDices &&
        !nextTurn &&
        battle?.turn === TURN_STATES.ENEMY_TURN &&
        currentEnemy &&
        !attackingEnemyId &&
        battle &&
        statistics &&
        battle?.enemy?.effects[currentEnemy?.id]?.hasTriggered,
    );
    console.log(
      "battle.enemy.effects[currentEnemy.id].hasTriggered",
      battle?.enemy?.effects[currentEnemy?.id || ""]?.hasTriggered,
    );
    if (
      !showDices &&
      !nextTurn &&
      battle?.turn === TURN_STATES.ENEMY_TURN &&
      currentEnemy &&
      !attackingEnemyId &&
      battle &&
      statistics &&
      battle.enemy.effects[currentEnemy.id].hasTriggered
    ) {
      console.log("are we here basically once?");
      const { damageModel, model } = calculateAiDamage(
        battle,
        statistics,
        currentEnemy,
      );
      console.log("are we here basically once?model", model);

      tempBattleModel.current = model;
      setBattleDamageModel(damageModel);
      setAttackingEnemyId(currentEnemy.id!);
    }
  }, [
    battle,
    statistics,
    battle?.turn,
    currentEnemy,
    attackingEnemyId,
    showDices,
    nextTurn,
  ]);

  const handleUpdateEffectState = (
    battleModel: Battle,
    damageModel: DamageData,
  ) => {
    tempBattleModel.current = battleModel;
    setBattleDamageModel([damageModel]);
  };

  useBattleEffectsExecutor({
    selectedCharacter: selectedPlayer?.name,
    selectedEnemy: currentEnemy?.id,
    isReadyToTrigger: !showDices && !nextTurn,
    toggleNextEnemy: handleSelectNextEnemy,
    toggleNextPlayer: handleSelectNextPlayer,
    updateDamageModel: handleUpdateEffectState,
  });

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
        selectedNextPlayer={handleSelectNextPlayer}
        damageModel={
          battle?.turn === TURN_STATES.ENEMY_TURN ? battleDamageModel : null
        }
        onResetAnimation={resetAnimations}
        onAttack={handlePlayerAttack}
        isPlayerTurnAvailable={Boolean(isPlayerTurnAvailable)}
      />

      {battle?.enemy?.party?.map((item, index, self) => {
        const currentBattleDamageModel =
          battle.turn === TURN_STATES.PLAYER_TURN &&
          battleDamageModel &&
          battleDamageModel.find((damage) => damage.target === item.id);

        const { damage, isCritical, isEvasion, shouldPlayDeathAnimation } =
          currentBattleDamageModel || {};

        return (
          <Enemy
            type={item.type}
            isUnderAttack={Boolean(currentBattleDamageModel)}
            shouldPlayDeathAnimation={Boolean(shouldPlayDeathAnimation)}
            key={index}
            damage={damage}
            isCritical={isCritical}
            index={index}
            onDamageAnimationEnd={resetAnimations}
            layout={enemyLayout[index]}
            isAttacking={item.id === attackingEnemyId}
            onAttackEnd={resetAnimations}
            isEvasion={Boolean(isEvasion)}
            isSelected={
              battle?.turn === TURN_STATES.PLAYER_TURN &&
              index === selectedEnemy &&
              !isShooting &&
              self.length > 1
            }
          />
        );
      })}

      {isShooting && (
        <ShootingEffect
          sourceId={selectedPlayer?.name || ""}
          targetId={`enemy-${selectedEnemy}`}
          onComplete={resetAnimations}
          shots={selectedPlayer?.name ? magSizesMap[selectedPlayer?.name] : 1}
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

      <AnimatePresence
        onExitComplete={() => {
          console.log("are we triggered?");
          turnOffDices();
        }}
      >
        {showDices && (
          <DiceRollModal
            key="dice-modal" // Ключ обязателен для AnimatePresence!
            turnOwner={`Первым ходит: ${battle?.turn === TURN_STATES.ENEMY_TURN ? "Противник" : "Игрок"}`}
            onAnimationEnd={() => setShowDices(false)}
          />
        )}
      </AnimatePresence>
    </Stack>
  );
};
