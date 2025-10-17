import {
  AfterViewInit,
  Component,
  ElementRef,
  output,
  ViewChild,
} from '@angular/core';
import * as monaco from 'monaco-editor';
import { ChordParser } from '../../utils/chord-parser.util';
import { Line } from '../../models/line';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor implements AfterViewInit {
  chordLines = output<Line[]>();
  @ViewChild('editorHost') editorHost!: ElementRef;
  editor?: monaco.editor.IStandaloneCodeEditor;

  initialValue = '';

  ngAfterViewInit(): void {
    this.chordLines.emit(ChordParser.parse(this.initialValue));

    let recoveredValue = localStorage.getItem('chordpro-generator:last-document');

    this.editor = monaco.editor.create(this.editorHost.nativeElement, {
      theme: 'chord-pro-light',
      language: 'chord-pro',
      value: recoveredValue ? recoveredValue : this.initialValue,
      automaticLayout: true,
      padding: { top: 50, bottom: 50 },
      scrollBeyondLastLine: false,
    });

    this.refreshView();

    this.editor.onDidChangeModelContent((change: any) => this.refreshView());
  }

  refreshView() {
    let currentValue = this.editor!.getValue();

    localStorage.setItem('chordpro-generator:last-document', currentValue);
    this.chordLines.emit(ChordParser.parse(currentValue));
  }
}
