import { SAVE_MODES } from "../entities/saveModes";

export interface AppState {
  isMenuOpen: boolean;
  toggleMenu: VoidFunction;
  setFading: (state: boolean) => void;
  resetMenu: VoidFunction;
  isFading: boolean;
  toggleSaveList: (saveMode: SAVE_MODES | null) => void;
  saveMode: SAVE_MODES | null;
  isDialogueOpen: null | string;
  setDialogueOpen: (dialogueId: string | null) => void;
  isShaking: boolean;
  toggleShaking: VoidFunction;
  isModalOpen: boolean;
  toggleModal: VoidFunction;
  isAutoSaveRequired: boolean;
  toggleAutoSave: VoidFunction;
  isQuestModalOpen: boolean;
  toggleQuestModal: VoidFunction;
  isEconomicModalOpen: boolean;
  toggleEconomicModal: (value?: boolean) => void;
  reset: VoidFunction;
}
