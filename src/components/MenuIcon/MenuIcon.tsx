import { useAppState } from "../../stores";
import { MenuIconWrapper, MenuLine } from "./MenuIcon.styled";

export const MenuIcon = () => {
  const { isMenuOpen, toggleMenu } = useAppState();

  return (
    <MenuIconWrapper onClick={toggleMenu} className={isMenuOpen ? "open" : ""}>
      <MenuLine />
      <MenuLine />
      <MenuLine />
    </MenuIconWrapper>
  );
};
