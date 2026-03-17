import { useGameState } from "../../../../stores";
import { GameModal } from "../../../GameModal";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { Icons, Tooltip } from "../../../../common";
import { getGearIcon } from "./utils";
import { getPotionIcon } from "../../../../utils/getPotionIcon";

import { getPotionDescriptionByType } from "../../../../utils/getPotionDescriptionByType";

import { DEFAULT_BAG_SIZE } from "../../../../constants";
import { useMemo, useState } from "react";
import { v4 } from "uuid";

import { getResourceIcon } from "../../../../utils/getResourceIcon";
import { getResourceDescription } from "../../../../utils/getResourceDescription";
import { ResourceData } from "../../../../types";
import { JUNK_DATA } from "../../../../constants/items";
import { useSnackbar } from "../../../../contexts/Snackbar";

export const BattleResult = () => {
  const {
    player: { battle, resources: playerResources, resourcesBagLevel },
    resetBattle,
  } = useGameState();

  const { showSnackbar } = useSnackbar();

  const reward = battle?.reward;

  const isOverEncumbered = Boolean(
    reward?.resources &&
    playerResources.length + reward.resources.length >
      DEFAULT_BAG_SIZE * resourcesBagLevel,
  );

  const resourcesMapping = useMemo(() => {
    if (!reward?.resources || !isOverEncumbered) {
      return null;
    }

    return {
      inventoryResources: playerResources.map((resource) => ({
        resource: resource,
        id: v4(),
      })),

      rewardResources: reward?.resources.map((resource) => ({
        resource: resource,
        id: v4(),
      })),
    };
  }, [isOverEncumbered]);

  const { inventoryResources, rewardResources } = resourcesMapping || {};

  const [selectedResources, setSelectedResources] = useState<ResourceData[]>(
    isOverEncumbered && inventoryResources ? inventoryResources : [],
  );

  const handleSelectResources = (
    resource: ResourceData,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      setSelectedResources((state) =>
        state.filter((stateResource) => stateResource.id !== resource.id),
      );
    } else {
      setSelectedResources((state) => [...state, resource]);
    }
  };

  const maxResourceBagSize = DEFAULT_BAG_SIZE * resourcesBagLevel;
  const isResourceBagFull = selectedResources.length === maxResourceBagSize;

  if (!reward) return null;

  const { money, experience, items, potions, junk, resources } = reward;

  return (
    <GameModal width="500px" height="auto">
      <Stack alignItems="center" gap={1}>
        {money && (
          <Stack alignItems="center" width="100%" direction="row" gap={1}>
            <Stack alignItems="center" justifyContent="center" width="55px">
              <Icons.GoldIcon />
            </Stack>
            <Typography fontSize={20} fontFamily="inherit">
              {money}
            </Typography>
          </Stack>
        )}

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
            {experience}
          </Typography>
        </Stack>

        {potions?.map(({ type, amount }) => (
          <Stack
            alignItems="center"
            width="100%"
            direction="row"
            gap={1}
            key={type}
          >
            <Stack alignItems="center" justifyContent="center" width="55px">
              {getPotionIcon(type)}
            </Stack>

            <Typography fontSize={20} fontFamily="inherit">
              {getPotionDescriptionByType(type)} -
            </Typography>
            <Typography fontFamily="inherit" fontSize={20}>
              {amount}
            </Typography>
          </Stack>
        ))}

        {junk && (
          <Stack alignItems="center" width="100%" direction="row" gap={1}>
            <Stack alignItems="center" justifyContent="center" width="55px">
              <Icons.Scrap />
            </Stack>

            <Typography fontSize={20} fontFamily="inherit">
              {JUNK_DATA[junk].title}
            </Typography>
          </Stack>
        )}

        {items?.map(({ type, gunType, tier, gearId, name }) => (
          <Stack
            alignItems="center"
            width="100%"
            direction="row"
            gap={1}
            key={gearId}
          >
            <Stack alignItems="center" justifyContent="center" width="55px">
              {getGearIcon(type, gunType)}
            </Stack>

            <Typography fontFamily="inherit" fontSize={20}>
              {name} MK{tier}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {!isOverEncumbered && (
        <Stack gap={0.5}>
          <Typography fontFamily="inherit" textAlign="center">
            Ресурсы:
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={0.5}>
            {resources?.map((resource, index) => (
              <Tooltip
                key={`${resource}-${index}`}
                title={getResourceDescription(resource)}
              >
                <div>{getResourceIcon(resource, 40)}</div>
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      )}

      {isOverEncumbered && (
        <Stack gap={1}>
          <Typography fontFamily="inherit" textAlign="center">
            Занято {selectedResources.length}/{maxResourceBagSize}
          </Typography>

          <Typography fontFamily="inherit" textAlign="center" variant="caption">
            Нераспределенные ресурсы будут автоматом конвертированы в золото
          </Typography>

          <Stack gap={1} direction="row" flexWrap="wrap">
            <Typography fontFamily="inherit" width="100%">
              Ваши ресурсы:
            </Typography>

            {inventoryResources!.map((resourceItem) => {
              const { resource, id } = resourceItem;

              const isSelected = Boolean(
                selectedResources.find((resource) => resource.id === id),
              );

              return (
                <Tooltip title={getResourceDescription(resource)}>
                  <div>
                    <Button
                      disabled={isResourceBagFull && !isSelected}
                      key={id}
                      sx={{
                        minWidth: 40,
                        border: isSelected ? "1px solid #e0c0a0" : "none",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleSelectResources(resourceItem, isSelected)
                      }
                    >
                      {getResourceIcon(resource, 40)}
                    </Button>
                  </div>
                </Tooltip>
              );
            })}
          </Stack>

          <Divider sx={{ bgcolor: "#e0c0a0" }} />

          <Stack gap={1} direction="row" flexWrap="wrap">
            <Typography fontFamily="inherit" width="100%">
              Награда:
            </Typography>

            {rewardResources!.map((resourceItem) => {
              const { resource, id } = resourceItem;

              const isSelected = Boolean(
                selectedResources.find((resource) => resource.id === id),
              );

              return (
                <Tooltip title={getResourceDescription(resource)}>
                  <div>
                    <Button
                      disabled={isResourceBagFull && !isSelected}
                      key={id}
                      sx={{
                        minWidth: 40,
                        border: isSelected ? "1px solid #e0c0a0" : "none",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleSelectResources(resourceItem, isSelected)
                      }
                    >
                      {getResourceIcon(resource, 40)}
                    </Button>
                  </div>
                </Tooltip>
              );
            })}
          </Stack>
        </Stack>
      )}

      <Button
        variant="text"
        fullWidth
        sx={{ p: 0 }}
        onClick={() => {
          let goldAmount = 0;

          if (isOverEncumbered && inventoryResources && rewardResources) {
            const allResources = [...inventoryResources, ...rewardResources];
            const selectedResourcesIds = selectedResources.map(
              (item) => item.id,
            );

            const leftOverResources = allResources.filter(
              ({ id }) => !selectedResourcesIds.includes(id),
            );

            goldAmount = leftOverResources.length * 50;
          }

          resetBattle(
            isOverEncumbered ? selectedResources : null,
            goldAmount,
            () =>
              showSnackbar(
                "Предмет по заданию найден, можно покидать подземелье!",
              ),
          );
        }}
      >
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
          Победа!
        </Typography>
      </Button>
    </GameModal>
  );
};
