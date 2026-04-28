import { FC } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";

import {
  MEDIC_PERKS,
  SNIPER_PERKS,
  TANK_PERKS,
} from "../../../../constants/perks";
import {
  EFFECTS,
  EFFECTS_DESCRIPTIONS,
  EFFECTS_ICONS,
} from "../../../../entities/effects";
import { getBattleStateAfterAbilityUsage, getUnitAvatarSrc } from "./utils";
import { useGameState } from "../../../../stores/GameState/GameState";
import { WEAPONS_ICON_SOURCES } from "../../../../constants/guns";
import { useGetPlayerAbility } from "./hooks/useGetPlayerAbility";
import { MainButtonText } from "../../../../common/styled.index";
import { DamageEffect } from "../Enemy/components/DamageEffect";
import { POTION_TYPES } from "../../../../entities/consumables";
import { PERK_ID_DATA } from "../../../../types/gameState";
import { usePlayer } from "../../../../contexts/Player";
import { PotionsList } from "./components/PotionsList";
import { GEAR_SLOTS } from "../../../../entities/gear";
import { ROOM_TYPES } from "../../../../entities/room";
import { Icons, Tooltip } from "../../../../common";
import { ENEMIES, TURN_STATES } from "../../../../entities";
import { CharactersBarProps } from "./types";

import potionSfx from "../../../../assets/audio/potion.mp3";
import * as S from "./CharactersBar.styled";

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
    player: { battle, location },
    statistics,
    consumePotion,
    updateBattle,
    gear,
    runFromBattle,
  } = useGameState();

  const party = battle?.player?.party || [];
  const isEnemyTurn = battle?.turn === TURN_STATES.ENEMY_TURN;

  const { handleSetSrc } = usePlayer();

  if (!party || !battle || !location) {
    return null;
  }

  const handleConsumePotion = (potion: POTION_TYPES) => {
    if (selectedPlayer?.name) {
      handleSetSrc(POTION_SFX, potionSfx);
      consumePotion(selectedPlayer?.name, potion, selectedNextPlayer);
    }
  };

  const playerAbility = useGetPlayerAbility(selectedPlayer);

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

  const firstCreature = battle?.enemy?.party[0];

  const { position, dungeon } = location;

  const currentCell =
    dungeon &&
    typeof position?.y === "number" &&
    typeof position?.x === "number" &&
    dungeon[position.y]
      ? dungeon[position.y][position.x]
      : undefined;

  const isBoss =
    battle?.enemy.party.length === 1 &&
    (firstCreature.type === ENEMIES.SIN_ICON_TIER_1 ||
      firstCreature.type === ENEMIES.GENERAL_TIER_1 ||
      firstCreature.type === ENEMIES.MERGED_MASS_TIER_1 ||
      currentCell?.type === ROOM_TYPES.ENEMY);

  const currentPlayerHasNoAmmo =
    (selectedPlayer?.currentAmountOfRounds || 0) <= 0;

  const isPotionsListDisabled = Boolean(
    isEnemyTurn ||
    (selectedPlayer?.name &&
      battle?.player.effects[selectedPlayer?.name]?.list.find(
        (effect) => effect.type === EFFECTS.HEAL_IMMUNE,
      )),
  );

  return (
    <S.Container>
      <S.CharacterControls>
        {!isPotionsListDisabled && (
          <PotionsList onPotionClick={handleConsumePotion} />
        )}

        {playerAbility && (
          <Tooltip title={playerAbility.description}>
            <div>
              <Button
                variant="text"
                onClick={() => handleUseAbility(playerAbility.id)}
              >
                <MainButtonText variant="h5">
                  {playerAbility.title}
                </MainButtonText>
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
              <S.CharacterContainer>
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
                  <S.PlayerWeaponContainer>
                    {weaponIcon && <S.WeaponIcon src={weaponIcon} />}

                    {currentMaxMagSize[partyMember.name].magSize && (
                      <S.RoundStateText>
                        {`${partyMember?.currentAmountOfRounds} / ${currentMaxMagSize[partyMember.name].magSize}`}
                      </S.RoundStateText>
                    )}
                  </S.PlayerWeaponContainer>

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

              {currentDamageData !== null && (
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

      {battle?.turn === TURN_STATES.PLAYER_TURN && (
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
            <S.ActionButton
              isPlayerTurnAvailable={isPlayerTurnAvailable}
              variant="h6"
            >
              {currentPlayerHasNoAmmo ? "Перезарядить" : "Атаковать"} (F)
            </S.ActionButton>
          </Button>

          <Tooltip
            title={
              isBoss
                ? "Вы не можете сбежать из боя с боссом... Придётся биться!"
                : "Откуп из боя будет вам стоить 1000 золотых и 10% здоровья всех бойцов"
            }
          >
            <div style={{ width: "100%" }}>
              <Button
                sx={{ opacity: isBoss ? 0.5 : 1 }}
                fullWidth
                disabled={isBoss}
                variant="text"
                onClick={() => runFromBattle()}
              >
                <S.ActionButton
                  isPlayerTurnAvailable={isPlayerTurnAvailable}
                  variant="h6"
                >
                  Сбежать
                </S.ActionButton>
              </Button>
            </div>
          </Tooltip>
        </S.BattleControls>
      )}
    </S.Container>
  );
};
