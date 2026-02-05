import { useEffect } from "react";
import { DIRECTIONS } from "../../../entities";

export const useMovement = (cb: (direction: DIRECTIONS) => void) => {
  useEffect(() => {
    const handleKeyBindings = (event: KeyboardEvent) => {
      if (event.code === "KeyW") {
        cb(DIRECTIONS.UP);
        return;
      }

      if (event.code === "KeyA") {
        cb(DIRECTIONS.LEFT);
        return;
      }

      if (event.code === "KeyS") {
        cb(DIRECTIONS.DOWN);
        return;
      }

      if (event.code === "KeyD") {
        cb(DIRECTIONS.RIGHT);
        return;
      }
    };

    document.addEventListener("keydown", handleKeyBindings);

    return () => {
      document.removeEventListener("keydown", handleKeyBindings);
    };
  }, [cb]);
};
