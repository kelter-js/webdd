import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stack } from "@mui/material";
import encounter from "../../assets/hospital_encounter.png";
import { CharactersBar } from "./components/CharactersBar";
import { BattleLog } from "./components/BattleLog";

import { Enemy } from "./components/Enemy";
import { useAppState, useGameState } from "../../stores";
import { DiceRollModal, TurnIndicator } from "../../common";
import { ENEMIES, TURN_STATES } from "../../entities";
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
import { DIALOGUE_FLAGS, DIALOGUE_IDS } from "../../entities/dialogues";
import { BUILDING_NAMES } from "../../constants";
import { useGetDialogue } from "../../hooks";
import { Dialogue } from "../Dialogue";
import { getNextTargetIndex, getPrevTargetIndex } from "../../utils/getTargets";

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
  const {
    isFading,
    selectedEnemy,
    setSelectedEnemy,
    setDialogueOpen,
    isDialogueOpen,
  } = useAppState();

  const {
    isDiceRequiredRoll,
    turnOffDices,
    player: { battle, party, currentTier, location, dialogFlags },
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

  useEffect(() => {
    if (
      battle?.enemy.party[0].type === ENEMIES.MERGED_MASS_TIER_1 &&
      !isDialogueOpen &&
      !dialogFlags.includes(DIALOGUE_FLAGS.FINAL_DIALOG_ENDED)
    ) {
      setDialogueOpen(BUILDING_NAMES.FINAL_DIALOGUE);
    }
  }, [battle?.enemy.party, isDialogueOpen]);

  const dialogTree = useGetDialogue(isDialogueOpen);

  console.log("showDices", showDices);
  console.log("isDiceRequiredRoll", isDiceRequiredRoll);
  console.log("nextTurn", nextTurn);
  console.log("gear", gear);

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
      setSelectedEnemy(getPrevTargetIndex(selectedEnemy, battle?.enemy.party));
    }
  };

  const isPlayerTurnAvailable =
    battle?.player?.effects[selectedPlayer?.name || ""]?.hasTriggered;

  console.log("battleDamageModel", battleDamageModel);
  console.log("magSizesMap", magSizesMap);
  console.log("selectedPlayer", selectedPlayer);
  console.log(
    "magSizesMap[selectedPlayer?.name]",
    magSizesMap[selectedPlayer?.name || ""],
  );

  const handlePlayerAttack = useCallback(
    (newState?: Battle) => {
      const stateSource = newState ?? battle;
      console.log("START");
      console.log("isShooting", isShooting);
      console.log("isPlayerTurnAvailable", isPlayerTurnAvailable);
      console.log(
        "stateSource?.enemy.party[selectedEnemy]",
        stateSource?.enemy.party[selectedEnemy],
      );

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

  const handleUpdateEffectState = (
    battleModel: Battle,
    damageModel: DamageData,
  ) => {
    tempBattleModel.current = battleModel;
    setBattleDamageModel([damageModel]);
  };

  const isApplyingEffects = useBattleEffectsExecutor({
    selectedCharacter: selectedPlayer?.name,
    selectedEnemy: currentEnemy?.id,
    isReadyToTrigger: !showDices && !nextTurn,
    toggleNextEnemy: handleSelectNextEnemy,
    toggleNextPlayer: handleSelectNextPlayer,
    updateDamageModel: handleUpdateEffectState,
  });

  useEffect(() => {
    // если нет анимаций кубика, нет анимаций переключения хода, если ход противника, выбран противник для хода и нет анимации атаки противника - запускаем логику боя

    if (
      !showDices &&
      !nextTurn &&
      battle?.turn === TURN_STATES.ENEMY_TURN &&
      currentEnemy &&
      !attackingEnemyId &&
      battle &&
      statistics &&
      battle.enemy.effects[currentEnemy.id].hasTriggered &&
      !isApplyingEffects &&
      !dialogTree
    ) {
      const { damageModel, model } = calculateAiDamage(
        battle,
        statistics,
        currentEnemy,
      );

      if (damageModel && damageModel[0]?.isHealing) {
        handleSelectNextEnemy(model);
        return;
      }

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
    isApplyingEffects,
    dialogTree,
  ]);

  useEffect(() => {
    if (
      battle?.enemy.party[selectedEnemy] &&
      battle?.enemy.party[selectedEnemy].hp <= 0
    ) {
      setSelectedEnemy(getPrevTargetIndex(selectedEnemy, battle?.enemy.party));
    }
  }, [selectedEnemy, battle?.enemy.party]);

  console.log("selectedEnemy", selectedEnemy);

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
        isPlayerTurnAvailable={Boolean(
          isPlayerTurnAvailable && !isApplyingEffects && !dialogTree,
        )}
      />

      {battle?.enemy?.party?.map((creature, index, self) => {
        if (creature.hp <= 0) {
          return null;
        }

        const currentBattleDamageModel =
          battle.turn === TURN_STATES.PLAYER_TURN &&
          battleDamageModel &&
          battleDamageModel.find((damage) => damage.target === creature.id);

        const { damage, isCritical, isEvasion, shouldPlayDeathAnimation } =
          currentBattleDamageModel || {};

        const effects = battle.enemy.effects[creature.id];

        return (
          <Enemy
            creature={creature}
            isUnderAttack={Boolean(currentBattleDamageModel)}
            shouldPlayDeathAnimation={Boolean(shouldPlayDeathAnimation)}
            key={index}
            damage={damage}
            isCritical={isCritical}
            index={index}
            onDamageAnimationEnd={resetAnimations}
            layout={enemyLayout[index]}
            isAttacking={creature.id === attackingEnemyId}
            onAttackEnd={resetAnimations}
            isEvasion={Boolean(isEvasion)}
            isSelected={
              battle?.turn === TURN_STATES.PLAYER_TURN &&
              index === selectedEnemy &&
              !isShooting &&
              self.length > 1
            }
            effectsList={effects.list}
          />
        );
      })}

      {isShooting && (
        <ShootingEffect
          sourceId={selectedPlayer?.name || ""}
          targetId={`enemy-${selectedEnemy}`}
          onComplete={resetAnimations}
          shots={
            selectedPlayer?.name ? magSizesMap[selectedPlayer?.name] || 1 : 1
          }
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
      {/* 
      {isApplyingEffects && !showDices && !nextTurn && (
        <TurnIndicator show={isApplyingEffects} text="Применяем эффекты..." />
      )} */}

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

      {dialogTree && <Dialogue dialogueTree={dialogTree} />}
    </Stack>
  );
};
