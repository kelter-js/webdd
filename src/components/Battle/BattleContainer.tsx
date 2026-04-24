import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Stack } from "@mui/material";

import { useBattleEffectsExecutor } from "./hooks/useBattleEffectsExecutor";
import { calculateDamage } from "./components/CharactersBar/utils";
import { usePlayerTurnIsOver } from "./hooks/usePlayerTurnIsOver";
import {
  calculateAiDamage,
  getBattleBackground,
  getLayoutCoordinates,
} from "./utils";
import {
  DEFAULT_CENTER,
  ENEMY_ATTACK_SFX,
  PLAYER_ATTACK_SFX,
  PLAYER_RELOAD_SFX,
} from "./constants";
import { useHandleBattleEnd } from "./hooks/useHandleBattleEnd";
import { ShootingEffect } from "./components/ShootingEffect";
import { DiceRollModal, TurnIndicator } from "../../common";
import { usePlayerControl } from "./hooks/usePlayerControl";
import { CharactersBar } from "./components/CharactersBar";
import { WEAPONS_SFX_SOURCES } from "../../constants/guns";
import { useAppState, useGameState } from "../../stores";
import { Battle } from "../../types/gameState";
import { TURN_STATES } from "../../entities";
import { BattleLog } from "./components/BattleLog";
import { usePlayer } from "../../contexts/Player";
import { getPrevTargetIndex } from "../../utils";
import { useGetDialogue } from "../../hooks";
import { Enemy } from "./components/Enemy";
import { Dialogue } from "../Dialogue";
import { DamageData } from "./types";

import attackSfx from "../../assets/audio/enemy_attack.mp3";
import reloadSfx from "../../assets/audio/reload.mp3";
import { useMagSize } from "./hooks/useMagSize";
import { useBattleStateInitiation } from "./hooks/useBattleStateInitiation";
import { useTrackFinalBossDialogue } from "./hooks/useTrackFinalBossDialogue";

