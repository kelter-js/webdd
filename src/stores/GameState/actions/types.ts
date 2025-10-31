import { StoreApi } from "zustand";
import { StoreState } from "../../../types/gameState";

export type StoreSet = StoreApi<StoreState>["setState"];
export type StoreGet = StoreApi<StoreState>["getState"];
