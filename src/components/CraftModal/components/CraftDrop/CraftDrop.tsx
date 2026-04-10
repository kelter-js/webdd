import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";

import { CraftDropProps } from "./types";
import { GEAR_SLOTS } from "../../../../entities/gear";
import { getItemIcon } from "../../../../utils/getItemIcon";

export const CraftDrop: FC<CraftDropProps> = ({ item, onClose }) => {
  if (!item) return null;

  const {
    name,
    tier,
    magSize,
    critChance,
    criticalStrike,
    value,
    minValue,
    bulletsPerTurn,
    type,
    baseId,
  } = item;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ y: -120, opacity: 0, rotate: -8 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
          style={{
            position: "absolute",
            top: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              width: 350,
              p: 2,
              borderRadius: 2,
              background: "#1e1e1e",
              border: "2px solid #555",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <img
              src={getItemIcon(type, baseId)}
              style={{
                width: 64,
                height: 64,
                alignSelf: "center",
                objectFit: "contain",
              }}
            />

            <Typography fontFamily="inherit" variant="h6" whiteSpace="pre">
              {name}
            </Typography>

            <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
              Уровень предмета: {tier}
            </Typography>

            <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
              {type === GEAR_SLOTS.WEAPON ? "Урон:" : "Броня:"}
              {minValue && `${minValue} - `} {value}
            </Typography>

            {item.critChance !== undefined && (
              <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
                Шанс крит. удара: {critChance}%
              </Typography>
            )}

            {item.criticalStrike !== undefined && (
              <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
                Критический урон: {criticalStrike}
              </Typography>
            )}

            {item.magSize !== undefined && (
              <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
                Размер магазина: {magSize}
              </Typography>
            )}

            {item.bulletsPerTurn !== undefined && (
              <Typography fontFamily="inherit" variant="h5" whiteSpace="pre">
                Выстрелов за один ход: {bulletsPerTurn}
              </Typography>
            )}

            <Button variant="text" onClick={onClose} sx={{ mt: 1 }}>
              <Typography
                sx={{
                  color: "#c08040",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  padding: (theme) => theme.spacing(1),
                  borderBottom: "1px solid #5a3020",
                  borderTop: "1px solid #5a3020",
                  fontFamily: "inherit",
                  width: "100%",
                }}
              >
                Ок
              </Typography>
            </Button>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
