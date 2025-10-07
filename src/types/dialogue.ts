import { DIALOGUE_FLAGS } from "../entities/dialogues";

export interface DialogueOption {
  text: string;
  nextNode: string;
  flags?: string[]; // Опциональные флаги
}

export interface DialogueNode {
  text: string;
  options: DialogueOption[];
  flags?: DIALOGUE_FLAGS[]; // Флаги, которые устанавливаются при посещении узла
}

export interface DialogueTree {
  id: string;
  startNode: string;
  nodes: { [key: string]: DialogueNode };
  name: string;
  src: string;
}

export interface Dialogues {
  [key: string]: DialogueTree;
}
