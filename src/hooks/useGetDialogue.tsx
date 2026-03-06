import {
  questDeskDialog,
  smithDialog,
  citadelDialog,
  priestDialog,
  tavernDialog,
  traderDialog,
  starCounterDialog,
  DEFAULT_TAVERN_WELCOME_OPTIONS,
  crazyTraderDialog,
  ghostDialog,
  ACQUIRE_ALMANAC_ARTIFACT_OPTION,
  LEAVE_OPTION,
  FINAL_DEFAULT_OPTIONS,
  REWARD_HELMET_OPTION,
  REWARD_ARTIFACT_OPTION,
  FINAL_FULL_FAIL_TEXT,
  FINAL_FAIL_TEXT,
  FINAL_TEXT,
} from "../constants/dialogs";

import { DIALOGUE_FLAGS, DIALOGUE_IDS } from "../entities/dialogues";
import { useAppState, useGameState } from "../stores";
import {
  BUILDING_NAMES,
  FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT,
  FLAGS,
  LEGENDARY_ARMOR_PRICE,
  SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT,
  THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT,
} from "../constants";
import { getImprovementPrice } from "../utils";
import { useMemo } from "react";
import { RESOURCES } from "../entities/resources";
import { getTotalAmountOfResourceByType } from "../utils/getTotalAmountOfResourceByType";
import { isEveryEnemyUnlocked } from "../components/AlmanacModal/utils";

