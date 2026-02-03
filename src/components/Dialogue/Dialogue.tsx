import { FC, useState } from "react";
import { Backdrop, Stack } from "@mui/material";

import { TextHolder } from "./TextHolder";

import { useAppState } from "../../stores";
import { DialogueProps } from "./types";
import { DIALOGUE_FLAGS, DIALOGUE_IDS } from "../../entities/dialogues";
import { useGameState } from "../../stores";
import * as S from "./Dialogue.styled";
import { DialogueOption } from "../../types/dialogue";

export const Dialogue: FC<DialogueProps> = ({ dialogueTree }) => {
  const {
    setDialogueOpen,
    toggleEconomicModal,
    toggleBuyPotionsModal,
    toggleAlmanac,
    toggleTradeModal,
    toggleCraftMenu,
  } = useAppState();
  const { updateDialogFlags, healTeam, buyCamera, increaseResourcesBagLevel } =
    useGameState();

  const { startNode, nodes, name, src } = dialogueTree;

  const [currentNode, setCurrentNode] = useState<string>(startNode);

  // const { text, options, flags } = nodes[currentNode];
  const { text, options, flags } = nodes[currentNode];

  const handleOptionClick = ({ nextNode, id }: DialogueOption) => {
    if (flags?.length) {
      if (flags.includes(DIALOGUE_FLAGS.ECONOMIC_INTRO)) {
        toggleEconomicModal();
      }

      if (flags.includes(DIALOGUE_FLAGS.HEAL)) {
        healTeam();
      }

      updateDialogFlags(flags);
    }

    if (id === DIALOGUE_IDS.TAVERN_BUY) {
      toggleBuyPotionsModal();
    }

    if (id === DIALOGUE_IDS.BUY_CAMERA) {
      buyCamera();
    }

    if (id === DIALOGUE_IDS.ALMANAC) {
      toggleAlmanac();
    }

    if (id === DIALOGUE_IDS.TRADER_BUY) {
      toggleTradeModal();
    }

    if (id === DIALOGUE_IDS.IMPROVE_BAG_INTRO) {
      updateDialogFlags([DIALOGUE_FLAGS.IMPROVE_BAG]);
    }

    if (id === DIALOGUE_IDS.BUY_BAG_IMPROVEMENT) {
      increaseResourcesBagLevel();
    }

    if (id === DIALOGUE_IDS.OPEN_SMITH) {
      toggleCraftMenu();
    }

    if (nextNode === "end") {
      setDialogueOpen(null);
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
