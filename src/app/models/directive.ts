export interface IDirective {
  value: string;
  type?: string;
}

export class Directive implements IDirective {
  value!: string;
  type?: string;

  constructor(value: string, type?: string) {
    this.type = type;
    this.value = value;
  }
}