export const BattleContainer = () => {
  // SelectedEnemy - выбранный противник
  const { selectedEnemy, setSelectedEnemy, isDialogueOpen } = useAppState();

  const {
    isDiceRequiredRoll,
    turnOffDices,
    player: { battle, currentTier, location },
    statistics,

    updateBattle,
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

  useTrackFinalBossDialogue();
  useBattleStateInitiation();

  const dialogTree = useGetDialogue(isDialogueOpen);

  const {
    selectedPlayer,
    handleSelectNextPlayer,
    currentEnemy,
    handleSelectNextEnemy,
  } = usePlayerControl();

  const magSizesMap = useMagSize();

  // флаги анимации атаки и
  const [isShooting, setShooting] = useState(false);

  useEffect(() => {
    if (isShooting) {
      const timerId = setTimeout(() => setShooting(false), 3000);
      return () => clearTimeout(timerId);
    }
  }, [isShooting]);

  // отвечает за то, что противник должен проиграть анимацию атаки
  const [attackingEnemyId, setAttackingEnemyId] = useState<string | null>(null);

  // эта модель будет замещать собой все остальные состояния кроме флагов атаки
  const [battleDamageModel, setBattleDamageModel] = useState<
    null | DamageData[]
  >(null);

  const tempBattleModel = useRef<null | Battle>(null);

  const enemyLayout = useMemo(
    () => getLayoutCoordinates(battle?.enemy?.party),
    [battle?.enemy?.party],
  );

  const currentBackground = useMemo(
    () => getBattleBackground(location?.dungeonLevel || currentTier),
    [location?.dungeonLevel, currentTier],
  );

  const resetAnimations = () => {
    // если это урон от эффекта
    if (tempBattleModel.current) {
      const model = tempBattleModel.current;

      if (
        battleDamageModel &&
        battleDamageModel.length === 1 &&
        battleDamageModel[0].isEffect
      ) {
        updateBattle(model);

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

      setBattleDamageModel(null);
      setSelectedEnemy(getPrevTargetIndex(selectedEnemy, battle?.enemy.party));
    }
  };

  const isPlayerTurnAvailable =
    battle?.player?.effects[selectedPlayer?.name || ""]?.hasTriggered;

  const { handleSetSrc } = usePlayer();

  const handlePlayerAttack = useCallback(
    (newState?: Battle) => {
      const stateSource = newState ?? battle;

      const enemyData =
        stateSource?.enemy?.party?.length === 1
          ? stateSource?.enemy.party[0]
          : stateSource?.enemy.party[selectedEnemy];

      if (
        stateSource &&
        statistics &&
        selectedPlayer &&
        !isShooting &&
        enemyData &&
        isPlayerTurnAvailable
      ) {
        const { model, damageModel } = calculateDamage(
          stateSource,
          statistics,
          selectedPlayer?.name,
          enemyData,
          magSizesMap[selectedPlayer?.name]?.magSize,
        );

        tempBattleModel.current = model;

        const playerGearModel = selectedPlayer?.name
          ? magSizesMap[selectedPlayer?.name].baseId
          : null;

        if (playerGearModel) {
          handleSetSrc(
            PLAYER_ATTACK_SFX,
            WEAPONS_SFX_SOURCES[
              playerGearModel as keyof typeof WEAPONS_SFX_SOURCES
            ],
          );
        }

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

  const handlePlayerReload = () => {
    if (battle) {
      handleSetSrc(PLAYER_RELOAD_SFX, reloadSfx);

      handleSelectNextPlayer({
        ...battle,
        player: {
          ...battle.player,
          party: battle.player.party.map((player) => {
            const playerCopy = { ...player };

            if (player.name === selectedPlayer?.name) {
              playerCopy.currentAmountOfRounds =
                magSizesMap[player.name]?.magSize || 1;
              playerCopy.hasTurn = false;
            }

            return playerCopy;
          }),
        },
      });
    }
  };

  useEffect(() => {
    const handleKeyBindings = (event: KeyboardEvent) => {
      if (
        event.code === "KeyF" &&
        battle?.turn === TURN_STATES.PLAYER_TURN &&
        !isShooting &&
        isPlayerTurnAvailable &&
        !showDices &&
        !isDiceRequiredRoll
      ) {
        if ((selectedPlayer?.currentAmountOfRounds ?? 0) > 0) {
          handlePlayerAttack();
        } else {
          handlePlayerReload();
        }
      }
    };

    document.addEventListener("keydown", handleKeyBindings);

    return () => {
      document.removeEventListener("keydown", handleKeyBindings);
    };
  }, [
    handlePlayerAttack,
    battle?.turn,
    isShooting,
    handlePlayerReload,
    isPlayerTurnAvailable,
    showDices,
    isDiceRequiredRoll,
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

  useEffect(() => {
    if (
      !showDices &&
      !nextTurn &&
      battle?.turn === TURN_STATES.ENEMY_TURN &&
      currentEnemy &&
      !attackingEnemyId &&
      battle &&
      statistics &&
      battle.enemy.effects[currentEnemy.id].hasTriggered &&
      !dialogTree
    ) {
      const { damageModel, model } = calculateAiDamage(
        battle,
        statistics,
        currentEnemy,
      );

      handleSetSrc(ENEMY_ATTACK_SFX, attackSfx);

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
    dialogTree,
  ]);

  useEffect(() => {
    const currentEnemy = battle?.enemy.party[selectedEnemy];

    if (currentEnemy && currentEnemy.hp <= 0) {
      setSelectedEnemy(getPrevTargetIndex(selectedEnemy, battle?.enemy.party));
    }
  }, [selectedEnemy, battle?.enemy.party]);

  return (
    <Stack
      position="relative"
      sx={{
        "& > img": {
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
        damageModel={battleDamageModel}
        onAttack={handlePlayerAttack}
        isPlayerTurnAvailable={Boolean(isPlayerTurnAvailable && !dialogTree)}
        onDamageReceiveAnimationEnd={
          battleDamageModel && battleDamageModel[0].isEffect
            ? resetAnimations
            : null
        }
        onReload={handlePlayerReload}
        currentMaxMagSize={magSizesMap}
      />

      {battle?.enemy?.party?.map((creature, index, self) => {
        if (creature.hp <= 0 || dialogTree) {
          return null;
        }

        const currentBattleDamageModel =
          battleDamageModel &&
          battleDamageModel.find((damage) => damage.target === creature.id);

        const {
          damage,
          isCritical,
          isEvasion,
          shouldPlayDeathAnimation,
          isHealing,
        } = currentBattleDamageModel || {};

        const effects = battle.enemy.effects[creature.id];

        const isEnemySelected =
          battle?.turn === TURN_STATES.PLAYER_TURN &&
          index === selectedEnemy &&
          !isShooting &&
          self.length > 1;

        return (
          <Enemy
            creature={creature}
            isUnderAttack={Boolean(currentBattleDamageModel)}
            shouldPlayDeathAnimation={Boolean(shouldPlayDeathAnimation)}
            key={creature.id}
            damage={damage}
            isCritical={isCritical}
            index={index}
            onDamageAnimationEnd={
              battleDamageModel && battleDamageModel[0].isEffect
                ? resetAnimations
                : null
            }
            layout={enemyLayout ? enemyLayout[creature.id] : DEFAULT_CENTER}
            isAttacking={creature.id === attackingEnemyId}
            onAttackEnd={resetAnimations}
            isEvasion={Boolean(isEvasion)}
            isSelected={isEnemySelected}
            isHealing={isHealing}
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
            selectedPlayer?.name
              ? magSizesMap[selectedPlayer?.name].roundsPerTurn || 1
              : 1
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

      <AnimatePresence onExitComplete={() => turnOffDices()}>
        {showDices && (
          <DiceRollModal
            key="dice-modal"
            turnOwner={`Первым ходит: ${battle?.turn === TURN_STATES.ENEMY_TURN ? "Противник" : "Игрок"}`}
            onAnimationEnd={() => setShowDices(false)}
          />
        )}
      </AnimatePresence>

      {dialogTree && <Dialogue dialogueTree={dialogTree} />}
    </Stack>
  );
};
