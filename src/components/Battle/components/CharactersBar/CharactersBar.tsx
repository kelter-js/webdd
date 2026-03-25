import { FC, useEffect, useRef, useState } from "react";
import { useGameState } from "../../../../stores/GameState/GameState";
import * as S from "./CharactersBar.styled";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { CharactersBarProps } from "./types";
import { getRandom } from "../../../../utils";
import { Icons, Tooltip } from "../../../../common";
import { getUnitAvatarSrc } from "./utils";
import { POTION_TYPES } from "../../../../entities/consumables";
import { PotionsList } from "./components/PotionsList";
import { TURN_STATES } from "../../../../entities";
import { DamageEffect } from "../Enemy/components/DamageEffect";
import { usePlayer } from "../../../../contexts/Player";
import potionSfx from "../../../../assets/audio/potion.mp3";

const POTION_SFX = "consumePotionSfx";

export const CharactersBar: FC<CharactersBarProps> = ({
  selectedPlayer,
  setSelectedPlayer,
  damageTargetIndex,
  selectedNextPlayer,
  damageReceived,
  damageTarget,
}) => {
  // нужно написать хук кастомный, принимает массив клавиш и коллбэки на их нажатие и юзать тту для применения атаки
  // импортнуть и загенерить аватары, реализовать разметку и стили для оружия в руках/хп/атака
  const {
    // mock
    player: { battle, consumables },
    statistics,
    endTurn,
    consumePotion,
  } = useGameState();
  // коллбэк открытия и UI для инвентаря предметов для употребления
  // коллбэк открытия и UI для навыков
  // коллбэк для окончания хода
  // коллбэк для атаки
  const party = battle?.player?.party || [];
  const isEnemyTurn = battle?.turn === TURN_STATES.ENEMY_TURN;

  const { handleSetSrc } = usePlayer();

  console.log("battle", battle);
  console.log("statistics", statistics);

  if (!party) {
    return null;
  }

  // const isDamaged = !!damageFlags[partyMember.name];
  // const isSelected = partyMember.name === selectedPlayer?.name;

  const handleTurnEnd = () => {
    // mock
    endTurn();
  };

  const handleConsumePotion = (potion: POTION_TYPES) => {
    if (selectedPlayer?.name) {
      console.log("do we trigger?");
      handleSetSrc(POTION_SFX, potionSfx);
      consumePotion(selectedPlayer?.name, potion, selectedNextPlayer);
    }
  };

  return (
    <S.Container>
      <S.CharacterControls>
        <PotionsList
          onPotionClick={handleConsumePotion}
          disabled={isEnemyTurn}
        />
        <Button>Навыки</Button>
      </S.CharacterControls>

      <S.AvatarsContainer>
        {party.map((partyMember, index) => {
          const handleChangeSelection = () => setSelectedPlayer(partyMember);

          const isDamaged = damageTargetIndex === index;

          const hasTurn = partyMember.hasTurn;

          const isDead = partyMember.currentHealth <= 0;

          const characterStats = (statistics || {})[partyMember.name];

          return (
            <div key={partyMember.name} id={`${partyMember.name}-id`}>
              <S.CharacterContainer
                key={partyMember.name}
                id={`${partyMember.name}-id`}
              >
                <S.Avatar
                  id={partyMember.name}
                  isSelected={partyMember.name === selectedPlayer?.name}
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

                  <Stack sx={{ pt: 1, pb: 1, width: "100%", mr: 1 }}>
                    <Stack direction="row" gap={1} justifyContent="center">
                      <Tooltip title="Урон">
                        <Stack direction="column" gap={0.5} alignItems="center">
                          <Icons.Attack size={40} />
                          <Typography fontFamily="inherit">
                            {`${characterStats?.minAttack ?? 12} - ${characterStats?.maxAttack ?? 15}`}
                          </Typography>
                        </Stack>
                      </Tooltip>

                      <Tooltip title="Защита">
                        <Stack direction="column" gap={0.5} alignItems="center">
                          <Icons.Defense size={40} />
                          <Typography fontFamily="inherit">
                            {characterStats?.defense || 8}
                          </Typography>
                        </Stack>
                      </Tooltip>

                      <Tooltip title="Здоровье">
                        <Stack direction="column" gap={0.5} alignItems="center">
                          <Icons.Health size={40} />
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
            </div>
          );
        })}
        {damageReceived && (
          <DamageEffect
            damage={damageReceived}
            isCritical={true}
            onDamageAnimationEnd={() => "damage is over"}
            containerId={damageTarget ? `${damageTarget}-id` : undefined}
          />
        )}
      </S.AvatarsContainer>

      <S.BattleControls>
        <Button>Атаковать</Button>
        <Button onClick={handleTurnEnd}>Закончить ход</Button>
      </S.BattleControls>
    </S.Container>
  );
};
