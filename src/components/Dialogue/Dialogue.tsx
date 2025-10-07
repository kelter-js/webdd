import { FC, useState } from "react";

import {
  Avatar,
  ContinueButton,
  DialogueModal,
  SpeakerName,
} from "./Dialogue.styled";

import { TextHolder } from "./TextHolder";

import { Stack } from "@mui/material";
import { useAppState } from "../../stores/AppState";
import { DialogueProps } from "./types";
import { DIALOGUE_FLAGS } from "../../entities/dialogues";
import { useGameState } from "../../stores";

export const Dialogue: FC<DialogueProps> = ({ dialogueTree }) => {
  const { setDialogueOpen, toggleEconomicModal } = useAppState();
  const { updateDialogFlags } = useGameState();

  const { startNode, nodes, name, src } = dialogueTree;

  const [currentNode, setCurrentNode] = useState<string>(startNode);

  // const { text, options, flags } = nodes[currentNode];
  const { text, options, flags } = nodes[currentNode];
  console.log("flags", flags);
  console.log("options", options);

  const handleOptionClick = (option: { nextNode: string }) => {
    // Обновляем флаги если они есть в опции

    // Если есть флаги в узле, добавляем их
    // const nodeFlags = [...newFlags, ...(flags || [])];
    console.log("option", option);

    if (flags?.length) {
      if (flags.includes(DIALOGUE_FLAGS.ECONOMIC_INTRO)) {
        toggleEconomicModal();
        updateDialogFlags(flags);
      }
    }

    if (option.nextNode === "end") {
      setDialogueOpen(null);
    }

    setCurrentNode(option.nextNode);
  };

  return (
    <DialogueModal>
      <Avatar src={src} alt="npc_avatar" />
      <SpeakerName variant="h5" sx={{ textTransform: "uppercase" }}>
        {name}
      </SpeakerName>
      <TextHolder text={text} />

      <Stack gap={2}>
        {options.map((option, index) => (
          <ContinueButton
            key={`${option.nextNode}-${index}`}
            onClick={() => handleOptionClick(option)}
          >
            {option.text}
          </ContinueButton>
        ))}
      </Stack>
    </DialogueModal>
  );
};
