import { FC, useState } from "react";
import { Backdrop, Stack } from "@mui/material";

import { TextHolder } from "./TextHolder";

import { useAppState } from "../../stores";
import { DialogueProps } from "./types";
import { DIALOGUE_FLAGS } from "../../entities/dialogues";
import { useGameState } from "../../stores";
import * as S from "./Dialogue.styled";

export const Dialogue: FC<DialogueProps> = ({ dialogueTree }) => {
  const { setDialogueOpen, toggleEconomicModal } = useAppState();
  const { updateDialogFlags, healTeam } = useGameState();

  const { startNode, nodes, name, src } = dialogueTree;

  const [currentNode, setCurrentNode] = useState<string>(startNode);

  // const { text, options, flags } = nodes[currentNode];
  const { text, options, flags } = nodes[currentNode];

  const handleOptionClick = (option: { nextNode: string }) => {
    if (flags?.length) {
      if (flags.includes(DIALOGUE_FLAGS.ECONOMIC_INTRO)) {
        toggleEconomicModal();
      }

      if (flags.includes(DIALOGUE_FLAGS.HEAL)) {
        healTeam();
      }

      updateDialogFlags(flags);
    }

    if (option.nextNode === "end") {
      setDialogueOpen(null);
    }

    setCurrentNode(option.nextNode);
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
            >
              {option.text}
            </S.ContinueButton>
          ))}
        </Stack>
      </S.DialogueModal>
    </Backdrop>
  );
};
