import {
  DungeonCreationData,
  MemoizedItem,
  QuestReward,
  ResourceData,
  Room,
} from ".";
import { POSITIONS } from "../common/TurnIndicator/entities";

import { FLAGS } from "../constants";
import { BASE_ITEMS_ID } from "../constants/items";
import { MEDIC_PERKS, SNIPER_PERKS, TANK_PERKS } from "../constants/perks";

import {
  RENDER_LOCATIONS,
  QUEST_STATUSES,
  ENEMIES,
  DUNGEONS,
  TURN_STATES,
  BATTLE_TARGET,
  ECONOMIC_TYPES,
} from "../entities";
import { AI_CATEGORIES } from "../entities/ai";
import { CLASSES } from "../entities/characterClasses";
import { POTION_TYPES } from "../entities/consumables";
import { DIALOGUE_FLAGS } from "../entities/dialogues";
import { ALMANAC_ENEMIES_GENERIC_TYPES } from "../entities/enemies";
import { GEAR_SLOTS } from "../entities/gear";
import { GUN_TYPES } from "../entities/guns";
import { JUNK_TYPES } from "../entities/junk";
import { RESOURCES } from "../entities/resources";
import { SLIDERS } from "../entities/sliders";
import { SPECIAL_ENCOUNTERS } from "../entities/specialEncounters";

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
  hasTurn?: boolean;
}

export interface BattleCharacterModel {
  name: string;
  hasTurn?: boolean;
  perksList: Perk[];
  currentHealth: number;
  characterClass: CLASSES;
  // FIXME: это должно быть обязательным полем!
  currentAmountOfRounds?: number;
}

export type PERK_ID_DATA = MEDIC_PERKS | SNIPER_PERKS | TANK_PERKS;

// храним только айди, по нему всё высчитываем потом
export interface Perk {
  id: PERK_ID_DATA;
  isAbility?: boolean;
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
  critStrike: number;
  vampire?: number;
  critChance: number;
}

export enum EFFECT_TYPES {
  HEALTH = "HEALTH",
  DEFENSE = "DEFENSE",
  ATTACK = "ATTACK",
  VAMPIRE = "VAMPIRE",
  ALL = "ALL",
}

// интерфейс модели предмета, в свойстве inventory будет массив из таких моделей
// memoized вариант будет содержать только Tier и baseId и id
export interface Item {
  type: GEAR_SLOTS;
  gunType?: GUN_TYPES;
  value: number;
  minValue?: number;
  effect?: ItemEffects;
  price: number;
  tier: number;
  baseId: BASE_ITEMS_ID;
  // нужно будет типизировать - уникальный айди каждому предмету
  gearId: string;
  description: string;
  name: string;
  iconSrc: string;
  soundSrc?: string;
  magSize?: number;
  critChance?: number;
  criticalStrike?: number;
  bulletsPerTurn?: number;
  overAllTier: number;
  effectType?: EFFECT_TYPES;
}
// интерфейс модели представляющий противника ЛЮБОГО
export interface Creature {
  type: ENEMIES;
  hp: number;
  maxHP: number;
  minDmg: number;
  maxDmg: number;
  evasionChance: number;
  aiPackage: AI_CATEGORIES;
  exp: number;
  hasTurn?: boolean;
  subType: ALMANAC_ENEMIES_GENERIC_TYPES | null;
  isEnhanced: boolean;
}

export interface Enemy {
  party: Creature[];
  effects: BattleEffects[];
}

export interface Player {
  party: BattleCharacterModel[];
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
  movementAmount?: number;
  specialEncounter?: SPECIAL_ENCOUNTERS;
  isQuestCompleted?: boolean;
  dungeonLevel?: number;
  node?: string;
  success?: number;
}

export interface BattleUpdateState {
  target: BATTLE_TARGET;
  name?: string;
  value: number;
  effect?: { type: Effects; duration: number };
  message: Message;
}

