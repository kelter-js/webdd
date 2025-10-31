import { Room } from ".";

import {
  RENDER_LOCATIONS,
  QUEST_STATUSES,
  ENEMIES,
  DUNGEONS,
  TURN_STATES,
  BATTLE_TARGET,
  ECONOMIC_TYPES,
} from "../entities";
import { CLASSES } from "../entities/characterClasses";
import { CONSUMABLES } from "../entities/consumables";
import { DIALOGUE_FLAGS } from "../entities/dialogues";
import { GEAR_SLOTS } from "../entities/gear";

// интерфейс модели игрока, в свойстве party будет массив из трех таких моделей
export interface Character {
  name: string;
  // будет формула для каждого персонажа сколько нужно опыта, каждый раз обнуляем счетчик после лвлапа
  experience: number;
  level: number;
  currentHealth: number;
  endurance: number;
  accuracy: number;
  agility: number;
  // нераспределенные очки
  points: number;
  critChance: number;
  critStrike: number;
  // заменить any на типизацию
  perksList: Perk[];
  characterClass: CLASSES;
}

// храним только айди, по нему всё высчитываем потом
export interface Perk {
  id: string;
  isAbility: boolean;
}

export interface Ability {
  type: string;
}

export interface Statistics {
  defense: number;
  minAttack: number;
  maxAttack: number;
  maxHealth: number;
  evasionChance: number;
}

// интерфейс модели предмета, в свойстве inventory будет массив из таких моделей
export interface Item {
  type: GEAR_SLOTS;
  value: number;
  minValue?: number;
  effect?: ItemEffects;
  price: number;
  tier: number;
}
// интерфейс модели представляющий противника ЛЮБОГО
export interface Creature {
  type: ENEMIES;
  health: number;
  maxHealth: number;
  defense: number;
  minAttack: number;
  maxAttack: number;
  evasionChance: number;
  effects: BattleEffects[];
  isEnhanced?: boolean;
}

export interface Player {
  party: Character[];
  effects: BattleEffects[];
}

export interface Message {
  attackerType: string;
  message: string;
  attackerName: string;
}

export interface Location {
  dungeon?: Room[][];
  position?: DungeonCoordinates;
  type?: DUNGEONS;
  attempts?: number;
  encounterChance?: number;
  roomsVisited?: number;
}

export interface BattleUpdateState {
  target: BATTLE_TARGET;
  name?: string;
  value: number;
  effect?: { type: Effects; duration: number };
  message: Message;
}

export interface Battle {
  enemy: Creature;
  player: Player;
  turn: TURN_STATES;
  messages: Message[];
}

export interface Quest {
  status: QUEST_STATUSES;
  money?: number;
  exp?: number;
  type?: DUNGEONS;
}

type EffectValue = null | number;

export interface Effects {
  increaseChance?: EffectValue;
  decreaseChance?: EffectValue;
  chanceToRevive?: EffectValue;
  chanceToHeal?: EffectValue;
  doubleDamageChance?: EffectValue;
  makeSleepy?: EffectValue;
  goldFind?: EffectValue;
  gearFind?: EffectValue;
  skip?: EffectValue;
  sleep?: EffectValue;
}

export interface BattleEffects {
  type: Effects;
  duration: number;
}

export interface ItemEffects {}

interface DungeonCoordinates {
  x: number;
  y: number;
}

interface DungeonCreation {
  dungeon: Room[][];
  type: DUNGEONS;
  attempts?: number;
  position: DungeonCoordinates;
}

export interface GameStateData {
  party: Character[];
  // memoized - будет храниться в localStorage, иметь максимально сокращенную структуру, парситься и устанавливаться в gear
  gear_memoized: Record<string, string>;
  location: null | Location;
  name: string;
  locationState: RENDER_LOCATIONS;
  prevLocationState: null | RENDER_LOCATIONS;
  battle: null | Battle;
  quest: null | Quest;
  inventory_memoized: string[];
  gold: number;
  isGameOver: boolean;
  torches: number;
  currentTier: number;
  consumables: [CONSUMABLES, string][];
  dialogFlags: DIALOGUE_FLAGS[];
  economic: ECONOMIC_TYPES | null;
  dungeonsCounter: number;
}

