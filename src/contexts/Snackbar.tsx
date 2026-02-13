import {
  FC,
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useMemo,
} from "react";
import { AlertColor } from "@mui/material";

import { SnackbarContextType } from "./types";
import { VOID_EMPTY_FUNCTION } from "../share/constants";
import { StyledAlert, StyledSnackbar } from "./Snackbar.styled";

// REFACTORING CHECKED ✅

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: VOID_EMPTY_FUNCTION,
});

export const useSnackbar = () => useContext(SnackbarContext);

const SNACKBAR_HIDE_DURATION = 300000;

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const showSnackbar = (msg: string, sev: AlertColor = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const memoizedValue = useMemo(() => ({ showSnackbar }), []);

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={memoizedValue}>
      {children}
      <StyledSnackbar
        open={open}
        autoHideDuration={SNACKBAR_HIDE_DURATION}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <StyledAlert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </StyledAlert>
      </StyledSnackbar>
    </SnackbarContext.Provider>
  );
};
