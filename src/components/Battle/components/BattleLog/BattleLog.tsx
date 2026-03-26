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
      {battle?.messages?.length && (
        <MessagesContainer>
          {(battle?.messages).map((item, index) => (
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
      )}
    </LogsContainer>
  );
};
