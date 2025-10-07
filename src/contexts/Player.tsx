import {
  FC,
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useRef,
  useMemo,
} from "react";

import { PlayerContextData } from "./types";

// REFACTORING CHECKED ✅

const PlayerContext = createContext<PlayerContextData>({
  players: {},
  handleSetSrc: () => {},
  getPlayerRef: () => undefined,
  handleRemoveSrc: () => undefined,
});

export const usePlayer = () => useContext(PlayerContext);

// Возможно нужно будет несколько playerов, для эмбиента и для эффектов
export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [players, setPlayers] = useState<Record<string, string>>({});
  const refs = useRef<Record<string, HTMLAudioElement | null>>({});

  const handleSetSrc = (id: string, newSrc: string) => {
    setPlayers((prev) => ({ ...prev, [id]: newSrc }));
  };

  const handleRemoveSrc = (id: string) => {
    const srcCopies = { ...players };
    delete srcCopies[id];
    setPlayers(srcCopies);

    delete refs.current[id];
  };

  const getPlayerRef = (id: string) => refs.current[id];

  const memoizedValue = useMemo(
    () => ({ players, handleSetSrc, getPlayerRef, handleRemoveSrc }),
    [players]
  );

  return (
    <PlayerContext.Provider value={memoizedValue}>
      {Object.entries(players).map(([id, src]) =>
        src ? (
          <audio
            key={id}
            src={src}
            ref={(el) => {
              refs.current[id] = el;
            }}
            className="visually-hidden"
            autoPlay
          />
        ) : null
      )}
      {children}
    </PlayerContext.Provider>
  );
};
