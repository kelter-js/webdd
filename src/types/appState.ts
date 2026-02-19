import { SAVE_MODES } from "../entities/saveModes";

export interface LeveledUpData {
  name: string;
  level: number;
  id: string;
}

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
  setNewGame: (state: boolean) => void;
  isNewGame: boolean;
  toggleModal: VoidFunction;
  isAutoSaveRequired: boolean;
  toggleAutoSave: VoidFunction;
  isAlmanacOpen: boolean;
  enableAudio: VoidFunction;
  isAudioEnabled: boolean;
  toggleAlmanac: VoidFunction;
  isQuestModalOpen: boolean;
  toggleTradeModal: VoidFunction;
  isTradeModalOpen: boolean;
  toggleQuestModal: VoidFunction;
  isEconomicModalOpen: boolean;
  toggleBuyPotionsModal: (value?: boolean) => void;
  isBuyPotionsModalOpen: boolean;
  toggleEconomicModal: (value?: boolean) => void;
  reset: VoidFunction;
  selectedEnemy: number;
  setSelectedEnemy: (index: number) => void;

  isCraftMenuOpen: boolean;
  toggleCraftMenu: VoidFunction;

  isDungeonModalOpen: boolean;
  toggleDungeonModal: VoidFunction;

  isTorchBuyOpen: boolean;
  toggleTorchBuyMenu: VoidFunction;

  charactersLeveledUp: LeveledUpData[];
  pushLeveledUpList: (characterData: LeveledUpData) => void;
  deleteLeveledUpList: (characterName: string) => void;
}
