import { Component, signal, WritableSignal } from '@angular/core';
import { Editor } from '../editor/editor';
import { Line } from '../../models/line';
import { Viewer } from '../viewer/viewer';
import { Header } from '../header/header';

@Component({
  selector: 'app-editor-viewer',
  imports: [Editor, Viewer, Header],
  templateUrl: './editor-viewer.html',
  styleUrl: './editor-viewer.scss',
})
export class EditorViewer {
  parsedLines: WritableSignal<Line[]> = signal([]);

  viewChords($event: Line[]) {
    this.parsedLines.set($event);
  }
}
