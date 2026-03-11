import { FC } from "react";
import { Divider, Popper, Stack, Typography } from "@mui/material";

import { ItemDataModalProps } from "./types";
import { getIconByType } from "../../utils/getIconByType";
import { GEAR_SLOTS } from "../../entities/gear";

export const ItemDataModal: FC<ItemDataModalProps> = ({
  open,
  anchorEl,
  item,
  sameGear,
}) => {
  const { name, tier, value, minValue, type } = item;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom"
      modifiers={[
        { name: "flip", enabled: true },
        { name: "preventOverflow", enabled: true },
      ]}
      sx={{ position: "fixed", zIndex: 2000 }}
    >
      <Stack
        direction="row"
        gap={0.5}
        sx={{
          backdropFilter: "blur(2px)",
        }}
      >
        <Stack
          gap={0.5}
          bgcolor="rgba(30, 20, 10, 0.50)"
          border="1px solid rgba(192, 160, 128, 0.3)"
          justifyContent="flex-start"
          alignItems="center"
          p={1}
          maxHeight="80px"
          minWidth="120px"
        >
          <Typography fontFamily="inherit" variant="h6" whiteSpace="pre">
            {name} (MK{tier})
          </Typography>

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
        </Stack>

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
    </Popper>
  );
};
