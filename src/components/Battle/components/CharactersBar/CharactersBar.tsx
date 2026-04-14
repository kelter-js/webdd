import { FC, useMemo } from "react";
import { useGameState } from "../../../../stores/GameState/GameState";

import { Button, Divider, Stack, Typography } from "@mui/material";
import { CharactersBarProps } from "./types";
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
import {
  EFFECTS,
  EFFECTS_DESCRIPTIONS,
  EFFECTS_ICONS,
} from "../../../../entities/effects";
import { PERK_ID_DATA } from "../../../../types/gameState";
import { StartGameText } from "../../../Initiate/components/SetNameModal/SetNameModal.styled";
import * as S from "./CharactersBar.styled";
import { WEAPONS_ICON_SOURCES } from "../../../../constants/guns";
import { GEAR_SLOTS } from "../../../../entities/gear";

const POTION_SFX = "consumePotionSfx";

export const CharactersBar: FC<CharactersBarProps> = ({
  selectedPlayer,
  selectedNextPlayer,
  isPlayerTurnAvailable,
  onAttack,
  damageModel,
  onDamageReceiveAnimationEnd,
  onReload,
  currentMaxMagSize,
}) => {
  const {
    player: { battle },
    statistics,
    consumePotion,
    updateBattle,
    gear,
  } = useGameState();

  const party = battle?.player?.party || [];
  const isEnemyTurn = battle?.turn === TURN_STATES.ENEMY_TURN;

  const { handleSetSrc } = usePlayer();

  if (!party) {
    return null;
  }

  const handleConsumePotion = (potion: POTION_TYPES) => {
    if (selectedPlayer?.name) {
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

    const { id } = ability;

    const isPerkDisabled =
      (id === TANK_PERKS.LAST_STAND &&
        !effectsList?.find(
          (effect) => effect.type === EFFECTS.LAST_STAND_FATIGUE,
        )) ||
      (id === MEDIC_PERKS.HEAL_ALL &&
        !effectsList?.find(
          (effect) =>
            effect.type === EFFECTS.HEAL_ALL_FATIGUE ||
            effect.type === EFFECTS.HEAL_IMMUNE,
        )) ||
      (id === SNIPER_PERKS.INSTAKILL &&
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

  const currentPlayerHasNoAmmo =
    (selectedPlayer?.currentAmountOfRounds || 0) <= 0;

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
        {party.map((partyMember) => {
          const currentDamageData = damageModel
            ? damageModel.find(
                (damageData) => damageData.target === partyMember.name,
              )
            : null;

          const { damage, isCritical, isEvasion, target } =
            currentDamageData || {};

          const isDamaged = Boolean(currentDamageData);

          const hasTurn = partyMember.hasTurn;

          const isDead = partyMember.currentHealth <= 0;

          const characterStats = (statistics || {})[partyMember.name];
          const currentCharacterGear =
            gear &&
            gear[partyMember.name] &&
            gear[partyMember.name].find(
              (item) => item.type === GEAR_SLOTS.WEAPON,
            );

          const weaponIcon = currentCharacterGear
            ? WEAPONS_ICON_SOURCES[
                currentCharacterGear.baseId as keyof typeof WEAPONS_ICON_SOURCES
              ]
            : null;

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
                      position: "relative",
                    }}
                  >
                    {weaponIcon && (
                      <img
                        src={weaponIcon}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    )}

                    {currentMaxMagSize[partyMember.name].magSize && (
                      <Typography
                        fontFamily="inherit"
                        whiteSpace="pre"
                        position="absolute"
                        zIndex={99999999}
                        top="0px"
                      >
                        {`${partyMember?.currentAmountOfRounds} / ${currentMaxMagSize[partyMember.name].magSize}`}
                      </Typography>
                    )}
                  </div>
                  <Stack sx={{ pb: 1, width: "100%", mr: 1 }}>
                    <Stack direction="row" gap={1} justifyContent="center">
                      <Tooltip title="Урон">
                        <Stack direction="column" alignItems="center">
                          <Icons.Attack size={40} />
                          <Typography fontFamily="inherit" whiteSpace="pre">
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

              {((Boolean(damage) && damage !== null) || isEvasion) && (
                <DamageEffect
                  isEvasion={Boolean(isEvasion)}
                  damage={damage || 0}
                  isCritical={isCritical}
                  containerId={target ? `${target}-id` : undefined}
                  onDamageAnimationEnd={() => onDamageReceiveAnimationEnd?.()}
                />
              )}
            </div>
          );
        })}
      </S.AvatarsContainer>

      <S.BattleControls>
        <Button
          disabled={!isPlayerTurnAvailable}
          variant="text"
          onClick={() => {
            if (currentPlayerHasNoAmmo) {
              onReload();
            } else {
              onAttack();
            }
          }}
        >
          <StartGameText
            sx={{
              fontFamily: "inherit",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              border: "1px solid #c0a080",
              color: "#e0c0a0",
              backgroundColor: "rgba(30, 20, 10, 0.9)",
              padding: (theme) => theme.spacing(1, 2),
              opacity: `${isPlayerTurnAvailable ? 1 : 0.5} !important`,

              "&:hover": {
                backgroundColor: "rgba(30, 20, 10, 0.95)",
                border: "1px solid #ffd700",
                color: "#ffd700",
              },
            }}
            variant="h6"
          >
            {currentPlayerHasNoAmmo ? "Перезарядить" : "Атаковать"} (F)
          </StartGameText>
        </Button>
      </S.BattleControls>
    </S.Container>
  );
};