export const useGetDialogue = (npc: string | null) => {
  const { player } = useGameState();

  const {
    dialogFlags,
    gold,
    resourcesBagLevel,
    resources,
    collected,
    flags,
    location,
  } = player;

  console.log("dialogFlags", dialogFlags);

  // через флаги - определяем какие диалоги могут быть как должны начинаться
  // через ID в опциях - определяем какие должны быть отработаны коллбэки, пример -
  // {
  // text: "Покажи что есть в наличии",
  // nextNode: "end",
  // id: DIALOGUE_IDS.TAVERN_BUY,
  // }

  const { toggleEconomicModal, setDialogueOpen } = useAppState();

  const dialogue = useMemo(() => {
    switch (npc) {
      case BUILDING_NAMES.SMITH:
        if (dialogFlags.includes(DIALOGUE_FLAGS.SMITH_WELCOMED)) {
          smithDialog.startNode = "alreadyWelcomed";
        }

        const totalAmountOfResources = getTotalAmountOfResourceByType(
          resources,
          collected,
          RESOURCES.ORE,
        );

        if (
          !flags.includes(FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_1) &&
          totalAmountOfResources >= FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT
        ) {
          const dialogNode = smithDialog.nodes.alreadyWelcomed.options.find(
            (option) => option.id === DIALOGUE_IDS.RELEASE_ORE,
          );

          if (dialogNode) {
            dialogNode.nextNode = "receiveSmithArtifactFirstTier";
            dialogNode.id = DIALOGUE_IDS.RELEASE_ORE_WITH_ARTIFACT;
          }
        }

        if (
          flags.includes(FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_1) &&
          !flags.includes(FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_2) &&
          totalAmountOfResources >= SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT
        ) {
          const dialogNode = smithDialog.nodes.alreadyWelcomed.options.find(
            (option) => option.id === DIALOGUE_IDS.RELEASE_ORE,
          );

          if (dialogNode) {
            dialogNode.nextNode = "receiveSmithArtifactSecondTier";
            dialogNode.id = DIALOGUE_IDS.RELEASE_ORE_WITH_ARTIFACT;
          }
        }

        if (
          flags.includes(FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_1) &&
          flags.includes(FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_2) &&
          !flags.includes(FLAGS.SMITH_ARTIFACT_ACHIEVED_TIER_3) &&
          totalAmountOfResources >= THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT
        ) {
          const dialogNode = smithDialog.nodes.alreadyWelcomed.options.find(
            (option) => option.id === DIALOGUE_IDS.RELEASE_ORE,
          );

          if (dialogNode) {
            dialogNode.nextNode = "receiveSmithArtifactThirdTier";
            dialogNode.id = DIALOGUE_IDS.RELEASE_ORE_WITH_ARTIFACT;
          }
        }

        return smithDialog;

      case BUILDING_NAMES.QUEST_DESK:
        return questDeskDialog;

      case BUILDING_NAMES.TAVERN: {
        if (dialogFlags.includes(DIALOGUE_FLAGS.BODY_PARTS)) {
          tavernDialog.startNode = "alreadyWelcomed";
        }

        const totalAmountOfResources = getTotalAmountOfResourceByType(
          resources,
          collected,
          RESOURCES.PARTS,
        );

        if (
          !flags.includes(FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_1) &&
          totalAmountOfResources >= FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT
        ) {
          const dialogNode = tavernDialog.nodes.alreadyWelcomed.options.find(
            (option) => option.id === DIALOGUE_IDS.RELEASE_PARTS,
          );

          if (dialogNode) {
            dialogNode.nextNode = "receiveAlchemistryArtifactFirstTier";
            dialogNode.id = DIALOGUE_IDS.RELEASE_PARTS_WITH_ARTIFACT;
          }
        }

        if (
          flags.includes(FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_1) &&
          !flags.includes(FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_2) &&
          totalAmountOfResources >= SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT
        ) {
          const dialogNode = tavernDialog.nodes.alreadyWelcomed.options.find(
            (option) => option.id === DIALOGUE_IDS.RELEASE_PARTS,
          );

          if (dialogNode) {
            dialogNode.nextNode = "receiveAlchemistryArtifactSecondTier";
            dialogNode.id = DIALOGUE_IDS.RELEASE_PARTS_WITH_ARTIFACT;
          }
        }

        if (
          flags.includes(FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_1) &&
          flags.includes(FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_2) &&
          !flags.includes(FLAGS.ALCHEMISTRY_ARTIFACT_ACHIEVED_TIER_3) &&
          totalAmountOfResources >= THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT
        ) {
          const dialogNode = tavernDialog.nodes.alreadyWelcomed.options.find(
            (option) => option.id === DIALOGUE_IDS.RELEASE_PARTS,
          );

          if (dialogNode) {
            dialogNode.nextNode = "receiveAlchemistryArtifactThirdTier";
            dialogNode.id = DIALOGUE_IDS.RELEASE_PARTS_WITH_ARTIFACT;
          }
        }

        return tavernDialog;
      }

      case BUILDING_NAMES.SHOP:
        if (dialogFlags.includes(DIALOGUE_FLAGS.IMPROVE_BAG)) {
          traderDialog.nodes.welcome.options =
            traderDialog.nodes.welcome.options.filter(
              (option) => option.id !== DIALOGUE_IDS.IMPROVE_BAG_INTRO,
            );

          const isImprovementAvailable = resourcesBagLevel !== 3;

          if (isImprovementAvailable) {
            const priceForImprovement = getImprovementPrice(resourcesBagLevel);
            const cantAffordBag = gold < priceForImprovement;

            traderDialog.nodes.welcome.options = [
              ...DEFAULT_TAVERN_WELCOME_OPTIONS.slice(0, 2),
              {
                text: "[купить улучшение сумки на 8 дополнительных слотов]",
                nextNode: "end",
                id: DIALOGUE_IDS.BUY_BAG_IMPROVEMENT,
                isDisabled: cantAffordBag,
              },
            ];
          } else {
            traderDialog.nodes.welcome.options =
              DEFAULT_TAVERN_WELCOME_OPTIONS.slice(0, 2);
          }
        } else {
          const hasNoImprovementsYet = resourcesBagLevel === 1;

          if (hasNoImprovementsYet) {
            const priceForImprovement = getImprovementPrice(resourcesBagLevel);
            const cantAffordBag = gold < priceForImprovement;

            traderDialog.nodes.services.options[0].isDisabled = cantAffordBag;
          }
        }

        return traderDialog;

      case BUILDING_NAMES.MEDICAL_STATION: {
        if (dialogFlags.includes(DIALOGUE_FLAGS.PRIEST_WELCOME)) {
          priestDialog.startNode = "alreadyWelcomed";
        }

        const totalAmountOfResources = getTotalAmountOfResourceByType(
          resources,
          collected,
          RESOURCES.OLD_WORLD_TREASURES,
        );

        if (
          !flags.includes(FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_1) &&
          totalAmountOfResources >= FIRST_TIER_ARTIFACT_RESOURCES_AMOUNT
        ) {
          const dialogNode = priestDialog.nodes.alreadyWelcomed.options.find(
            (option) => option.id === DIALOGUE_IDS.RELEASE_TREASURES,
          );

          if (dialogNode) {
            dialogNode.nextNode = "receivePriestArtifactFirstTier";
            dialogNode.id = DIALOGUE_IDS.RELEASE_TREASURES_WITH_ARTIFACT;
          }
        }

        if (
          flags.includes(FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_1) &&
          !flags.includes(FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_2) &&
          totalAmountOfResources >= SECOND_TIER_ARTIFACT_RESOURCES_AMOUNT
        ) {
          const dialogNode = priestDialog.nodes.alreadyWelcomed.options.find(
            (option) => option.id === DIALOGUE_IDS.RELEASE_TREASURES,
          );

          if (dialogNode) {
            dialogNode.nextNode = "receivePriestArtifactSecondTier";
            dialogNode.id = DIALOGUE_IDS.RELEASE_TREASURES_WITH_ARTIFACT;
          }
        }

        if (
          flags.includes(FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_1) &&
          flags.includes(FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_2) &&
          !flags.includes(FLAGS.PRIEST_ARTIFACT_ACHIEVED_TIER_3) &&
          totalAmountOfResources >= THIRD_TIER_ARTIFACT_RESOURCES_AMOUNT
        ) {
          const dialogNode = priestDialog.nodes.alreadyWelcomed.options.find(
            (option) => option.id === DIALOGUE_IDS.RELEASE_TREASURES,
          );

          if (dialogNode) {
            dialogNode.nextNode = "receivePriestArtifactThirdTier";
            dialogNode.id = DIALOGUE_IDS.RELEASE_TREASURES_WITH_ARTIFACT;
          }
        }

        // Вот здесь должна быть логика реакции на накопленные ресурсы
        // нужна логика вычисления-  в зависимости от типа р есурса - сколько его нужно накопить
        // и устанавливать флаг - что вещь получена для вычисления какой айтем выдавать
        // здесь мы должны установить, что клик на опцию с айди  DIALOGUE_IDS.RELEASE_ORE - если кол-во сданных ресурсов + на руках ресурсы позволяют апгрейднуть или улучшить айтем
        // что мы отсюда диалог следующий устанавливаем receiveSmithArtifactFirstTier/receiveSmithArtifactSecondTier/receiveSmithArtifactThirdTier
        // mock

        return priestDialog;
      }

      case BUILDING_NAMES.TOWER:
        if (dialogFlags.includes(DIALOGUE_FLAGS.PHOTO)) {
          starCounterDialog.startNode = "buy_camera";

          const buyNode = starCounterDialog.nodes.buy_camera.options.find(
            (option) => option.id === DIALOGUE_IDS.BUY_CAMERA,
          );

          if (buyNode) {
            buyNode.isDisabled = gold < 5000;
          }
        }

        if (dialogFlags.includes(DIALOGUE_FLAGS.CAMERA)) {
          const isAlmanacFullyUnlocked = isEveryEnemyUnlocked(player);

          if (isAlmanacFullyUnlocked) {
            const isOptionIncluded =
              starCounterDialog.nodes.almanac.options.find(
                (option) => option.id === DIALOGUE_IDS.ACQUIRE_ALMANAC_ARTIFACT,
              );

            if (!isOptionIncluded) {
              starCounterDialog.nodes.almanac.options = [
                ...starCounterDialog.nodes.almanac.options,
                ACQUIRE_ALMANAC_ARTIFACT_OPTION,
              ];
            }
          }

          starCounterDialog.startNode = "almanac";
        }

        return starCounterDialog;

      case BUILDING_NAMES.CITADEL: {
        if (dialogFlags.includes(DIALOGUE_FLAGS.ECONOMIC_INTRO)) {
          toggleEconomicModal(true);
          setDialogueOpen(null);
          return null;
        }

        return citadelDialog;
      }

      case BUILDING_NAMES.CRAZY_TRADER: {
        const optionToBuy = crazyTraderDialog.nodes.elaborate.options.find(
          (option) => option.id === DIALOGUE_IDS.BUY_LEGENDARY_ARMOR,
        );

        if (optionToBuy) {
          optionToBuy.isDisabled = gold < LEGENDARY_ARMOR_PRICE;
        }

        return crazyTraderDialog;
      }

      case BUILDING_NAMES.GHOST: {
        ghostDialog.startNode = location?.node ?? "welcome";
        ghostDialog.nodes.final.options = [...FINAL_DEFAULT_OPTIONS];
        ghostDialog.nodes.final.text = FINAL_FAIL_TEXT;

        if (location?.attempts === 0) {
          ghostDialog.nodes.final.options = [LEAVE_OPTION];
          ghostDialog.nodes.final.text = FINAL_FULL_FAIL_TEXT;
        }

        if (Number(location?.success) >= 3) {
          ghostDialog.nodes.final.text = `${FINAL_TEXT}. Ответов: ${location?.success ?? 0}/5`;
          ghostDialog.nodes.final.options.push(REWARD_ARTIFACT_OPTION);
        }

        if (Number(location?.success) === 5) {
          ghostDialog.nodes.final.options.push(REWARD_HELMET_OPTION);
        }

        return ghostDialog;
      }

      default:
        return null;
    }
  }, [
    npc,
    dialogFlags.length,
    resourcesBagLevel,
    gold,
    resources,
    collected,
    player,
    location?.attempts,
    location?.success,
    location?.node,
  ]);

  return dialogue;
};
