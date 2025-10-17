export interface IChordSyllable {
  chord?: string;
  syllable?: string;
}

export class ChordSyllable implements IChordSyllable {
  chord?: string;
  syllable?: string;

  constructor(chord?: string, syllable?: string) {
    this.chord = chord;
    this.syllable = syllable;
  }
}
