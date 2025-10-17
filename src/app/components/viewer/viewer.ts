import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  model,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Line } from '../../models/line';
import { HtmlGenerator } from '../../utils/html-generator.util';

@Component({
  selector: 'app-viewer',
  imports: [],
  templateUrl: './viewer.html',
  styleUrl: './viewer.scss',
})
export class Viewer {
  @ViewChild('viewerHost') viewerHost?: ElementRef;
  parsedLines = model<Line[]>();

  constructor() {
    effect(() => {
      let lines = this.parsedLines();
      if (lines && this.viewerHost) {
        this.viewerHost!.nativeElement.innerHTML =
          HtmlGenerator.generate(lines);
      }
    });
  }
}
