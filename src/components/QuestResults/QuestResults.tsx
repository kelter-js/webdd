import { QUEST_STATUSES } from "../../entities/questStatuses";
import { useGameState } from "../../stores/GameState/GameState";
import { Box, Modal, Stack, Typography } from "@mui/material";
import * as S from "./QuestResults.styled";
import { Icons } from "../../common";
import { getGearIcon } from "../Map/components/BattleResult/utils";
import { getItemNameByGearId } from "../../utils/getItemNameByGearId";

// NOT FULLY IMPLEMENTED YET 🟥

export const QuestResults = () => {
  const {
    player: { quest },
    resetQuest,
  } = useGameState();

  const { gold, exp, status, item } = quest || {};

  if (!quest) return null;

  const isQuestSucceeded = status === QUEST_STATUSES.SUCCESS;

  return (
    <Modal
      onClose={resetQuest}
      open={!!quest}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(2px)",
      }}
    >
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
            <Typography
              sx={{
                color: "#c08040",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
              fontFamily="inherit"
              fontSize={30}
            >
              EXP
            </Typography>
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
                {getItemNameByGearId(item.gearId)} MK{item.tier}
              </Typography>
            </Stack>
          )}
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <S.StyledButton onClick={resetQuest}>
            <Typography
              sx={{
                width: "100%",
                color: "#c08040",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: (theme) => theme.spacing(1),
                borderBottom: "1px solid #5a3020",
                fontFamily: "Cormorant Unicase",
              }}
              variant="h5"
            >
              ПРИНЯТЬ
            </Typography>
          </S.StyledButton>
        </Box>
      </S.ModalContent>
    </Modal>
  );
};
