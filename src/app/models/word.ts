import { ChordSyllable } from './chord-syllable';

export interface IWord {
  parts: ChordSyllable[];
}

export class Word implements IWord {
  parts!: ChordSyllable[];

  constructor(parts: ChordSyllable[]) {
    this.parts = parts;
  }
}