export interface PotionsReceivedData {
  type: POTION_TYPES;
  amount: number;
  price?: number;
}

export interface Reward {
  experience: number;
  money?: number;
  potions?: PotionsReceivedData[];
  items?: Item[];
  junk?: JUNK_TYPES;
  resources?: RESOURCES[];
  flags?: FLAGS;
}

export interface Battle {
  enemy: Enemy;
  player: Player;
  turn: TURN_STATES;
  messages: Array<Message | string>;
  reward: null | Reward;
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

export interface DungeonCoordinates {
  x: number;
  y: number;
}

export interface DungeonCreation {
  dungeon: Room[][];
  type: DUNGEONS;
  attempts?: number;
  position: DungeonCoordinates;
}

export type KillCounter = Record<ALMANAC_ENEMIES_GENERIC_TYPES, number>;

export interface PlayStatistics {
  // кол-во пройденных подземелий
  dungeonCounter: number;
  kills: KillCounter;
}

export interface GameStateData {
  party: Character[];
  // memoized - будет храниться в localStorage, иметь максимально сокращенную структуру, парситься и устанавливаться в gear
  gear_memoized: Record<string, MemoizedItem[]>;
  location: null | Location;
  name: string;
  locationState: RENDER_LOCATIONS;
  prevLocationState: null | RENDER_LOCATIONS;
  battle: null | Battle;
  quest: null | QuestReward;
  inventory_memoized: MemoizedItem[];
  gold: number;
  isGameOver: boolean;
  torches: number;
  currentTier: number;
  consumables: [POTION_TYPES, string][];
  dialogFlags: DIALOGUE_FLAGS[];
  economic: ECONOMIC_TYPES | null;
  potionsToBuy: PotionsReceivedData[] | null;
  itemsToBuy: MemoizedItem[] | null;
  sliderId: SLIDERS | null;
  playStatistics: PlayStatistics;
  hasCamera: boolean;
  junk: [JUNK_TYPES, string][];
  resources: RESOURCES[];
  resourcesBagLevel: number;
  collected: [RESOURCES, string][];
  flags: FLAGS[];
  specialEncounterChance: number;
  volume: number;
}

export interface GearData {
  [key: string]: Item[];
}

export interface StoreState {
  player: GameStateData;
  // ключ - имя персонажа, значение - другой объект, после парсинга memoized будет хранить в себе весь набор вещей - артефакт, оружие, броня
  gear: null | GearData;
  // эффекты будет отвечать за текущие эффекты на группе - отхил на передвижение по клеткам в данже, уменьшение/увел. шанса встречи с противником
  // увеличение кол-ва награды, шанса на выпадение предмета, шанса на воскрешение сопартийца, парсится после того, как распарсили и установили gear
  effects: null | Effects;
  // уже после вычисления хар-ки
  inventory: null | Item[];
  sell_inventory: null | Item[];
  // хранит в себе не мемоизированные модели предметов - не привязано к игроку, просто массив вещей
  statistics: null | { [key: string]: Statistics };
  abilities: null | { [key: string]: Ability };
  setDungeon: (newDungeon: DungeonCreation | null) => void;
  updateDungeon: (
    newDungeon: { position: DungeonCoordinates },
    onFightStart: (isSpecialEncounter?: boolean) => void,
    onReward: (reward: string) => void,
  ) => void;
  setState: (gameState: GameStateData) => void;
  setPlayerPosition: (position: DungeonCoordinates) => void;
  setPlayerName: (name: string, selectedClass: CLASSES) => void;
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
  setQuestData: (data: QuestReward | null) => void;
  resetQuest: () => void;
  updateDialogFlags: (flags: DIALOGUE_FLAGS[]) => void;
  setGameOver: VoidFunction;
  resetGame: VoidFunction;
  updateGameTier: VoidFunction;
  setEconomicBranch: (economicValue: ECONOMIC_TYPES | null) => void;
  initiateState: VoidFunction;
  turnOffDices: VoidFunction;
  playersLvlUpNotifications: string[];
  healTeam: VoidFunction;
  resetBattle: (
    newSelectedResources: ResourceData[] | null,
    gold: number,
    cb?: VoidFunction,
  ) => void;
  buyCamera: VoidFunction;
  equipItem: (
    equipItemId: string,
    characterName: string,
    type: GEAR_SLOTS,
  ) => void;
  increaseResourcesBagLevel: VoidFunction;
  setBattleTurn: (newTurn: TURN_STATES) => void;
  sellItem: (itemId: string) => void;
  buyItem: (itemId: string) => void;
  handleExitSpecialEncounter: (
    specialEncounter: SPECIAL_ENCOUNTERS,
    itemAcquiredId?: BASE_ITEMS_ID,
    goldRequired?: number,
  ) => void;
  updatePlayerState: (model: GameStateData) => void;
  buyTorches: (torchesAmount: number) => void;
  setReward: (newTurn: Reward) => void;
  buyPotion: (index: number) => void;
  levelUpCharacter: (name: string, amountOfExp: number) => void;
  generateDungeon: (data: DungeonCreationData) => void;
  setSliders: (newTurn: string | null) => void;
  acquirePerk: (perkId: PERK_ID_DATA, characterName: string) => void;
  removeItemFromGear: (characterName: string, itemId: string) => void;
  acquireArtifact: (
    resourceType: RESOURCES | null,
    baseId?: BASE_ITEMS_ID,
  ) => void;
  giveResources: (resourceToGive: RESOURCES) => void;
  consumePotion: (
    characterName: string,
    potionType: POTION_TYPES,
    cb: (data?: Character[]) => void,
  ) => void;