export interface StoreState {
  player: GameStateData;
  // ключ - имя персонажа, значение - другой объект, после парсинга memoized будет хранить в себе весь набор вещей - артефакт, оружие, броня
  gear: null | { [key: string]: Item[] };
  // эффекты будет отвечать за текущие эффекты на группе - отхил на передвижение по клеткам в данже, уменьшение/увел. шанса встречи с противником
  // увеличение кол-ва награды, шанса на выпадение предмета, шанса на воскрешение сопартийца, парсится после того, как распарсили и установили gear
  effects: null | Effects;
  // уже после вычисления хар-ки
  inventory: null | Item[];
  // хранит в себе не мемоизированные модели предметов - не привязано к игроку, просто массив вещей
  statistics: null | { [key: string]: Statistics };
  abilities: null | { [key: string]: Ability };
  setDungeon: (newDungeon: DungeonCreation | null) => void;
  updateDungeon: (
    newDungeon: { position: DungeonCoordinates },
    onFightStart: VoidFunction
  ) => void;
  setState: (gameState: GameStateData) => void;
  setPlayerPosition: (position: DungeonCoordinates) => void;
  setPlayerName: (name: string) => void;
  setLocationState: (newLocation: RENDER_LOCATIONS) => void;
  // подвезти типизацию
  setBattle: (battleState: any) => void;
  updateBattle: (battleState: BattleUpdateState) => void;
  changeAttempts: (attempts: number) => void;
  increaseEndurance: (characterName: string) => void;
  increaseAccuracy: (characterName: string) => void;
  increaseAgility: (characterName: string) => void;
  isDiceRequiredRoll: boolean;
  useAbility: (characterName: string, abilityId: string) => void;
  toggleInventory: VoidFunction;
  handleExitDungeon: VoidFunction;
  toggleCharacterPanel: VoidFunction;
  setQuestData: (data: Quest | null) => void;
  updateDialogFlags: (flags: DIALOGUE_FLAGS[]) => void;
  setGameOver: VoidFunction;
  resetGame: VoidFunction;
  updateGameTier: VoidFunction;
  setEconomicBranch: (economicValue: ECONOMIC_TYPES | null) => void;
  initiateState: VoidFunction;
  turnOffDices: VoidFunction;
  playersLvlUpNotifications: string[];
  healTeam: VoidFunction;
}

// Define the type for persisted state
export type PersistedState = Omit<
  StoreState,
  | "setDungeon"
  | "setState"
  | "setPlayerPosition"
  | "setPlayerName"
  | "setLocationState"
  | "setBattle"
  | "handleExitDungeon"
  | "updateBattle"
  | "changeAttempts"
  | "toggleInventory"
  | "updateDungeon"
  | "setEconomicBranch"
  | "toggleCharacterPanel"
  | "setQuestData"
  | "healTeam"
  | "setGameOver"
  | "resetGame"
  | "updateDialogFlags"
  | "updateGameTier"
  | "effects"
  | "gear"
  | "playersLvlUpNotifications"
  | "statistics"
  | "isDiceRequiredRoll"
  | "isAutoSaveRequired"
  | "abilities"
  | "inventory"
  | "increaseEndurance"
  | "useAbility"
  | "increaseAccuracy"
  | "increaseAgility"
  | "initiateState"
  | "turnOffDices"
>;

// Define storage value type
export interface StorageValue {
  state: {
    player: GameStateData;
    effects: null | Effects;
    statistics: null | { [key: string]: Statistics };
    isDiceRequiredRoll: boolean;
    abilities: null | { [key: string]: Ability };
    gear: null | { [key: string]: Item[] };
    inventory: null | Item[];
    economic: null;
    playersLvlUpNotifications: string[];
  };
}
