import { useGameState } from "../../../../stores/GameState";
import * as S from "./CharactersBar.styled";
import { Button } from "@mui/material";

export const CharactersBar = () => {
  // нужно написать хук кастомный, принимает массив клавиш и коллбэки на их нажатие и юзать тту для применения атаки
  // импортнуть и загенерить аватары, реализовать разметку и стили для оружия в руках/хп/атака
  const {
    player: { battle },
  } = useGameState();
  // коллбэк открытия и UI для инвентаря предметов для употребления
  // коллбэк открытия и UI для навыков
  // коллбэк для окончания хода
  // коллбэк для атаки
  return (
    <S.Container>
      <S.CharacterControls>
        <Button>Инвентарь</Button>
        <Button>Навыки</Button>
      </S.CharacterControls>

      <S.AvatarsContainer>
        <S.Avatar></S.Avatar>
        <S.Avatar></S.Avatar>
        <S.Avatar></S.Avatar>
      </S.AvatarsContainer>

      <S.BattleControls>
        <Button>Атаковать</Button>
        <Button>Закончить ход</Button>
      </S.BattleControls>
    </S.Container>
  );
};
