import { Directive } from './directive';
import { Word } from './word';

export interface ILine {
  content: Word[] | Directive;
}

export class Line implements ILine {
  content!: Word[] | Directive;

  constructor(content: Word[] | Directive) {
    this.content = content;
  }
}
