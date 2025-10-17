import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { ChordParser } from '../../utils/chord-parser.util';
import { Line } from '../../models/line';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import * as monaco from 'monaco-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
  imports: [MonacoEditorModule, FormsModule],
})
export class Editor {
  chordLines = output<Line[]>();
  @ViewChild('editorHost') editorHost!: ElementRef;
  editor?: monaco.editor.IStandaloneCodeEditor;
  editorOptions = {
    theme: 'chord-pro-light',
    language: 'chord-pro',
    automaticLayout: true,
    padding: { top: 50, bottom: 50 },
    scrollBeyondLastLine: false,
  };

  initialValue = '';

  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.editor = editor;
    this.editor!.onDidChangeModelContent((change: any) => this.refreshView());
    let recoveredValue = localStorage.getItem(
      'chordpro-generator:last-document',
    );
    editor.setValue(recoveredValue || this.initialValue);

    this.refreshView();
    console.log(editor);
  }

  refreshView() {
    let currentValue = this.editor!.getValue();

    localStorage.setItem('chordpro-generator:last-document', currentValue);
    this.chordLines.emit(ChordParser.parse(currentValue));
  }
}
