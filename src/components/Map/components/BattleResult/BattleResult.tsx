import { useGameState } from "../../../../stores";
import { GameModal } from "../../../GameModal";
import { Button, Stack, Typography } from "@mui/material";
import { Icons } from "../../../../common";
import { getGearIcon } from "./utils";
import { getPotionIcon } from "../../../../utils/getPotionIcon";
import { getItemNameByGearId } from "../../../../utils/getItemNameByGearId";
import { Reward } from "../../../../types/gameState";
import { GEAR_SLOTS } from "../../../../entities/gear";
import { POTION_TYPES } from "../../../../entities/consumables";
import { GUN_TYPES } from "../../../../entities/guns";
import { getPotionDescriptionByType } from "../../../../utils/getPotionDescriptionByType";
import { BASE_ITEMS_ID } from "../../../../constants/items";

const mockReward: Reward = {
  experience: [{ tank: 50 }, { medic: 30 }, { warrior: 20 }],
  money: 1500,
  potions: [
    {
      type: POTION_TYPES.SMALL_HEALTH_POTION,
      amount: 3,
    },
    {
      type: POTION_TYPES.LARGE_HEALTH_POTION,
      amount: 1,
    },
  ],
  items: [
    {
      type: GEAR_SLOTS.WEAPON,
      gunType: GUN_TYPES.SNIPER_RIFLE,
      value: 25,
      minValue: 10,
      effect: {}, // пустой эффект, пока интерфейс пустой
      price: 1200,
      tier: 2,
      gearId: "weapon-001",
      baseId: BASE_ITEMS_ID.SNIPER_TIER_1,
      description: "",
      iconSrc: "",
    },
    {
      type: GEAR_SLOTS.ARTIFACT,
      value: 15,
      minValue: 5,
      effect: {},
      price: 800,
      tier: 1,
      gearId: "armor-003",
      baseId: BASE_ITEMS_ID.SNIPER_TIER_1,
      description: "",
      iconSrc: "",
    },
  ],
  junk: [
    {
      type: "мусор",
      amount: 3,
    },
  ],
};

export const BattleResult = () => {
  const {
    player: { battle },
    resetBattle,
  } = useGameState();

  const reward = battle?.reward;

  // if (!reward) return null;

  const { money, experience, items, potions, junk } = mockReward;
  // const { money, experience, items, potions } = reward || mockReward;

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

        {experience.map((item) => {
          const [name, value] = Object.entries(item)[0];

          return (
            <Stack
              alignItems="center"
              width="100%"
              direction="row"
              gap={1}
              key={name}
            >
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
                {name} - {value}
              </Typography>
            </Stack>
          );
        })}

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

        {junk?.map(({ type, amount }) => (
          <Stack
            alignItems="center"
            width="100%"
            direction="row"
            gap={1}
            key={type}
          >
            <Stack alignItems="center" justifyContent="center" width="55px">
              <Icons.Scrap />
            </Stack>

            <Typography fontSize={20} fontFamily="inherit">
              {type} -
            </Typography>
            <Typography fontFamily="inherit" fontSize={20}>
              {amount}
            </Typography>
          </Stack>
        ))}

        {items?.map(({ type, gunType, tier, gearId }) => (
          <Stack
            alignItems="center"
            width="100%"
            direction="row"
            gap={1}
            key={type}
          >
            <Stack alignItems="center" justifyContent="center" width="55px">
              {getGearIcon(type, gunType)}
            </Stack>

            <Typography fontFamily="inherit" fontSize={20}>
              {getItemNameByGearId(gearId)} MK{tier}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Button variant="text" fullWidth sx={{ p: 0 }} onClick={resetBattle}>
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
