import { create } from "zustand";
import { AppState } from "../../types/appState";

export const useAppState = create<AppState>((set) => ({
  isMenuOpen: false,
  isFading: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setFading: (state) => set(() => ({ isFading: state })),
  toggleSaveList: (saveMode) => set(() => ({ saveMode })),
  resetMenu: () => set(() => ({ saveMode: null, isMenuOpen: false })),
  saveMode: null,
  isDialogueOpen: null,
  isNewGame: false,
  setNewGame: (state) => set(() => ({ isNewGame: state })),
  setDialogueOpen: (dialogueId) => set(() => ({ isDialogueOpen: dialogueId })),
  isShaking: false,
  toggleShaking: () => set((state) => ({ isShaking: !state.isShaking })),
  isModalOpen: true,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  isAutoSaveRequired: false,
  toggleAutoSave: () =>
    set((state) => ({ isAutoSaveRequired: !state.isAutoSaveRequired })),
  isQuestModalOpen: false,
  toggleQuestModal: () =>
    set((state) => ({ isQuestModalOpen: !state.isQuestModalOpen })),
  isAlmanacOpen: false,
  toggleAlmanac: () =>
    set((state) => ({ isAlmanacOpen: !state.isAlmanacOpen })),
  isEconomicModalOpen: false,
  toggleEconomicModal: (value?: boolean) =>
    set((state) => ({
      isEconomicModalOpen: value ?? !state.isEconomicModalOpen,
    })),
  isBuyPotionsModalOpen: false,
  isAudioEnabled: false,
  toggleBuyPotionsModal: (value?: boolean) =>
    set((state) => ({
      isBuyPotionsModalOpen: value ?? !state.isBuyPotionsModalOpen,
    })),
  isTradeModalOpen: false,
  toggleTradeModal: () =>
    set((state) => ({
      isTradeModalOpen: !state.isTradeModalOpen,
    })),
  enableAudio: () =>
    set(() => ({
      isAudioEnabled: true,
    })),
  reset: () =>
    set(() => ({
      isMenuOpen: false,
      isFading: true,
      saveMode: null,
      isDialogueOpen: null,
      isShaking: false,
      isModalOpen: true,
      isAutoSaveRequired: false,
      isQuestModalOpen: false,
      isEconomicModalOpen: false,
      isBuyPotionsModalOpen: false,
    })),
  selectedEnemy: 0,
  setSelectedEnemy: (index) =>
    set(() => ({
      selectedEnemy: index,
    })),
}));
