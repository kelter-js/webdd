import { FC, useState } from "react";
import { Backdrop, Stack } from "@mui/material";

import { DIALOGUE_FLAGS, DIALOGUE_IDS } from "../../entities/dialogues";
import { SPECIAL_ENCOUNTERS } from "../../entities/specialEncounters";
import { DIALOGUE_AMBIENT_PLAYER_REF, HEAL_SFX_ID } from "./constants";
import { LEGENDARY_ARMOR_PRICE } from "../../constants";
import { DialogueOption } from "../../types/dialogue";
import { BASE_ITEMS_ID } from "../../constants/items";
import { RESOURCES } from "../../entities/resources";
import { usePlayer } from "../../contexts/Player";
import { useGameState } from "../../stores";
import { useAppState } from "../../stores";
import { TextHolder } from "./TextHolder";
import { DialogueProps } from "./types";
import healSfx from "../../assets/audio/heal.mp3";
import * as S from "./Dialogue.styled";

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

  const { text, options, flags } = currentNode ? nodes[currentNode] : {};

  const handleOptionClick = ({ nextNode, id }: DialogueOption) => {
    if (flags?.length) {
      if (flags.includes(DIALOGUE_FLAGS.ECONOMIC_INTRO)) {
        handleEndDialogue(toggleEconomicModal);
      }

      updateDialogFlags(flags);
    }

    switch (id) {
      case DIALOGUE_IDS.TAVERN_BUY:
        handleEndDialogue(toggleBuyPotionsModal);
        break;

      case DIALOGUE_IDS.HEAL:
        handleSetSrc(HEAL_SFX_ID, healSfx);
        healTeam();
        break;

      case DIALOGUE_IDS.BUY_CAMERA:
        buyCamera();
        break;

      case DIALOGUE_IDS.STOP_TUTOR_TIER_1:
        updateDialogFlags([DIALOGUE_FLAGS.TUTOR_TIER_1_ENDED]);
        break;

      case DIALOGUE_IDS.ALMANAC:
        handleEndDialogue(toggleAlmanac);
        break;

      case DIALOGUE_IDS.TRADER_BUY:
        handleEndDialogue(toggleTradeModal);
        break;

      case DIALOGUE_IDS.IMPROVE_BAG_INTRO:
        updateDialogFlags([DIALOGUE_FLAGS.IMPROVE_BAG]);
        break;

      case DIALOGUE_IDS.BUY_BAG_IMPROVEMENT:
        increaseResourcesBagLevel();
        break;

      case DIALOGUE_IDS.OPEN_SMITH:
        handleEndDialogue(toggleCraftMenu);
        break;

      case DIALOGUE_IDS.RELEASE_ORE:
        giveResources(RESOURCES.ORE);
        break;

      case DIALOGUE_IDS.RELEASE_PARTS:
        giveResources(RESOURCES.PARTS);
        break;

      case DIALOGUE_IDS.RELEASE_TREASURES:
        giveResources(RESOURCES.OLD_WORLD_TREASURES);
        break;

      case DIALOGUE_IDS.BUY_TORCHES:
        handleEndDialogue(toggleTorchBuyMenu);
        break;

      case DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_TRADER:
        handleEndDialogue(() =>
          handleExitSpecialEncounter(SPECIAL_ENCOUNTERS.TRADER),
        );
        break;

      case DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_SHOOTER:
        handleEndDialogue(() =>
          handleExitSpecialEncounter(SPECIAL_ENCOUNTERS.SHOOTING),
        );
        break;

      case DIALOGUE_IDS.START_GHOST_GAME:
      case DIALOGUE_IDS.INITIATE_SHOOTING_GAME:
        startSpecialEncounterGame(nextNode);
        break;

      case DIALOGUE_IDS.SHOOTING_START_GAME:
        handleEndDialogue(() => {
          toggleShootingGame();
          updateSpecialEncounter({ node: nextNode, reset: true });
          setDialogueOpen(null);
        });
        break;

      case DIALOGUE_IDS.GHOST_CORRECT_ANSWER:
        updateSpecialEncounter({ node: nextNode, isSuccessful: true });
        break;

      case DIALOGUE_IDS.GHOST_INCORRECT_ANSWER:
        updateSpecialEncounter({ node: nextNode });
        break;

      case DIALOGUE_IDS.GHOST_RESET_GAME:
        updateSpecialEncounter({ node: nextNode, reset: true });
        break;

      case DIALOGUE_IDS.GHOST_RECEIVE_HELMET:
        handleEndDialogue(() =>
          handleExitSpecialEncounter(
            SPECIAL_ENCOUNTERS.GHOST,
            BASE_ITEMS_ID.CQCM_DEFENSE_ATOMIC_TIER_1,
          ),
        );
        break;

      case DIALOGUE_IDS.SHOOTING_RECEIVE_SHOTGUN:
        handleEndDialogue(() =>
          handleExitSpecialEncounter(
            SPECIAL_ENCOUNTERS.GHOST,
            BASE_ITEMS_ID.AA12_TIER_1,
          ),
        );
        break;

      case DIALOGUE_IDS.SHOOTING_RECEIVE_SMG:
        handleEndDialogue(() =>
          handleExitSpecialEncounter(
            SPECIAL_ENCOUNTERS.GHOST,
            BASE_ITEMS_ID.VERESK_TIER_1,
          ),
        );
        break;

      case DIALOGUE_IDS.SHOOTING_RECEIVE_SNIPER_RIFLE:
        handleEndDialogue(() =>
          handleExitSpecialEncounter(
            SPECIAL_ENCOUNTERS.GHOST,
            BASE_ITEMS_ID.SWORD_MK18_TIER_1,
          ),
        );
        break;

      case DIALOGUE_IDS.GHOST_RECEIVE_ARTIFACT:
        handleEndDialogue(() =>
          handleExitSpecialEncounter(
            SPECIAL_ENCOUNTERS.GHOST,
            BASE_ITEMS_ID.VAMPIRE_RING_TIER_1,
          ),
        );
        break;

      case DIALOGUE_IDS.LEAVE_SPECIAL_ENCOUNTER_GHOST:
        handleEndDialogue(() =>
          handleExitSpecialEncounter(SPECIAL_ENCOUNTERS.GHOST),
        );
        break;

      case DIALOGUE_IDS.RELEASE_ORE_WITH_ARTIFACT:
        acquireArtifact(RESOURCES.ORE);
        break;

      case DIALOGUE_IDS.RELEASE_PARTS_WITH_ARTIFACT:
        acquireArtifact(RESOURCES.PARTS);
        break;

      case DIALOGUE_IDS.RELEASE_TREASURES_WITH_ARTIFACT:
        acquireArtifact(RESOURCES.OLD_WORLD_TREASURES);
        break;

      case DIALOGUE_IDS.ACQUIRE_ALMANAC_ARTIFACT:
        acquireArtifact(null, BASE_ITEMS_ID.CHAOS_CHALICE_TIER_1);
        break;

      case DIALOGUE_IDS.BUY_LEGENDARY_ARMOR:
        handleEndDialogue(() =>
          handleExitSpecialEncounter(
            SPECIAL_ENCOUNTERS.TRADER,
            BASE_ITEMS_ID.OSPREY_TIER_1,
            LEGENDARY_ARMOR_PRICE,
          ),
        );
        break;

      default:
        // Опционально: обработка случаев, когда id не соответствует ни одному из вышеуказанных
        break;
    }

    if (nextNode === "end") {
      handleEndDialogue(() => setDialogueOpen(null));
    }

    setCurrentNode(nextNode);
  };

  return (
    <Backdrop
      open
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