  addJunk: (junkToSell: JUNK_TYPES, amount: number) => void;
  sellJunk: VoidFunction;
  updateFlags: (flags: FLAGS) => void;
  setVolume: (volume: number) => void;
  startSpecialEncounterGame: (node?: string) => void;
  updateSpecialEncounter: (data: {
    node?: string;
    reset?: boolean;
    isSuccessful?: boolean;
  }) => void;

  // ф-ии чисто для тестов
  killEnemy: VoidFunction;
  removePotions: VoidFunction;
  endTurn: VoidFunction;
  cheatGold: VoidFunction;
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
  | "equipItem"
  | "toggleCharacterPanel"
  | "setQuestData"
  | "resetQuest"
  | "healTeam"
  | "resetBattle"
  | "setGameOver"
  | "resetGame"
  | "updateDialogFlags"
  | "updateGameTier"
  | "effects"
  | "gear"
  | "playersLvlUpNotifications"
  | "statistics"
  | "handleExitSpecialEncounter"
  | "isDiceRequiredRoll"
  | "isAutoSaveRequired"
  | "abilities"
  | "inventory"
  | "sell_inventory"
  | "increaseEndurance"
  | "useAbility"
  | "increaseAccuracy"
  | "increaseAgility"
  | "setBattleTurn"
  | "setReward"
  | "setSliders"
  | "acquirePerk"
  | "removeItemFromGear"
  | "buyPotion"
  | "levelUpCharacter"
  | "generateDungeon"
  | "initiateState"
  | "updateFlags"
  | "setVolume"
  | "startSpecialEncounterGame"
  | "updateSpecialEncounter"
  | "increaseResourcesBagLevel"
  | "turnOffDices"
  | "buyCamera"
  | "sellJunk"
  | "addJunk"
  | "giveResources"
  | "consumePotion"
  | "sellItem"
  | "buyItem"
  | "buyTorches"
  | "updatePlayerState"
  | "acquireArtifact"

  // ф-ии чисто для тестов
  | "killEnemy"
  | "removePotions"
  | "cheatGold"
  | "endTurn"
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
