import { FC, MouseEvent, useState } from "react";
import {
  Button,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ClickAwayListener,
} from "@mui/material";
import { PotionsListProps } from "./types";
import { POTION_TYPES } from "../../../../../../entities/consumables";
import { useGameState } from "../../../../../../stores";
import { getPotionDescriptionByType } from "../../../../../../utils/getPotionDescriptionByType";
import { StyledButton, StyledMenu, StyledMenuItem } from "./PotionsList.styled";
import { wait } from "../../../../../../utils";

export const PotionsList: FC<PotionsListProps> = ({
  onPotionClick,
  disabled,
}) => {
  const {
    player: { consumables },
  } = useGameState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const open = Boolean(anchorEl) || isMenuOpen;

  // Обработчик наведения на кнопку
  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  // Обработчик ухода мыши с кнопки
  const handleMouseLeave = async () => {
    // Не закрываем сразу, даем возможность переместиться на меню
    await wait(100);
    const menuElement = document.getElementById("styled-hover-menu");
    if (menuElement && menuElement.matches(":hover")) {
      return; // Если мышь на меню - не закрываем
    }
    handleClose();
  };

  // Обработчик наведения на меню
  const handleMenuMouseEnter = () => {
    setIsMenuOpen(true);
  };

  // Обработчик ухода с меню
  const handleMenuMouseLeave = () => {
    setIsMenuOpen(false);
    handleClose();
  };

  // Закрытие меню
  const handleClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  // Обработчик клика по пункту меню
  const handleItemClick = (item: POTION_TYPES) => {
    onPotionClick(item);
    handleClose();
  };

  if (!consumables || consumables.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "inline-block" }}>
      <StyledButton
        aria-controls={open ? "styled-hover-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variant="outlined"
        disabled={disabled}
      >
        Использовать зелье
      </StyledButton>

      <StyledMenu
        id="styled-hover-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          onMouseEnter: handleMenuMouseEnter,
          onMouseLeave: handleMenuMouseLeave,
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableAutoFocusItem
        autoFocus={false}
        hideBackdrop={true}
        disablePortal={false}
        // Убираем ClickAwayListener из Menu, так как используем внешний
        sx={{
          zIndex: 1300,
          pointerEvents: "auto", // Убеждаемся, что меню перехватывает события мыши
          "& .MuiPaper-root": {
            marginBottom: "8px",
          },
        }}
      >
        {consumables.map(([potionType, amount], index) => (
          <StyledMenuItem
            key={`${potionType}-${index}`}
            onClick={() => handleItemClick(potionType)}
          >
            {`${getPotionDescriptionByType(potionType)} - ${amount}`}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};
