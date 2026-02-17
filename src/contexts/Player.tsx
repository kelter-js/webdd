import {
  FC,
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useRef,
  useMemo,
} from "react";

import { AudioFilesData, PlayerContextData } from "./types";

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
  const [players, setPlayers] = useState<AudioFilesData>({});
  const refs = useRef<Record<string, HTMLAudioElement | null>>({});

  const handleSetSrc = (
    id: string,
    newSrc: string,
    hasLoop: boolean = false,
  ) => {
    setPlayers((prev) => ({
      ...prev,
      [id]: {
        src: newSrc,
        hasLoop,
      },
    }));
  };

  const handleRemoveSrc = (id: string) => {
    console.log("!!!id", id);
    if (players[id]) {
      const srcCopies = { ...players };
      delete srcCopies[id];
      setPlayers(srcCopies);
      refs.current[id]?.pause();
      delete refs.current[id];
    }
  };

  const getPlayerRef = (id: string) => refs.current[id];

  const memoizedValue = useMemo(
    () => ({ players, handleSetSrc, getPlayerRef, handleRemoveSrc }),
    [players],
  );
  console.log("players", players);
  return (
    <PlayerContext.Provider value={memoizedValue}>
      {Object.entries(players).map(([id, audioFile]) =>
        audioFile ? (
          <audio
            key={id}
            src={audioFile.src}
            ref={(el) => {
              refs.current[id] = el;
            }}
            className="visually-hidden"
            autoPlay
            loop={audioFile.hasLoop}
            onEnded={() => {
              if (!audioFile.hasLoop) {
                handleRemoveSrc(id);
              }
            }}
          />
        ) : null,
      )}
      {children}
    </PlayerContext.Provider>
  );
};
