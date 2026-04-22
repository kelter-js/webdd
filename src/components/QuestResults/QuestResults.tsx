import { Box, Stack, Typography } from "@mui/material";

import { getGearIcon } from "../Map/components/BattleResult/utils";
import { useGameState } from "../../stores/GameState/GameState";
import { QUEST_STATUSES } from "../../entities/questStatuses";
import { Icons, MainText } from "../../common";
import * as S from "./QuestResults.styled";

export const QuestResults = () => {
  const {
    player: { quest },
    resetQuest,
  } = useGameState();

  const { gold, exp, status, item } = quest || {};

  if (!quest) return null;

  const hasQuestResults = quest && quest.status !== QUEST_STATUSES.INITIATED;

  if (!hasQuestResults) return null;

  const isQuestSucceeded = status === QUEST_STATUSES.SUCCESS;

  return (
    <S.ModalWindow onClose={resetQuest} open={!!quest}>
      <S.ModalContent>
        <S.ResultHeader variant="h4" textAlign="center">
          {isQuestSucceeded ? "Миссия выполнена" : "Миссия провалена"}
        </S.ResultHeader>

        <Box sx={{ mt: 3 }}>
          <Stack alignItems="center" width="100%" direction="row" gap={1}>
            <Stack alignItems="center" justifyContent="center" width="55px">
              <Icons.GoldIcon />
            </Stack>

            <Typography fontSize={20} fontFamily="inherit">
              {gold}
            </Typography>
          </Stack>

          <Stack alignItems="center" width="100%" direction="row" gap={1}>
            <S.ExpHeader>EXP</S.ExpHeader>
            <Typography fontSize={20} fontFamily="inherit">
              {exp}
            </Typography>
          </Stack>

          {item && (
            <Stack alignItems="center" width="100%" direction="row" gap={1}>
              <Stack alignItems="center" justifyContent="center" width="55px">
                {getGearIcon(item.type, item?.gunType)}
              </Stack>

              <Typography fontFamily="inherit" fontSize={20}>
                {item.name} MK{item.tier}
              </Typography>
            </Stack>
          )}
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <S.StyledButton onClick={resetQuest}>
            <MainText borderBottom="1px solid #5a3020" variant="h5">
              ПРИНЯТЬ
            </MainText>
          </S.StyledButton>
        </Box>
      </S.ModalContent>
    </S.ModalWindow>
  );
};
