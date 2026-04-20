import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stack } from "@mui/material";
import { CharactersBar } from "./components/CharactersBar";
import { BattleLog } from "./components/BattleLog";

import { Enemy } from "./components/Enemy";
import { useAppState, useGameState } from "../../stores";
import { DiceRollModal, TurnIndicator } from "../../common";
import { ENEMIES, TURN_STATES } from "../../entities";
import { usePlayerTurnIsOver } from "./hooks/usePlayerTurnIsOver";
import { usePlayerControl } from "./hooks/usePlayerControl";
import { useHandleBattleEnd } from "./hooks/useHandleBattleEnd";
import { ShootingEffect } from "./components/ShootingEffect";
import { GEAR_SLOTS } from "../../entities/gear";
import { Battle, Creature } from "../../types/gameState";
import { calculateAiDamage, getBattleBackground } from "./utils";
import { DamageData } from "./types";
import { useBattleEffectsExecutor } from "./hooks/useBattleEffectsExecutor";
import { AnimatePresence } from "framer-motion";
import { calculateDamage } from "./components/CharactersBar/utils";
import { DIALOGUE_FLAGS } from "../../entities/dialogues";
import { BUILDING_NAMES } from "../../constants";
import { useGetDialogue } from "../../hooks";
import { Dialogue } from "../Dialogue";
import { getPrevTargetIndex } from "../../utils";
import { usePlayer } from "../../contexts/Player";
import attackSfx from "../../assets/audio/enemy_attack.mp3";
import { WEAPONS_SFX_SOURCES } from "../../constants/guns";

const ENEMY_ATTACK_SFX = "enemyAttack";
const PLAYER_ATTACK_SFX = "playerAttack";
const DEFAULT_CENTER = "50%";

const getLayoutCoordinates = (enemiesAmount?: Creature[]) => {
  if (!enemiesAmount) {
    return null;
  }

  const aliveEnemyPartyMembers = enemiesAmount.filter((enemy) => enemy.hp > 0);

  let counter = 25;

  return aliveEnemyPartyMembers.reduce<{ [id: string]: string }>(
    (acc, item, _, self) => {
      if (self.length === 1) {
        acc[item.id] = DEFAULT_CENTER;
      } else if (self.length === 2) {
        acc[item.id] = `${counter}%`;
        counter += 50;
      } else {
        acc[item.id] = `${counter}%`;
        counter += 25;
      }

      return acc;
    },
    {},
  );
};

export const BattleContainer = () => {
  // SelectedEnemy - выбранный противник
  const { selectedEnemy, setSelectedEnemy, setDialogueOpen, isDialogueOpen } =
    useAppState();

  const {
    isDiceRequiredRoll,
    turnOffDices,
    player: { battle, party, currentTier, location, dialogFlags },
    statistics,
    initiateState,
    gear,
    updateBattle,
  } = useGameState();

  const [showDices, setShowDices] = useState(isDiceRequiredRoll);

  console.log("battle", battle);

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

  useEffect(() => {
    const [player1, player2, player3] = battle?.player.party || [];

    if (
      player1 &&
      player2 &&
      player3 &&
      (!statistics ||
        !statistics[player1.name] ||
        !statistics[player2.name] ||
        !statistics[player3.name])
    ) {
      initiateState();
    }
  }, [statistics, battle, initiateState]);

  const dialogTree = useGetDialogue(isDialogueOpen);

  const {
    selectedPlayer,
    handleSelectNextPlayer,
    currentEnemy,
    handleSelectNextEnemy,
  } = usePlayerControl();

  const magSizesMap = useMemo(() => {
    if (!gear) {
      return Object.fromEntries(
        party.map((item) => [
          item.name,
          {
            magSize: 1,
            baseId: null,
            roundsPerTurn: null,
          },
        ]),
      );
    }

    return Object.fromEntries(
      Object.entries(gear).map(([key, value]) => {
        const currentWeapon = value.find(
          (item) => item.type === GEAR_SLOTS.WEAPON,
        );

        return [
          key,
          {
            magSize: currentWeapon?.magSize || 1,
            baseId: currentWeapon?.baseId || null,
            roundsPerTurn: currentWeapon?.bulletsPerTurn || null,
          },
        ];
      }),
    );
  }, [gear, party]);

  // флаги анимации атаки и
  const [isShooting, setShooting] = useState(false);

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

      console.log("and we here? stateSource", stateSource);
      console.log("and we here? statistics", statistics);
      console.log("and we here? selectedPlayer", selectedPlayer);
      console.log("and we here? !isShooting", !isShooting);
      console.log("and we here? selectedEnemy", selectedEnemy);
      console.log(
        "and we here? stateSource?.enemy.party[selectedEnemy]",
        stateSource?.enemy.party[selectedEnemy],
      );
      console.log("and we here? isPlayerTurnAvailable", isPlayerTurnAvailable);
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
        console.log("and we here? inside");
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
    // если нет анимаций кубика, нет анимаций переключения хода, если ход противника, выбран противник для хода и нет анимации атаки противника - запускаем логику боя
    console.log("some? currentEnemy", currentEnemy);
    console.log("some? battle", battle);
    console.log(
      "some? battle.enemy.effects[currentEnemy.id].hasTriggered",
      battle?.enemy.effects[currentEnemy?.id ?? 0]?.hasTriggered,
    );

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
      console.log("are we INSIDE AI ATTACK LOGIC?");
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
            isSelected={
              battle?.turn === TURN_STATES.PLAYER_TURN &&
              index === selectedEnemy &&
              !isShooting &&
              self.length > 1
            }
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
