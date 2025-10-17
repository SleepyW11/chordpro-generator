import { ChordSyllable } from '../models/chord-syllable';
import { Directive } from '../models/directive';
import { Line } from '../models/line';
import { Word } from '../models/word';
import { CHORD_REGEX } from '../regex/chord.regex';
import {
  FULL_DIRECTIVE_REGEX,
  PARTIAL_DIRECTIVE_REGEX,
} from '../regex/directive.regex';

export class ChordParser {
  static parse(source: string) {
    let parsedLines: Line[] = [];
    let sourceLines = source.split('\n');

    sourceLines = sourceLines.map((line) => line.trim());

    for (let line of sourceLines) {
      if (FULL_DIRECTIVE_REGEX.exec(line) !== null) {
        let results = FULL_DIRECTIVE_REGEX.exec(line);
        parsedLines.push(new Line(new Directive(results![4], results![2])));
      } else if (PARTIAL_DIRECTIVE_REGEX.exec(line) !== null) {
        let results = PARTIAL_DIRECTIVE_REGEX.exec(line);
        parsedLines.push(new Line(new Directive(results![2])));
      } else {
        let words = line.split(/\s+/);
        let outWords: Word[] = [];
        for (let word of words) {
          let parts: ChordSyllable[] = [];
          outWords.push({ parts });

          let found = Array.from(word.matchAll(new RegExp(CHORD_REGEX, 'g')));

          if (found.length == 0) {
            parts.push({ syllable: word });
          } else {
            if (found[0].index !== 0) {
              parts.push({ syllable: word.slice(0, found[0].index) });
            }

            for (let i = 0; i < found.length; i++) {
              let chord = found[i];
              let key = chord[2];
              let end = word.length;
              if (i < found.length - 1) {
                end = found[i + 1].index;
              }
              let syl = word.slice(chord.index + chord[0].length, end);

              parts.push({ chord: key, syllable: syl });
            }
          }
        }
        parsedLines.push(new Line(outWords));
      }
    }

    return parsedLines;
  }
}
