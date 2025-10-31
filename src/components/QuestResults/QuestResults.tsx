import { QUEST_STATUSES } from "../../entities/questStatuses";
import { useGameState } from "../../stores/GameState/GameState";
import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import * as S from "./QuestResults.styled";

// NOT FULLY IMPLEMENTED YET 🟥

export const QuestResults = () => {
  const {
    player: { quest },
    setQuestData,
  } = useGameState();

  const { money, exp, status, type } = quest || {};
  const handleCloseResults = () => {
    setQuestData(null);
    // исходя из данных о квесте и его статусе - делаем рассчеты - добавляем или убавляем деньги
    // распределяем равномерно полученный опыт между всеми персонажами
    // в зависимости от типа квеста - генерируем предмет и кладем в инвентарь
    // предмет генерится исходя из текущего тира игрока
    // все предметы распределить по тирам
  };

  if (!quest) return null;

  const isQuestSucceeded = status === QUEST_STATUSES.SUCCESS;

  return (
    <Modal
      onClose={handleCloseResults}
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
          {typeof money === "number" && (
            <S.RewardItem>
              <Typography variant="h5" color="#c08040">
                ▸
              </Typography>
              <S.RewardText>
                {isQuestSucceeded
                  ? `Золото: +${money}`
                  : `Потери: ${Math.floor(money * 0.3)} золота`}
              </S.RewardText>
            </S.RewardItem>
          )}

          {typeof exp === "number" && (
            <S.RewardItem>
              <Typography variant="h5" color="#c08040">
                ▸
              </Typography>
              <S.RewardText>
                {isQuestSucceeded
                  ? `Опыт: +${exp}`
                  : `Опыт: +${Math.floor(exp * 0.5)}`}
              </S.RewardText>
            </S.RewardItem>
          )}

          {/* {isQuestSucceeded && type && (
            <>
              <Divider sx={{ borderColor: "#5a3020", my: 2 }} />
              <S.RewardItem>
                <Typography variant="h5" sx={{ color: "#c08040" }}>
                  ▸
                </Typography>
                <S.RewardText>
                  Добыча: {type === "combat" ? "Оружие" : "Артефакт"}
                </S.RewardText>
              </S.RewardItem>
            </>
          )} */}
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <S.StyledButton onClick={handleCloseResults}>
            <S.EndQuestText variant="h5">Принять</S.EndQuestText>
          </S.StyledButton>
        </Box>
      </S.ModalContent>
    </Modal>
  );
};
