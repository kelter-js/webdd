import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useGameState } from "../../../../stores/GameState/GameState";
import * as S from "./CharactersBar.styled";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { AbilityData, CharactersBarProps } from "./types";
import { getRandom } from "../../../../utils";
import { Icons, Tooltip } from "../../../../common";
import { getBattleStateAfterAbilityUsage, getUnitAvatarSrc } from "./utils";
import { POTION_TYPES } from "../../../../entities/consumables";
import { PotionsList } from "./components/PotionsList";
import { TURN_STATES } from "../../../../entities";
import { DamageEffect } from "../Enemy/components/DamageEffect";
import { usePlayer } from "../../../../contexts/Player";
import potionSfx from "../../../../assets/audio/potion.mp3";
import { CLASSES } from "../../../../entities/characterClasses";
import {
  ABILITY_PERKS,
  MEDIC_PERKS,
  MEDIC_PERKS_DATA,
  SNIPER_PERKS,
  SNIPER_PERKS_DATA,
  TANK_PERKS,
  TANK_PERKS_DATA,
} from "../../../../constants/perks";
import { PerkData } from "../../../../types";
import {
  EFFECTS,
  EFFECTS_DESCRIPTIONS,
  EFFECTS_ICONS,
} from "../../../../entities/effects";
import { PERK_ID_DATA } from "../../../../types/gameState";
import { StartGameText } from "../../../Initiate/components/SetNameModal/SetNameModal.styled";

const POTION_SFX = "consumePotionSfx";

export const CharactersBar: FC<CharactersBarProps> = ({
  selectedPlayer,
  setSelectedPlayer,
  damageTargetIndex,
  selectedNextPlayer,
  damageReceived,
  damageTarget,
  onAttack,
}) => {
  // нужно написать хук кастомный, принимает массив клавиш и коллбэки на их нажатие и юзать тту для применения атаки
  // импортнуть и загенерить аватары, реализовать разметку и стили для оружия в руках/хп/атака
  const {
    // mock
    player: { battle, consumables },
    statistics,
    endTurn,
    consumePotion,
    updateBattle,
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

  const playerAbility = useMemo(() => {
    if (!selectedPlayer) return null;

    const abilities = selectedPlayer?.perksList.filter(
      (perk) => perk.isAbility,
    );

    if (abilities.length === 0) return null;

    const descriptorList = (
      selectedPlayer?.characterClass === CLASSES.MEDIC
        ? MEDIC_PERKS_DATA
        : selectedPlayer?.characterClass === CLASSES.SNIPER
          ? SNIPER_PERKS_DATA
          : TANK_PERKS_DATA
    ).fifthTier;

    const ability = descriptorList.find((perk) =>
      ABILITY_PERKS.includes(perk.id),
    );

    if (!ability) return null;

    const effectsList = battle?.player.effects[selectedPlayer.name].list;

    const isPerkDisabled =
      (ability.id === TANK_PERKS.LAST_STAND &&
        !effectsList?.find(
          (effect) => effect.type === EFFECTS.LAST_STAND_FATIGUE,
        )) ||
      (ability.id === MEDIC_PERKS.HEAL_ALL &&
        !effectsList?.find(
          (effect) => effect.type === EFFECTS.HEAL_ALL_FATIGUE,
        )) ||
      (ability.id === SNIPER_PERKS.INSTAKILL &&
        !effectsList?.find(
          (effect) => effect.type === EFFECTS.INSTA_KILL_FATIGUE,
        ));

    return {
      ...ability,
      isDisabled: isPerkDisabled,
    };
  }, [selectedPlayer, battle?.player.effects]);

  const handleUseAbility = (ability: PERK_ID_DATA) => {
    if (battle && selectedPlayer?.name && statistics) {
      const newBattleState = getBattleStateAfterAbilityUsage(
        battle,
        ability,
        selectedPlayer?.name,
        statistics,
      );

      if (ability === TANK_PERKS.LAST_STAND) {
        updateBattle(newBattleState);
      }

      if (ability === MEDIC_PERKS.HEAL_ALL) {
        selectedNextPlayer(newBattleState);
      }

      if (ability === SNIPER_PERKS.INSTAKILL) {
        onAttack(newBattleState);
      }
    }
  };

  return (
    <S.Container>
      <S.CharacterControls>
        <PotionsList
          onPotionClick={handleConsumePotion}
          disabled={isEnemyTurn}
        />
        {playerAbility && (
          <Tooltip title={playerAbility.description}>
            <div>
              <Button
                variant="text"
                onClick={() => handleUseAbility(playerAbility.id)}
              >
                <StartGameText variant="h5">
                  {playerAbility.title}
                </StartGameText>
              </Button>
            </div>
          </Tooltip>
        )}
      </S.CharacterControls>

      <S.AvatarsContainer>
        {party.map((partyMember, index) => {
          const handleChangeSelection = () => setSelectedPlayer(partyMember);

          const isDamaged = damageTargetIndex === index;

          const hasTurn = partyMember.hasTurn;

          const isDead = partyMember.currentHealth <= 0;

          const characterStats = (statistics || {})[partyMember.name];

          const effectsList =
            battle?.player?.effects[partyMember.name]?.list || [];

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

                  <Stack sx={{ pb: 1, width: "100%", mr: 1 }}>
                    <Stack direction="row" gap={1} justifyContent="center">
                      <Tooltip title="Урон">
                        <Stack direction="column" alignItems="center">
                          <Icons.Attack size={40} />
                          <Typography fontFamily="inherit">
                            {`${characterStats?.minAttack ?? 12} - ${characterStats?.maxAttack ?? 15}`}
                          </Typography>
                        </Stack>
                      </Tooltip>

                      <Tooltip title="Защита">
                        <Stack direction="column" alignItems="center">
                          <Icons.Defense size={40} />
                          <Typography fontFamily="inherit">
                            {characterStats?.defense || 8}
                          </Typography>
                        </Stack>
                      </Tooltip>

                      <Tooltip title="Здоровье">
                        <Stack direction="column" alignItems="center">
                          <Icons.Health size={40} />
                          <Typography fontFamily="inherit">
                            {`${partyMember?.currentHealth ?? 150}/${characterStats?.maxHealth ?? 150}`}
                          </Typography>
                        </Stack>
                      </Tooltip>
                    </Stack>

                    <Divider sx={{ borderColor: "#c0a080" }} />

                    <Stack flexWrap="wrap" gap={0.5} direction="row">
                      {effectsList.map((effect) => (
                        <Tooltip
                          title={`${EFFECTS_DESCRIPTIONS[effect.type]}: ${effect.duration}`}
                        >
                          <div>
                            <img
                              style={{ width: "20px", height: "20px" }}
                              src={EFFECTS_ICONS[effect.type]}
                            />
                          </div>
                        </Tooltip>
                      ))}
                    </Stack>
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
        <Button onClick={() => onAttack()}>Атаковать</Button>
        <Button onClick={handleTurnEnd}>Закончить ход</Button>
      </S.BattleControls>
    </S.Container>
  );
};
