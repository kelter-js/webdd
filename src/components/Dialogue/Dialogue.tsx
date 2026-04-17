import { FC, useState } from "react";
import { Backdrop, Stack } from "@mui/material";

import { TextHolder } from "./TextHolder";

import { useAppState } from "../../stores";
import { DialogueProps } from "./types";
import { DIALOGUE_FLAGS, DIALOGUE_IDS } from "../../entities/dialogues";
import { useGameState } from "../../stores";
import * as S from "./Dialogue.styled";
import { DialogueOption } from "../../types/dialogue";
import { usePlayer } from "../../contexts/Player";
import { DIALOGUE_AMBIENT_PLAYER_REF } from "./constants";
import { RESOURCES } from "../../entities/resources";
import { SPECIAL_ENCOUNTERS } from "../../entities/specialEncounters";
import { BASE_ITEMS_ID } from "../../constants/items";
import { LEGENDARY_ARMOR_PRICE } from "../../constants";
import healSfx from "../../assets/audio/heal.mp3";
import sellSfx from "../../assets/audio/sell.mp3";

const HEAL_SFX_ID = "healSfx";

export const Dialogue: FC<DialogueProps> = ({ dialogueTree }) => {
  const {
    setDialogueOpen,
    toggleEconomicModal,
    toggleBuyPotionsModal,
    toggleAlmanac,
    toggleTradeModal,
    toggleCraftMenu,
    toggleShootingGame,
    toggleTorchBuyMenu,
  } = useAppState();
  const {
    updateDialogFlags,
    healTeam,
    buyCamera,
    increaseResourcesBagLevel,
    giveResources,
    handleExitSpecialEncounter,
    acquireArtifact,
    startSpecialEncounterGame,
    updateSpecialEncounter,
  } = useGameState();

  const { startNode, nodes, name, src } = dialogueTree;

  const [currentNode, setCurrentNode] = useState<string>(startNode);

  const { handleSetSrc, getPlayerRef, handleRemoveSrc } = usePlayer();

  const playerRef = getPlayerRef(DIALOGUE_AMBIENT_PLAYER_REF);

  const handleEndDialogue = (cb: VoidFunction) => {
    cb();
    playerRef?.pause();
    handleRemoveSrc(DIALOGUE_AMBIENT_PLAYER_REF);
  };

  // const { text, options, flags } = nodes[currentNode];
  const { text, options, flags } = currentNode ? nodes[currentNode] : {};

  const handleOptionClick = ({ nextNode, id }: DialogueOption) => {
    if (flags?.length) {
      if (flags.includes(DIALOGUE_FLAGS.ECONOMIC_INTRO)) {
        handleEndDialogue(toggleEconomicModal);
      }

      updateDialogFlags(flags);
    }

    if (id === DIALOGUE_IDS.TAVERN_BUY) {
      handleEndDialogue(toggleBuyPotionsModal);
    }

    if (id === DIALOGUE_IDS.HEAL) {
      handleSetSrc(HEAL_SFX_ID, healSfx);
      healTeam();
    }

    if (id === DIALOGUE_IDS.BUY_CAMERA) {
      buyCamera();
    }

    if (id === DIALOGUE_IDS.STOP_TUTOR_TIER_1) {
      updateDialogFlags([DIALOGUE_FLAGS.TUTOR_TIER_1_ENDED]);
    }

    if (id === DIALOGUE_IDS.ALMANAC) {
      handleEndDialogue(toggleAlmanac);
    }

    if (id === DIALOGUE_IDS.TRADER_BUY) {
      handleEndDialogue(toggleTradeModal);
    }

    if (id === DIALOGUE_IDS.IMPROVE_BAG_INTRO) {
      updateDialogFlags([DIALOGUE_FLAGS.IMPROVE_BAG]);
    }

    if (id === DIALOGUE_IDS.BUY_BAG_IMPROVEMENT) {
      increaseResourcesBagLevel();
    }

    if (id === DIALOGUE_IDS.OPEN_SMITH) {
      handleEndDialogue(toggleCraftMenu);
    }

    if (id === DIALOGUE_IDS.RELEASE_ORE) {
      giveResources(RESOURCES.ORE);
    }

    if (id === DIALOGUE_IDS.RELEASE_PARTS) {
      giveResources(RESOURCES.PARTS);
    }

    if (id === DIALOGUE_IDS.RELEASE_TREASURES) {
      giveResources(RESOURCES.OLD_WORLD_TREASURES);
    }

    if (id === DIALOGUE_IDS.BUY_TORCHES) {
      handleEndDialogue(toggleTorchBuyMenu);
    }

    if (id === DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_TRADER) {
      handleEndDialogue(() =>
        handleExitSpecialEncounter(SPECIAL_ENCOUNTERS.TRADER),
      );
    }

    if (id === DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_SHOOTER) {
      handleEndDialogue(() =>
        handleExitSpecialEncounter(SPECIAL_ENCOUNTERS.SHOOTING),
      );
    }

    if (id === DIALOGUE_IDS.START_GHOST_GAME) {
      startSpecialEncounterGame(nextNode);
    }

    if (id === DIALOGUE_IDS.INITIATE_SHOOTING_GAME) {
      startSpecialEncounterGame(nextNode);
    }

    if (id === DIALOGUE_IDS.SHOOTING_START_GAME) {
      handleEndDialogue(() => {
        toggleShootingGame();
        updateSpecialEncounter({ node: nextNode, reset: true });
        setDialogueOpen(null);
      });
    }

    if (id === DIALOGUE_IDS.GHOST_CORRECT_ANSWER) {
      updateSpecialEncounter({ node: nextNode, isSuccessful: true });
    }

    if (id === DIALOGUE_IDS.GHOST_INCORRECT_ANSWER) {
      updateSpecialEncounter({ node: nextNode });
    }

    if (id === DIALOGUE_IDS.GHOST_RESET_GAME) {
      updateSpecialEncounter({ node: nextNode, reset: true });
    }

    if (id === DIALOGUE_IDS.GHOST_RECEIVE_HELMET) {
      handleEndDialogue(() =>
        handleExitSpecialEncounter(
          SPECIAL_ENCOUNTERS.GHOST,
          BASE_ITEMS_ID.CQCM_DEFENSE_ATOMIC_TIER_1,
        ),
      );
    }

    if (id === DIALOGUE_IDS.SHOOTING_RECEIVE_SHOTGUN) {
      handleEndDialogue(() =>
        handleExitSpecialEncounter(
          SPECIAL_ENCOUNTERS.GHOST,
          BASE_ITEMS_ID.AA12_TIER_1,
        ),
      );
    }

    if (id === DIALOGUE_IDS.SHOOTING_RECEIVE_SMG) {
      handleEndDialogue(() =>
        handleExitSpecialEncounter(
          SPECIAL_ENCOUNTERS.GHOST,
          BASE_ITEMS_ID.VERESK_TIER_1,
        ),
      );
    }

    if (id === DIALOGUE_IDS.SHOOTING_RECEIVE_SNIPER_RIFLE) {
      handleEndDialogue(() =>
        handleExitSpecialEncounter(
          SPECIAL_ENCOUNTERS.GHOST,
          BASE_ITEMS_ID.SWORD_MK18_TIER_1,
        ),
      );
    }

    if (id === DIALOGUE_IDS.GHOST_RECEIVE_ARTIFACT) {
      handleEndDialogue(() =>
        handleExitSpecialEncounter(
          SPECIAL_ENCOUNTERS.GHOST,
          BASE_ITEMS_ID.VAMPIRE_RING_TIER_1,
        ),
      );
    }

    if (id === DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_GHOST) {
      handleEndDialogue(() =>
        handleExitSpecialEncounter(SPECIAL_ENCOUNTERS.GHOST),
      );
    }

    if (id === DIALOGUE_IDS.RELEASE_ORE_WITH_ARTIFACT) {
      acquireArtifact(RESOURCES.ORE);
    }

    if (id === DIALOGUE_IDS.RELEASE_PARTS_WITH_ARTIFACT) {
      acquireArtifact(RESOURCES.PARTS);
    }

    if (id === DIALOGUE_IDS.RELEASE_TREASURES_WITH_ARTIFACT) {
      acquireArtifact(RESOURCES.OLD_WORLD_TREASURES);
    }

    if (id === DIALOGUE_IDS.ACQUIRE_ALMANAC_ARTIFACT) {
      acquireArtifact(null, BASE_ITEMS_ID.CHAOS_CHALICE_TIER_1);
    }

    if (id === DIALOGUE_IDS.BUY_LEGENDARY_ARMOR) {
      handleEndDialogue(() =>
        handleExitSpecialEncounter(
          SPECIAL_ENCOUNTERS.TRADER,
          BASE_ITEMS_ID.OSPREY_TIER_1,
          LEGENDARY_ARMOR_PRICE,
        ),
      );
    }

    if (nextNode === "end") {
      handleEndDialogue(() => setDialogueOpen(null));
    }

    setCurrentNode(nextNode);
  };

  return (
    <Backdrop
      open={true}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "transparent",
      }}
    >
      <S.DialogueModal>
        <S.Avatar
          src={src}
          alt="npc_avatar"
          style={{ width: 150, height: 150 }}
        />
        <S.SpeakerName variant="h5" sx={{ textTransform: "uppercase" }}>
          {name}
        </S.SpeakerName>

        {text && <TextHolder text={text} />}

        <Stack gap={2}>
          {options?.map((option, index) => (
            <S.ContinueButton
              key={`${option.nextNode}-${index}`}
              onClick={() => handleOptionClick(option)}
              disabled={option.isDisabled}
            >
              {option.text}
            </S.ContinueButton>
          ))}
        </Stack>
      </S.DialogueModal>
    </Backdrop>
  );
};
