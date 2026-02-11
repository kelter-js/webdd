import { FC } from "react";
import { useGameState } from "../../../../stores/GameState/GameState";
import * as S from "./CharactersBar.styled";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { CharactersBarProps } from "./types";
import { getRandom } from "../../../../utils";
import { Icons, Tooltip } from "../../../../common";
import { getUnitAvatarSrc } from "./utils";

export const CharactersBar: FC<CharactersBarProps> = ({
  selectedPlayer,
  setSelectedPlayer,
  damageTargetIndex,
}) => {
  // нужно написать хук кастомный, принимает массив клавиш и коллбэки на их нажатие и юзать тту для применения атаки
  // импортнуть и загенерить аватары, реализовать разметку и стили для оружия в руках/хп/атака
  const {
    // mock
    player: { battle, party: mockParty },
    statistics,
    endTurn,
  } = useGameState();
  // коллбэк открытия и UI для инвентаря предметов для употребления
  // коллбэк открытия и UI для навыков
  // коллбэк для окончания хода
  // коллбэк для атаки
  const party = battle?.player?.party || mockParty;
  console.log("battle", battle);

  if (!party) {
    return null;
  }

  // const isDamaged = !!damageFlags[partyMember.name];
  // const isSelected = partyMember.name === selectedPlayer?.name;

  const handleTurnEnd = () => {
    // mock
    endTurn();
  };

  return (
    <S.Container>
      <S.CharacterControls>
        <Button>Инвентарь</Button>
        <Button>Навыки</Button>
      </S.CharacterControls>

      <S.AvatarsContainer>
        {party.map((partyMember, index) => {
          const handleChangeSelection = () => setSelectedPlayer(partyMember);

          const isDamaged = damageTargetIndex === index;
          console.log("partyMember", partyMember.hasTurn);
          // const hasTurn = getRandom(0, 100) > 50;
          const hasTurn = false;

          const isDead = partyMember.currentHealth <= 0;

          const characterStats = (statistics || {})[partyMember.name];

          return (
            <S.CharacterContainer key={partyMember.name}>
              <S.Avatar
                isSelected={partyMember.name === selectedPlayer?.name}
                onClick={handleChangeSelection}
                isDamaged={isDamaged}
                animate={{
                  x: isDamaged ? [0, 5, -5, 5, -5, 0] : 0,
                  scale: isDamaged ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                hasTurn={hasTurn}
                isDead={isDead}
                onAnimationComplete={() => {}} // Коллбэк на окончание анимации
              >
                <S.AvatarImg
                  src={getUnitAvatarSrc(partyMember.characterClass, isDead)}
                />

                {/* контейнер для отображения иконки оружия */}
                <div
                  style={{
                    width: 150,
                    minWidth: 150,
                    height: 110,
                    border: "2px solid purple",
                  }}
                />

                <Stack sx={{ pr: 1, pt: 1, pb: 1, width: "100%" }}>
                  <Stack direction="row" gap={2} justifyContent="center">
                    <Tooltip title="Урон">
                      <Stack direction="column" gap={0.5} alignItems="center">
                        <Icons.Attack />
                        <Typography fontFamily="inherit">
                          {`${characterStats?.minAttack ?? 12} - ${characterStats?.maxAttack ?? 15}`}
                        </Typography>
                      </Stack>
                    </Tooltip>

                    <Tooltip title="Защита">
                      <Stack direction="column" gap={0.5} alignItems="center">
                        <Icons.Defense />
                        <Typography fontFamily="inherit">
                          {characterStats?.defense || 8}
                        </Typography>
                      </Stack>
                    </Tooltip>

                    <Tooltip title="Здоровье">
                      <Stack direction="column" gap={0.5} alignItems="center">
                        <Icons.Health />
                        <Typography fontFamily="inherit">
                          {`${partyMember?.currentHealth ?? 150}/${characterStats?.maxHealth ?? 150}`}
                        </Typography>
                      </Stack>
                    </Tooltip>
                  </Stack>

                  <Divider sx={{ borderColor: "#c0a080" }} />

                  <div></div>
                </Stack>
              </S.Avatar>

              {isDead && <S.Divider />}
            </S.CharacterContainer>
          );
        })}
      </S.AvatarsContainer>

      <S.BattleControls>
        <Button>Атаковать</Button>
        <Button onClick={handleTurnEnd}>Закончить ход</Button>
      </S.BattleControls>
    </S.Container>
  );
};
