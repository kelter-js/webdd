import { FC } from "react";
import { Divider, Popper, Stack, Typography } from "@mui/material";

import { GEAR_SLOTS } from "../../entities/gear";
import { POPPER_MODIFIERS } from "./constants";
import { ItemDataModalProps } from "./types";
import { getIconByType } from "../../utils";
import { Icons } from "..";
import { Container } from "./ItemDataModal.styled";

export const ItemDataModal: FC<ItemDataModalProps> = ({
  open,
  anchorEl,
  item,
  sameGear,
  gold,
  displayDescription,
}) => {
  const {
    name,
    tier,
    value,
    minValue,
    type,
    critChance,
    criticalStrike,
    magSize,
    bulletsPerTurn,
    description,
    price,
  } = item;

  const itemDataView = (
    <Stack direction="row" gap={0.5} sx={{ backdropFilter: "blur(2px)" }}>
      <Container
        gap={0.5}
        bgcolor="rgba(30, 20, 10, 0.50)"
        border="1px solid rgba(192, 160, 128, 0.3)"
        justifyContent="flex-start"
        alignItems="center"
        p={1}
        minWidth="120px"
        maxWidth="450px"
      >
        <Typography fontFamily="inherit" variant="h6" whiteSpace="pre">
          {name} (MK{tier})
        </Typography>

        {magSize && (
          <Typography fontFamily="inherit" variant="h6" whiteSpace="pre">
            Объём магазина: {magSize}
          </Typography>
        )}

        {critChance && (
          <Typography fontFamily="inherit" variant="h6" whiteSpace="pre">
            Крит. шанс: {critChance}
          </Typography>
        )}

        {criticalStrike && (
          <Typography fontFamily="inherit" variant="h6" whiteSpace="pre">
            Сила крита: {criticalStrike}
          </Typography>
        )}

        {bulletsPerTurn && (
          <Typography fontFamily="inherit" variant="h6" whiteSpace="pre">
            Выстрелов за один ход: {bulletsPerTurn}
          </Typography>
        )}

        {displayDescription && (
          <Typography fontFamily="inherit" variant="h6">
            {description}
          </Typography>
        )}

        {type !== GEAR_SLOTS.ARTIFACT && (
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <div>{getIconByType(type!)}</div>

            <Typography fontFamily="inherit" variant="h6">
              {minValue && `${minValue} - `} {value}
            </Typography>
          </Stack>
        )}

        {gold && (
          <Typography
            fontFamily="inherit"
            variant="h6"
            whiteSpace="pre"
            color={price > gold ? "red" : "inherit"}
          >
            <Icons.GoldIcon />
            {price}
          </Typography>
        )}
      </Container>

      {sameGear && Boolean(sameGear?.length) && (
        <Stack
          bgcolor="rgba(30, 20, 10, 0.50)"
          border="1px solid rgba(192, 160, 128, 0.3)"
          justifyContent="center"
          alignItems="center"
          p={0.2}
        >
          <Typography fontFamily="inherit" variant="h6">
            Экипировано:
          </Typography>

          {sameGear.map((gear, index, self) => (
            <Stack
              key={`${gear?.name}-${index}`}
              borderBottom={
                self.length !== index + 1
                  ? "3px solid rgba(192, 160, 128,1)"
                  : "none"
              }
            >
              <Typography
                fontFamily="inherit"
                variant="h6"
                mb={0.2}
                textAlign="center"
              >
                {gear.name}
              </Typography>

              {gear.item && (
                <Stack
                  direction={
                    gear.item.type === GEAR_SLOTS.WEAPON ? "column" : "row"
                  }
                  alignItems="center"
                  justifyContent="center"
                  gap={gear.item.type === GEAR_SLOTS.WEAPON ? 0 : 0.4}
                >
                  <Typography fontFamily="inherit" variant="h6">
                    {gear.item.name} (MK{gear.item.tier})
                  </Typography>

                  <Stack direction="row">
                    <div>{getIconByType(gear?.item?.type)}</div>

                    {gear.item.type !== GEAR_SLOTS.ARTIFACT && (
                      <Typography fontFamily="inherit" variant="h6">
                        {gear.item?.minValue && `${gear.item?.minValue} - `}{" "}
                        {gear.item.value}
                      </Typography>
                    )}

                    {gear.item.type === GEAR_SLOTS.ARTIFACT && (
                      <Typography fontFamily="inherit" variant="h6">
                        {gear.item.description}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              )}

              <Divider />
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );

  if (!anchorEl) {
    return itemDataView;
  }

  return (
    <Popper
      open={!!open}
      anchorEl={anchorEl}
      placement="bottom"
      modifiers={POPPER_MODIFIERS}
      sx={{ position: "fixed", zIndex: 2000 }}
    >
      {itemDataView}
    </Popper>
  );
};
