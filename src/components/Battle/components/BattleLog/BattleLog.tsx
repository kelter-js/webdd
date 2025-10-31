import logsScreen from "../../../../assets/static/logs.png";
import { LogsContainer, MessagesContainer } from "./BattleLog.styled";
import { Typography } from "@mui/material";
import { useGameState } from "../../../../stores/GameState/GameState";

export const BattleLog = () => {
  const {
    player: { battle },
  } = useGameState();

  return (
    <LogsContainer>
      <img src={logsScreen} />
      <MessagesContainer>
        {(
          battle?.messages || [
            {
              attackerType: "Enemy",
              message: "Наносит 230 урона танку. Вот это мощь!",
              attackerName: "Стенобур",
            },
            {
              attackerType: "Player",
              message: "Убивает стенобура наповал. Н Е В Е Р О Я Т Н О",
              attackerName: "Драноборец",
            },
            {
              attackerType: "Enemy",
              message: "Продолжает серию атак, убивая танка",
              attackerName: "Стенобур",
            },
            {
              attackerType: "Player",
              message: "Победоносно убивает всех противников на поле боя",
              attackerName: "Драноборец",
            },
            {
              attackerType: "Enemy",
              message: "Пытается возродиться...",
              attackerName: "Стенобур",
            },
            {
              attackerType: "Enemy",
              message:
                "И у него получается! Нанося всем на поле боя по 16 урона",
              attackerName: "Стенобур",
            },
            {
              attackerType: "Player",
              message:
                "Делает очередь в сторону противника, нанося 500 урона критического",
              attackerName: "Драноборец",
            },
          ]
        ).map((item, index) => (
          <div key={index}>
            <Typography
              component="span"
              color={
                item.attackerType === "Enemy"
                  ? "var(--enemy-chat-message)"
                  : "var(--player-chat-message)"
              }
              fontFamily="inherit"
              fontSize={18}
            >
              {item.attackerName}:{"   "}
            </Typography>
            <Typography
              fontFamily="inherit"
              color="var(--white)"
              fontSize={18}
              display="inline"
            >
              {item.message}
            </Typography>
          </div>
        ))}
      </MessagesContainer>
    </LogsContainer>
  );
};
