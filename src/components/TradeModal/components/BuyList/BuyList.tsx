import { useMemo } from "react";
import { useGameState } from "../../../../stores";
import buyBackground from "../../../../assets/static/gun_trader.png";
import { BackgroundFiller, Container } from "./BuyList.styled";

export const BuyList = () => {
  // MOCK: заменить potionsToBuy на itemToBuy - в listToBuy мы их демемоизируем и выводим список, значения пока не готовы в сторе
  const {
    player: { potionsToBuy },
  } = useGameState();

  const listToBuy = useMemo(() => {
    // MOCK
    // return potionsToBuy?.map(item => deMemoize(item));
    return [];
  }, [potionsToBuy]);

  // на уровне хука инициализации нужно проверять - есть не сгенерирован ассортимент - генерить и класть в itemToBuy в мемоизированном состоянии
  // потом здесь

  return (
    <Container>
      <BackgroundFiller src={buyBackground} />
      {listToBuy.map((item) => (
        <div></div>
      ))}
    </Container>
  );
};
