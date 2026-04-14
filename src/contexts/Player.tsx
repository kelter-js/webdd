import {
  FC,
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useRef,
  useMemo,
  useEffect,
} from "react";

import { AudioFilesData, PlayerContextData } from "./types";
import { useGameState } from "../stores";

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

  const {
    player: { volume },
  } = useGameState();

  useEffect(() => {
    if (refs.current) {
      Object.values(refs.current).forEach((player) => {
        if (player) {
          const currentVolume = volume / 100;

          player.volume = currentVolume || 1;
        }
      });
    }
  }, [volume, players]);

  const handleSetSrc = (id: string, newSrc: string, hasLoop = false) => {
    setPlayers((prev) => {
      return {
        ...prev,
        [id]: {
          src: newSrc,
          hasLoop,
        },
      };
    });
  };

  const handleRemoveSrc = (id: string) => {
    setPlayers((prev) => {
      if (!prev[id]) return prev;

      const newState = { ...prev };
      delete newState[id];
      return newState;
    });

    refs.current[id]?.pause();
    delete refs.current[id];
  };

  const getPlayerRef = (id: string) => refs.current[id];

  const memoizedValue = useMemo(
    () => ({ players, handleSetSrc, getPlayerRef, handleRemoveSrc }),
    [players],
  );

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
