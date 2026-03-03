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

export const Dialogue: FC<DialogueProps> = ({ dialogueTree }) => {
  const {
    setDialogueOpen,
    toggleEconomicModal,
    toggleBuyPotionsModal,
    toggleAlmanac,
    toggleTradeModal,
    toggleCraftMenu,
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
  } = useGameState();

  const { startNode, nodes, name, src } = dialogueTree;

  const [currentNode, setCurrentNode] = useState<string>(startNode);

  const { handleSetSrc, getPlayerRef, handleRemoveSrc } = usePlayer();

  const playerRef = getPlayerRef(DIALOGUE_AMBIENT_PLAYER_REF);
  console.log("playerRef", playerRef);

  const handleEndDialogue = (cb: VoidFunction) => {
    cb();
    playerRef?.pause();
    handleRemoveSrc(DIALOGUE_AMBIENT_PLAYER_REF);
  };

  // const { text, options, flags } = nodes[currentNode];
  const { text, options, flags } = nodes[currentNode];

  const handleOptionClick = ({ nextNode, id }: DialogueOption) => {
    if (flags?.length) {
      if (flags.includes(DIALOGUE_FLAGS.ECONOMIC_INTRO)) {
        handleEndDialogue(toggleEconomicModal);
      }

      if (flags.includes(DIALOGUE_FLAGS.HEAL)) {
        healTeam();
      }

      updateDialogFlags(flags);
    }

    if (id === DIALOGUE_IDS.TAVERN_BUY) {
      handleEndDialogue(toggleBuyPotionsModal);
    }

    if (id === DIALOGUE_IDS.BUY_CAMERA) {
      buyCamera();
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

    if (id === DIALOGUE_IDS.RELEASE_ORE_WITH_ARTIFACT) {
      acquireArtifact(RESOURCES.ORE);
    }

    if (id === DIALOGUE_IDS.RELEASE_PARTS_WITH_ARTIFACT) {
      acquireArtifact(RESOURCES.PARTS);
    }

    if (id === DIALOGUE_IDS.RELEASE_TREASURES_WITH_ARTIFACT) {
      acquireArtifact(RESOURCES.OLD_WORLD_TREASURES);
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
        <S.Avatar src={src} alt="npc_avatar" />
        <S.SpeakerName variant="h5" sx={{ textTransform: "uppercase" }}>
          {name}
        </S.SpeakerName>

        <TextHolder text={text} />

        <Stack gap={2}>
          {options.map((option, index) => (
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
