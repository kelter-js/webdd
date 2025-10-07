import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { SnackbarProvider } from "./contexts/Snackbar.tsx";
import { PlayerProvider } from "./contexts/Player.tsx";
import { App } from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </SnackbarProvider>
  </StrictMode>
);
