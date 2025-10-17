import { Directive } from '../models/directive';
import { Line } from '../models/line';

const LINE_CLASS = 'line';
const CHORUS_LINE_CLASS = 'line chorus';
const DIRECTIVE_CLASS = 'directive';
const WORD_CLASS = 'word';
const CHORD_SYL_CLASS = 'chord-syllable';
const CHORD_CLASS = 'chord';
const SYL_CLASS = 'syllable';
const SPACE_DIV = '<div class="syllable">&nbsp;</div>';

let templateStart = `<div class="{class}">`;
let templateEnd = `</div>`;

let classReplacer = '{class}';

export class HtmlGenerator {
  static generate(chordLines: Line[]) {
    let output = '';
    let isChorus = false;

    for (let line of chordLines) {
      if (line.content instanceof Directive) {
        if (line.content.type) {
          output += templateStart.replace(
            classReplacer,
            `${DIRECTIVE_CLASS}-${line.content.type}`,
          );
          output += line.content.value;
          output += templateEnd;
        } else {
          switch (line.content.value) {
            case 'start_of_chorus':
              isChorus = true;
              break;
            case 'end_of_chorus':
              isChorus = false;
              break;
            default:
              break;
          }
        }
      } else {
        output += templateStart.replace(
          classReplacer,
          isChorus ? CHORUS_LINE_CLASS : LINE_CLASS,
        );
        for (let word of line.content) {
          output += templateStart.replace(classReplacer, WORD_CLASS);

          for (let part of word.parts) {
            output += templateStart.replace(classReplacer, CHORD_SYL_CLASS);

            output += templateStart.replace(classReplacer, CHORD_CLASS);
            if (part.chord) {
              output += part.chord;
            }
            output += templateEnd;

            output += templateStart.replace(classReplacer, SYL_CLASS);
            if (part.syllable) {
              output += part.syllable;
            }
            output += templateEnd;

            output += templateEnd;
          }
          output += SPACE_DIV;
          output += templateEnd;
        }
        output += templateEnd;
      }
    }
    return output;
  }
}
